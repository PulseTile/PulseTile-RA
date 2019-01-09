import React from "react";
import {
    List,
    Datagrid,
    TextField,
    DateField,
    EditButton,
    ShowButton
} from "react-admin";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import TopThreeThingsBanner from "../../images/banners/top3.jpg";

export const TopThreeThingsList = props => {
    return (
        <div>
            <Card>
                <CardMedia
                    component="img"
                    height="160"
                    image={TopThreeThingsBanner}
                    title="Top Three Things"
                />
            </Card>
            <List title="Vaccinations" {...props}>
                <Datagrid>
                    <DateField source="dateCreated" />
                    <TextField source="name1" label="Issue #1" />
                    <TextField source="name2" label="Issue #2" />
                    <TextField source="name3" label="Issue #3" />
                    <TextField source="source" label="Source" />
                    <ShowButton />
                    <EditButton />
                </Datagrid>
            </List>
        </div>
    );
};

export default TopThreeThingsList;
