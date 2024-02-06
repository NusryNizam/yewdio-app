export function secondsToHMS(seconds: number) {
  var hours = Math.floor(seconds / 3600);
  var minutes = Math.floor((seconds % 3600) / 60);
  var remainingSeconds = Math.floor(seconds % 60);

  var hoursStr = hours < 10 ? "0" + hours : hours;
  var minutesStr = minutes < 10 ? "0" + minutes : minutes;
  var secondsStr =
    remainingSeconds < 10
      ? "0" + remainingSeconds
      : remainingSeconds;

  if (hoursStr === "00")
    return minutesStr + ":" + secondsStr;
  else
    return hoursStr + ":" + minutesStr + ":" + secondsStr;
}
