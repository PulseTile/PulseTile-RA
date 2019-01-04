import { combineReducers } from 'redux';
import oneToMany from './oneToMany';
import possibleValues, { getPossibleReferences as pvGetPossibleReferences, getPossibleReferenceValues as pvGetPossibleReferenceValues, } from './possibleValues';
export default combineReducers({
    oneToMany: oneToMany,
    possibleValues: possibleValues,
});
export var getPossibleReferenceValues = function (state, props) {
    return pvGetPossibleReferenceValues(state.possibleValues, props);
};
export var getPossibleReferences = pvGetPossibleReferences;
