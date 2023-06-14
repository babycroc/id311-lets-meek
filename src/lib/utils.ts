export const formatTime = (colIdx: number) => {
  const h24 = Math.floor(colIdx / 2);
  const hours = h24 == 12 ? "12" : ("0" + (h24 % 12)).slice(-2);
  const minutes = colIdx % 2 == 0 ? "00" : "30";
  const apm = h24 > 11 ? "PM" : "AM";
  return hours + ":" + minutes + apm;
};

export const prettyPrintTime = (sH: string, sM: string, eH: string, eM: string) => {
  let res = "";
  if (sH) {
    if (sH.length < 2) res+= "0" + sH + ":";
    else res+=sH + ":";
    if (sM.length < 2) res+= "0" + sM + " ~ ";
    else res+=sM + " ~ ";
    if (eH.length < 2) res+= "0" + eH + ":";
    else res+=eH + ":";
    if (eM.length < 2) res+= "0" + eM;
    else res+=eM;
  }
  return res;
};

export const formatWeekday = (row: number) => {
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return weekdays[row];
};
