import get from "lodash/get";
import { STATUS_INCOMPLETE, STATUS_COMPLETED } from "./statuses";

export function getAuthorName() {
    return localStorage.getItem('username') ? localStorage.getItem('username') : '-';
}

export const getSectionStatus = (data, totalNumber) => {
    const filledNumber = Object.values(data).length;
    const filledRation = filledNumber / totalNumber;
    return (filledRation > 0.5) ? STATUS_COMPLETED : STATUS_INCOMPLETE;
};

/**
 * This function returns the object with filled values
 * If user completes sections - it returns store information about section
 * If user reviewed versions - it returns store information about version
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape}   sectionsInfo
 * @param {shape}   sectionStoreData
 * @param {string}  sectionName
 * @param {boolean} isVersionInfo
 * @param {shape}   defaultValues
 * @return {shape}
 */
export function getFilledValues(sectionsInfo, sectionStoreData, sectionName, isVersionInfo, defaultValues) {
    const versionStoreData = get(sectionsInfo, sectionName, null);
    return isVersionInfo
        ? Object.assign({}, defaultValues, versionStoreData)
        : Object.assign({}, defaultValues, sectionStoreData);
}