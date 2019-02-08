import { get } from "lodash";
import { resourceOrder } from "../../../version/config/theme.config";

/**
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {array} resources
 * @return {array}
 */
export function sortResourcesArray(resources) {
    let sortResource = [];
    for (let i = 0, n = resourceOrder.length; i < n; i++) {
        let currentItem = resourceOrder[i];
        for (let j = 0, m = resources.length; j < m; j++) {
            if (currentItem === get(resources, [j, 'name'], null)) {
                sortResource[i] = resources[j];
                break;
            }
        }
    }
    return sortResource;
}
