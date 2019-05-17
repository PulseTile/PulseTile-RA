import get from "lodash/get";

import { themeShortMenu, themeFullMenu } from "../../../version/config/theme.config";

const defaultShortMenu = [
    { id: 'menu-home', url: '/', label: 'Charts' },
    { id: 'menu-patients', url: '/patients', label: 'Patients' }
];

const defaultFullMenu = [
    { id: 'menu-summary', url: '/summary', label: 'Patient Summary' },
    { id: 'menu-problems', url: '/problems', label: 'Problems / Issues' },
    { id: 'menu-medications', url: '/medications', label: 'Medications' },
    { id: 'menu-vaccinations', url: '/vaccinations', label: 'Vaccinations' },
    { id: 'menu-allergies', url: '/allergies', label: 'Allergies' },
    { id: 'menu-contacts', url: '/contacts', label: 'Contacts' },
    { id: 'menu-top3Things', url: '/top3Things', label: 'TopThreeThings' },
];

function isResourcePresentedInMenu(currentResource, menuItemsArray) {
    const filterArray = menuItemsArray.filter(item => item.url === ('/' + currentResource));
    return filterArray.length > 0;
}

export function getMenuItems(currentPathname) {
    const pathArray = currentPathname.split('/');
    const currentResource = get(pathArray, [1], null);
    if (isResourcePresentedInMenu(currentResource, themeShortMenu) || currentPathname === "/") {
        return themeShortMenu;
    }
    if (isResourcePresentedInMenu(currentResource, themeFullMenu)) {
        return themeFullMenu;
    }
    if (isResourcePresentedInMenu(currentResource, defaultFullMenu)) {
        return defaultFullMenu;
    }
    return defaultShortMenu;
}