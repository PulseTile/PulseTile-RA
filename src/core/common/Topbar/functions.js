/**
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} location
 * @return {boolean}
 */
export function pageHasTitle(location) {
    const pathName = location.pathname;
    const pagesWithTitle = [
        '/charts',
        '/patients',
        '/'
    ];
    return pagesWithTitle.indexOf(pathName) !== -1;
}