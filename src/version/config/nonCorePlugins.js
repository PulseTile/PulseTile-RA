import EventsList from "../plugins/Events/EventsList";
import VaccinationsList from "../plugins/Vaccinations/VaccinationsList";
import TopThreeThingsList from "../plugins/TopThreeThings/TopThreeThingsList";
import ClinicalNotesList from "../plugins/ClinicalNotes/ClinicalNotesList";
import MdtList from "../plugins/MDT/MdtList";
import ProceduresList from "../plugins/Procedures/ProceduresList";
import PersonalNotesList from "../plugins/PersonalNotes/PersonalNotesList";
import ReferralsList from "../plugins/Referrals/ReferralsList";
import ResultsList from "../plugins/Results/ResultsList";
import TransferOfCareList from "../plugins/TransferOfCare/TransferOfCareList";
import VitalsList from "../plugins/Vitals/VitalsList";

export default [
    {
        name: "events",
        label: "Events",
        list: EventsList,
    },
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
        name: "mdtreports",
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
    },
    {
        name: "labresults",
        label: "Results",
        list: ResultsList,
    },
    {
        name: "toc",
        label: "Transfers of Care",
        list: TransferOfCareList,
    },
    {
        name: "vitalsigns",
        label: "Vitals",
        list: VitalsList,
    }
];
