import ThemeTopbar from "../common/Topbar";
import PatientsList from "../../core/pages/PatientsList";
import RespectSummaryPanel from "../pages/ReSPECT/fragments/summaryPanel";

export const themeShortMenu = [
    { url: '/patients', label: 'Patients' },
];

export const themeFullMenu = [
    { url: '/summary', label: 'Patient Summary' },
    // { url: '/problems', label: 'Problems / Issues' },
    // { url: '/medications', label: 'Medications' },
    // { url: '/allergies', label: 'Allergies' },
    // { url: '/contacts', label: 'Contacts' },
    { url: '/respect', label: 'ReSPECT' },
];

export const themeCommonElements = {
    topbar: ThemeTopbar,
    homePage: PatientsList,
    isFooterAbsent: true,
    respectPanel: RespectSummaryPanel,
};

export const themeImages = {};