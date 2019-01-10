import { stringify } from "query-string";
import { get } from "lodash";
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
const apiPatientsUser = 'api/patients/9999999000';
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
                url = `${domainName}/${apiPatientsUser}/${resource}`;
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
                const results = response.map((item, id) => {
                   return Object.assign({id: item.sourceId}, item);
                });
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

                console.log('RESPONSE: ')
                console.log(response)

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

        console.log('----------------------------')
        console.log(type)
        console.log(url)
        console.log(options)
        console.log('----------------------------')

        return fetch(url, options).then(response => response.json())
            .then(res => convertHTTPResponse(res, type, resource, params))
            .catch(err => console.log('Error: ', err));
    };
};