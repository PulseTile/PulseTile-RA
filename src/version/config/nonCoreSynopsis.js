import {faNotesMedical, faSyringe, faUserMd} from '@fortawesome/free-solid-svg-icons';

import { synopsisVaccinationsAction, synopsisTopThreeThingsAction } from "../actions/synopsisActions";

export const nonCoreSynopsisActions = [
    // synopsisVaccinationsAction,
    synopsisTopThreeThingsAction,
];

export const nonCoreSynopsisData = [
    // {
    //     id: "block-vaccinations",
    //     title: "Vaccinations",
    //     list: "vaccinations",
    //     icon: faSyringe,
    //     isActive: true,
    //     isSynopsis: true,
    //     description: "A record of the immunisations/vaccines you have had to help you avoid ill health",
    // },
    {
        id: "block-top3Things",
        title: "Top Three Things",
        list: "top3Things",
        icon: faUserMd,
        isActive: true,
        isSynopsis: true,
        description: "A place to record the top 3 issues that concern you today",
    },
];