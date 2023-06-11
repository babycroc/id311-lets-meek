import { handleLogin, handleLogout, handleRegister } from "./accountManagement/authenticate.js";
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { User, userConverter } from "./accountManagement/userClass.js";
import { db } from "./firebase/firebase.js";
import { Schedule } from "./scheduleManagement/scheduleClass.js";
import { Group } from "./groupManagement/groupClass.js";
import { Meeting } from "./meetingManagement/meetingClass.js";
import { Place } from "./map/placeClass.js";

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

// let group = await Group.getGroupById("ZmapojpOcZLCMoJFc41f");
// let group = await testGroup(user);
// console.log("Created a new group with ID:", group.id);

// let meeting = await testMeeting(group);
// console.log("Created a new meeting with ID:", meeting.id);

// await Place.findSuggestedPlacesForGroup(tmpG, 0, 0);
// await tmpG.addMember(user);
// let schedule = await tmpG.getGroupSchedule();
// console.log("Monday", schedule.table[0]);
// console.log("Tuesday", schedule.table[1]);
// console.log("Wednesday", schedule.table[2]);


// Test create, login
// let user1 = await handleRegister("test1@gmail.com", "123456", "123456");
// let user2 = await handleRegister("test2@gmail.com", "123456", "123456");
// let user3 = await handleRegister("test3@gmail.com", "123456", "123456");
let user1 = await handleLogin("test1@gmail.com", "123456");
user1.listenToChange();
console.log("This is user1:", user1.id);
let user2 = await handleLogin("test2@gmail.com", "123456");
user2.listenToChange();
console.log("This is user2:", user2.id);
let user3 = await handleLogin("test3@gmail.com", "123456");
user3.listenToChange();
console.log("This is user3:", user3.id);

// Test schedule
user1.setDefaultLocation("127.3593618", "36.3745995"); // Jilli
user2.setDefaultLocation("127.3584469", "36.3736684"); // Sarang
user3.setDefaultLocation("127.3566417", "36.3738609"); // Areum
user1.addNewFixedFrame("Friday", 1, 0, 3, 0); // Friday, 1am - 3am
user1.setLocation("Friday", 1, 0, 3, 0, "127.3621369", "36.3730399");
user2.addNewFixedFrame("Friday", 2, 0, 4, 0); // Friday, 2am - 4am
user2.setLocation("Friday", 2, 0, 4, 0, "127.3621369", "36.3730399");
user3.addNewFixedFrame("Friday", 4, 0, 6, 0); // Friday, 4am - 6am
user3.setLocation("Friday", 4, 0, 6, 0, "127.3621369", "36.3730399");

// Test group
// let group1 = await Group.createNewGroup(user1);
let group1 = await Group.getGroupById("OTJMuGfqTFKW1kFEwtVs");
group1.listenToChange();
user2.joinGroupByCode(group1.invite);
user3.joinGroupByCode(group1.invite);
let groupSchedule = await group1.getGroupSchedule();
console.log("Group available:", groupSchedule.table[4]); // friday

// Test meeting
let places = await Place.findSuggestedPlacesForGroup(group1, "Friday", 6, 0); // 6am
console.log("Suggested places:", places);
let meeting = await Meeting.createNewMeeting(group1, "Meeting 1", [places[0], "quiet"], "Friday", 6, 0, 8, 0); //6am-8am 
meeting.listenToChange();
console.log("Created meeting:", meeting.id);

// find another schedule group
let groupSchedule2 = await group1.getGroupSchedule();
console.log("Group available:", groupSchedule2.table[4]); // friday