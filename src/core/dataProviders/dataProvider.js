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

import pluginFilters from "../config/pluginFilters";
import { token, domainName } from "../token";

import dummyPatients from "../pages/PatientsList/dummyPatients";

const apiPatientsUser = 'api/patients';
const patientID = localStorage.getItem('patientId') ? localStorage.getItem('patientId') : localStorage.getItem('userId');

/**
 * This constant prepare data for requests (URL and options)
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape}  type
 * @param {string} resource
 * @param {shape}  params
 */
const convertDataRequestToHTTP = (type, resource, params) => {
    let url = "";
    const options = {};
    switch (type) {
        case GET_LIST: {
            if (resource === 'patients') {
                url = `${domainName}/api/${resource}`;
            } else {
                url = `${domainName}/${apiPatientsUser}/${patientID}/${resource}`;
            }
            if (!options.headers) {
                options.headers = new Headers({ Accept: 'application/json' });
            }
            options.headers = {
                Authorization: "Bearer " + token,
                'X-Requested-With': "XMLHttpRequest",
            };
            break;
        }

        case GET_ONE:
            url = `${domainName}/${apiPatientsUser}/${patientID}/${resource}/${params.id}`;
            if (!options.headers) {
                options.headers = new Headers({ Accept: 'application/json' });
            }
            options.headers = {
                Authorization: "Bearer " + token,
                'X-Requested-With': "XMLHttpRequest",
            };
            break;

        case UPDATE:
            let data = Object.assign({userId: patientID}, params.data);
            url = `${domainName}/${apiPatientsUser}/${patientID}/${resource}/${params.id}`;
            options.method = "PUT";
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
            data = Object.assign({userId: patientID}, params.data);
            url = `${domainName}/${apiPatientsUser}/${patientID}/${resource}`;
            options.method = "POST";
            if (!options.headers) {
                options.headers = new Headers({ Accept: 'application/json' });
            }
            options.headers = {
                Authorization: "Bearer " + token,
                'Content-Type': 'application/json',
                'X-Requested-With': "XMLHttpRequest",
            };
            options.body = JSON.stringify(params.data);
            break;

        default:
            throw new Error(`Unsupported fetch action type ${type}`);
    }
    return { url, options };
};

/**
 * This function filters patients list by department
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} response
 * @param {shape} params
 * @return {Array}
 */
function getPatientsList(response, params) {

    const departmentsArray = ["CommunityCare", "Hospital", "MentalHealth", "Neighbourhood", "PrimaryCare"];
    const ageArray = ["first", "second", "third", "fourth"];
    const ageLimits = {
        first: { min: 19, max: 30 },
        second: { min: 31, max: 60 },
        third: { min: 61, max: 80 },
        fourth: { min: 81, max: 100 },
    };

    const filter = get(params, 'sort.field', null);
    let results = [];
    if (departmentsArray.indexOf(filter) !== -1) {
        results = Object.values(response).filter(item => {
            let filterWithSpaces = filter
                .replace(/([A-Z])/g, ' $1')
                .replace(/^./, function(str){ return str.toUpperCase(); })
                .trim();
            return (item.department === filterWithSpaces);
        });
    } else if (ageArray.indexOf(filter) !== -1) {
        const currentDate = new Date().getTime();
        const endDate = new moment(currentDate);
        results = Object.values(response).filter(item => {
            let birthDate = get(item, 'dateOfBirth', null);
            let startDate = new moment(birthDate);
            let duration = moment.duration(endDate.diff(startDate)).get('year');
            return (duration > ageLimits[filter].min && duration < ageLimits[filter].max);
        })
    } else {
        results = Object.values(response).map(item => {
            return Object.assign({id: item.sourceId}, item);
        });
    }
    return results;
}

/**
 * This function extracts results from response
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {string} resource
 * @param {shape}  response
 * @param {shape}  params
 * @return {array}
 */
function getResultsFromResponse(resource, response, params) {
    let results = [];
    if (resource !== 'patients') {
        results = response.map((item, id) => {
            return Object.assign({id: item.sourceId}, item);
        });
    } else {
        results = getPatientsList(response, params);
    }
    return results;
}

/**
 * This function cheks is current item consider to filter condition
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape}  item
 * @param {shape}  filters
 * @param {string} filterText
 * @return {boolean}
 */
function isItemConsider(item, filters, filterText) {
    let result = false;
    filters.forEach(filterItem => {
        let string = item[filterItem];
        if (String(string).toLowerCase().search(filterText) >= 0) {
            result = true;
        }
    });
    return result;
}

/**
 * This function filters response array
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {string} resource
 * @param {array}  results
 * @param {shape}  params
 * @return {array}
 */
function getFilterResults(resource, results, params) {
    const filterText = get(params, 'filter.filterText', null);
    const filters = pluginFilters[resource];
    return !filterText ? results : results.filter(item => isItemConsider(item, filters, filterText));
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

/**
 * This constant handle response data
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape}  response
 * @param {shape}  type
 * @param {string} resource
 * @param {shape}  params
 */
const convertHTTPResponse = (response, type, resource, params) => {
    switch (type) {

        case GET_LIST:

            const pageNumber = get(params, 'pagination.page', 1);
            const numberPerPage = get(params, 'pagination.perPage', 10);
            const results = getResultsFromResponse(resource, response, params);
            const resultsFiltering = getFilterResults(resource, results, params);
            const resultsSorting = getSortedResults(resultsFiltering, params);
            const startItem = (pageNumber - 1) * numberPerPage;
            const endItem = pageNumber * numberPerPage;
            const paginationResults = resultsSorting.slice(startItem, endItem);
            return {
                data: paginationResults,
                total: resultsSorting.length,
            };

        case GET_ONE:
        case UPDATE:
            return {
                data: Object.assign({id: response.sourceId}, response),
            };

        case CREATE:
            const dataFromRequest = get(params, 'data', null);
            const compositionUid = get(response, 'compositionUid', null);
            const compositionUidArray = compositionUid.split('::');
            const sourseID = compositionUidArray[0];
            dataFromRequest.id = get(response, 'host', null) + '-' + sourseID;
            return {
                data: dataFromRequest,
            };

        default:
            return { data: 'No results' };
    }
};

const dataProvider = (type, resource, params) => {
    let { url, options } = convertDataRequestToHTTP(type, resource, params);
    return fetch(url, options).then(response => response.json())
        .then(res => convertHTTPResponse(res, type, resource, params))
        .catch(err => console.log('Error: ', err));
};

const fakePatientsProvider = (type, resource, params) => {
    switch (type) {
        case GET_LIST:
            const pageNumber = get(params, 'pagination.page', 1);
            const numberPerPage = get(params, 'pagination.perPage', 10);
            const results = getResultsFromResponse(resource, dummyPatients, params);
            const resultsFiltering = getFilterResults(resource, results, params);
            const resultsSorting = getSortedResults(resultsFiltering, params);
            const startItem = (pageNumber - 1) * numberPerPage;
            const endItem = pageNumber * numberPerPage;
            const paginationResults = resultsSorting.slice(startItem, endItem);
            return {
                data: paginationResults,
                total: resultsSorting.length,
            };

        case GET_ONE:
        case UPDATE:
            let response = {};
            for (let i = 0, n = dummyPatients.length; i < n; i++) {
                let item = dummyPatients[i];
                if (item.id === params.id) {
                    response = item;
                    break;
                }
            }
            return {
                data: Object.assign({id: params.id}, response),
            };

        case CREATE:
            return {
                data: Object.assign({id: params.data.nhsNumber}, params.data)
            };

        default:
            return { data: 'No results' };
    }
};

/**
 * This function provides requests/response to server
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape}  type
 * @param {string} resource
 * @param {shape}  params
 */
export default (type, resource, params) => {
    if (resource === `patients`) {
        return fakePatientsProvider(type, resource, params);
    }
    return dataProvider(type, resource, params);
};