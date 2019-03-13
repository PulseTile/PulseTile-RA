import nonCoreTableHeaders from "../../version/config/tableHeaders";

/**
 * This component returns titles and descriptions for table headers
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @return {shape}
 */
const coreTableHeaders = {
    allergies: {
        title: "Allergies",
        description: "Those things that your body reacts against , that you have an allergy to",
    },
    contacts: {
        title: "Contacts",
        description: "",
    },
    medications: {
        title: "Medications",
        description: "The medical tablets and other medications that you take regularly for your health care",
    },
    problems: {
        title: "Problems / Issues",
        description: "The key problems that affect your health, some with clear diagnoses from your doctor",
    },
};

export default Object.assign({}, coreTableHeaders, nonCoreTableHeaders);
