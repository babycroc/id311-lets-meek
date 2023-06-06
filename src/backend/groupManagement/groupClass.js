import { db } from "../firebase/firebase.js";
import { doc, setDoc, getDoc, addDoc, collection } from "firebase/firestore"; 

class Group {
    constructor(id, users, meetings) {
        this.id = id;
        this.ref = doc(db, "groups", id).withConverter(groupConverter);
        this.users = users;
        this.meetings = meetings;
    }

    static async getGroupById(groupId) {
        const docRef = doc(db, "groups", groupId).withConverter(groupConverter);
        let docSnap = await getDoc(docRef);
        if (!docSnap.exists()) return null;
        return docSnap.data();
    }

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

    async updateDb() {
        await setDoc(this.ref, this, { merge: false });
    }

    async fetchDb() {
        let docSnap = await getDoc(this.ref);
        let getGroup = docSnap.data();
        this.users = getGroup.users;
        this.meetings = getGroup.meetings;
        return this;
    }

    async addMember(user) {
        this.users.push(user.id);
        await this.updateDb();
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