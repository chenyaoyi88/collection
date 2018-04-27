export function zerofillBack(n) {
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

export function getLatestDate(day = 0) {
  const today = new Date();
  const targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * (day || 0);
  today.setTime(targetday_milliseconds);
  const tYear = today.getFullYear();
  let tMonth = today.getMonth();
  let tDate = today.getDate();
  tMonth = addZero(tMonth + 1);
  tDate = addZero(tDate);
  return tYear + '-' + tMonth + '-' + tDate;
}

export function addZero(n) {
  return n < 10 ? '0' + n : '' + n;
}

export function getHoursArray(start = 0) {
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

export function formatCurrency(num) {
  num = num.toString().replace(/\$|\,/g, '');
  if (isNaN(num)) {
    num = '0';
  }
  const sign = (num == (num = Math.abs(num)));
  num = Math.floor(num * 100 + 0.50000000001);
  let cents = num % 100;
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
  const s = [];
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

export function formatTrim(str) {
  return str.replace(/^\s+|\s+$/g, '').replace(/\s+/g, ' ');
}