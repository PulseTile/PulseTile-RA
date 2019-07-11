import { faSyringe, faUserMd, faNotesMedical, faClinicMedical, faStethoscope, faProcedures, faBriefcaseMedical, faMicroscope, faAmbulance, faHeartbeat } from '@fortawesome/free-solid-svg-icons';

import { synopsisVaccinationsAction, synopsisTopThreeThingsAction } from "../actions/synopsisActions";

export const nonCoreSynopsisActions = [
    synopsisVaccinationsAction,
    synopsisTopThreeThingsAction,
];

export const nonCoreSynopsisData = [
    {
        id: "block-clinicalNotes",
        title: "Clinical Notes",
        list: "clinicalnotes",
        icon: faClinicMedical,
        isActive: true,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
        id: "block-MDT",
        title: "MDT",
        list: "mdtreports",
        icon: faNotesMedical,
        isActive: true,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
        id: "block-personalNotes",
        title: "Personal Notes",
        list: "personalnotes",
        icon: faClinicMedical,
        isActive: true,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
        id: "block-procedures",
        title: "Procedures",
        list: "procedures",
        icon: faProcedures,
        isActive: true,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
        id: "block-referrals",
        title: "Referrals",
        list: "referrals",
        icon: faBriefcaseMedical,
        isActive: true,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
        id: "block-labresults",
        title: "Results",
        list: "labresults",
        icon: faMicroscope,
        isActive: true,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
        id: "block-top3Things",
        title: "Top Three Things",
        list: "top3Things",
        icon: faUserMd,
        isActive: true,
        isSynopsis: true,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
        id: "block-toc",
        title: "Transfers Of Care",
        list: "toc",
        icon: faAmbulance,
        isActive: true,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
        id: "block-vaccinations",
        title: "Vaccinations",
        list: "vaccinations",
        icon: faSyringe,
        isActive: true,
        isSynopsis: true,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
        id: "block-vitalsigns",
        title: "Vitals",
        list: "vitalsigns",
        icon: faHeartbeat,
        isActive: true,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
        id: "block-events",
        title: "Events",
        list: "events",
        icon: faStethoscope,
        isActive: true,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
];