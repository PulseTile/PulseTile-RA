import { faSyringe, faUserMd } from '@fortawesome/free-solid-svg-icons';

import { synopsisVaccinationsAction, synopsisTopThreeThingsAction } from "../actions/synopsisActions";

export const nonCoreSynopsisActions = [
    synopsisVaccinationsAction,
    synopsisTopThreeThingsAction,
];

export const nonCoreSynopsisData = [
    { id: "block-vaccinations", title: "Vaccinations", list: "vaccinations", icon: faSyringe },
    { id: "block-top3Things", title: "Top Three Things", list: "top3Things", icon: faUserMd },
];