import get from "lodash/get";
import { HttpError } from "react-admin";

function getParamsByResource(resource) {
    let paramsArray = [];
    if (resource === 'allergies') {
        paramsArray = [
            { param: 'data.cause', label: 'Cause' },
            { param: 'data.reaction', label: 'Reaction / Description' },
            { param: 'data.causeCode', label: 'Terminology' },
            { param: 'data.causeTerminology', label: 'Terminology Code' },
        ];
    } else if (resource === 'contacts') {
        paramsArray = [
            { param: 'data.name', label: 'Name' },
            { param: 'data.relationship', label: 'Relationship' },
            { param: 'data.relationshipCode', label: 'Relationship Type' },
            { param: 'data.relationshipTerminology', label: 'Relationship Terminology' },
            { param: 'data.contactInformation', label: 'Contact Information' },
            { param: 'data.notes', label: 'Note' },
        ];
    } else if (resource === 'medications') {
        paramsArray = [
            { param: 'data.name', label: 'Name' },
            { param: 'data.route', label: 'Route' },
            { param: 'data.doseAmount', label: 'Dose Amount' },
            { param: 'data.doseDirections', label: 'Dose Description' },
            { param: 'data.doseTiming', label: 'Dose Timing' },
            { param: 'data.medicationCode', label: 'Medication Description' },
            { param: 'data.startDate', label: 'Start date' },
        ];
    }  else if (resource === 'problems') {
        paramsArray = [
            { param: 'data.problem', label: 'Problem / Issue' },
            { param: 'data.dateOfOnset', label: 'Date of Onset' },
            { param: 'data.description', label: 'Description' },
            { param: 'data.code', label: 'Terminology Code' },
            { param: 'data.terminology', label: 'Terminology' },
        ];
    } else if (resource === 'clinicalnotes') {
        paramsArray = [
            { param: 'data.clinicalNotesType', label: 'Type' },
            { param: 'data.note', label: 'Note' },
        ];
    } else if (resource === 'events') {
        paramsArray = [
            { param: 'data.name', label: 'Name' },
            { param: 'data.type', label: 'Type' },
            { param: 'data.description', label: 'Notes' },
            { param: 'data.dateTime', label: 'Event date' },
        ];
    } else if (resource === 'mdtreports') {
        paramsArray = [
            { param: 'data.serviceTeam', label: 'Service / Team' },
            { param: 'data.dateOfRequest', label: 'Date of Request' },
            { param: 'data.dateOfMeeting', label: 'Date of Meeting' },
            { param: 'data.servicePageLink', label: 'Link to MDT Web Service Directory' },
            { param: 'data.question', label: 'Question For MDT' },
            { param: 'data.notes', label: 'Meeting Discussion' },
        ];
    } else if (resource === 'personalnotes') {
        paramsArray = [
            { param: 'data.noteType', label: 'Type' },
            { param: 'data.notes', label: 'Note' },
        ];
    } else if (resource === 'procedures') {
        paramsArray = [
            { param: 'data.procedureName', label: 'Procedure Name' },
            { param: 'data.date', label: 'Date of Procedure' },
            { param: 'data.performer', label: 'Procedure Performed By' },
            { param: 'data.notes', label: 'Procedure Notes' },
            { param: 'data.procedureTerminology', label: 'Terminology' },
            { param: 'data.procedureCode', label: 'Code' },
        ];
    } else if (resource === 'referrals') {
        paramsArray = [
            { param: 'data.referralFrom', label: 'Referral From' },
            { param: 'data.referralTo', label: 'Referral To' },
            { param: 'data.dateOfReferral', label: 'Date of Referral' },
            { param: 'data.referralReason', label: 'Reason for Referral' },
            { param: 'data.referralSummary', label: 'Clinical Summary' },
        ];
    } else if (resource === 'top3Things') {
        paramsArray = [
            { param: 'data.name1', label: 'Issue #1' },
            { param: 'data.name2', label: 'Issue #2' },
            { param: 'data.name3', label: 'Issue #3' },
            { param: 'data.description1', label: 'Description #1' },
            { param: 'data.description2', label: 'Description #2' },
            { param: 'data.description3', label: 'Description #3' },
        ];
    } else if (resource === 'vaccinations') {
        paramsArray = [
            { param: 'data.vaccinationName', label: 'Name' },
            { param: 'data.vaccinationDateTime', label: 'Vaccination date' },
            { param: 'data.series', label: 'Series' },
            { param: 'data.comment', label: 'Comment' },
        ];
    }
    return paramsArray;
}

export function checkFormData(resource, params) {
    let paramsArray = getParamsByResource(resource);
    if (resource === 'medications') {
        let currentDateObject = new Date();
        let startDateObject = new Date(get(params, 'data.startDate', null));
        if (startDateObject > currentDateObject) {
            throw new HttpError('777|Please enter the correct Start Date');
        }
    }
    let missedParamsArray = [];
    for (let i = 0, n = paramsArray.length; i < n; i++) {
        let item = paramsArray[i];
        let value = get(params, item.param, null);
        if (!value) {
            missedParamsArray.push(item.label);
        }
    }
    if (missedParamsArray.length > 0) {
        const string = missedParamsArray.join(', ');
        throw new HttpError('777|Please add ' + string);
    }

    return true;
}