/**
 * This function merge core and version styles
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {array} coreStyles
 * @param {array}nonCoreStyles
 * @return {array}
 */
function mergeStyles(coreStyles, nonCoreStyles) {
    const coreClasses = Object.keys(coreStyles);
    const nonCoreClasses = Object.keys(nonCoreStyles);
    let mergeResult = [];
    for (let i = 0, n = coreClasses.length; i < n; i++) {
        let item = coreClasses[i];
        if (nonCoreClasses.indexOf(item) !== -1) {
            mergeResult[item] = Object.assign({}, coreStyles[item], nonCoreStyles[item]);
        } else {
            mergeResult[item] = coreStyles[item];
        }
    }
    for (let i = 0, n = nonCoreClasses.length; i < n; i++) {
        let item = nonCoreClasses[i];
        if (coreClasses.indexOf(item) === -1) {
            mergeResult[item] = nonCoreStyles[item];
        }
    }
    return mergeResult;
}

export default mergeStyles;