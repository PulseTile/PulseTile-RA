import get from "lodash/get";

import { themeShortMenu, themeFullMenu } from "../../../version/config/theme.config";

const defaultShortMenu = [
    { url: '/', label: 'Charts' },
    { url: '/patients', label: 'Patients' }
];

const defaultFullMenu = [
    { url: '/summary', label: 'Patient Summary' },
    { url: '/problems', label: 'Problems / Issues' },
    { url: '/medications', label: 'Medications' },
    { url: '/vaccinations', label: 'Vaccinations' },
    { url: '/allergies', label: 'Allergies' },
    { url: '/contacts', label: 'Contacts' },
    { url: '/top3Things', label: 'TopThreeThings' },
];

function isUrlPresented(currentResource, menuItemsArray) {
    const filterArray = menuItemsArray.filter(item => {
        return item.url === ('/' + currentResource);
    });
    return filterArray.length > 0;
}

export function getMenuItems(currentPathname) {
    const pathArray = currentPathname.split('/');
    const currentResource = get(pathArray, [1], null);
    if (isUrlPresented(currentResource, themeShortMenu) || currentPathname === "/") {
        return themeShortMenu;
    }
    if (isUrlPresented(currentResource, themeFullMenu)) {
        return themeFullMenu;
    }
    if (isUrlPresented(currentResource, defaultFullMenu)) {
        return defaultFullMenu;
    }
    return defaultShortMenu;
}