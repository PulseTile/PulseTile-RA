import contrastMode from "./contrastModeReducer";
import selectedFeedsList from "./selectedFeedsReducer";
import feedsRss from "./feedsRssReducer";
import transferOfCareReducer from "./transferOfCareReducer";

import {SYNOPSIS_TOP_THREE_THINGS_ACTION, SYNOPSIS_VACCINATIONS_ACTION } from "../actions/synopsisActions";
import { FEEDS_LIST_ACTION } from "../actions/feedsListAction";

import createCustomReducer from "../../core/reducers/createCustomReducer";

import createRespectPluginReducer from "./createRespectPluginReducer";
import respectModal from "./respectModalReducer";
import versionsServerInfo from "./versionsServerInfoReducer";
import businessIntelligenceReducer from "./businessIntelligenceReducer";
import vitalsReducer from "./vitalsReducer";

import { PERSONAL_DETAILS_ACTION } from "../actions/ReSPECT/personalDetailsAction";
import { SUMMARY_INFORMATION_ACTION } from "../actions/ReSPECT/summaryInformationAction";
import { PERSONAL_PREFERENCES_ACTION } from "../actions/ReSPECT/personalPreferencesAction";
import { CLINICAL_RECOMMENDATIONS_ACTION } from "../actions/ReSPECT/clinicalRecommendationsAction";
import { CAPACITY_AND_REPRESENTATION_ACTION } from "../actions/ReSPECT/capacityAndRepresentationAction";
import { INVOLVEMENT_ACTION } from "../actions/ReSPECT/involvenentAction";
import { CLINICAL_SIGNATURES_ACTION } from "../actions/ReSPECT/clinicalSignaturesAction";
import { EMERGENCY_CONTACTS_ACTION } from "../actions/ReSPECT/emergencyContactsAction";
import { CONFIRMATION_ACTION } from "../actions/ReSPECT/confirmationAction";
import { EMERGENCY_VIEW_ACTION } from "../actions/ReSPECT/emergencyViewAction";

/**
 * This component returns version reducers
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @return {shape}
 */
export default {
    vaccinationsSynopsis: createCustomReducer(SYNOPSIS_VACCINATIONS_ACTION, "data.synopsis"),
    top3ThingsSynopsis: createCustomReducer(SYNOPSIS_TOP_THREE_THINGS_ACTION, "data.synopsis"),
    contrastMode,
    feedsList: createCustomReducer(FEEDS_LIST_ACTION, "data"),
    selectedFeedsList,
    feedsRss,
    transferOfCare: transferOfCareReducer,
    respectModal,
    personalDetails: createRespectPluginReducer(PERSONAL_DETAILS_ACTION),
    summaryInformation: createRespectPluginReducer(SUMMARY_INFORMATION_ACTION),
    personalPreferences: createRespectPluginReducer(PERSONAL_PREFERENCES_ACTION),
    clinicalRecommendations: createRespectPluginReducer(CLINICAL_RECOMMENDATIONS_ACTION),
    capacityAndRepresentation: createRespectPluginReducer(CAPACITY_AND_REPRESENTATION_ACTION),
    involvement: createRespectPluginReducer(INVOLVEMENT_ACTION),
    clinicalSignatures: createRespectPluginReducer(CLINICAL_SIGNATURES_ACTION),
    emergencyContacts: createRespectPluginReducer(EMERGENCY_CONTACTS_ACTION),
    confirmation: createRespectPluginReducer(CONFIRMATION_ACTION),
    emergencyView: createRespectPluginReducer(EMERGENCY_VIEW_ACTION),
    versionsServerInfo,
    businessIntelligence: businessIntelligenceReducer,
    vitalsForChart: vitalsReducer,
};
