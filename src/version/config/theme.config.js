import ThemeTopbar from "../common/Topbar";
import ThemeFooter from "../common/Footer";
import FeedsSelectors from "../plugins/Feeds/FeedsSelectors";
import FeedsPanels from "../plugins/Feeds/FeedsPanels";
import BackgroundImage from "../images/background.jpg";
import Charts from "../../core/pages/Charts";
import RespectSummaryPanel from "../pages/ReSPECT/fragments/summaryPanel";

export const themeShortMenu = [
    { url: '/', label: 'Charts' },
    { url: '/patients', label: 'Patients' },
    { url: '/business', label: 'Business Intelligence'},
];

export const themeFullMenu = [
    { url: '/summary', label: 'Patient Summary' },
    { url: '/problems', label: 'Problems / Issues' },
    { url: '/medications', label: 'Medications' },
    { url: '/vaccinations', label: 'Vaccinations' },
    { url: '/allergies', label: 'Allergies' },
    { url: '/contacts', label: 'Contacts' },
    { url: '/top3Things', label: 'TopThreeThings' },
    { url: '/clinicalnotes', label: 'Clinical Notes' },
    { url: '/mdtreports', label: 'MDT' },
    { url: '/events', label: 'Events' },
    { url: '/personalnotes', label: 'Personal Notes' },
    { url: '/procedures', label: 'Procedures' },
    { url: '/referrals', label: 'Referrals' },
    { url: '/labresults', label: 'Results' },
    { url: '/toc', label: 'Transfers Of Care' },
    { url: '/vitalsigns', label: 'Vitals' },
    { url: '/respect', label: 'ReSPECT' },
];

export const themeCommonElements = {
    menuHasChevrons: true,
    invertedTableHeaders: true,
    patientSummaryPermission: true,
    patientListColumnToggling: true,
    isPatientListCount: true,
    redirectToPlugin: true,
    topbar: ThemeTopbar,
    footer: ThemeFooter,
    feedsSelectors: FeedsSelectors,
    feedsPanels: FeedsPanels,
    homePage: Charts,
    respectPanel: RespectSummaryPanel,
    hasEmergencySummaryPanel: true,
    hasPatientSummaryRoll: true,
};

export const themeImages = {
    backgroundImage: BackgroundImage,
};
