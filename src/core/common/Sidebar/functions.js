import { get } from "lodash";
import { resourceOrder } from "../../../version/config/theme.config";

export const SHORT_MENU = "short";
export const FULL_MENU = "full";

/**
 * This function sorts resources by theme settings
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {array} resources
 * @return {array}
 */
export function sortResourcesArray(resources) {
    let sortResource = [];
    for (let i = 0, n = resourceOrder.length; i < n; i++) {
        let currentItem = resourceOrder[i];
        for (let j = 0, m = resources.length; j < m; j++) {
            if (currentItem === get(resources, [j, 'name'], null)) {
                sortResource[i] = resources[j];
                break;
            }
        }
    }
    return sortResource;
}

/**
 * This function returns type of menu
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {string} currentPathname
 * @return {string}
 */
export function getMenuType(currentPathname) {
    let result = SHORT_MENU;
    const ShortMenuPages = [
        "/",
        "/charts",
        "/patients"
    ];
    if (ShortMenuPages.indexOf(currentPathname) === -1) {
        result = FULL_MENU;
    }
    return result;
}
