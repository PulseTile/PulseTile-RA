import React from "react";
import get from "lodash/get";

import DefaultFooter from "./DefaultFooter";
import { themeCommonElements } from "../../../version/config/theme.config";

const Footer = ({}) => {
    const ThemeFooter = get(themeCommonElements, 'footer', false);
    const isFooterAbsent = get(themeCommonElements, 'isFooterAbsent', false);
    if (isFooterAbsent) {
        return null;
    }
    if (ThemeFooter) {
        return (
            <ThemeFooter />
        );
    }
    return (
        <DefaultFooter />
    );
};

export default Footer;
