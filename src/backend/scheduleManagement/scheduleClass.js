import { timeToIndex } from "./scheduleConvert.js";


class Schedule {
    constructor() {
        let secondArr = new Array();
        for (let j=0; j < 48; j++) {
            secondArr.push({
                x: "",
                y: "",
                timeStamp: 0
            });
        }
        this.table = new Array();
        for (let i = 0; i < 7; i++) {
            this.table[i] = Array.from(secondArr);
          }
    }

    addNewFixedFrame(wday, startH, startM, endH, endM) {
        let [x1, y1] = timeToIndex(wday, startH, startM);
        let [x2, y2] = timeToIndex(wday, endH, endM);
        for (let i=y1; i<y2; i++) {
            this.table[x1][i].timeStamp = -1;
        }
    }

    addNewLocation(wday, startH, startM, endH, endM, x, y) {
        let [x1, y1] = timeToIndex(wday, startH, startM);
        let [x2, y2] = timeToIndex(wday, endH, endM);
        for (let i=y1; i<y2; i++) {
            this.table[x1][i].x = x;
            this.table[x1][i].y = y;
        }
    }
}

export {Schedule};