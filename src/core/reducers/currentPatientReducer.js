import get from "lodash/get";
import { CURRENT_PATIENT_ACTION } from "../actions/currentPatientAction";

const initialState = {
    data: false,
    loading: false,
    error: null,
};

function getPatientInfo(response) {
    const patientFromResponse = get(response, 'patient', null);
    const id = get(patientFromResponse, ['identifier', [0], 'value'], null);
    const name = get(patientFromResponse, ['name', [0]], null);
    const prefix = get(name, ['prefix'], null);
    const namesArray = get(name, 'given', null);
    const firstName = namesArray.join(' ');
    const lastName = get(name, ['family'], null);
    const addressArray = get(patientFromResponse, 'address', null);
    const city = get(addressArray, [[0], 'city'], null);
    const country = get(addressArray, [[0], 'country'], null);
    const postCode = get(addressArray, [[0], 'postalCode'], null);
    const line = get(addressArray, [[0], 'line', [0]], null);
    const addressSecondLine = get(addressArray, [[0], 'line', [1]], null);
    const district = get(addressArray, [[0], 'district'], null);
    return {
        data: {
            id: id,
            prefix: prefix,
            firstName: firstName,
            lastName: lastName,
            name: [prefix, firstName, lastName].join(' '),
            address: line,
            addressSecondLine: addressSecondLine,
            city: city,
            country: country,
            district: district,
            postCode: postCode,
            birthDate: get(patientFromResponse, 'birthDate', null),
            department: get(patientFromResponse, 'department', null),
            gender: get(patientFromResponse, 'gender', null),
            nhsNumber: id,
            phone: get(patientFromResponse, 'telecom', null),
        }
    };
}

export default (state = initialState, action) => {
    switch (action.type) {
        case CURRENT_PATIENT_ACTION.REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CURRENT_PATIENT_ACTION.REQUEST_PHOTO:
            return {
                ...state,
                loadingPhoto: true,
            };
        case CURRENT_PATIENT_ACTION.SUCCESS:
            return {
                ...state,
                loading: false,
                patientInfo: getPatientInfo(get(action, "data", null)),
            };
        case CURRENT_PATIENT_ACTION.SUCCESS_PHOTO:
            return {
                ...state,
                loadingPhoto: false,
                patientPhoto: get(action, 'data.results[0].picture.large', null),
            };
        case CURRENT_PATIENT_ACTION.FAILURE:
            return {
                ...state,
                loading: false,
                error: get(action, "error", null),
            };
        case CURRENT_PATIENT_ACTION.FAILURE_PHOTO:
            return {
                ...state,
                loadingPhoto: false,
                error: get(action, "error", null),
            };
        default:
            return state;
    }
}