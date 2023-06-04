import { handleLogin } from "./accountManagement/authenticate.js";
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { User, userConverter } from "./accountManagement/userClass.js";
import { db } from "./firebase/firebase.js";
import { Schedule } from "./scheduleManagement/scheduleClass.js";

let user = await handleLogin("quangnguyenonetv@gmail.com", "123456");
console.log(user.user.uid);

async function testLogin() {
    const ref = doc(db, "users", user.user.uid).withConverter(userConverter);
    await setDoc(ref, new User("quangnguyenonetv@gmail.com", "izH9swonLBX4K0JsZkM5cqm38Ku2", [], new Schedule(), []), { merge: false });
    // const docSnap = await getDoc(ref);
    // console.log(docSnap.data().schedule.Mon);
}

function testSchedule() {
    let tmp = new Schedule();
    let tmp2 = new Schedule();
    tmp.addNewFixedFrame("Monday", 0, 0, 1, 30);
    tmp.addNewLocation("Monday", 0, 0, 1, 30,"127.3628","36.3693");
    console.log(tmp.table[0]);
    console.log(tmp2.table[0]);
}

async function testUser() {
    const ref = doc(db, "users", user.user.uid).withConverter(userConverter);
    let docSnap = await getDoc(ref);
    let curUser = docSnap.data();
    curUser.addNewFixedFrame("Monday", 0, 0, 1, 0);
    curUser.addNewLocation("Monday", 0, 0, 1, 0, "127.3628", "36.3693");
    await setDoc(ref, curUser, { merge: false });
}

// testLogin();
// testSchedule();
testUser();