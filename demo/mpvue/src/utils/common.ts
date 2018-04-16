export function formatNumber(n: any) {
  const str = n.toString();
  return str[1] ? str : `0${str}`;
}

export function formatTime(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  const t1 = [year, month, day].map(formatNumber).join('/');
  const t2 = [hour, minute, second].map(formatNumber).join(':');

  return `${t1} ${t2}`;
}

export function zerofillBack(n: any) {
  if (parseInt(n) === parseFloat(n)) {
    return n + '.00';
  } else {
    return n;
  }
}

export function getDateList() {
  let arr = [];

  const aDate = [
    { name: '今天', value: getLatestDate() },
    { name: '明天', value: getLatestDate(1) }
  ];

  const aHour = getHoursArray(new Date().getHours());

  arr[0] = aDate;
  arr[1] = aHour;
  arr[2] = [];

  return arr;
}

export function getLatestDate(day: number = 0) {
  const today = new Date();
  const targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * (day || 0);
  today.setTime(targetday_milliseconds);
  const tYear = today.getFullYear();
  let tMonth: any = today.getMonth();
  let tDate: any = today.getDate();
  tMonth = addZero(tMonth + 1);
  tDate = addZero(tDate);
  return tYear + '-' + tMonth + '-' + tDate;
}

export function addZero(n: any) {
  return n < 10 ? '0' + n : '' + n;
}

export function getHoursArray(start: number = 0) {
  let aHour = [];
  for (let i = start; i < 24; i++) {
    aHour.push({
      name: addZero(i),
      value: addZero(i)
    });
  }
  if (start) {
    aHour.unshift({
      name: '立即出发',
      value: ''
    });
  }
  return aHour;
}

export function getMinsArray() {
  let aMin = [];
  for (let i = 0; i < 60; i++) {
    aMin.push({
      name: addZero(i),
      value: addZero(i)
    });
  }
  return aMin;
}
