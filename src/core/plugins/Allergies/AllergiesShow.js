import React, { Component } from "react";
import { Show, SimpleShowLayout, TextField, DateField, EditButton } from "react-admin";
import {
    Edit, Create,
    SimpleForm,
    BooleanInput,
    TextInput,
    DisabledInput,
    DateInput,
    LongTextInput
} from "react-admin";
import { Route } from "react-router";

import Button from '@material-ui/core/Button';

import EditToolbarWithoutDelete from "../../common/EditToolbarWithoutDelete";

/**
 * This component returns page which show Allergies details
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 */
export default class AllergiesShow extends Component {

    state = {
        view: this.props.mode,
    };

    changeViewType = viewType => {
        this.setState({
            view: viewType,
        })
    };

    render() {
        const { classes, mode, ...rest } = this.props;
        const { view } = this.state;
        if (view === 'show') {
            return (
                <div className={classes.show}>
                    <Show title="Allergies Details" {...rest}>
                        <SimpleShowLayout>
                            <TextField source="cause" />
                            <TextField source="reaction" />
                            <TextField source="author" />
                            <DateField source="dateCreated" />
                            <TextField source="source" />
                        </SimpleShowLayout>
                    </Show>
                    <Button color="primary" onClick={() => this.changeViewType('edit')}>Edit</Button>
                </div>
            );
        } else if (view === 'edit') {
            return (
                <div className={classes.show}>
                    <Edit className={classes.edit} title="Edit Allergy" {...this.props}>
                        <SimpleForm toolbar={<EditToolbarWithoutDelete />}>
                            <TextInput source="cause" label="Cause" />
                            <LongTextInput source="reaction" label="Reaction / Description" />
                            <DisabledInput source="source" label="Source" />
                            <DisabledInput source="author" label="Author" />
                            <DisabledInput source="date" label="Date" />
                        </SimpleForm>
                    </Edit>
                    <Button color="danger" onClick={() => this.changeViewType('show')}>Cancel</Button>
                </div>
            );
        }
        return null;
    }
}