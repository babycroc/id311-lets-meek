import { Schedule } from "../scheduleManagement/scheduleClass.js";
import { db } from "../firebase/firebase.js";
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { AvatarGenerator } from "random-avatar-generator";

const generator = new AvatarGenerator();
class User {
    constructor(email, id, groups, schedule, meetings) {
        this.email = email;
        this.id = id;
        this.groups = groups;
        this.schedule = schedule;
        this.meetings = meetings;
    }

    addNewFixedFrame(wday, startH, startM, endH, endM) {
        this.schedule.addNewFixedFrame(wday, startH, startM, endH, endM);
    }

    addNewLocation(wday, startH, startM, endH, endM, x, y) {
        this.schedule.addNewLocation(wday, startH, startM, endH, endM, x ,y);
    }

    async updateDb() {
        const ref = doc(db, "users", this.id).withConverter(userConverter);
        await setDoc(ref, this, { merge: false });
    }

    getAvatar() {
        return generator.generateRandomAvatar(this.id);
    }
}

export const userConverter = {
    toFirestore: (user) => {
        return {
            email: user.email,
            groups: user.groups,
            meetings: user.meetings,
            schedule: {
                Mon: user.schedule.table[0],
                Tue: user.schedule.table[1],
                Wed: user.schedule.table[2],
                Thu: user.schedule.table[3],
                Fri: user.schedule.table[4],
                Sat: user.schedule.table[5],
                Sun: user.schedule.table[6]
            },
            id: user.id
            };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        let tmpSchedule = new Schedule();
        tmpSchedule.table[0] = data.schedule.Mon;
        tmpSchedule.table[1] = data.schedule.Tue;
        tmpSchedule.table[2] = data.schedule.Wed;
        tmpSchedule.table[3] = data.schedule.Thu;
        tmpSchedule.table[4] = data.schedule.Fri;
        tmpSchedule.table[5] = data.schedule.Sat;
        tmpSchedule.table[6] = data.schedule.Sun;
        return new User(data.email, data.id, data.groups, tmpSchedule, data.meetings);
    }
};

export {User};