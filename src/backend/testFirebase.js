import { handleLogin, handleLogout, handleRegister } from "./accountManagement/authenticate.js";
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { User, userConverter } from "./accountManagement/userClass.js";
import { db } from "./firebase/firebase.js";
import { Schedule } from "./scheduleManagement/scheduleClass.js";
import { Group } from "./groupManagement/groupClass.js";
import { Meeting } from "./meetingManagement/meetingClass.js";

async function testCreateUser() {
    let createUser = await handleRegister("test3@gmail.com", "123456", "123456");
    return createUser;
}

async function testSchedule(user) {
    await user.addNewFixedFrame("Monday", 2, 0, 2, 30);
    await user.setLocation("Monday", 2, 0, 2, 30,"127.3628","36.3693");
}

async function testGroup(user) {
    let group = await Group.createNewGroup(user);
    return group;
}

async function testMeeting(group) {
    let meeting = await Meeting.createNewMeeting(group, "Test meeting", "127", "36", "Tuesday", 1, 0, 2, 0);
    return meeting;
}

// let user = await testCreateUser();
// let user = await handleLogin("test2@gmail.com", "123456");
// console.log("User logged-in with ID:", user.id);

// await testSchedule(user);
// console.log("Changed the schedule");

// let group = await testGroup(user);
// console.log("Created a new group with ID:", group.id);

// let meeting = await testMeeting(group);
// console.log("Created a new meeting with ID:", meeting.id);

// let tmpG = await Group.getGroupById("QqMA28GfKmvbzXphNNpY");
// await tmpG.addMember(user);
// let schedule = await tmpG.getGroupSchedule();
// console.log("Monday", schedule.table[0]);
// console.log("Tuesday", schedule.table[1]);
// console.log("Wednesday", schedule.table[2]);