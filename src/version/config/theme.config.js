import backgroundImage from "../../version/images/Artboard.png";

import ThemeTopbar from "../common/Topbar";
import ThemeFooter from "../common/Footer";
import FeedsSelectors from "../plugins/Feeds/FeedsSelectors";
import FeedsPanels from "../plugins/Feeds/FeedsPanels";
import Charts from "../../core/pages/Charts";

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
    footer: ThemeFooter,
    feedsSelectors: FeedsSelectors,
    feedsPanels: FeedsPanels,
    homePage: Charts,
};

export const themeImages = {
    backgroundImage: backgroundImage,
};
