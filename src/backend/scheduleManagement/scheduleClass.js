/**
 * This class contains a 2d array that stores the timetable for each user.
 */
class Schedule {
    /**
     * Description
     * @returns {Schedule}
     */
    constructor() {
        let secondArr = new Array();
        for (let j=0; j < 48; j++) {
            secondArr.push({
                x: "",
                y: "",
                timeStamp: 0,
                meetingId: ""
            });
        }
        this.table = new Array();
        for (let i = 0; i < 7; i++) {
            this.table[i] = Array.from(secondArr);
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
    
    // static indexToTime(col) {
    //     if (col < 0 || col > 6) return "out of range";
    //     const wd = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    //     return wd[col];
    // }

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
}

export {Schedule};