import React from "react";
import { Route } from "react-router";
import {
  List,
  Datagrid,
  TextField
} from "react-admin";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import { withStyles } from "@material-ui/core/styles";

import AllergyBanner from "../../images/banners/allergies.jpg";
import AllergiesEdit from "./AllergiesEdit";

const listStyles = {
    list: {
        width: '100%',
    },
};

/**
 * This component returns block with Allergies list
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} props
 * @constructor
 */
export const Allergies = props => {
  const { classes } = props;
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
        <div style={{ display: "flex" }}>
            <List title="Allergies" className={classes.list} {...props}>
              <Datagrid rowClick="edit">
                <TextField source="cause" />
                <TextField source="reaction" />
                <TextField source="source" />
              </Datagrid>
            </List>
            <Route
                path="/allergies/:id"
                render={({ match }) => <AllergiesEdit {...props} id={match.params.id} />}
            />
        </div>
      </div>
  );
};

export default withStyles(listStyles)(Allergies);
