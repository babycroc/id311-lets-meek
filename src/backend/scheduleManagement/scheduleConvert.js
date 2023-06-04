// convert Monday 0h00-0h29 to user.schedule.0[0]
// convert Monday 0h30-0h59 to user.schedule.0[1]
// convert Tuesday 0h30-0h59 to user.schedule.1[1]
// return a list of indexes [col, row]
export function timeToIndex(weekday, hour, minute) {
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

export function indexToTime(col) {
    if (col < 0 || col > 6) return "out of range";
    const wd = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    return wd[col];
}