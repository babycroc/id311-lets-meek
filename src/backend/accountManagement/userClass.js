import { Schedule } from "../scheduleManagement/scheduleClass.js";
import { db } from "../firebase/firebase.js";
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { AvatarGenerator } from "random-avatar-generator";
import { Group } from "../groupManagement/groupClass.js";

const generator = new AvatarGenerator();

/**
 * This class represents a user.
 * @param {String} email email of the user
 * @param {String} id firebase ID of the user
 * @param {Array} groups the array of groups ID that the user has joined
 * @param {Schedule} schedule a Schedule object to store the time-table of this user
 * @param {Array} meetings the array of meetings ID that the user has joined
 * @returns {User}
 */
class User {
    constructor(email, id, groups, schedule, meetings) {
        this.id = id;
        this.ref = doc(db, "users", id).withConverter(userConverter);
        this.email = email;
        this.groups = groups;
        this.schedule = schedule;
        this.meetings = meetings;
    }

    /**
     * Get a user from firebase with given firebase userId.
     * @param {String} userId firebase userId
     * @returns {User}
     */
    static async getUserById(userId) {
        const docRef = doc(db, "users", userId).withConverter(userConverter);
        let docSnap = await getDoc(docRef);
        if (!docSnap.exists()) return null;
        return docSnap.data();
    }

    /**
     * Add a timeframe to current user's timetable as fixed-schedule.
     * The timestamp will be set to -1.
     * Then upload to firebase.
     * @param {String} wday a string of weekday: "Monday", "Tuesday"...
     * @param {Number} startH start hour: from 0 to 23
     * @param {Number} startM start minute: from 0 to 59
     * @param {Number} endH end hour: from 0 to 23
     * @param {Number} endM end minute: from 0 to 59
     */
    async addNewFixedFrame(wday, startH, startM, endH, endM) {
        this.schedule.addNewFixedFrame(wday, startH, startM, endH, endM);
        await this.updateDb();
    }

    /**
     * Set a location for a timeframe to the current user's timetable.
     * Then upload to firebase.
     * @param {String} wday a string of weekday: "Monday", "Tuesday"...
     * @param {Number} startH start hour: from 0 to 23
     * @param {Number} startM start minute: from 0 to 59
     * @param {Number} endH end hour: from 0 to 23
     * @param {Number} endM end minute: from 0 to 59
     * @param {String} x x-coordinate for the location during this timeframe
     * @param {String} y y-coordinate for the location during this timeframe
     */
    async setLocation(wday, startH, startM, endH, endM, x, y) {
        this.schedule.setLocation(wday, startH, startM, endH, endM, x ,y);
        await this.updateDb();
    }

    /**
     * Upload current User object to firebase.
     */
    async updateDb() {
        await setDoc(this.ref, this, { merge: false });
    }

    /**
     * Fetch current user's data from the firebase to this User object.
     */
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

    /**
     * Return an URL to the avatar of the current user.
     * @returns {String}
     */
    getAvatar() {
        return generator.generateRandomAvatar(this.id);
    }

    /**
     * To get the 2d array of the user's schedule.
     * @returns {2d|Array}
     */
    getSchedule() {
        return this.schedule.table;
    }

    async addGroup(group) {
        if (!this.groups.includes(group.id)) {
            this.groups.push(group.id);
            await this.updateDb();
        }
    }

    async addMeeting(meeting) {
        if (!this.meetings.includes(meeting.id)) {
            this.meetings.push(meeting.id);
            await this.updateDb();
        }
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