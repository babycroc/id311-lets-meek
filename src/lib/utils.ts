export const formatTime = (colIdx: number) => {
  const hours = ("0" + (Math.floor(colIdx / 2) % 12)).slice(-2);
  const minutes = colIdx % 2 == 0 ? "00" : "30";
  const apm = Math.floor(colIdx / 2) < 12 ? "AM" : "PM";
  return hours + ":" + minutes + apm;
};

export const formatWeekday = (row: number) => {
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return weekdays[row];
};
