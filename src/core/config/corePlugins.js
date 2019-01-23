// CORE PLUGINS CONFIGURATION LIST

// LISTS PAGES
import AllergiesList from "../plugins/Allergies/AllergiesList";
import ContactsList from "../plugins/Contacts/ContactsList";
import MedicationsList from "../plugins/Medications/MedicationsList";
import DiagnosisList from "../plugins/Diagnosis/DiagnosisList";
import PatientsList from "../pages/PatientsList";

// SHOW PAGES
import AllergiesShow from "../plugins/Allergies/AllergiesShow";
import ContactsShow from "../plugins/Contacts/ContactsShow";
import MedicationsShow from "../plugins/Medications/MedicationsShow";
import DiagnosisShow from "../plugins/Diagnosis/DiagnosisShow";
import PatientsShow from "../pages/PatientInfo";

// CREATE PAGES
import AllergiesCreate from "../plugins/Allergies/AllergiesCreate";
import ContactsCreate from "../plugins/Contacts/ContactsCreate";
import DiagnosisCreate from "../plugins/Diagnosis/DiagnosisCreate";
import MedicationsCreate from "../plugins/Medications/MedicationsCreate";

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
        show: ContactsShow,
        create: ContactsCreate,
    },
    {
        name: "medications",
        label: "Medications",
        list: MedicationsList,
        show: MedicationsShow,
        create: MedicationsCreate,
    },
    {
        name: "problems",
        label: "Problems / Issues",
        list: DiagnosisList,
        show: DiagnosisShow,
        create: DiagnosisCreate,
    },
    {
        name: "patients",
        label: "Patients",
        list: PatientsList,
        show: PatientsShow,
    },
];
