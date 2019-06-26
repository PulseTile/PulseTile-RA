import get from "lodash/get";
import { faAllergies, faPhone, faCapsules, faNotesMedical  } from '@fortawesome/free-solid-svg-icons';
import { nonCoreSynopsisData } from "../../../version/config/nonCoreSynopsis";
import {themeCommonElements} from "../../../version/config/theme.config";

/**
 * This function returns data for patient summary page
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @return {array}
 */
export const coreSynopsisData = [
    {
        id: "block-problems",
        title: "Problems / Issues",
        list: "problems",
        icon: faNotesMedical,
        isActive: true,
        isSynopsis: true,
        description: "The key problems that affect your health, some with clear diagnoses from your doctor",
    },
    {
        id: "block-medications",
        title: "Medications",
        list: "medications",
        icon: faCapsules,
        isActive: true,
        isSynopsis: true,
        description: "The medical tablets and other medications that you take regularly for your health care",
    },
    {
        id: "block-allergies",
        title: "Allergies",
        list: "allergies",
        icon: faAllergies,
        isActive: true,
        isSynopsis: true,
        description: "Those things that your body reacts against, that you have an allergy to",
    },
    {
        id: "block-contacts",
        title: "Contacts",
        list: "contacts",
        icon: faPhone,
        isActive: true,
        isSynopsis: true,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
];

export const totalSynopsisData = coreSynopsisData.concat(nonCoreSynopsisData);
export const synopsisData = totalSynopsisData.filter(item => item.isActive);

export const SHOW_HEADING = 'heading';
export const SHOW_ALL = 'headingAndList';

export const showModesArray = [
    { type: SHOW_HEADING, label: "Headings" },
    { type: SHOW_ALL, label: "Headings + List" },
];

export function getHeadingsLists() {
    let result = [];
    synopsisData.forEach(item => {
        result.push(item.list);
    });
    const hasRespectPlugin = get(themeCommonElements, 'respectPanel', false);
    if (hasRespectPlugin) {
        result.push('respect');
    }
    return result;
}

export function getSynopsisProps(state) {
    let result = {};
    synopsisData.forEach(item => {
        const reducerName = item.list + 'Synopsis';
        result[item.list] = get(state, ['custom', reducerName, 'data'], []);
    });
    return result;
}