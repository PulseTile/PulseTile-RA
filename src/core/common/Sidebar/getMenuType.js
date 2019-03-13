import get from "lodash/get";

export const SHORT_MENU = "short";
export const FULL_MENU = "full";

/**
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {string} currentPathname
 * @return {string}
 */
export function getMenuType(currentPathname) {
    const pathArray = currentPathname.split('/');
    const currentResource = get(pathArray, [1], null);
    const ShortMenuPages = [
        "charts",
        "patients",
    ];
    return (ShortMenuPages.indexOf(currentResource) === -1) ? FULL_MENU : SHORT_MENU;
}
