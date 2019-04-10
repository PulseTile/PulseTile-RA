import VaccinationsList from "../plugins/Vaccinations/VaccinationsList";
import TopThreeThingsList from "../plugins/TopThreeThings/TopThreeThingsList";
import ProceduresList from "../plugins/Procedures/ProceduresList";
import PersonalNotesList from "../plugins/PersonalNotes/PersonalNotesList";

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
        name: "procedures",
        label: "Procedures",
        list: ProceduresList,
    },
    {
        name: "personalNotes",
        label: "Personal Notes",
        list: PersonalNotesList,
    },
];
