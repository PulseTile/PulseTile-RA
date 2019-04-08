import backgroundImage from "../../version/images/Artboard.png";
import cardBackgroundImage from "../../version/images/blue-ring-01.png";
import tableHeaderImage from "../../version/images/table-header.png";

import ThemeTopbar from "../common/Topbar";
import PatientSummary from "../../core/pages/PatientSummary";

export const themeShortMenu = [
    { url: '/summary', label: 'Patient Summary' },
    { url: '/problems', label: 'Problems / Issues' },
    { url: '/medications', label: 'Medications' },
    { url: '/vaccinations', label: 'Vaccinations' },
    { url: '/allergies', label: 'Allergies' },
    { url: '/contacts', label: 'Contacts' },
    { url: '/top3Things', label: 'TopThreeThings' },
];

export const themeFullMenu = [
    { url: '/summary', label: 'Patient Summary' },
    { url: '/problems', label: 'Problems / Issues' },
    { url: '/medications', label: 'Medications' },
    { url: '/vaccinations', label: 'Vaccinations' },
    { url: '/allergies', label: 'Allergies' },
    { url: '/contacts', label: 'Contacts' },
    { url: '/top3Things', label: 'TopThreeThings' },
];

export const themeCommonElements = {
    topbar: ThemeTopbar,
    homePage: PatientSummary,
    isFooterAbsent: true,
};

export const themeImages = {
    backgroundImage: backgroundImage,
    cardBackgroundImage: cardBackgroundImage,
    tableHeaderImage: tableHeaderImage,
};
