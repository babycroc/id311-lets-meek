import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { getDoc, doc, setDoc } from "firebase/firestore";

const authHandlers = {
    // @ts-ignore
    signup: async (email, pass) => {
        await createUserWithEmailAndPassword(auth, email, pass)
    },
    // @ts-ignore
    login: async (email, pass) => {
        await signInWithEmailAndPassword(auth, email, pass)
    },
    logout: async () => {
        await signOut(auth)
    }
}

export async function handleRegister(email, password, confirmPass) {
    try {
        if (!email || !password || !confirmPass || password != confirmPass) {
            throw "email or password is not valid!"
        }
        await authHandlers.signup(email, password);
    } catch(err) {
        console.log("There was a register error: ", err);
    }
}

export async function handleLogin(email, password) {
    try {
        if (!email || !password) {
            throw "email or password is not valid!"
        }
        await authHandlers.login(email, password);
    } catch(err) {
        console.log("There was a login error: ", err);
    }
}

export async function handleLogout() {
    try {
        await authHandlers.logout(email, password);
    } catch(err) {
        console.log("There was a logout error: ", err);
    }
}

export const authStore = writable({ // to keep the logged-in user data
    user: null,
    loading: true,
    data: {}
})

// check user state change to create account or login
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