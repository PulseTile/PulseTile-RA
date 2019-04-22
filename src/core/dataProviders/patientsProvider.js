import get from "lodash/get";
import {
    fetchUtils,
    GET_LIST,
    GET_ONE,
    GET_MANY,
    CREATE,
    UPDATE,
    HttpError
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
            let userName = get(params, 'data.firstName', null);
            let userId = get(params, 'data.nhsNumber', null);
            let updateData = {
                name: {
                    family: get(params, 'data.lastName', null),
                    given: userName.split(' '),
                    prefix: get(params, 'data.prefix', null),
                },
                telecom: String(get(params, 'data.phone', null)),
                gender: get(params, 'data.gender', null),
                birthDate: get(params, 'data.birthDate', null),
                address: {
                    line: get(params, 'data.address', null),
                    city: get(params, 'data.city', null),
                    district: get(params, 'data.district', null),
                    postalCode: get(params, 'data.postCode', null),
                    country: get(params, 'data.country', null)
                },
                id: userId.toString(),
            };
            url = `${domainName}/mpi/Patient/${params.id}`;
            options.method = "PUT";
            if (!options.headers) {
                options.headers = new Headers({ Accept: 'application/json' });
            }
            options.headers = {
                Authorization: "Bearer " + token,
                'Content-Type': 'application/json',
                'X-Requested-With': "XMLHttpRequest",
            };
            options.body = JSON.stringify(updateData);
            break;

        case CREATE:
            let patientId = get(params, 'data.nhsNumber', null);
            let name = get(params, 'data.firstName', null);
            let data = {
                name: {
                    family: get(params, 'data.lastName', null),
                    given: name.split(' '),
                    prefix: get(params, 'data.prefix', null),
                },
                telecom: String(get(params, 'data.phone', null)),
                gender: get(params, 'data.gender', null),
                birthDate: get(params, 'data.birthDate', null),
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
                    birthDate: get(patientFromResponse, 'birthDate', null),
                    department: get(patientFromResponse, 'department', null),
                    gender: get(patientFromResponse, 'gender', null),
                    nhsNumber: id,
                    phone: get(patientFromResponse, 'telecom', null),
                }
            };

        case UPDATE:
            let newPrefix = get(params, 'data.prefix', null);
            let newFirstName = get(params, 'data.firstName', null);
            let newLastName = get(params, 'data.lastName', null);
            let newData = params.data;
            newData.name = [newPrefix, newFirstName, newLastName].join(' ');
            return {
                id: get(params, 'data.nhsNumber', null),
                data: newData,
                previousData: get(params, 'previousData', {})
            };

        case CREATE:
            const dataFromRequest = get(params, 'data', null);
            const compositionUid = get(response, 'compositionUid', null);
            let sourceID = '';
            if (compositionUid) {
                const compositionUidArray = compositionUid.split('::');
                sourceID = compositionUidArray[0];
            }
            dataFromRequest.id = Number(get(params, 'data.nhsNumber', null));
            dataFromRequest.name = get(params, 'data.prefix', null) + ' ' + get(params, 'data.firstName', null) + ' ' + get(params, 'data.lastName', null);
            if (!get(params, 'source', null)) {
                dataFromRequest.source = 'ethercis';
            }
            return {
                data: dataFromRequest,
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
            birthDate: get(item, 'resource.birthDate', null),
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
    let responseInfo = {};
    return fetch(url, options).then(response => {
        responseInfo.status = get(response, 'status', null);
        return response.json();
    })
        .then(res => {
            if (responseInfo.status !== 200) {
                responseInfo.errorMessage = get(res, 'error', null);
                let errorString = responseInfo.status + '|' + responseInfo.errorMessage;
                throw new HttpError(errorString);
            }
            return convertPatientsHTTPResponse(res, type, resource, params)
        })
        .catch(err => {
            console.log('Error: ', err);
            throw new Error(err);
        });
};