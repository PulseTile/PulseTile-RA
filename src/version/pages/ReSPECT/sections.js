import PersonalDetails from "./sections/PersonalDetails";
import SummaryInformation from "./sections/SummaryInformation";
import PersonalPreferences from "./sections/PersonalPreferences";
import ClinicalRecommendations from "./sections/ClinicalRecommendations";
import CapacityAndRepresentation from "./sections/CapacityAndRepresentation";
import Involvement from "./sections/Involvement";
import CliniciansSignatures from "./sections/CliniciansSignatures";
import EmergencyContacts from "./sections/EmergencyContacts";
import Confirmation from "./sections/Confirmation";
import EmergencyView from "./sections/EmergencyView";

export default [
    { id: 1, name: "personalDetails", section: '1. Personal Details', component: PersonalDetails, date: false },
    { id: 2, name: "summaryInformation", section: '2. Summary of relevant information for this plan', component: SummaryInformation, date: false },
    { id: 3, name: "personalPreferences", section: '3. Personal preferences to guide this plan', component: PersonalPreferences, date: false },
    { id: 4, name: "clinicalRecommendations", section: '4. Clinical recommendations for emergency care and treatment', component: ClinicalRecommendations, date: false },
    { id: 5, name: "capacityAndRepresentation", section: '5. Capacity and representation at this time', component: CapacityAndRepresentation, date: false },
    { id: 6, name: "involvement", section: '6. Involvement in making this plan', component: Involvement, date: false },
    { id: 7, name: "clinicalSignatures", section: '7. Clinician signatures', component: CliniciansSignatures, date: false },
    { id: 8, name: "emergencyContacts", section: '8. Emergency contacts', component: EmergencyContacts, date: false },
    { id: 9, name: "confirmation", section: '9. Confirmation of validity', component: Confirmation, date: false },
    { id: 10, name: "emergencyView", section: '10. Emergency view', component: EmergencyView, date: false },
];