import backgroundImage from "../../version/images/containerBackground.png";

import ThemeTopbar from "../common/Topbar";
import Homepage from "../../core/pages/PatientsList";

export const themeShortMenu = [
    { url: '/', label: 'Patients' },
    // { url: '/patients', label: 'Patients' },
    // { url: '/business', label: 'Business Intelligence'},
];

export const themeFullMenu = [
    { url: '/summary', label: 'Patient Summary' },
    { url: '/problems', label: 'Problems / Issues' },
    { url: '/medications', label: 'Medications' },
    // { url: '/vaccinations', label: 'Vaccinations' },
    { url: '/allergies', label: 'Allergies' },
    // { url: '/contacts', label: 'Contacts' },
    // { url: '/top3Things', label: 'About Me' },
    { url: '/vitalsigns', label: 'Vitals' },
];

export const themeCommonElements = {
    topbar: ThemeTopbar,
    homePage: Homepage,
    isFooterAbsent: true,
};

export const themeImages = {
    backgroundImage: backgroundImage,
};
