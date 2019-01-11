import React, { createElement } from 'react';
import { withRouter } from 'react-router-dom';
import { MenuItemLink, getResources } from 'react-admin';
import { connect } from 'react-redux';
import HomeIcon from '@material-ui/icons/Home';
import LabelIcon from '@material-ui/icons/Timeline';

/**
 * This component returns custom menu
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} resources
 * @param {func} onMenuClick
 * @return {boolean}
 * @constructor
 */
const Menu = ({ resources, onMenuClick }) => {
    return (
        <div>
            <MenuItemLink
                to="/"
                primaryText="Home"
                leftIcon={<HomeIcon />}
                onClick={onMenuClick}
            />
            {resources.map(resource => (
                <MenuItemLink
                    to={`/${resource.name}`}
                    primaryText={resource.options.label}
                    leftIcon={createElement(resource.icon)}
                    onClick={onMenuClick}
                />
            ))}
            <MenuItemLink
                to="/charts"
                primaryText="Charts"
                leftIcon={<LabelIcon />}
                onClick={onMenuClick}
             />
        </div>
    );
};

const mapStateToProps = state => ({
    resources: getResources(state),
});

export default withRouter(connect(mapStateToProps)(Menu));