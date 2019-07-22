import get from "lodash/get";
import {
    GET_LIST,
    GET_ONE,
    CREATE,
    UPDATE,
    HttpError
} from "react-admin";
import sort, { ASC, DESC } from 'sort-array-objects';
import { token, domainName } from "../token";

function checkFormData(params) {

    const paramsArray = [
        { param: 'data.prefix', label: 'Preferred Name' },
        { param: 'data.firstName', label: 'Name' },
        { param: 'data.lastName', label: 'Surname' },
        { param: 'data.birthDate', label: 'Date of Birth' },
        { param: 'data.address', label: 'Address' },
        { param: 'data.city', label: 'City' },
        { param: 'data.district', label: 'District' },
        { param: 'data.postCode', label: 'Post Code' },
        { param: 'data.country', label: 'Country' },
        { param: 'data.phone', label: 'Telephone Number' },
        { param: 'data.nhsNumber', label: 'CHI Number' },
    ];

    let missedParamsArray = [];
    for (let i = 0, n = paramsArray.length; i < n; i++) {
        let item = paramsArray[i];
        let value = get(params, item.param, null);
        if (!value) {
            missedParamsArray.push(item.label);
        }
    }

    if (missedParamsArray.length > 0) {
        const string = missedParamsArray.join(', ');
        throw new HttpError('777|Please add ' + string);
    }

    return true;
}

function getRequestUrl(params) {
    const search = get(params, 'filter.filterText', null);
    const searchType = get(params, 'filter.filterType', null);
    const clinicalSearchType = get(params, 'filter.clinicalQuery.searchType', null);
    let result = null;
    if (searchType === 'id') {
        result = `${domainName}/mpi/Patient/${search}`;
    } else if (searchType === 'by_city' && search) {
        result = `${domainName}/mpi/Patient/search/searchByCity`;
    } else if (searchType === 'clinicalQuery' && clinicalSearchType) {
        result = `${domainName}/api/patient/clinicalSearch/${clinicalSearchType}`;
    } else if ((searchType === 'by_age' || searchType !== 'name') && search) {
        result = `${domainName}/mpi/Patient/search/advanced`;
    } else if (search) {
        result = `${domainName}/mpi/Patient?name=${search}`;
    }
    return result;
}

function getRequestMethod(params) {
    const isClinicalQuery = get(params, 'filter.clinicalQuery', null);
    const searchType = get(params, 'filter.filterType', null);
    const isSearchByCity = (searchType === 'by_city');
    const isSearchByAge = (searchType === 'by_age');
    const isAdvancedSearch = (searchType === 'advanced');
    return (isClinicalQuery || isSearchByCity || isSearchByAge || isAdvancedSearch) ? 'POST' : 'GET';
}

function getAdvancedSearchBody(params) {
    const searchParams = get(params, 'filter.filterText', null);
    const nhsNumber = get(searchParams, 'nhsNumber', null);
    const firstName = get(searchParams, 'firstName', null);
    const lastName = get(searchParams, 'lastName', null);
    const gender = get(searchParams, 'gender', null);
    const birthDate = get(searchParams, 'dateOfBirth', null);
    const from = get(searchParams, 'minAge', 0);
    const to = get(searchParams, 'maxAge', 100);
    let requestBody = {};
    if (birthDate) {
        requestBody = {
            nhsNumber: nhsNumber,
            firstName: firstName,
            lastName : lastName,
            gender: gender,
            birthDate: birthDate
        }
    } else {
        requestBody = {
            from: from,
            to: to,
            nhsNumber: nhsNumber,
            firstName: firstName,
            lastName : lastName,
            gender: gender,
        }
    }
    return requestBody;
}

function getClinicalQueryBody(params) {
    let requestBody = {
        query: get(params, 'filter.clinicalQuery.searchValue', null),
        gender: get(params, 'filter.clinicalQuery.gender', null),
    };
    const dateOfBirth = get(params, 'filter.clinicalQuery.dateOfBirth', null);
    const from = get(params, 'filter.clinicalQuery.minAge', null);
    const to = get(params, 'filter.clinicalQuery.maxAge', null);
    if (dateOfBirth) {
        requestBody.dateOfBirth = dateOfBirth;
    } else if (from && to) {
        requestBody.from = from;
        requestBody.to = to;
    }
    return requestBody;
}

function getRequestBody(params) {

    const isClinicalQuery = get(params, 'filter.clinicalQuery', null);
    const searchType = get(params, 'filter.filterType', null);
    const isSearchByCity = (searchType === 'by_city');
    const isSearchByAge = (searchType === 'by_age');
    const isAdvancedSearch = (searchType === 'advanced');

    if (!isClinicalQuery && !isSearchByCity && !isSearchByAge && !isAdvancedSearch) {
        return null;
    }

    let requestBody = {};
    if (isClinicalQuery) {
        requestBody = getClinicalQueryBody(params);
    } else if (isSearchByCity) {
        requestBody = {
            city: get(params, 'filter.filterText', null),
        }
    } else if (isAdvancedSearch) {
        requestBody = getAdvancedSearchBody(params);
    } else if (isSearchByAge) {
        const ageRange = get(params, 'filter.filterText', [0, 100]);
        requestBody = {
            from: ageRange[0],
            to: ageRange[1],
        };
    }

    return JSON.stringify(requestBody);
}

function getUserSearchResultsById(response) {
    const patientInfo = get(response, 'patient', null);
    const addressFromResponse = get(response, 'address', null);
    const result = {
        id: get(patientInfo, ['identifier', [0], 'value'], null),
        name: getTotalName(patientInfo, true),
        address: getTotalAddress(patientInfo, true),
        totalAddress: getTotalAddress(patientInfo, true),
        city: get(addressFromResponse, [[0], 'city'], null),
        country: get(addressFromResponse, [[0], 'country'], null),
        district: get(addressFromResponse, [[0], 'district'], null),
        postCode: get(addressFromResponse, [[0], 'postalCode'], null),
        birthDate: get(patientInfo, 'birthDate', null),
        department: get(patientInfo, 'department', null),
        gender: get(patientInfo, 'gender', null),
        nhsNumber: get(patientInfo, ['identifier', [0], 'value'], null),
        phone: get(patientInfo, 'telecom', null),
    };
    return [result];
}

function getUserSearchResults(response, params) {
    const pageNumber = get(params, 'pagination.page', 1);
    const numberPerPage = get(params, 'pagination.perPage', 10);
    const patientsArray = get(response, 'entry', []);
    const results = getPatientsList(patientsArray);
    const resultsSorting = getSortedResults(results, params);
    const startItem = (pageNumber - 1) * numberPerPage;
    const endItem = pageNumber * numberPerPage;
    return resultsSorting.slice(startItem, endItem);
}

const convertPatientsDataRequestToHTTP = (type, resource, params) => {
    let url = "";
    let method = "";
    const options = {};
    switch (type) {
        case GET_LIST: {
            url = getRequestUrl(params);
            method = getRequestMethod(params);
            options.method = method;
            if (!options.headers) {
                options.headers = new Headers({Accept: 'application/json'});
            }
            options.headers = {
                Authorization: "Bearer " + token,
                'Content-Type': 'application/json',
                'X-Requested-With': "XMLHttpRequest",
            };
            if (method === 'POST') {
                options.body = getRequestBody(params);
            }
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

            checkFormData(params);

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

            checkFormData(params);

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
    }
    return {url, options};
};

const convertPatientsHTTPResponse = (response, type, resource, params) => {
    switch (type) {

        case GET_LIST:
            const searchType = get(params, 'filter.filterType', null);
            const paginationResults = (searchType === 'id') ? getUserSearchResultsById(response) : getUserSearchResults(response, params);
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
                    name: [firstName, lastName].join(' '),
                    totalAddress: [line, city, district, postCode].join(', '),
                    address: line,
                    city: city,
                    country: country,
                    district: district,
                    postCode: postCode,
                    birthDate: get(patientFromResponse, 'birthDate', null),
                    department: get(patientFromResponse, 'department', null),
                    gender: get(patientFromResponse, 'gender', null),
                    source: get(patientFromResponse, ['identifier', [0], 'system'], null),
                    nhsNumber: id,
                    phone: get(patientFromResponse, 'telecom', null),
                }
            };

        case UPDATE:
            let newFirstName = get(params, 'data.firstName', null);
            let newLastName = get(params, 'data.lastName', null);

            let newAddressLine = get(params, 'data.address', null);
            let newCity = get(params, 'data.city', null);
            let newDistrict = get(params, 'data.district', null);
            let newPostalCode = get(params, 'data.postCode', null);

            let newData = params.data;
            newData.name = [newFirstName, newLastName].join(' ');
            newData.address = [newAddressLine, newCity, newDistrict, newPostalCode].join(' ');
            newData.totalAddress = [newAddressLine, newCity, newDistrict, newPostalCode].join(' ');
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
            dataFromRequest.name = get(params, 'data.firstName', null) + ' ' + get(params, 'data.lastName', null);
            let newAddress = get(params, 'data.address', null) + ' ' + get(params, 'data.city', null) + ' ' + get(params, 'data.district', null) + ' ' + get(params, 'data.postCode', null);
            dataFromRequest.address = newAddress;
            dataFromRequest.totalAddress = newAddress;
            dataFromRequest.isNew = true;
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
            totalAddress: getTotalAddress(item),
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
 * @param {shape}   item
 * @param {boolean} isSingle
 * @return {string}
 */
function getTotalName(item, isSingle = null) {
    const nameFromResponse = isSingle ? get(item, 'name', null) : get(item, 'resource.name', null);
    const namesArray = get(nameFromResponse, [[0], 'given'], null);
    const firstName = namesArray.join(' ');
    const surname = get(nameFromResponse, [[0], 'family'], null);
    return [firstName, surname].join(' ');
}

/**
 * This function prepare total patient address (for table)
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape}   item
 * @param {boolean} isSingle
 * @return {string}
 */
function getTotalAddress(item, isSingle) {
    const addressFromResponse = isSingle ? get(item, 'address', null) : get(item, 'resource.address', null);
    const addressArray = [
        get(addressFromResponse, [[0], 'line', [0]], null),
        get(addressFromResponse, [[0], 'city'], null),
        get(addressFromResponse, [[0], 'district'], null),
        get(addressFromResponse, [[0], 'postalCode'], null)
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
    if (!url) {
        return null;
    }

    let responseInfo = {};
    return fetch(url, options).then(response => {
        responseInfo.status = get(response, 'status', null);
        return response.json();
    })
        .then(res => {
            const search = get(params, 'filter.filterText', null);
            if (responseInfo.status === 404 && search) {
                responseInfo.errorMessage = 'No patient by that surname, please try again';
                let errorString = responseInfo.status + '|' + responseInfo.errorMessage;
                // throw new HttpError(errorString);
            } else if (responseInfo.status !== 200) {
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