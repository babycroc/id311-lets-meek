import { Meeting } from "../meetingManagement/meetingClass.js";

/**
 * This class contains a 2d array that stores the timetable for each user.
 */
class Schedule {
    /**
     * Description
     * @returns {Schedule}
     */
    constructor() {
        this.table = new Array();
        for (let i = 0; i < 7; i++) {
            this.table[i] = Array.from([]);
            for (let j=0; j < 48; j++) {
                this.table[i].push({
                    x: "",
                    y: "",
                    timeStamp: 0,
                    meetingId: ""
                });
            }
        }
    }

    /**
     * Convert a timeframe to index of Schedule.table.
     * @param {String} weekday a string of weekday: "Monday", "Tuesday"...
     * @param {Number} hour hour: from 0 to 23
     * @param {Number} minute minute: from 0 to 59
     * @returns {Array(firstIndex, secondIndex)}
     */
    static timeToIndex(weekday, hour, minute) {
        let row, col;
        if (weekday == "Monday") col = 0;
        if (weekday == "Tuesday") col = 1;
        if (weekday == "Wednesday") col = 2;
        if (weekday == "Thursday") col = 3;
        if (weekday == "Friday") col = 4;
        if (weekday == "Saturday") col = 5;
        if (weekday == "Sunday") col = 6;
        row = Math.floor((hour*60 + minute) / 30);
        return [col, row];
    }
    
    /**
     * Convert the index of schedule.table to an array of [Weekday, hour, minune].
     * @param {Number} row row index
     * @param {Number} col column index
     * @returns {Array(Weekday, hour, minune)}
     */
    static indexToTime(row, col) {
        try {
            if (row < 0 || row > 6) throw "Index out of range!";
            const wd = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
            const minute = (col*30) % 60;
            const hour = Math.floor((col*30) / 60);
            return [wd[row], hour, minute];
        } catch (err) {
            console.log(err);
        }
    }

    /**
     * Add a timeframe to timetable as fixed-schedule. The timestamp will be set to -1.
     * @param {String} wday a string of weekday: "Monday", "Tuesday"...
     * @param {Number} startH start hour: from 0 to 23
     * @param {Number} startM start minute: from 0 to 59
     * @param {Number} endH end hour: from 0 to 23
     * @param {Number} endM end minute: from 0 to 59
     */
    addNewFixedFrame(wday, startH, startM, endH, endM) {
        let [x1, y1] = Schedule.timeToIndex(wday, startH, startM);
        let [x2, y2] = Schedule.timeToIndex(wday, endH, endM);
        for (let i=y1; i<y2; i++) {
            this.table[x1][i].timeStamp = -1;
        }
    }

    /**
     * Set a location for a timeframe to timetable.
     * @param {String} wday a string of weekday: "Monday", "Tuesday"...
     * @param {Number} startH start hour: from 0 to 23
     * @param {Number} startM start minute: from 0 to 59
     * @param {Number} endH end hour: from 0 to 23
     * @param {Number} endM end minute: from 0 to 59
     * @param {String} x x-coordinate for the location during this timeframe
     * @param {String} y y-coordinate for the location during this timeframe
     */
    setLocation(wday, startH, startM, endH, endM, x, y) {
        let [x1, y1] = Schedule.timeToIndex(wday, startH, startM);
        let [x2, y2] = Schedule.timeToIndex(wday, endH, endM);
        for (let i=y1; i<y2; i++) {
            this.table[x1][i].x = x;
            this.table[x1][i].y = y;
        }
    }

    /**
     * Add a meeting timeframe to timetable. The timestamp will be set as endTime of the meeting
     * @param {Meeting} meeting a Meeting object that you need to add
     */
    addMeetingToSchedule(meeting) {
        const row = meeting.row;
        const colStart = meeting.colStart;
        const colEnd = meeting.colEnd;
        for (let i=colStart; i<colEnd; i++) {
            this.table[row][i].timeStamp = meeting.endTime;
            this.table[row][i].x = meeting.x;
            this.table[row][i].y = meeting.y;
            this.table[row][i].meetingId = meeting.id;
        }
    }

    /**
     * Convert a weekday and time to an integer timestamp by comparing with current timestamp.
     * @param {String} weekday
     * @param {Number} hour
     * @param {Number} minute
     * @returns {Number}
     */
    static computeTimestamp(weekday, hour, minute) {
        let dateObj = new Date();
        let currentWeekday = dateObj.getDay();
        if (currentWeekday>0) currentWeekday--;
        else currentWeekday = 6;
        let [targetWeekday, targetHour] = Schedule.timeToIndex(weekday, hour, minute);
        
        let resTimestamp = 0;
        dateObj.setHours(hour, minute, 0, 0);
        if (targetWeekday <= currentWeekday) {
            resTimestamp = dateObj.getTime() + (6-currentWeekday)*86400000 + (targetWeekday+1)*86400000;
            // dateObj.setTime(resTimestamp);
            // console.log(dateObj.toString());
        } else {
            resTimestamp = dateObj.getTime() + (targetWeekday-currentWeekday)*86400000;
            // dateObj.setTime(resTimestamp);
            // console.log(dateObj.toString());
        }
        return resTimestamp;
    }

    /**
     * Parse a target schedule into the current schedule.
     * @param {Schedule} schedule the schedule to parse with
     * @param {Number} curTimestamp the timestamp to compare with
     */
    parseSchedule(schedule, curTimestamp) {
        for (let i=0; i<7; i++) {
            for (let j=0; j<48; j++)
                if (this.table[i][j].timeStamp == 0) {
                    if (schedule.table[i][j].timeStamp == -1) {
                        this.table[i][j].timeStamp = -1;
                    }
                    if (schedule.table[i][j].timeStamp > 0 && schedule.table[i][j].timeStamp >= curTimestamp) {
                        this.table[i][j].timeStamp = -1;
                    }
                }
        }
    }
}

export {Schedule};