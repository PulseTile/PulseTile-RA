import VaccinationsList from "../plugins/Vaccinations/VaccinationsList";
import TopThreeThingsList from "../plugins/TopThreeThings/TopThreeThingsList";
import ClinicalNotesList from "../plugins/ClinicalNotes/ClinicalNotesList";
import MdtList from "../plugins/MDT/MdtList";
import ProceduresList from "../plugins/Procedures/ProceduresList";
import PersonalNotesList from "../plugins/PersonalNotes/PersonalNotesList";
import ReferralsList from "../plugins/Referrals/ReferralsList";

export default [
    {
        name: "vaccinations",
        label: "Vaccinations",
        list: VaccinationsList,
    },
    {
        name: "top3Things",
        label: "Top Three Things",
        list: TopThreeThingsList,
    },
    {
        name: "clinicalnotes",
        label: "Clinical Notes",
        list: ClinicalNotesList,
    },
    {
        name: "mdt",
        label: "MDT",
        list: MdtList,
    },
    {
        name: "procedures",
        label: "Procedures",
        list: ProceduresList,
    },
    {
        name: "personalnotes",
        label: "Personal Notes",
        list: PersonalNotesList,
    },
    {
        name: "referrals",
        label: "Referrals",
        list: ReferralsList,
    }
];
