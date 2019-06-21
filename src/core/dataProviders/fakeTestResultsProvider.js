import get from "lodash/get";
import moment from "moment";
import {
    GET_LIST,
    GET_ONE,
    CREATE,
    UPDATE,
    HttpError,
} from "react-admin";
import sort, { ASC, DESC } from 'sort-array-objects';
import pluginFilters from "../config/pluginFilters";

import dummyTestResults from "../../version/plugins/Results/dummyTestResults";

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
    return response.map((item, id) => {
        return Object.assign({id: item.sourceId}, item);
    });
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

const fakePatientsProvider = (type, resource, params) => {
    switch (type) {
        case GET_LIST:
            const pageNumber = get(params, 'pagination.page', 1);
            const numberPerPage = get(params, 'pagination.perPage', 10);
            const results = getResultsFromResponse(resource, dummyTestResults, params);
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
            let response = {};
            for (let i = 0, n = dummyTestResults.length; i < n; i++) {
                let item = dummyTestResults[i];
                if (item.sourceId === params.id) {
                    response = item;
                    break;
                }
            }
            return {
                data: Object.assign({id: params.id}, response),
            };

        default:
            return { data: 'No results' };
    }
};

export default fakePatientsProvider;
