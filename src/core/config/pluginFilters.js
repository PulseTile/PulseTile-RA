import nonCorePluginFilters from "../../version/config/pluginFilters";

/**
 * This component returns array of fields for filtering
 * (core plugins)
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @return {shape}
 */
const corePluginFilters = {
    allergies: ['cause', 'reaction'],
    contacts: ['name', 'relationship'],
    problems: ['problem'],
    medications: ['name'],
};

export default Object.assign({}, corePluginFilters, nonCorePluginFilters);
