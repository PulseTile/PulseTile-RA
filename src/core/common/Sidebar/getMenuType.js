import get from "lodash/get";

export const SHORT_MENU = "short";
export const FULL_MENU = "full";

/**
 * This function chech that current page isn't patients list/show/create/edit
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {string} currentPathname
 * @return {boolean}
 */
function notPatientPage(currentPathname) {
    const pathArray = currentPathname.split('/');
    return get(pathArray, [1], null) !== 'patients';
} 

/**
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {string} currentPathname
 * @return {string}
 */
export function getMenuType(currentPathname) {
    let result = SHORT_MENU;
    const ShortMenuPages = [
        "/charts",
        "/",
    ];
    if (ShortMenuPages.indexOf(currentPathname) === -1 && notPatientPage(currentPathname)) {
        result = FULL_MENU;
    }
    return result;
}
