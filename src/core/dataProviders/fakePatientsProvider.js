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

import dummyPatients from "../pages/PatientsList/dummyPatients";

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
    return [firstName, surname].join(' ');
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

export default fakePatientsProvider;
