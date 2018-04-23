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
      name: addZero(i) + '时',
      value: addZero(i)
    });
  }
  if (start) {
    aHour.unshift({
      name: '立即叫车',
      value: ''
    });
  }
  return aHour;
}

export function getMinsArray() {
  let aMin = [];
  for (let i = 0; i < 60; i++) {
    aMin.push({
      name: addZero(i) + '分',
      value: addZero(i)
    });
  }
  return aMin;
}

export function formatCurrency(num: any) {
  num = num.toString().replace(/\$|\,/g, '');
  if (isNaN(num)) {
    num = '0';
  }
  const sign = (num == (num = Math.abs(num)));
  num = Math.floor(num * 100 + 0.50000000001);
  let cents: any = num % 100;
  num = Math.floor(num / 100).toString();
  if (cents < 10) {
    cents = '0' + cents;
  }
  for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
    num = num.substring(0, num.length - (4 * i + 3)) + ',' +
      num.substring(num.length - (4 * i + 3));
  return (((sign) ? '' : '-') + num + '.' + cents);
}

export function uuid() {
  const s: any = [];
  const hexDigits = '0123456789abcdef';
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = '4';  // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-';

  const uuid = s.join('');
  return uuid;
}

export function formatTrim(str: string) {
  return str.replace(/^\s+|\s+$/g, '').replace(/\s+/g, ' ');
}