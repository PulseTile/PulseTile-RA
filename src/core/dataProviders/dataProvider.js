import get from "lodash/get";
import {
    GET_LIST,
    GET_ONE,
    CREATE,
    UPDATE,
    HttpError,
} from "react-admin";
import moment from "moment";
import sort, { ASC, DESC } from 'sort-array-objects';

import pluginFilters from "../config/pluginFilters";
import { token, domainName } from "../token";

import fakePatientsProvider from "./fakePatientsProvider";
import fakeTestResultsProvider from "./fakeTestResultsProvider";

import newPatientsProvider from "./patientsProvider";
import { httpErrorAction } from '../actions/httpErrorAction';

const apiPatientsUser = 'api/patients';

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
            url = `${domainName}/${apiPatientsUser}/${localStorage.getItem('patientId')}/${resource}`;
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
            url = `${domainName}/${apiPatientsUser}/${localStorage.getItem('patientId')}/${resource}/${params.id}`;
            if (!options.headers) {
                options.headers = new Headers({ Accept: 'application/json' });
            }
            options.headers = {
                Authorization: "Bearer " + token,
                'X-Requested-With': "XMLHttpRequest",
            };
            break;

        case UPDATE:
            let updateData = Object.assign({userId: localStorage.getItem('patientId')}, params.data);

            if (resource === 'problems') {
                let dateCreated = get(params, 'data.dateCreated', null);
                let dateOfOnset = get(params, 'data.dateOfOnset', null);
                updateData.dateCreated = moment(dateCreated).format('DD-MM-YYYY');
                updateData.dateOfOnset = moment(dateOfOnset).format('YYYY-MM-DD');
            }

            url = `${domainName}/${apiPatientsUser}/${localStorage.getItem('patientId')}/${resource}/${params.id}`;
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
            let newData = Object.assign({userId: localStorage.getItem('patientId')}, params.data);
            url = `${domainName}/${apiPatientsUser}/${localStorage.getItem('patientId')}/${resource}`;
            options.method = "POST";
            if (!options.headers) {
                options.headers = new Headers({ Accept: 'application/json' });
            }
            options.headers = {
                Authorization: "Bearer " + token,
                'Content-Type': 'application/json',
                'X-Requested-With': "XMLHttpRequest",
            };
            options.body = JSON.stringify(newData);
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
        return Object.assign({
            number: (id + 1),
            id: item.sourceId
        }, item);
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
                total: results.length,
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
            let sourceID = '';
            if (compositionUid) {
                const compositionUidArray = compositionUid.split('::');
                sourceID = compositionUidArray[0];
            }
            dataFromRequest.id = get(response, 'host', null) + '-' + sourceID;
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

const dataProvider = (type, resource, params) => {
    let { url, options } = convertDataRequestToHTTP(type, resource, params);
    let responseInfo = '';
    return fetch(url, options).then(response => {
        responseInfo = get(response, 'status', null);
        return response.json();
    })
        .then(res => {
            if (responseInfo !== 200) {
                responseInfo += '|' + get(res, 'error', null);
                throw new HttpError(responseInfo);
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
    // if (resource === `patients`) {
    //     return fakePatientsProvider(type, resource, params);
    // }
    if (resource === `patients`) {
        return newPatientsProvider(type, resource, params);
    }
    if (resource === `labresults`) {
        return fakeTestResultsProvider(type, resource, params);
    }
    return dataProvider(type, resource, params);
};