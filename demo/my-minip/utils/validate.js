export function trim(str) {
    return str.replace(/^\s+|\s+$/g, '');
}

export function isEmpty(str) {
    if (!/\S/.test(str)) {
        return true;
    }
    return false;
}

export function isPhone(phone) {
    if (/\d{11}/g.test(phone)) {
        return true;
    }
    return false;
}