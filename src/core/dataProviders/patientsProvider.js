import get from "lodash/get";
import jwt from "jsonwebtoken";
import {
    fetchUtils,
    GET_LIST,
    GET_ONE,
    GET_MANY,
    GET_MANY_REFERENCE,
    CREATE,
    UPDATE,
    UPDATE_MANY,
    DELETE,
    DELETE_MANY
} from "react-admin";
import sort, { ASC, DESC } from 'sort-array-objects';
import { token, domainName } from "../token";

const convertPatientsDataRequestToHTTP = (type, resource, params) => {
    let url = "";
    const options = {};
    switch (type) {
        case GET_LIST: {
            const search = get(params, 'filter.filterText', null);
            url = `${domainName}/mpi/Patient?name=${search}`;
            if (!options.headers) {
                options.headers = new Headers({Accept: 'application/json'});
            }
            options.headers = {
                Authorization: "Bearer " + token,
                'X-Requested-With': "XMLHttpRequest",
            };
            break;
        }

        case GET_ONE:
            url = `${domainName}/mpi/Patient/${params.id}`;
            if (!options.headers) {
                options.headers = new Headers({ Accept: 'application/json' });
            }
            options.headers = {
                Authorization: "Bearer " + token,
                'X-Requested-With': "XMLHttpRequest",
            };
            break;

        case UPDATE:
            // let data = Object.assign({userId: currentUserID}, params.data);
            let data = null;
            url = `${domainName}/mpi/Patient/${params.nhsNumber}`;
            options.method = "POST";
            if (!options.headers) {
                options.headers = new Headers({ Accept: 'application/json' });
            }
            options.headers = {
                Authorization: "Bearer " + token,
                'Content-Type': 'application/json',
                'X-Requested-With': "XMLHttpRequest",
            };
            options.body = JSON.stringify(data);
            break;

        case CREATE:
            let patientId = get(params, 'data.nhsNumber', null);
            let name = get(params, 'data.firstName', null);
            data = {
                name: {
                    family: get(params, 'data.lastName', null),
                    given: name.split(' '),
                    prefix: get(params, 'data.prefix', null),
                },
                telecom: get(params, 'data.phone', null),
                gender: get(params, 'data.gender', null),
                birthDate: get(params, 'data.dateOfBirth', null),
                address: {
                    line: get(params, 'data.address', null),
                    city: get(params, 'data.city', null),
                    district: get(params, 'data.district', null),
                    postalCode: get(params, 'data.postCode', null),
                    country: get(params, 'data.country', null)
                }
            };
            url = `${domainName}/mpi/Patient/${patientId}`;
            options.method = "POST";
            if (!options.headers) {
                options.headers = new Headers({ Accept: 'application/json' });
            }
            options.headers = {
                Authorization: "Bearer " + token,
                'Content-Type': 'application/json',
                'X-Requested-With': "XMLHttpRequest",
            };
            options.body = JSON.stringify(data);
            break;

        default:
            return { data: 'No results' };
    };
    return {url, options};
};

const convertPatientsHTTPResponse = (response, type, resource, params) => {
    switch (type) {

        case GET_LIST:
            const pageNumber = get(params, 'pagination.page', 1);
            const numberPerPage = get(params, 'pagination.perPage', 10);
            const patientsArray = get(response, 'entry', []);
            const results = getPatientsList(patientsArray);
            const resultsSorting = getSortedResults(results, params);
            const startItem = (pageNumber - 1) * numberPerPage;
            const endItem = pageNumber * numberPerPage;
            const paginationResults = resultsSorting.slice(startItem, endItem);
            return {
                data: paginationResults,
                total: paginationResults.length,
            };

        case GET_ONE:
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
            const district = get(addressArray, [[0], 'district'], null);
            return {
                data: {
                    id: id,
                    prefix: prefix,
                    firstName: firstName,
                    lastName: lastName,
                    name: [prefix, firstName, lastName].join(' '),
                    address: line,
                    city: city,
                    country: country,
                    district: district,
                    postCode: postCode,
                    dateOfBirth: get(patientFromResponse, 'birthDate', null),
                    department: get(patientFromResponse, 'department', null),
                    gender: get(patientFromResponse, 'gender', null),
                    nhsNumber: id,
                    phone: get(patientFromResponse, 'telecom', null),
                }
            };

        case UPDATE:
            return {
                data: Object.assign({id: response.sourceId}, response),
            };

        case CREATE:
            // let compositionUidArray = response.compositionUid.split('::');
            // let sourseID = compositionUidArray[0];
            // let id = response.host + '-' + sourseID;
            return {
                data: Object.assign({id: id}, response),
            };


        default:
            return { data: 'No results' };
    }
};

function getGivenNamesArray(namesArray) {
    let nameArrayLength = namesArray.length;
    let result = [];
    for (let i = 0; i < nameArrayLength - 1; i++) {
        result.push(namesArray[i]);
    }
    return result;
}

/**
 * This function filters patients list by department
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {array} patientsArray
 * @return {Array}
 */
function getPatientsList(patientsArray) {
    let results = [];
    patientsArray.forEach(item => {
        let addressFromResponse = get(item, 'resource.address', null);
        results.push({
            id: get(item, ['resource', 'identifier', [0], 'value'], null),
            name: getTotalName(item),
            address: getTotalAddress(item),
            city: get(addressFromResponse, [[0], 'city'], null),
            country: get(addressFromResponse, [[0], 'country'], null),
            district: get(addressFromResponse, [[0], 'district'], null),
            postCode: get(addressFromResponse, [[0], 'postalCode'], null),
            dateOfBirth: get(item, 'resource.birthDate', null),
            department: get(item, 'resource.department', null),
            gender: get(item, 'resource.gender', null),
            nhsNumber: get(item, ['resource', 'identifier', [0], 'value'], null),
            phone: get(item, 'resource.telecom', null),
        });
    });
    return results;
}

/**
 * This function prepare total patient name (for table)
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} item
 * @return {string}
 */
function getTotalName(item) {
    const nameFromResponse = get(item, 'resource.name', null);
    const prefix = get(nameFromResponse, [[0], 'prefix'], null);
    const namesArray = get(nameFromResponse, [[0], 'given'], null);
    const firstName = namesArray.join(' ');
    const surname = get(nameFromResponse, [[0], 'family'], null);
    return [prefix, firstName, surname].join(' ');
}

/**
 * This function prepare total patient address (for table)
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} item
 * @return {string}
 */
function getTotalAddress(item) {
    const addressFromResponse = get(item, 'resource.address', null);
    const addressArray = [
        get(addressFromResponse, [[0], 'line', [0]], null),
        get(addressFromResponse, [[0], 'district'], null),
        get(addressFromResponse, [[0], 'city'], null),
        get(addressFromResponse, [[0], 'country'], null)
    ];
    return addressArray.join(', ');
}

/**
 * This function sorts response array
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {array}  results
 * @param {shape}  params
 * @return {array}
 */
function getSortedResults(results, params) {
    const sortField = get(params, 'sort.field', null);
    const sortOrder = (get(params, 'sort.order', null) === 'DESC') ? DESC : ASC;
    return sort(results, [sortField], sortOrder);
}

export default (type, resource, params) => {
    let { url, options } = convertPatientsDataRequestToHTTP(type, resource, params);
    return fetch(url, options).then(response => response.json())
        .then(res => convertPatientsHTTPResponse(res, type, resource, params))
        .catch(err => console.log('Error: ', err));
};
