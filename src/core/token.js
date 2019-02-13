/**
 * This function extract token from COOKIE and returns it
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @return {string}
 */
function getTokenFromCookie() {
    let result = null;
    const decodedCookie = decodeURIComponent(document.cookie).split(';');
    decodedCookie.forEach(item => {
        let itemArray = item.split('=');
        let parameterName = itemArray[0];
        if (parameterName.trim() === "JSESSIONID") {
            result = itemArray[1];
        }
    });
    return result;
}

export const token = getTokenFromCookie();
export const domainName = "https://192.168.88.38";