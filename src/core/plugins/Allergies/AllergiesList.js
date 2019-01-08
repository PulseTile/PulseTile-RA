import React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  ShowButton
} from "react-admin";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import AllergyBanner from "../../images/banners/allergies.jpg";

export const Allergies = props => {
  return (
      <div>
        <Card>
          <CardMedia
              component="img"
              height="160"
              image={AllergyBanner}
              title="Allergy"
          />
        </Card>
        <List title="Allergies" {...props}>
          <Datagrid>
            <TextField source="cause" />
            <TextField source="reaction" />
            <TextField source="source" />
            <ShowButton />
            <EditButton />
          </Datagrid>
        </List>
      </div>
  );
};

export default Allergies;
