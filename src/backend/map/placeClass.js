import { User } from "../accountManagement/userClass.js";
import { db } from "../firebase/firebase.js";
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { Group } from "../groupManagement/groupClass.js";
import { Schedule } from "../scheduleManagement/scheduleClass.js";
import { kakaoGetTraveltime } from "./mapAPI.js";
import { Meeting } from "../meetingManagement/meetingClass.js";

/**
 * This class represent the meeting place
 * @param {String} id firebase id of the place
 * @param {String} buildingName the building name
 * @param {Array(String)} envs environment of the room array
 * @param {Object} location an object {x:"", y:""} store the coordinate of the place
 * @param {Array(String)} rooms the array of room name
 * @returns {Place}
 */
class Place {
  constructor(id, buildingName, envs, location, rooms) {
    this.id = id;
    this.ref = doc(db, "places", id).withConverter(placeConverter);
    this.buildingName = buildingName;
    this.envs = envs;
    this.location = location;
    this.rooms = rooms;
  }

  /**
   * Return the first quiet room name for this place, if the room name is not exist, return "None".
   * @returns {String}
   */
  getQuietRoomName() {
    for (let i = 0; i < this.rooms.length; i++) {
      if (this.envs[i] == "quiet") return this.rooms[i];
    }
    return "None";
  }

  /**
   * Return the first moderate room name for this place, if the room name is not exist, return "None".
   * @returns {String}
   */
  getModerateRoomName() {
    for (let i = 0; i < this.rooms.length; i++) {
      if (this.envs[i] == "moderate") return this.rooms[i];
    }
    return "None";
  }

  /**
   * Return the first loud room name for this place, if the room name is not exist, return "None".
   * @returns {String}
   */
  getLoudRoomName() {
    for (let i = 0; i < this.rooms.length; i++) {
      if (this.envs[i] == "loud") return this.rooms[i];
    }
    return "None";
  }

  /**
   * Get a place from firebase with given firebase placeId.
   * @param {String} placeId the firebase place ID that you want to get from Firebase
   * @returns {Place}
   */
  static async getPlaceById(placeId) {
    const docRef = doc(db, "places", placeId).withConverter(placeConverter);
    let docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return null;
    return docSnap.data();
  }

  /**
   * Get all places from firebase
   * @returns {Array}
   */
  static async getAllPlaces() {
    const querySnapshot = await getDocs(collection(db, "places"));
    let res = [];
    querySnapshot.forEach((doc) => {
      res.push(placeConverter.fromFirestore(doc));
    });
    return res;
  }

  /**
   * This function provides an array of three suggessted places of quiet, moderate and loud for a group.
   * @param {Group} group the group that you need generate the suggestion
   * @param {String} wday the day of the week
   * @param {Number} startH the start hour of the meeting
   * @param {Number} startM the start minute of the meeting
   * @returns {Array(Place)}
   */
  static async findSuggestedPlacesForGroup(group, wday, startH, startM) {
    let [weekdayIndex, startTimeIndex] = Schedule.timeToIndex(
      wday,
      startH,
      startM
    );
    let origins = [];
    for (let i = 0; i < group.users.length; i++) {
      let user = await User.getUserById(group.users[i]);
      let currentTimestamp = Date.now();
      if (startTimeIndex > 0) {
        if (
          user.schedule.table[weekdayIndex][startTimeIndex - 1].timeStamp <=
          currentTimestamp
        ) {
          origins.push({
            x: user.schedule.table[weekdayIndex][startTimeIndex - 1].x,
            y: user.schedule.table[weekdayIndex][startTimeIndex - 1].y,
            key: i,
          });
        } else {
          let meeting = await Meeting.getMeetingById(
            user.schedule.table[weekdayIndex][startTimeIndex - 1].meetingId
          );
          let location = await meeting.getMeetingLocation();
          origins.push({
            x: location.x,
            y: location.y,
            key: i,
          });
        }
      } else {
        origins.push({
          x: user.schedule.table[weekdayIndex][0].x,
          y: user.schedule.table[weekdayIndex][0].y,
          key: i,
        });
      }
    }
    let destinations = await Place.getAllPlaces();
    let sumArr = [];
    for (let dest of destinations) {
      // TODO: add default location coordinates
      const newOrigins = origins.map(({ x, y, key }) =>
        x == "" || y == ""
          ? { x: "127.3621", y: "36.3737", key }
          : { x, y, key }
      );
      let tmpRes = await kakaoGetTraveltime(
        newOrigins,
        dest.location.x,
        dest.location.y
      );
      let durationSum = 0;
      for (let route of tmpRes) {
        durationSum += route.summary.duration;
      }
      sumArr.push(durationSum);
      // console.log("Dest:", dest.buildingName);
      // console.log("Dest:", dest.envs);
      // console.log("Total:", durationSum);
    }
    let loudSum = 99999999;
    let quietSum = 99999999;
    let moderateSum = 99999999;
    let loudPlace, quietPlace, moderatePlace;
    console.log(destinations, startTimeIndex);

    for (let i = 0; i < sumArr.length; i++) {
      if (destinations[i].envs.includes("loud") && sumArr[i] < loudSum) {
        loudSum = sumArr[i];
        loudPlace = destinations[i].id;
      }
      if (destinations[i].envs.includes("quiet") && sumArr[i] < quietSum) {
        quietSum = sumArr[i];
        quietPlace = destinations[i].id;
      }
      if (
        destinations[i].envs.includes("moderate") &&
        sumArr[i] < moderateSum
      ) {
        moderateSum = sumArr[i];
        moderatePlace = destinations[i].id;
      }
    }
    console.log(quietPlace, moderatePlace, loudPlace);
    return [quietPlace, moderatePlace, loudPlace];
  }

  /**
   * Upload current Meeting object to firebase.
   */
  async updateDb() {
    await setDoc(this.ref, this, { merge: false });
  }

  /**
   * Fetch current place's data from the firebase to this Place object.
   */
  async fetchDb() {
    let docSnap = await getDoc(this.ref);
    let getPlace = docSnap.data();
    this.buildingName = getPlace.buildingName;
    this.envs = getPlace.envs;
    this.location = getPlace.location;
    this.rooms = getPlace.rooms;
    return this;
  }

  /**
   * Start listening to any changes from the firebase, and automatically fetch to the current object.
   */
  listenToChange() {
    this.unsub = onSnapshot(this.ref, (docSnap) => {
      let getPlace = docSnap.data();
      this.buildingName = getPlace.buildingName;
      this.envs = getPlace.envs;
      this.location = getPlace.location;
      this.rooms = getPlace.rooms;
    });
  }

  /**
   * Stop listening.
   */
  stopListen() {
    this.unsub();
  }
}

export const placeConverter = {
  toFirestore: (place) => {
    return {
      id: place.id,
      buildingName: place.buildingName,
      envs: place.envs,
      location: place.location,
      rooms: place.rooms,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Place(
      data.id,
      data.buildingName,
      data.envs,
      data.location,
      data.rooms
    );
  },
};

export { Place };
