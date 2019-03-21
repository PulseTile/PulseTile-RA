import get from "lodash/get";
import moment from "moment";
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
        default:
            return { data: 'No results' };
    }
};

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
        results.push({
            id: get(item, ['resource', 'identifier', [0], 'value'], null),
            name: getTotalName(item),
            address: getTotalAddress(item),
            city: getAddressDetails(item, 'city'),
            country: getAddressDetails(item, 'country'),
            county: getAddressDetails(item, 'county'),
            postCode: getAddressDetails(item, 'postalCode'),
            dateOfBirth: get(item, 'resource.birthDate', null),
            department: get(item, 'resource.department', null),
            gender: get(item, 'resource.gender', null),
            nhsNumber: get(item, ['resource', 'identifier', [0], 'value'], null),
            phone: get(item, 'resource.telecom', null),
        });
    });
    return results;
}

function getTotalName(item) {
    const nameFromResponse = get(item, 'resource.name', null);
    const name = get(nameFromResponse, [[0], 'given', [0]], null);
    const surname = get(nameFromResponse, [[0], 'family'], null);
    return (name && surname) ? (name + ' ' + surname) : null;
}

function getTotalAddress(item) {
    const addressFromResponse = get(item, 'resource.address', null);
    const addressArray = [
        get(addressFromResponse, [[0], 'line', [0]], null),
        get(addressFromResponse, [[0], 'district'], null),
    ];
    return addressArray.join(', ');
}

function getAddressDetails(item, detail) {
    const addressFromResponse = get(item, 'resource.address', null);
    return get(addressFromResponse, [[0], detail], null);
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
