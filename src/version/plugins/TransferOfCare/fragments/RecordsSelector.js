import React, { Component } from "react";

import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';

class RecordsSelector extends Component {

    state = {
        recordsArray: [],
    };

    selectItem = value => {

    };

    render() {
        const { classes } = this.props;
        const { recordsArray } = this.state;

        return (
            <React.Fragment>

                <FormGroup className={classes.formGroup}>
                    <FormLabel className={classes.formLabel}>Records</FormLabel>
                    <select className={classes.formSelect} onChange={value => this.selectItem(value)} required>
                        <option value=''>-- Select to --</option>
                        { recordsArray && recordsArray.map((item, key) => {
                            return (
                                <option key={key} value={item.id}>{item.label}</option>
                            )
                        })}
                    </select>
                </FormGroup>

                <h1>Records table</h1>

            </React.Fragment>
        );
    }

};

export default RecordsSelector;