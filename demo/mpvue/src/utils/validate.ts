
export function trim(str: string): string {
    return str.replace(/^\s+|\s+$/g, '');
}

export function isEmpty(str: string): boolean {
    if (!/\S/.test(str)) {
        return true;
    }
    return false;
}

export function isPhone(phone: string): boolean {
    if (/\d{11}/g.test(phone)) {
        return true;
    }
    return false;
}
