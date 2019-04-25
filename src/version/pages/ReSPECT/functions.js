import get from "lodash/get";
import moment from "moment";

import { STATUS_INCOMPLETE, STATUS_IN_PROGRESS, STATUS_COMPLETED, TOTAL_ROWS_NUMBER, DATE_FORMAT, DATE_TIME_FORMAT } from "./statuses";
import sections from "./sections";

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
    const latestStoreData = get(latestVersionInfo, sectionName, null);
    let result = Object.assign({}, defaultValues, latestStoreData);
    if (isVersionInfo) {
        const versionStoreData = get(sectionsInfo, sectionName, null);
        result = Object.assign({}, defaultValues, versionStoreData);
    } else if (sectionStoreData) {
        result = Object.assign({}, defaultValues, sectionStoreData);
    }

    return result;
}

export function getStateData(props, toSearch, defaultValue = null) {
    const { isVersionInfo, sectionsInfo, latestVersionInfo } = props;
    let result = get(latestVersionInfo, toSearch, defaultValue);
    if (isVersionInfo) {
        result = get(sectionsInfo, toSearch, defaultValue);
    } else if (get(props, toSearch, null)) {
        result = get(props, toSearch, defaultValue);
    }
    return result;
}

export function getInitialRangeLine(props, toSearch, leftValue, rightValue, defaultValue = null) {
    const { isVersionInfo, sectionsInfo, latestVersionInfo } = props;
    let result = get(latestVersionInfo, toSearch, defaultValue);
    if (isVersionInfo) {
        result = get(sectionsInfo, toSearch, defaultValue);
    } else if (get(props, toSearch, null)) {
        result = get(props, toSearch, defaultValue);
    }
    let focusValue = 50;
    if (result === leftValue) {
        focusValue = 0;
    } else if (result === rightValue) {
        focusValue = 100;
    }
    return [focusValue];
}

export function getEmptyJson(sectionName) {

    const RespectJson = {
        summaryInformation: {
            dateCompleted: moment().format(DATE_FORMAT),
            summary: null,
            details: null,
            status: STATUS_INCOMPLETE,
        },
        personalPreferences: {
            dateCompleted: moment().format(DATE_FORMAT),
            preferencesText: null,
            preferencesValue: 5,
            status: STATUS_INCOMPLETE,
        },
        clinicalRecommendation: {
            clinicalGuidance: null,
            clinicalSignature: null,
            focusValue: null,
            cprValue: 'NotforCPR',
            dateDecision: moment().format(DATE_FORMAT),
            dateCompleted: moment().format(DATE_FORMAT),
            status: STATUS_INCOMPLETE,
        },
        capacityAndRepresentation: {
            dateCompleted: moment().format(DATE_FORMAT),
            capacityFirst: null,
            legalProxyValue: 'Unknown',
            status: STATUS_INCOMPLETE,
        },
        involvement: {
            dateCompleted: moment().format(DATE_FORMAT),
            notSelectingReason: null,
            involvementValue: 'valueSetD',
            documentExplanation: null,
            status: STATUS_INCOMPLETE,
        },
        clinicalSignatures: {
            dateCompleted: moment().format(DATE_FORMAT),
            signaturesArray: [],
            status: STATUS_INCOMPLETE,
        },
        emergencyContacts: {
            dateCompleted: moment().format(DATE_FORMAT),
            contactsArray: [],
            details: null,
            status: STATUS_INCOMPLETE,
        },
        confirmation: {
            dateCompleted: moment().format(DATE_FORMAT),
            confirmationsArray: [],
            status: STATUS_INCOMPLETE,
        }
    };

    return get(RespectJson, sectionName, null);
}

export function getDateUnix(date = null) {
    let dateCreated = date ? date : moment().format(DATE_FORMAT);
    let dateArray = dateCreated.split('-');
    let newDate = dateArray[1] + "/" + dateArray[0] + "/" + dateArray[2];
    return (new Date(newDate).getTime());
}

export function getDateForDatepicker(date = null) {
    let dateCreated = date ? moment(date).format(DATE_FORMAT) : moment().format(DATE_FORMAT);
    if (dateCreated === "Invalid date") {
        dateCreated = moment().format(DATE_FORMAT);
    }
    let dateArray = dateCreated.split('-');
    let newDate = dateArray[1] + "/" + dateArray[0] + "/" + dateArray[2];
    return new Date(newDate);
}
