/**
 * This function checks is current page should have a title
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} location
 * @return {boolean}
 */
export function isPageHasTitle(location) {
    const pathName = location.pathname;
    const pagesWithTitle = [
        '/',
        '/charts',
        '/patients',
    ];
    return pagesWithTitle.indexOf(pathName) !== -1;
}