/**
 * Checks if given object has undefined elements
 * @param type 
 * @returns True or False
 */
export const validateRequest = (type: Object, optional?: [string]) => {
    for (const [key, value] of Object.entries(type)) {
        if (optional) {
            if (!optional.includes(key))
                if (value == undefined) return false;
        } else
            if (value == undefined) return false;
    }
    return true;
}