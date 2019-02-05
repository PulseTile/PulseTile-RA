/**
 * This function create main request types
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param base
 * @param optional
 */
export function createRequestTypes(base, optional) {
    for (let index in optional) {
        optional[index] = base + '_' + index;
    }

    return {
        REQUEST: base + '_REQUEST',
        SUCCESS: base + '_SUCCESS',
        FAILURE: base + '_FAILURE',
        ...optional,
    };
}
