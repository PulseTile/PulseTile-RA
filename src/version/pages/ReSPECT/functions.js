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
 * @param {shape}   latestVersionInfo
 * @param {shape}   sectionStoreData
 * @param {string}  sectionName
 * @param {boolean} isVersionInfo
 * @param {shape}   defaultValues
 * @return {shape}
 */
export function getFilledValues(sectionsInfo, latestVersionInfo, sectionStoreData, sectionName, isVersionInfo, defaultValues) {
    let result = Object.assign({}, defaultValues, sectionStoreData);
    if (isVersionInfo) {
        const versionStoreData = get(sectionsInfo, sectionName, null);
        result = Object.assign({}, defaultValues, versionStoreData);
    } else if (latestVersionInfo) {
        const latestStoreData = get(latestVersionInfo, sectionName, null);
        result = Object.assign({}, defaultValues, latestStoreData);
    }
    return result;
}

export function getStateData(props, toSearch, defaultValue = null) {
    const { isVersionInfo, sectionsInfo, latestVersionInfo } = props;
    let result = get(props, toSearch, defaultValue);
    if (isVersionInfo) {
        result = get(sectionsInfo, toSearch, defaultValue);
    } else if (latestVersionInfo) {
        result = get(latestVersionInfo, toSearch, defaultValue);
    }
    return result;
}
