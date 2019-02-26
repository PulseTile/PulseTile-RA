import { STATUS_INCOMPLETE, STATUS_COMPLETED } from "./statuses";

export const getSectionStatus = (data, totalNumber) => {
    const filledNumber = Object.values(data).length;
    const filledRation = filledNumber / totalNumber;
    return (filledRation > 0.5) ? STATUS_COMPLETED : STATUS_INCOMPLETE;
};