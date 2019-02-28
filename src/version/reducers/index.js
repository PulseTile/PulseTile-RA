import contrastMode from "./contrastModeReducer";

import createRespectPluginReducer from "./createRespectPluginReducer";

import { PERSONAL_DETAILS_ACTION } from "../actions/ReSPECT/personalDetailsAction";
import { SUMMARY_INFORMATION_ACTION } from "../actions/ReSPECT/summaryInformationAction";
import { PERSONAL_PREFERENCES_ACTION } from "../actions/ReSPECT/personalPreferencesAction";
import { CLINICAL_RECOMMENDATIONS_ACTION } from "../actions/ReSPECT/clinicalRecommendationsAction";
import { CAPACITY_AND_REPRESENTATION_ACTION } from "../actions/ReSPECT/capacityAndRepresentationAction";
import { INVOLVEMENT_ACTION } from "../actions/ReSPECT/involvenentAction";

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
};
