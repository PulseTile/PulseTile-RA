import React, { createElement } from 'react';
import { get } from "lodash";
import { withRouter } from 'react-router-dom';
import { MenuItemLink, getResources } from 'react-admin';
import { connect } from 'react-redux';

import HomeIcon from '@material-ui/icons/Home';
import LabelIcon from '@material-ui/icons/Timeline';
import PatientsIcon from '@material-ui/icons/People';

import { resourseOrder } from "../../version/config/theme.config";

/**
 * This function sorts resources by theme settings
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {array} resources
 * @return {array}
 */
function sortResourcesArray(resources) {
    let sortResource = [];
    for (let i = 0, n = resourseOrder.length; i < n; i++) {
        let currentItem = resourseOrder[i];
        for (let j = 0, m = resources.length; j < m; j++) {
            if (currentItem === get(resources, '[' + j + '].name', null)) {
                sortResource[i] = resources[j];
                break;
            }
        }
    }
    return sortResource;
}

/**
 * This component returns custom menu
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} props
 * @constructor
 */
const Menu = props => {
    const { resources, onMenuClick } = props;
    const sortResources = sortResourcesArray(resources);
    return (
        <div>
            <MenuItemLink
                to="/charts"
                primaryText="Charts"
                leftIcon={<LabelIcon />}
                onClick={onMenuClick}
            />
            <MenuItemLink
                to="/patients"
                primaryText="Patients"
                leftIcon={<PatientsIcon />}
                onClick={onMenuClick}
            />
            <MenuItemLink
                to="/summary"
                primaryText="Patient Summary"
                leftIcon={<HomeIcon />}
                onClick={onMenuClick}
            />
            {sortResources.map(resource => {
                    if ("patients" !== resource.name) {
                        return (
                            <MenuItemLink
                                to={`/${resource.name}`}
                                primaryText={resource.options.label}
                                leftIcon = {createElement(resource.icon)}
                                onClick = {onMenuClick}
                            />
                        );
                    }
                }
            )}
        </div>
    );
};

const mapStateToProps = state => ({
    resources: getResources(state),
});

export default withRouter(connect(mapStateToProps)(Menu));