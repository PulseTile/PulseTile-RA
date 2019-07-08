import get from "lodash/get";
import {
    GET_LIST,
    GET_ONE,
    CREATE,
    UPDATE,
    HttpError,
} from "react-admin";
import sort, { ASC, DESC } from 'sort-array-objects';

import pluginFilters from "../config/pluginFilters";
import { token, domainName } from "../token";

import fakePatientsProvider from "./fakePatientsProvider";

import newPatientsProvider from "./patientsProvider";
import { httpErrorAction } from '../actions/httpErrorAction';

const apiPatientsUser = 'patient';

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
            // url = `${domainName}/${apiPatientsUser}/${localStorage.getItem('patientId')}/${resource}`;

            if (resource === 'vitalsigns') {
                url = `${domainName}/${apiPatientsUser}/${localStorage.getItem('patientId')}/${resource}`;
            } else {
                url = `${domainName}/${apiPatientsUser}/${localStorage.getItem('patientId')}/synopsis/${resource}`;
            }

            if (!options.headers) {
                // options.headers = new Headers({ Accept: 'application/json' });
            }
            options.headers = {
                Authorization: "Bearer " + token,
                // 'X-Requested-With': "XMLHttpRequest",
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
            const newText = getTextByHeading(params, resource);
            let updateData = Object.assign({
                    userId: localStorage.getItem('patientId'),
                },
                params.data);

            updateData.text = newText;
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
            options.body = JSON.stringify({
                data: updateData
            });
            break;

        case CREATE:
            let newData = Object.assign({ userId: localStorage.getItem('patientId') }, params.data);
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
            options.body = JSON.stringify({
                data: newData
            });
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

function getTextByHeading(params, resource) {
    let result = '';
    if (resource === 'allergies') {
        result = get(params, 'data.cause', null);
    } else if (resource === 'problems') {
        result = get(params, 'data.problem', null);
    } else if (resource === 'medications') {
        result = get(params, 'data.name', null);
    }
    return result;
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

            const results = get(response, 'synopsis', []);

            // const pageNumber = get(params, 'pagination.page', 1);
            // const numberPerPage = get(params, 'pagination.perPage', 10);
            // const results = getResultsFromResponse(response);

            const resultsFiltering = getFilterResults(resource, results, params);
            const resultsSorting = getSortedResults(resultsFiltering, params);

            // const startItem = (pageNumber - 1) * numberPerPage;
            // const endItem = pageNumber * numberPerPage;
            // const paginationResults = resultsSorting.slice(startItem, endItem);

            const resultsWithId = [];
            let count = 1;
            resultsSorting.map(item => {
                if (resource === 'vitalsigns') {
                    resultsWithId.push({
                        id: item.sourceId,
                        text: '#' + count,
                        diastolicBP: item.newsScore,
                        heartRate: item.heartRate,
                        oxygenSaturation: item.oxygenSaturation,
                        respirationRate: item.respirationRate,
                        systolicBP: item.systolicBP,
                        temperature: item.temperature,
                        newsScore: item.newsScore,
                        source: item.source,
                        sourceId: item.sourceId,
                    });
                    count++;
                } else {
                    resultsWithId.push({
                        id: item.sourceId,
                        text: item.text,
                        source: item.source,
                        sourceId: item.sourceId,
                    })
                }

            });

            return {
                data: resultsWithId,
                total: results.length,
            };

        case GET_ONE:
            return {
                data: Object.assign({
                    id: response.sourceId,
                    text: getTextByHeading({ data: response }, resource)
                }, response),
            };

        case UPDATE:

            console.log('params', params)

            params.data.text = getTextByHeading(params, resource)
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
            dataFromRequest.text = getTextByHeading(params, resource);
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
    return dataProvider(type, resource, params);
};