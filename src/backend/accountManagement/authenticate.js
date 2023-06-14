import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../firebase/firebase.js";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { writable } from "svelte/store";
import { User } from "./userClass.js";
import { Schedule } from "../scheduleManagement/scheduleClass.js";

const authHandlers = {
    // @ts-ignore
    signup: async (email, pass) => {
        return await createUserWithEmailAndPassword(auth, email, pass)
    },
    // @ts-ignore
    login: async (email, pass) => {
        return await signInWithEmailAndPassword(auth, email, pass);
    },
    logout: async () => {
        await signOut(auth)
    }
}

/**
 * Async function to create a new user with given email and password.
 * @param {String} email
 * @param {String} password
 * @param {String} confirmPass
 * @returns {User}
 */
export async function handleRegister(email, password, confirmPass) {
    try {
        if (!email || !password || !confirmPass || password != confirmPass) {
            throw "email or password is not valid!"
        }
        // return await authHandlers.signup(email, password);
        let userCred = await authHandlers.signup(email, password);
        let user = new User(userCred.user.email, userCred.user.uid, [], new Schedule(), []);
        await user.createNewUser();
        user.setDefaultLocation("127.3621", "36.3737");
        return user;
    } catch(err) {
        console.log("There was a register error: ", err);
    }
}

/**
 * Async function to login with given email and password.
 * @param {String} email
 * @param {String} password
 * @returns {User}
 */
export async function handleLogin(email, password) {
    try {
        if (!email || !password) {
            throw "email or password is not valid!"
        }
        let userCred = await authHandlers.login(email, password);
        let user = new User(userCred.user.email, userCred.user.uid);
        await user.fetchDb();
        return user;
    } catch(err) {
        console.log("There was a login error: ", err);
    }
}

/**
 * Async function to logout.
 */
export async function handleLogout() {
    try {
        await authHandlers.logout();
        sessionStorage.clear();
        window.location.href = "/login";
    } catch(err) {
        console.log("There was a logout error: ", err);
    }
}

export const authStore = writable({ // to keep the logged-in user data
    user: null,
    loading: true,
    data: {}
})

// check user state change to create account or login and store into the database
// if user not logged-in, it will redirect to
export async function onUserStateChanged() {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {

        if (!user) {
            return;
        }

        // @ts-ignore
        let dataToSetToStore;
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
            console.log("Creating User");
            const userRef = doc(db, "users", user.uid); // create user.uid doc within "users" collection
            dataToSetToStore = { // data to store in the doc userRef
                email: user.email,
                todos: [],
            };
            await setDoc(userRef, dataToSetToStore, { merge: true });
        } else {
            console.log("Fetching User");
            const userData = docSnap.data();
            dataToSetToStore = userData;
        }

        // @ts-ignore
        authStore.update((curr) => { // store the logged-in user data
            return {
                ...curr,
                user,
                // @ts-ignore
                data: dataToSetToStore,
                loading: false,
            };
        });
        console.log(authStore);
    });
    return unsubscribe;
}