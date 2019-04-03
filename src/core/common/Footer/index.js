import React from "react";
import get from "lodash/get";

import DefaultFooter from "./DefaultFooter";
import HandleErrorModal from "../HandleErrorModal";
import { themeCommonElements } from "../../../version/config/theme.config";

const Footer = () => {
    const ThemeFooter = get(themeCommonElements, 'footer', false);
    const isFooterAbsent = get(themeCommonElements, 'isFooterAbsent', false);
    return (
        <React.Fragment>
            <HandleErrorModal />
            {
                isFooterAbsent ? null :
                    (ThemeFooter ? <ThemeFooter /> : <DefaultFooter />)
            }
        </React.Fragment>
    );
};

export default Footer;
