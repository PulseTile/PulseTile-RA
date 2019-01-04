import { combineReducers } from 'redux';
import resources, { getResources as resourceGetResources, getReferenceResource as resourceGetReferenceResource, } from './resource';
import loading from './loading';
import notifications from './notifications';
import record from './record';
import references, { getPossibleReferenceValues as referencesGetPossibleReferenceValues, } from './references';
import saving from './saving';
import ui from './ui';
import auth, { isLoggedIn as authIsLoggedIn } from './auth';
export default combineReducers({
    resources: resources,
    loading: loading,
    notifications: notifications,
    record: record,
    references: references,
    saving: saving,
    ui: ui,
    auth: auth,
});
export var getPossibleReferenceValues = function (state, props) {
    return referencesGetPossibleReferenceValues(state.references, props);
};
export var getResources = function (state) { return resourceGetResources(state.resources); };
export var getReferenceResource = function (state, props) {
    return resourceGetReferenceResource(state.resources, props);
};
export var isLoggedIn = function (state) { return authIsLoggedIn(state.auth); };
export { getPossibleReferences } from './references';
