import { User } from "../accountManagement/userClass.js";
import { db } from "../firebase/firebase.js";
import { doc, setDoc, getDoc, addDoc, collection } from "firebase/firestore"; 
import { Group } from "../groupManagement/groupClass.js";
import { Schedule } from "../scheduleManagement/scheduleClass.js";

/**
 * This class represents a meeting.
 * @param {String} id firebase id of meeting
 * @param {String} name name of the meeting
 * @param {String} groupId ID of the group that meeting belongs to
 * @param {String} x x-coordinate of meeting's location
 * @param {String} y y-coordinate of meeting's location
 * @param {Number} startTime starting time of the meeting
 * @param {Number} endTime ending time of the meeting
 * @param {Number} row the row index of the schedule table
 * @param {Number} colStart the starting col index of the schedule table
 * @param {Number} colEnd the ending col index of the schedule table
 * @returns {Meeting}
 */
class Meeting {
    constructor(id, name, groupId, x, y, startTime, endTime, row, colStart, colEnd) {
        this.id = id;
        this.ref = doc(db, "meetings", id).withConverter(meetingConverter);
        this.name = name;
        this.groupId = groupId;
        this.x = x;
        this.y = y;
        this.startTime = startTime;
        this.endTime = endTime;
        this.row = row;
        this.colStart = colStart;
        this.colEnd = colEnd;
    }

    /**
     * Get a meeting from firebase with given firebase meetingId.
     * @param {String} meetingId the firebase group ID that you want to get from Firebase
     * @returns {Meeting}
     */
    static async getMeetingById(meetingId) {
        const docRef = doc(db, "meetings", meetingId).withConverter(meetingConverter);
        let docSnap = await getDoc(docRef);
        if (!docSnap.exists()) return null;
        return docSnap.data();
    }

    /**
     * Create a new meeting. Group ID will be automatically assigned to meeting.groupId,
     * and meeting ID will also be added to meetings array of the group.
     * Update meeting to schedule of every user in the group.
     * Then upload to firebase.
     * @param {Group} group the user who creates the group
     * @param {String} name name of the meeting
     * @param {String} x x-coordinate of meeting's location
     * @param {String} y y-coordinate of meeting's location
     * @param {String} wday weekday of the meeting
     * @param {Number} startH starting hour of the meeting
     * @param {Number} startM ending hour of the meeting
     * @param {Number} endH ending hour of the meeting
     * @param {Number} endM ending minute of the meeting
     * @returns {Meeting}
     */
    static async createNewMeeting(group, name, x, y, wday, startH, startM, endH, endM) {
        let [row1, col1] = Schedule.timeToIndex(wday, startH, startM);
        let [row2, col2] = Schedule.timeToIndex(wday, endH, endM);
        let startTime = Schedule.computeTimestamp(wday, startH, startM);
        let endTime = Schedule.computeTimestamp(wday, endH, endM);
        const docRef = await addDoc(collection(db, "meetings"), {
            id: "",
            name: name,
            groupId: group.id,
            x: x,
            y: y,
            startTime: startTime,
            endTime: endTime,
            row: row1,
            colStart: col1,
            colEnd: col2
        });
        let newMeeting = new Meeting(docRef.id, name, group.id, x, y, startTime, endTime, row1, col1, col2);
        await newMeeting.updateDb();
        await group.addMeeting(newMeeting);
        return newMeeting;
    }

    /**
     * Upload current Meeting object to firebase.
     */
    async updateDb() {
        await setDoc(this.ref, this, { merge: false });
    }

    /**
     * Fetch current meeting's data from the firebase to this Meeting object.
     */
    async fetchDb() {
        let docSnap = await getDoc(this.ref);
        let getMeeting = docSnap.data();
        this.groupId = getMeeting.groupId;
        this.name = getMeeting.name;
        this.x = getMeeting.x;
        this.y = getMeeting.y;
        this.startTime = getMeeting.startTime;
        this.endTime = getMeeting.endTime;
        this.colEnd = getMeeting.colEnd;
        this.colStart = getMeeting.colStart;
        this.row = getMeeting.row;
        return this;
    }

    /**
     * Set a name for current meeting.
     * Then synce with firebase.
     * @param {String} name the name to be set
     */
    async setName(name) {
        this.name = name;
        await this.updateDb();
    }
}

export const meetingConverter = {
    toFirestore: (meeting) => {
        return {
            id: meeting.id,
            name: meeting.name,
            groupId: meeting.groupId,
            x: meeting.x,
            y: meeting.y,
            startTime: meeting.startTime,
            endTime: meeting.endTime,
            row: meeting.row,
            colStart: meeting.colStart,
            colEnd: meeting.colEnd
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Meeting(data.id, data.name, data.groupId, data.x, data.y, data.startTime, data.endTime, data.row, data.colStart, data.colEnd);
    }
};

export {Meeting};