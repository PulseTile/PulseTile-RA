import header from "./header";
import { lowPartStyles, topPartStyles } from "./topbar";
import menuStyles from "./menu";
import patientSummaryPanel from "./patientSummaryPanel";

/**
 * This component returns total list of theme styles
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @return {shape}
 */
export default {
    header: header,
    topTopBar: topPartStyles,
    lowTopBar: lowPartStyles,
    menu: menuStyles,
    patientSummaryPanel: patientSummaryPanel,
}