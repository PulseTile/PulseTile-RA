import { STATUS_INCOMPLETE, STATUS_COMPLETED } from "./statuses";

export function getAuthorName() {
    return localStorage.getItem('username') ? localStorage.getItem('username') : '-';
}

export const getSectionStatus = (data, totalNumber) => {
    const filledNumber = Object.values(data).length;
    const filledRation = filledNumber / totalNumber;
    return (filledRation > 0.5) ? STATUS_COMPLETED : STATUS_INCOMPLETE;
};