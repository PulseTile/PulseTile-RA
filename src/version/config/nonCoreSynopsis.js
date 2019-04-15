import { faSyringe, faUserMd } from '@fortawesome/free-solid-svg-icons';

import { synopsisVaccinationsAction, synopsisTopThreeThingsAction } from "../actions/synopsisActions";

export const nonCoreSynopsisActions = [
    synopsisVaccinationsAction,
    synopsisTopThreeThingsAction,
];

export const nonCoreSynopsisData = [
    { id: "block-vaccinations", title: "Vaccinations", list: "vaccinations", icon: faSyringe, isActive: true },
    { id: "block-top3Things", title: "About Me", list: "top3Things", icon: faUserMd, isActive: true },
];