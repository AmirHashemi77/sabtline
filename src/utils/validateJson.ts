export const isValidJSON = (text: any) => {
    let isValid = false;

    if (typeof text !== 'string' || (typeof text === 'string' && text.length === 0)) {
        return isValid;
    }

    try {
        JSON.parse(text);
        isValid = true;
    } catch (e) {
        console.error('[isValidJSON], invalid JSON text', e, text);
        isValid = false;
    }

    return isValid;
}