// NON-CORE PLUGINS CONFIGURATION LIST

import VaccinationsList from "../plugins/Vaccinations/VaccinationsList";

import VaccinationsIcon from "@material-ui/icons/List";

import VaccinationsShow from "../plugins/Vaccinations/VaccinationsShow";

import VaccinationsEdit from "../plugins/Vaccinations/VaccinationsEdit";

import VaccinationsCreate from "../plugins/Vaccinations/VaccinationsCreate";

export default [
    {
        name: "vaccinations",
        icon: VaccinationsIcon,
        list: VaccinationsList,
        show: VaccinationsShow,
        edit: VaccinationsEdit,
        create: VaccinationsCreate,
    },
];
