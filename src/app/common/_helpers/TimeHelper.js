export const secondsToMinuteString = (time) => {
  if (typeof time === "string") {
    // format time period
    const m = String(Math.floor(time / 60)).padStart(2, "0");
    time %= 60;
    const s = String(time).padStart(2, "0");

    return `${m}:${s}`;
  } else {
    // format time field select
    const minutes = time / 60;
    const h = String(Math.floor(minutes / 60)).padStart(2, "0");
    const m = String(minutes % 60).padStart(2, "0");

    return `${h}:${m}`;
  }
};
