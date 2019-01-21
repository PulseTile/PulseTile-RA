import { get } from "lodash";

/**
 * This function defines is sidebar menu shown at the current page
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} location
 * @return {boolean}
 */
export function isMenuVisible(location) {
    const pathname = get(location, 'pathname', null);
    const pagesWithoutMenu = [
        "/",
        "/charts",
        "/patients"
    ];
    return (pagesWithoutMenu.indexOf(pathname) === -1);
}