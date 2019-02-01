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
    return "JSESSIONID=" + result;
}

export const token = getTokenFromCookie();
export const domainName = "http://dev.ripple.foundation";