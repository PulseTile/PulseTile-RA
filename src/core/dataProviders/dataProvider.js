import { stringify } from "query-string";
import { get } from "lodash";
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

import { token } from '../token';

const domainName = "http://dev.ripple.foundation";
const apiPatientsUser = 'api/patients';
const currentUserID = "9999999000";

/**
 * Maps react-admin queries to a json-server powered REST API
 *
 * REQUESTS:
 * GET_LIST - for "list": returns list of items (Allergies, Medications, Problems etc.)
 * GET_ONE  - for "show": return information about one single item
 * UPDATE   - for "edit": update one single item
 * CREATE   - for "create": create new single item
 *
 * DELETE       => DELETE http://my.api.url/posts/123
 */
export default () => {

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
                if ('patients' === resource) {
                    url = `${domainName}/api/${resource}`;
                } else {
                    url = `${domainName}/${apiPatientsUser}/${currentUserID}/${resource}`;
                }
                options.method = "GET";
                if (!options.headers) {
                    options.headers = new Headers({ Accept: 'application/json' });
                }
                options.headers = {
                    Authorization: "Bearer " + token,
                };
                break;
            }

            case GET_ONE:
                url = `${domainName}/${apiPatientsUser}/${resource}/${params.id}`;
                options.method = "GET";
                if (!options.headers) {
                    options.headers = new Headers({ Accept: 'application/json' });
                }
                options.headers = {
                    Authorization: "Bearer " + token,
                };
                break;

            case UPDATE:
                let data = Object.assign({userId: currentUserID}, params.data);
                url = `${domainName}/${apiPatientsUser}/${resource}/${params.id}`;
                options.method = "PUT";
                if (!options.headers) {
                    options.headers = new Headers({ Accept: 'application/json' });
                }
                options.headers = {
                    Authorization: "Bearer " + token,
                    'Content-Type': 'application/json'
                };
                options.body = JSON.stringify(data);
                break;

            case CREATE:
                data = Object.assign({userId: currentUserID}, params.data);
                url = `${domainName}/${apiPatientsUser}/${resource}`;
                options.method = "POST";
                if (!options.headers) {
                    options.headers = new Headers({ Accept: 'application/json' });
                }
                options.headers = {
                    Authorization: "Bearer " + token,
                    'Content-Type': 'application/json'
                };
                options.body = JSON.stringify(params.data);
                break;

            // case DELETE:
            //     url = `${apiUrl}/${resource}/${params.id}`;
            //     options.method = "DELETE";
            //     break;

            // case GET_MANY: {
            //     const query = {
            //         [`id_like`]: params.ids.join("|")
            //     };
            //     url = `${apiUrl}/${resource}?${stringify(query)}`;
            //     break;
            // }

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
        if (-1 !== departmentsArray.indexOf(filter)) {
            results = Object.values(response).filter(item => {
                let filterWithSpaces = filter
                    .replace(/([A-Z])/g, ' $1')
                    .replace(/^./, function(str){ return str.toUpperCase(); })
                    .trim();
                return (item.department === filterWithSpaces);
            });
        } else if (-1 !== ageArray.indexOf(filter)) {
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

                let results = [];
                if ('patients' !== resource) {
                    results = response.map((item, id) => {
                        return Object.assign({id: item.sourceId}, item);
                    });
                } else {
                    results = getPatientsList(response, params);
                }

                const startItem = (pageNumber - 1) * numberPerPage;
                const endItem = pageNumber * numberPerPage;
                const paginationResults = results.slice(startItem, endItem);
                return {
                    data: paginationResults,
                    total: results.length,
                };

            case GET_ONE:
            case UPDATE:
                return {
                    data: Object.assign({id: response.sourceId}, response),
                };

            case CREATE:
                let compositionUidArray = response.compositionUid.split('::');
                let sourseID = compositionUidArray[0];
                let id = response.host + '-' + sourseID;
                return {
                    data: Object.assign({id: id}, response),
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
    return (type, resource, params) => {
        let { url, options } = convertDataRequestToHTTP(type, resource, params);
        return fetch(url, options).then(response => response.json())
            .then(res => convertHTTPResponse(res, type, resource, params))
            .catch(err => console.log('Error: ', err));
    };
};