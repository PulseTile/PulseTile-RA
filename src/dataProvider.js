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

import { token } from './token';

/**
 * Maps react-admin queries to a json-server powered REST API
 *
 * @see https://github.com/typicode/json-server
 * @example
 * GET_LIST     => GET http://my.api.url/posts?_sort=title&_order=ASC&_start=0&_end=24
 * GET_ONE      => GET http://my.api.url/posts/123
 * GET_MANY     => GET http://my.api.url/posts/123, GET http://my.api.url/posts/456, GET http://my.api.url/posts/789
 * UPDATE       => PUT http://my.api.url/posts/123
 * CREATE       => POST http://my.api.url/posts/123
 * DELETE       => DELETE http://my.api.url/posts/123
 */
export default apiUrl => {

    /**
     *
     */
    const convertDataRequestToHTTP = (type, resource, params) => {
        let url = "";
        const options = {};

        switch (type) {

            case GET_LIST: {

                const pageNumber = get(params, 'pagination.page', 1);
                const numberPerPage = get(params, 'pagination.perPage', 10);

                const apiPatientsUser = 'api/patients/9999999000';
                url = `${apiUrl}/${apiPatientsUser}/${resource}`;

                options.method = "GET";
                if (!options.headers) {
                    options.headers = new Headers({ Accept: 'application/json' });
                }
                options.headers = {
                    Authorization: "Bearer "+token,
                };

                break;
            }

            // case GET_ONE:
            //     url = `${apiUrl}/${resource}/${params.id}`;
            //     break;
            // case GET_MANY_REFERENCE: {
            //     const { page, perPage } = params.pagination;
            //     const { field, order } = params.sort;
            //     const query = {
            //         ...fetchUtils.flattenObject(params.filter),
            //         [params.target]: params.id,
            //         _sort: field,
            //         _order: order,
            //         _start: (page - 1) * perPage,
            //         _end: page * perPage
            //     };
            //     url = `${apiUrl}/${resource}?${stringify(query)}`;
            //     break;
            // }
            // case UPDATE:
            //     url = `${apiUrl}/${resource}/${params.id}`;
            //     options.method = "PUT";
            //     options.body = JSON.stringify(params.data);
            //     break;
            // case CREATE:
            //     url = `${apiUrl}/${resource}`;
            //     options.method = "POST";
            //     options.body = JSON.stringify(params.data);
            //     break;
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
     *
     */
    const convertHTTPResponse = (response, type, resource, params) => {
        switch (type) {
            case GET_LIST:

                const pageNumber = get(params, 'pagination.page', 1);
                const numberPerPage = get(params, 'pagination.perPage', 10);

                const results = response.map((item, id) => {
                   return Object.assign({id: id}, item);
                });

                const startItem = (pageNumber - 1) * numberPerPage;
                const endItem = pageNumber * numberPerPage;
                const paginationResults = results.slice(startItem, endItem);

                return {
                    data: paginationResults,
                    total: results.length,
                };

            default:
                return { data: 'No results' };
        }
    };

    /**
     *
     */
    return (type, resource, params) => {

        // if (type === UPDATE_MANY) {
        //     return Promise.all(
        //         params.ids.map(id =>
        //             httpClient(`${apiUrl}/${resource}/${id}`, {
        //                 method: "PATCH",
        //                 body: JSON.stringify(params.data)
        //             })
        //         )
        //     ).then(responses => ({
        //         data: responses.map(response => response.json)
        //     }));
        // }
        //
        // if (type === DELETE_MANY) {
        //     return Promise.all(
        //         params.ids.map(id =>
        //             httpClient(`${apiUrl}/${resource}/${id}`, {
        //                 method: "DELETE"
        //             })
        //         )
        //     ).then(responses => ({
        //         data: responses.map(response => response.json)
        //     }));
        // }

        let { url, options } = convertDataRequestToHTTP(type, resource, params);
        return fetch(url, options).then(response => response.json()).then(res => {
            if (Array.isArray(res)) {
                return convertHTTPResponse(res, type, resource, params);
            }
            throw new Error(res);
        }).catch(err => console.log('Error: ', err));
    };
};