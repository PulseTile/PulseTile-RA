// CORE PLUGINS CONFIGURATION LIST

// LISTS PAGES
import AllergiesList from "../plugins/Allergies/AllergiesList";
import ContactsList from "../plugins/Contacts/ContactsList";
import MedicationsList from "../plugins/Medications/MedicationsList";
import ProblemsList from "../plugins/Problems/ProblemsList";

export default [
    {
        name: "allergies",
        label: "Allergies",
        list: AllergiesList,
    },
    {
        name: "contacts",
        label: "Contacts",
        list: ContactsList,
    },
    {
        name: "medications",
        label: "Medications",
        list: MedicationsList,
    },
    {
        name: "problems",
        label: "Problems / Issues",
        list: ProblemsList,
    },
];
