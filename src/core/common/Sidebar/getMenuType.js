export const SHORT_MENU = "short";
export const FULL_MENU = "full";

/**
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
