import React from "react";
import { Show, SimpleShowLayout, TextField, DateField } from "react-admin";

import Breadcrumbs from "../common/Breadcrumbs";

const breadcrumbsResource = [
    { url: "/patients", title: "Patients", isActive: true },
    { url: null, title: "Details", isActive: false }
];

/**
 * This component returns content of patient information page
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 */
const PatientInfo = props => (
    <div>
        <Breadcrumbs resource={breadcrumbsResource} />
        <Show title="Patient Information" {...props}>
            <SimpleShowLayout>
                <TextField source="name" label="Name" />
                <TextField source="address" label="Address" />
                <TextField source="department" label="Department" />
                <TextField source="gender" label="Gender" />
                <TextField source="gpName" label="Doctor" />
                <TextField source="gpAddress" label="Dr Address" />
                <TextField source="nhsNumber" label="NHS number" />
                <TextField source="phone" label="Phone" />
                <DateField source="dateOfBirth" label="Date of birth" />
            </SimpleShowLayout>
        </Show>
    </div>
);

export default PatientInfo;