import contrastMode from "./contrastModeReducer";

import createRespectPluginReducer from "./createRespectPluginReducer";

import { PERSONAL_DETAILS_ACTION } from "../actions/ReSPECT/personalDetailsAction";
import { SUMMARY_INFORMATION_ACTION } from "../actions/ReSPECT/summaryInformationAction";
import { PERSONAL_PREFERENCES_ACTION } from "../actions/ReSPECT/personalPreferencesAction";
import { CLINICAL_RECOMMENDATIONS_ACTION } from "../actions/ReSPECT/clinicalRecommendationsAction";
import { CAPACITY_AND_REPRESENTATION_ACTION } from "../actions/ReSPECT/capacityAndRepresentationAction";
import { INVOLVEMENT_ACTION } from "../actions/ReSPECT/involvenentAction";
import { CLINICAL_SIGNATURES_ACTION } from "../actions/ReSPECT/clinicalSignaturesAction";
import { EMERGENCY_CONTACTS_ACTION } from "../actions/ReSPECT/emergencyContactsAction";
import { EMERGENCY_VIEW_ACTION } from "../actions/ReSPECT/emergencyViewAction";

/**
 * This component returns version reducers
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @return {shape}
 */
export default {
    contrastMode,
    personalDetails: createRespectPluginReducer(PERSONAL_DETAILS_ACTION),
    summaryInformation: createRespectPluginReducer(SUMMARY_INFORMATION_ACTION),
    personalPreferences: createRespectPluginReducer(PERSONAL_PREFERENCES_ACTION),
    clinicalRecommendations: createRespectPluginReducer(CLINICAL_RECOMMENDATIONS_ACTION),
    capacityAndRepresentation: createRespectPluginReducer(CAPACITY_AND_REPRESENTATION_ACTION),
    involvement: createRespectPluginReducer(INVOLVEMENT_ACTION),
    clinicalSignatures: createRespectPluginReducer(CLINICAL_SIGNATURES_ACTION),
    emergencyContacts: createRespectPluginReducer(EMERGENCY_CONTACTS_ACTION),
    emergencyView: createRespectPluginReducer(EMERGENCY_VIEW_ACTION),
};
