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

// EDIT PAGES
import AllergiesEdit from "../plugins/Allergies/AllergiesEdit";
import ContactsEdit from "../plugins/Contacts/ContactsEdit";
import DiagnosisEdit from "../plugins/Diagnosis/DiagnosisEdit";
import MedicationsEdit from "../plugins/Medications/MedicationsEdit";

// CREATE PAGES
import AllergiesCreate from "../plugins/Allergies/AllergiesCreate";
import ContactsCreate from "../plugins/Contacts/ContactsCreate";
import DiagnosisCreate from "../plugins/Diagnosis/DiagnosisCreate";
import MedicationsCreate from "../plugins/Medications/MedicationsCreate";

// ICONS
import AllergiesIcon from "@material-ui/icons/Pets";
import ContactsIcon from "@material-ui/icons/Phone";
import MedicationsIcon from "@material-ui/icons/LocalHospital";
import DiagnosisIcon from "@material-ui/icons/Today";
import PatientsIcon from "@material-ui/icons/People";

export default [
    {
        name: "allergies",
        icon: AllergiesIcon,
        label: "Allergies",
        list: AllergiesList,
        show: AllergiesShow,
        create: AllergiesCreate,
    },
    {
        name: "contacts",
        icon: ContactsIcon,
        label: "Contacts",
        list: ContactsList,
        show: ContactsShow,
        create: ContactsCreate,
    },
    {
        name: "medications",
        icon: MedicationsIcon,
        label: "Medications",
        list: MedicationsList,
        show: MedicationsShow,
        create: MedicationsCreate,
    },
    {
        name: "problems",
        icon: DiagnosisIcon,
        label: "Problems / Issues",
        list: DiagnosisList,
        show: DiagnosisShow,
        create: DiagnosisCreate,
    },
    {
        name: "patients",
        icon: PatientsIcon,
        label: "Patients",
        list: PatientsList,
        show: PatientsShow,
    },
];
