import { handleLogin, handleLogout, handleRegister } from "./accountManagement/authenticate.js";
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { User, userConverter } from "./accountManagement/userClass.js";
import { db } from "./firebase/firebase.js";
import { Schedule } from "./scheduleManagement/scheduleClass.js";
import { Group } from "./groupManagement/groupClass.js";

// let createUser = await handleRegister("test1@gmail.com", "123456", "123456");
// console.log(createUser);

// let user = await handleLogin("quangnguyenonetv@gmail.com", "123456");
// console.log(user.id);
// let group1 = await Group.createNewGroup(user);
// console.log(group1);

// let user1 = await User.getUserById("izH9swonLBX4K0JsZkM5cqm38Ku2");
// console.log(user1);

let group2 = await Group.getGroupById("fpv39zO7H0fVxsLxkNXK");
console.log(group2);

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
    curUser.setLocation("Monday", 0, 0, 1, 0, "127.3628", "36.3692");
    await curUser.updateDb();
}

// testLogin();
// testSchedule();
// testUser();