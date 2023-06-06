import { Schedule } from "../scheduleManagement/scheduleClass.js";
import { db } from "../firebase/firebase.js";
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { AvatarGenerator } from "random-avatar-generator";

const generator = new AvatarGenerator();
class User {
    constructor(email, id, groups = [], schedule = [], meetings = []) {
        this.id = id;
        this.ref = doc(db, "users", id).withConverter(userConverter);
        this.email = email;
        this.groups = groups;
        this.schedule = schedule;
        this.meetings = meetings;
    }

    static async getUserById(userId) {
        const docRef = doc(db, "users", userId).withConverter(userConverter);
        let docSnap = await getDoc(docRef);
        if (!docSnap.exists()) return null;
        return docSnap.data();
    }

    addNewFixedFrame(wday, startH, startM, endH, endM) {
        this.schedule.addNewFixedFrame(wday, startH, startM, endH, endM);
        this.updateDb();
    }

    addNewLocation(wday, startH, startM, endH, endM, x, y) {
        this.schedule.addNewLocation(wday, startH, startM, endH, endM, x ,y);
        this.updateDb();
    }

    async updateDb() {
        await setDoc(this.ref, this, { merge: false });
    }

    async fetchDb() {
        let docSnap = await getDoc(this.ref);
        let getUser = docSnap.data();
        this.email = getUser.email;
        this.groups = getUser.groups;
        this.schedule = getUser.schedule;
        this.meetings = getUser.meetings;
        return this;
    }

    async createNewUser() {
        const docSnap = await getDoc(this.ref);
        if (!docSnap.exists()) {
            await setDoc(this.ref, this, { merge: false });
        }
        await this.fetchDb();
    }

    getAvatar() {
        return generator.generateRandomAvatar(this.id);
    }

    getSchedule() {
        return this.schedule.table;
    }

    async addGroup(group) {
        this.groups.push(group.id);
        await this.updateDb();
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