import { User } from "../accountManagement/userClass.js";
import { db } from "../firebase/firebase.js";
import { doc, setDoc, getDoc, addDoc, collection } from "firebase/firestore"; 

/**
 * This class represents a group of users.
 * @param {String} id firebase ID for group
 * @param {Array(String)} users a list of firebase userId whose belongs to this group
 * @param {Array(String)} meetings a list of firebase meetingId
 * @returns {Group}
 */
class Group {
    constructor(id, users, meetings) {
        this.id = id;
        this.ref = doc(db, "groups", id).withConverter(groupConverter);
        this.users = users;
        this.meetings = meetings;
    }

    /**
     * Get a group from firebase with given firebase groupId.
     * @param {String} groupId the firebase group ID that you want to get from Firebase
     * @returns {Group}
     */
    static async getGroupById(groupId) {
        const docRef = doc(db, "groups", groupId).withConverter(groupConverter);
        let docSnap = await getDoc(docRef);
        if (!docSnap.exists()) return null;
        return docSnap.data();
    }

    /**
     * Create a new group. User ID will be automatically added to users array of the new group,
     * and group ID will also be added to groups array of the user.
     * Then upload to firebase.
     * @param {User} user the user who creates the group
     * @returns {Group}
     */
    static async createNewGroup(user) {
        // Add a new document with a generated id.
        const docRef = await addDoc(collection(db, "groups"), {
            id: "",
            users: [user.id],
            meetings: []
        });
        let newGroup = new Group(docRef.id, [user.id], []);
        await user.addGroup(newGroup);
        await newGroup.updateDb();
        return newGroup;
    }

    /**
     * Upload current Group object to firebase.
     */
    async updateDb() {
        await setDoc(this.ref, this, { merge: false });
    }

    /**
     * Fetch current group's data from the firebase to this Group object.
     */
    async fetchDb() {
        let docSnap = await getDoc(this.ref);
        let getGroup = docSnap.data();
        this.users = getGroup.users;
        this.meetings = getGroup.meetings;
        return this;
    }

    /**
     * Add an user into users list of this group.
     * Then synce with firebase.
     * @param {User} user an Group object that you want to add
     */
    async addMember(user) {
        if (!this.users.includes(user.id)) {
            this.users.push(user.id);
            await this.updateDb();
        }
    }
}

export const groupConverter = {
    toFirestore: (group) => {
        return {
            users: group.users,
            meetings: group.meetings,
            id: group.id
            };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Group(data.id, data.users, data.meetings);
    }
};

export {Group};