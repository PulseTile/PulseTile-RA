import { get } from "lodash";

import { mergeStyles } from "./functions";

// CORE stylesheets
import customLayoutCore from "./customLayout";
import topbarTopPart from "./topbarTopPart";
import topbarLowPart from "./topbarLowPart";
import patientSummaryPanelCore from "./patientSummaryPanel";
import breadcrumbs from "./breadcrumbs";
import charts from "./charts";

// NON-CORE stylesheets
import themeStyles from "../../version/styles";

// Core stylesheets are absent, but non-Core are presented
const menu = get(themeStyles, 'menu', {});
const tableHeader = get(themeStyles, 'tableHeader', {});

// Core and non-Core stylesheets are both presented
const layoutStyles = mergeStyles(customLayoutCore, get(themeStyles, 'customLayout', {}));
const patientSummaryPanel = mergeStyles(patientSummaryPanelCore, get(themeStyles, 'patientSummaryPanel', {}));

/**
 * This component returns merges all stylesheets in one total stylesheet for Core
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @return {shape}
 */
export default {
    layoutStyles,
    topbarTopPart,
    topbarLowPart,
    menu,
    breadcrumbs,
    patientSummaryPanel,
    tableHeader,
    charts,
};