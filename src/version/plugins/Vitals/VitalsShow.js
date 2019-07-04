import React from "react";

import ShowTemplate from "../../../core/common/ResourseTemplates/ShowTemplate";
import Form from "./fragments/Form";

/**
 * This component returns block with Vitals details component
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 */
const VitalsShow = ({ classes, ...rest }) => (
    <ShowTemplate pageTitle="Vitals" {...rest}>
        <Form isDetailsPage={true} {...rest} />
    </ShowTemplate>
);

export default VitalsShow;