import VaccinationsList from "../plugins/Vaccinations/VaccinationsList";
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
