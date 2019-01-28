// NON-CORE PLUGINS CONFIGURATION LIST

// VACCINATIONS
import VaccinationsList from "../plugins/Vaccinations/VaccinationsList";

// TOP THREE THINGS
import TopThreeThingsList from "../plugins/TopThreeThings/TopThreeThingsList";

export default [
    {
        name: "vaccinations",
        label: "Vaccinations",
        list: VaccinationsList,
    },
    {
        name: "top3Things",
        label: "Top Three Things",
        list: TopThreeThingsList,
    },
];
