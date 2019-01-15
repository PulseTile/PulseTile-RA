// NON-CORE PLUGINS CONFIGURATION LIST

// VACCINATIONS
import VaccinationsList from "../plugins/Vaccinations/VaccinationsList";
import VaccinationsIcon from "@material-ui/icons/List";
import VaccinationsShow from "../plugins/Vaccinations/VaccinationsShow";
import VaccinationsEdit from "../plugins/Vaccinations/VaccinationsEdit";
import VaccinationsCreate from "../plugins/Vaccinations/VaccinationsCreate";

// TOP THREE THINGS
import TopThreeThingsList from "../plugins/TopThreeThings/TopThreeThingsList";
import TopThreeThingsIcon from "@material-ui/icons/List";

export default [
    {
        name: "vaccinations",
        icon: VaccinationsIcon,
        label: "Vaccinations",
        list: VaccinationsList,
        show: VaccinationsShow,
        create: VaccinationsCreate,
    },
    {
        name: "top3Things",
        icon: TopThreeThingsIcon,
        label: "Top Three Things",
        list: TopThreeThingsList,
        show: null,
        edit: null,
        create: null,
    },
];
