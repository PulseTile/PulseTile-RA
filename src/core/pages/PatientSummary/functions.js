import { get } from "lodash";

import { faAllergies, faPhone, faCapsules, faNotesMedical  } from '@fortawesome/free-solid-svg-icons';

/**
 * This function returns data for patient summary page
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} patientInfo
 * @return {array}
 */
export function getSynopsisData(patientInfo) {
    return [
        { id: "block-problems", title: "Problems / Issues", list: "problems", items: get(patientInfo, 'problems', []), icon: faNotesMedical },
        { id: "block-medications", title: "Medications", list: "medications", items: get(patientInfo, 'medications', []), icon: faCapsules },
        { id: "block-allergies", title: "Allergies", list: "allergies", items: get(patientInfo, 'allergies', []), icon: faAllergies },
        { id: "block-contacts", title: "Contacts", list: "contacts", items: get(patientInfo, 'contacts', []), icon: faPhone },
    ];
}