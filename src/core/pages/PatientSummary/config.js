import { faAllergies, faPhone, faCapsules, faNotesMedical  } from '@fortawesome/free-solid-svg-icons';

/**
 * This function returns data for patient summary page
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @return {array}
 */
export const synopsisData = [
    { id: "block-problems", title: "Problems / Issues", list: "problems", icon: faNotesMedical },
    { id: "block-medications", title: "Medications", list: "medications", icon: faCapsules },
    { id: "block-allergies", title: "Allergies", list: "allergies", icon: faAllergies },
    { id: "block-contacts", title: "Contacts", list: "contacts", icon: faPhone },
];

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
    return result;
}