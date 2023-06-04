function initArray(n) {
    var arr = [];
    for(let i = 0; i < n; i++) {
        arr.push(Date.now());
    }
    return arr;
}

export const userDocModel = {
    email: "quangnguyenonetv@gmail.com", // store the email of user
    groups: [], // a list groupId that user has joined
    schedule: {
        0: initArray(24),
        1: initArray(24),
        2: initArray(24),
        3: initArray(24),
        4: initArray(24),
        5: initArray(24),
        6: initArray(24)
    }
};

// from each user schedule -> build a group schedule by comparing user schedules. (in client-side)
// every time + new meeting -> show the group schedule -> save -> update every user schedule in that group (client-side) (can use transaction)