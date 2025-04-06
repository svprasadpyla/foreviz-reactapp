import moment from "moment";

export const uiDateFormat = (rDate) => {
  // console.log("date from globalFun", date);
  let date = new Date(rDate);
  let dt = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  return `${dt < 10 ? "0" + dt : dt}/${
    month < 10 ? "0" + month : month
  }/${year}`;
};

export const uiDateFormatmmddyyyy = (rDate) => {
  // console.log("date from globalFun", date);
  let date = new Date(rDate);
  let dt = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  return `${month < 10 ? "0" + month : month}/${
    dt < 10 ? "0" + dt : dt
  }/${year}`;
};

export const convertToDateFromDayOftheYear = (dayOfTheYear, year) => {
  if (!year) {
    year = new Date().getFullYear();
  }
  const d = new Date(year, 0, 1); // initialize a date in `2021-01-01`
  return uiDateFormat(d.setMonth(0, dayOfTheYear)); // add the number of days
};

export const getDayOfTheYear = (date) => {
  const now = date !== undefined ? new Date(date) : new Date();
  const day = Math.floor(
    (now - new Date(now.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24
  );
  return day;
};

export const uiDateTimeFormate = (rDate) => {
  let date = moment(rDate).format("h:mm a");
  return date;
};

export const relativeTime = (rDate) => {
  let time = moment(rDate).fromNow();
  return time;
};
