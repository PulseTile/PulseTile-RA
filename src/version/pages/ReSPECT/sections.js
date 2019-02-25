import PersonalDetails from "./sections/PersonalDetails";
import SummaryInformation from "./sections/SummaryInformation";
import PersonalPreferences from "./sections/PersonalPreferences";
import ClinicalRecomandations from "./sections/ClinicalRecomandations";
import CapacityAndRepresentation from "./sections/CapacityAndRepresentation";
import Involvement from "./sections/Involvement";
import CliniciansSignatures from "./sections/CliniciansSignatures";
import EmergencyContacts from "./sections/EmergencyContacts";
import Confirmation from "./sections/Confirmation";

export default [
    { id: 1, section: '1. Personal Details', component: PersonalDetails, status: 'Incomplete', date: false },
    { id: 2, section: '2. Summary of relevant information for this plan', component: SummaryInformation, status: 'Incomplete', date: false },
    { id: 3, section: '3. Personal preferences to guide this plan', component: PersonalPreferences, status: 'Incomplete', date: false },
    { id: 4, section: '4. Clinical recommendations for emergency care and treatment', component: ClinicalRecomandations, status: 'Incomplete', date: false },
    { id: 5, section: '5. Capacity and representation at this time', component: CapacityAndRepresentation, status: 'Incomplete', date: false },
    { id: 6, section: '6. Involvement in making this plan', component: Involvement, status: 'Incomplete', date: false },
    { id: 7, section: '7. Clinicians signatures', component: CliniciansSignatures, status: 'Incomplete', date: false },
    { id: 8, section: '8. Emergency contacts', component: EmergencyContacts, status: 'Incomplete', date: false },
    { id: 9, section: '9. Confirmation of validity', component: Confirmation, status: 'Incomplete', date: false },
];