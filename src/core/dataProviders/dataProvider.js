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
    DELETE_MANY,
    HttpError,
} from "react-admin";
import sort, { ASC, DESC } from 'sort-array-objects';

import pluginFilters from "../config/pluginFilters";
import { token, domainName } from "../token";

import dummyPatients from "../pages/PatientsList/dummyPatients";
import newPatientsProvider from "./patientsProvider";
import { httpErrorAction } from '../actions/httpErrorAction';

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
            url = `${domainName}/${apiPatientsUser}/${patientID}/${resource}`;
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
 * This function extracts results from response
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape}  response
 * @return {array}
 */
function getResultsFromResponse(response) {
    return response.map((item, id) => {
        return Object.assign({id: item.sourceId}, item);
    });
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

function isSearchPresented(item, search) {
    const userName = item.name.toLowerCase().trim();
    const searchString = search.toLowerCase().trim();
    return userName.search(searchString) >= 0;
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
            const results = getResultsFromResponse(response);
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
            return {
                data: Object.assign({id: response.sourceId}, response),
            };

        case UPDATE:
            return params;

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
            return convertHTTPResponse(res, type, resource, params)
        })
        .catch(err => {
            console.log('Error: ', err);
            throw new Error(err);
        });
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
        return newPatientsProvider(type, resource, params);
    }
    return dataProvider(type, resource, params);
};