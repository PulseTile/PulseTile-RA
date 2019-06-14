import moment from "moment";
import get from "lodash/get";
import PDFDocument from "@react-pdf/pdfkit";
import blobStream from "blob-stream";
import ace from 'brace';
import 'brace/mode/javascript';
import 'brace/theme/monokai';

import page1 from "./page1";
import page2 from "./page2";

import { FOCUS_LEFT, FOCUS_RIGHT } from "../../fragments/cprVariants";
import { DATE_FORMAT } from "../../statuses";

function address(personalDetails){
    let arr = [];

    let streetAddress = get(personalDetails, 'streetAddress', null);
    let addressSecondLine = get(personalDetails, 'addressSecondLine', null);
    let city = get(personalDetails, 'city', null);
    let country = get(personalDetails, 'country', null);
    let county = get(personalDetails, 'county', null);
    let postCode = get(personalDetails, 'postCode', null);

    if (streetAddress) {
        arr.push(streetAddress);
    }
    if (addressSecondLine) {
        arr.push(addressSecondLine);
    }
    if (city) {
        arr.push(city);
    }
    if (country) {
        arr.push(country);
    }
    if (county) {
        arr.push(county);
    }
    if (postCode) {
        arr.push(postCode);
    }

    return arr.join(', ');
}


function getDDMMMYYYY(date){
    return moment(date).isValid() ? moment(date).format(DATE_FORMAT) : null;
}

function getClinicalRecommendations(obj){
    const focusValue = get(obj, 'clinicalRecommendations.focusValue', null);
    if (!focusValue) {
        return null;
    } else if (focusValue === FOCUS_LEFT) {
        return 5;
    } else if (focusValue === FOCUS_RIGHT) {
        return 95;
    } else if (focusValue === 50) {
        return 50;
    }
}

function getWrappedText(text, rowLength) {
    if (!text || text === "") {
        return null;
    }
    const stringText = text.toString();
    const textArray = stringText.split(' ');
    let rows = [];
    let currentRow = '';
    let currentRowArray = [];
    for (let i = 0, n = textArray.length; i < n; i++) {
        let item = textArray[i];
        if ((currentRow.length + item.length) <= rowLength) {
            currentRow += item + ' ';
            currentRowArray.push(item);
        } else {
            rows.push(currentRowArray.join(' '));
            currentRow = item + ' ';
            currentRowArray = [];
            currentRowArray.push(item);
        }
    }
    if (currentRowArray.length > 0) {
        rows.push(currentRowArray.join(' '));
    }
    return rows;
}

function getSectionFourCpr(obj) {
    const cprValue = get(obj, 'clinicalRecommendations.cprValue', null);
    let result = null;
    switch (cprValue) {
        case 'CPRRecommended':
            result = 100;
            break;
        case 'ModifiedCPR':
            result = 300;
            break;
        case 'NotforCPR':
            result = 500;
            break;
    }
    return result;
}

export default (obj, patientInfo) => {

    const personalDetails = {
        preferredName: get(patientInfo, 'prefix', null),
        firstName: get(patientInfo, 'firstName', null),
        surname: get(patientInfo, 'lastName', null),
        streetAddress: get(patientInfo, 'address', null),
        addressSecondLine: "",
        city: get(patientInfo, 'city', null),
        county: get(patientInfo, 'district', null),
        postCode: get(patientInfo, 'postCode', null),
        country: get(patientInfo, 'country', null),
        nhsNumber: get(patientInfo, 'nhsNumber', null),
        birthDate: get(patientInfo, 'birthDate', null),
    };


    let doc = new PDFDocument();
    let stream = doc.pipe(blobStream());

    let seniorClinician;
    let clinicians = [];

    const signaturesArray = get(obj, 'clinicalSignatures.signaturesArray', []);
    const signaturesNumber = signaturesArray.length;
    for (let i = 0; i < signaturesNumber; i++) {
        let item = signaturesArray[i];
        if (item.isSrc) {
            seniorClinician = item;
        } else {
            clinicians.push(item);
        }
    }

    let form = {

        preferredName: get(personalDetails, 'preferredName', null),
        fullName: get(personalDetails, 'firstName', null) + ' ' + get(personalDetails, 'surname', null),
        dateOfBirth: getDDMMMYYYY(get(personalDetails, 'birthDate', null)),
        dateCompleted: get(personalDetails, 'dateCompleted', null),
        chiNumber: get(personalDetails, 'nhsNumber', null),
        address: address(personalDetails),

        sectionTwoDiagnostics: get(obj, 'summaryInformation.summary', null),
        sectionTwoDetails: get(obj, 'summaryInformation.details', null),

        sectionThreeX: get(obj, 'personalPreferences.preferencesValue', null),
        sectionThreeDetails: get(obj, 'personalPreferences.preferencesText', null),

        sectionFourClinicalRecommendationsX: getClinicalRecommendations(obj),
        sectionFourClinicalRecommendations: get(obj, 'clinicalRecommendations.clinicalGuidance', null),

        sectionFourCprX: getSectionFourCpr(obj),

        sectionFiveCapacity: get(obj, 'capacityAndRepresentation.capacityFirst', null),
        sectionFiveLegalProxy: get(obj, 'capacityAndRepresentation.legalProxyValue', null),

        sectionSixA: (get(obj, 'involvement.involvementValue', null) === 'valueSetA'),
        sectionSixB: (get(obj, 'involvement.involvementValue', null) === 'valueSetB'),
        sectionSixC: (get(obj, 'involvement.involvementValue', null) === 'valueSetC'),
        sectionSixC1: (get(obj, 'involvement.involvementValue', null) === 'valueSetC1'),
        sectionSixC2: (get(obj, 'involvement.involvementValue', null) === 'valueSetC2'),
        sectionSixC3: (get(obj, 'involvement.involvementValue', null) === 'valueSetC3'),
        sectionSixD: (get(obj, 'involvement.involvementValue', null)  === 'valueSetD'),
        sectionSixNotSelectingReason: get(obj, 'involvement.notSelectingReason', null),
        sectionSixDocumentExplanation: get(obj, 'involvement.documentExplanation', null),

        sectionSevenClinician1: {
            designation: ( clinicians[0] ? clinicians[0].designation : '' ),
            name: ( clinicians[0] ? clinicians[0].clinicialName : '' ),
            number: ( clinicians[0] ? clinicians[0].gmcNumber : '' ),
            dateTime: ( clinicians[0] ? getDDMMMYYYY(clinicians[0].dateAndTime) : '' )
        },
        sectionSevenClinician2: {
            designation: ( clinicians[1] ? clinicians[1].designation : '' ),
            name: ( clinicians[1] ? clinicians[1].clinicialName : '' ),
            number: ( clinicians[1] ? clinicians[1].gmcNumber : '' ),
            dateTime: ( clinicians[1] ? getDDMMMYYYY(clinicians[1].dateAndTime) : '' )
        },
        sectionSevenSeniorClinician: {
            designation: ( seniorClinician ? seniorClinician.designation : '' ),
            name: ( seniorClinician ? seniorClinician.clinicialName : '' ),
            number: ( seniorClinician ? seniorClinician.gmcNumber : '' ),
            dateTime: ( seniorClinician ? getDDMMMYYYY(seniorClinician.dateAndTime) : '' )
        },
        sectionEightContact1: {
            role: get(obj, 'emergencyContacts.contactsArray[0].role', null),
            name: get(obj, 'emergencyContacts.contactsArray[0].name', null),
            telephone: get(obj, 'emergencyContacts.contactsArray[0].phone', null),
            details: get(obj, 'emergencyContacts.contactsArray[0].details', null),
        },
        sectionEightContact2: {
            role: get(obj, 'emergencyContacts.contactsArray[1].role', null),
            name: get(obj, 'emergencyContacts.contactsArray[1].name', null),
            telephone: get(obj, 'emergencyContacts.contactsArray[1].phone', null),
            details: get(obj, 'emergencyContacts.contactsArray[1].details', null),
        },
        sectionEightContact3: {
            role: get(obj, 'secons.emergencyContacts.contactsArray[2].role', null),
            name: get(obj, 'emergencyContacts.contactsArray[2].name', null),
            telephone: get(obj, 'emergencyContacts.contactsArray[2].phone', null),
            details: get(obj, 'emergencyContacts.contactsArray[2].details', null),
        },
        sectionEightContact4: {
            role: get(obj, 'emergencyContacts.contactsArray[3].role', null),
            name: get(obj, 'emergencyContacts.contactsArray[3].name', null),
            telephone: get(obj, 'emergencyContacts.contactsArray[3].phone', null),
            details: get(obj, 'emergencyContacts.contactsArray[3].details', null),
        },
        sectionNineConfirmation1: {
            reviewDate: getDDMMMYYYY(get(obj, 'confirmation.confirmationsArray[0].reviewDate', null)),
            designation: get(obj, 'confirmation.confirmationsArray[0].designation', null),
            name: get(obj, 'confirmation.confirmationsArray[0].clinicialName', null),
            number: get(obj, 'confirmation.confirmationsArray[0].gmcNumber', null),
        },
        sectionNineConfirmation2: {
            reviewDate: getDDMMMYYYY(get(obj, 'confirmation.confirmationsArray[1].reviewDate', null)),
            designation: get(obj, 'confirmation.confirmationsArray[1].designation', null),
            name: get(obj, 'confirmation.confirmationsArray[1].clinicialName', null),
            number: get(obj, 'confirmation.confirmationsArray[1].gmcNumber', null),
        }
    };

    doc.image(page1, 0, 0, {width: doc.page.width, height: doc.page.height});

    // SECTION 1
    if (get(form, 'preferredName', null)) {
        doc.fontSize(10)
            .text(form.preferredName, 316, 28, {
                width: 267,
                height: 23
            });
    }
    if (get(form, 'fullName', null)) {
        doc.text(form.fullName, 31, 85, {
            width: 267,
            height: 23
        });
    }
    if (get(form, 'dateOfBirth', null)) {
        doc.text(form.dateOfBirth, 316, 83, {
            width: 172,
            height: 23
        });
    }

    const defaultDate = moment().format(DATE_FORMAT);
    const dateCompleted = get(form, 'dateCompleted', null) ? form.dateCompleted : defaultDate;
    if (dateCompleted) {
        doc.text(dateCompleted, 505, 100, {
            width: 75,
            height: 23
        });
    }
    if (get(form, 'chiNumber', null)) {
        doc.fontSize(12)
            .text(form.chiNumber.toString(), 33, 129, {
                width: 285,
                height: 23,
                characterSpacing: 16.5
            });
    }

    doc.fontSize(10);

    if (get(form, 'address', null)) {
        const textRowsArray = getWrappedText(form.address, 35);
        const initialPositionOY = 115;
        for (let i = 0, n = textRowsArray.length; i < n; i++) {
            let row = textRowsArray[i];
            doc.text(row, 316, initialPositionOY + i * 10);
        }
    }

    // SECTION 2
    if (get(form, 'sectionTwoDiagnostics', null)) {
        const textRowsArray = getWrappedText(form.sectionTwoDiagnostics, 125);
        const initialPositionOY = 208;
        for (let i = 0, n = textRowsArray.length; i < n; i++) {
            let row = textRowsArray[i];
            doc.text(row, 31, initialPositionOY + i * 15);
        }
    }
    if (get(form, 'sectionTwoDetails', null)) {
        const textRowsArray = getWrappedText(form.sectionTwoDetails, 125);
        const initialPositionOY = 300;
        for (let i = 0, n = textRowsArray.length; i < n; i++) {
            let row = textRowsArray[i];
            doc.text(row, 31, initialPositionOY + i * 15);
        }
    }

    // SECTION 3
    if (get(form, 'sectionThreeX', null)) {
        doc.fontSize(14)
            .text('X', (278 * (form.sectionThreeX / 100))+169, 389, {
                width: 10,
                height: 23
            });
    }
    if (get(form, 'sectionThreeDetails', null)) {
        const textRowsArray = getWrappedText(form.sectionThreeDetails, 125);
        const initialPositionOY = 447;
        doc.fontSize(10);
        for (let i = 0, n = textRowsArray.length; i < n; i++) {
            let row = textRowsArray[i];
            doc.text(row, 31, initialPositionOY + i * 15);
        }
    }

    // SECTION 4
    if (get(form, 'sectionFourClinicalRecommendationsX', null)) {
        doc.fontSize(14)
            .text('X', (171 * (form.sectionFourClinicalRecommendationsX / 100))+187, 544, {
                width: 10,
                height: 23
            });
    }
    if (get(form, 'sectionFourClinicalRecommendations', null)) {
        const textRowsArray = getWrappedText(form.sectionFourClinicalRecommendations, 125);
        const initialPositionOY = 618;
        doc.fontSize(10);
        for (let i = 0, n = textRowsArray.length; i < n; i++) {
            let row = textRowsArray[i];
            doc.text(row, 31, initialPositionOY + i * 15);
        }
    }

    const sectionFourCprX = get(form, 'sectionFourCprX', null);
    if (sectionFourCprX) {
        let initialPositionOY = 760;
        doc.fontSize(14)
            .text('X', sectionFourCprX, initialPositionOY, {
                width: 10,
                height: 23
            });
        doc.ellipse(sectionFourCprX + 5, initialPositionOY + 5, 16, 10)
            .lineWidth(2)
            .strokeColor('#ff0000')
            .stroke();
    }

    doc.addPage();
    doc.image(page2, 0, 0, {width: doc.page.width, height: doc.page.height});

    // SECTION 5
    if (form.sectionFiveCapacity) {
        doc.ellipse(535, 52, 16, 10)
            .lineWidth(2)
            .strokeColor('#ff0000')
            .stroke();
    } else {
        doc.ellipse(562, 52, 16, 10)
            .lineWidth(2)
            .strokeColor('#ff0000')
            .stroke();
    }

    // Legal Proxy
    switch (get(form, 'sectionFiveLegalProxy', null)) {
        case 'Yes': // Yes
            doc.ellipse(470, 89, 16, 10)
                .lineWidth(2)
                .strokeColor('#ff0000')
                .stroke();
            break;
        case 'No': // No
            doc.ellipse(498, 89, 14, 10)
                .lineWidth(2)
                .strokeColor('#ff0000')
                .stroke();
            break;
        case 'Unknown': // Unknown
            doc.ellipse(544, 89, 35, 12)
                .lineWidth(2)
                .strokeColor('#ff0000')
                .stroke();
            break;
    }

    // SECTION 6
    if (get(form, 'sectionSixA', null)) {
        doc.fontSize(14)
            .text('X', 34, 163, {
                width: 10,
                height: 23
            });
    }
    if (get(form, 'sectionSixB', null)) {
        doc.fontSize(14)
            .text('X', 34, 196, {
                width: 10,
                height: 23
            });
    }
    if (get(form, 'sectionSixC', null)) {
        doc.fontSize(14)
            .text('X', 34, 242, {
                width: 10,
                height: 23
            });
    }
    if (get(form, 'sectionSixC1', null)) {
        doc.fontSize(14)
            .text('X', 42, 271, {
                width: 10,
                height: 23
            });
    }
    if (get(form, 'sectionSixC2', null)) {
        doc.fontSize(14)
            .text('X', 42, 288, {
                width: 10,
                height: 23
            });
    }
    if (get(form, 'sectionSixC3', null)) {
        doc.fontSize(14)
            .text('X', 42, 315, {
                width: 10,
                height: 23
            });
    }

    const sectionSixNotSelectingReason = get(form, 'sectionSixNotSelectingReason', null);
    if (sectionSixNotSelectingReason && sectionSixNotSelectingReason !== "") {
        const textRowsArray = getWrappedText(sectionSixNotSelectingReason, 125);
        const initialPositionOY = 360;
        doc.fontSize(10);
        for (let i = 0, n = textRowsArray.length; i < n; i++) {
            let row = textRowsArray[i];
            doc.text(row, 31, initialPositionOY + i * 15);
        }
    }

    const sectionSixDocumentExplanation = get(form, 'sectionSixDocumentExplanation', null);
    if (sectionSixDocumentExplanation && sectionSixDocumentExplanation !== "") {
        const textRowsArray = getWrappedText(sectionSixDocumentExplanation, 125);
        const initialPositionOY = 419;
        doc.fontSize(10);
        for (let i = 0, n = textRowsArray.length; i < n; i++) {
            let row = textRowsArray[i];
            doc.text(row, 31, initialPositionOY + i * 15);
        }
    }

    // SECTION 7
    doc.fontSize(10);
    if (get(form, 'sectionSevenClinician1.designation', null)) {
        doc.text(form.sectionSevenClinician1.designation.toString(), 31, 497, {
            width: 111,
            height: 18
        });
    }
    if (get(form, 'sectionSevenClinician1.name', null)) {
        doc.text(form.sectionSevenClinician1.name.toString(), 151, 497, {
            width: 154,
            height: 18
        });
    }
    if (get(form, 'sectionSevenClinician1.number', null)) {
        doc.text(form.sectionSevenClinician1.number.toString(), 314, 497, {
            width: 85,
            height: 18
        });
    }
    if (get(form, 'sectionSevenClinician1.name', null)) {
        doc.text(form.sectionSevenClinician1.name.toString(), 410, 497, {
            width: 154,
            height: 18
        });
    }
    if (get(form, 'sectionSevenClinician1.dateTime', null)) {
        doc.text(form.sectionSevenClinician1.dateTime.toString(), 506, 497, {
            width: 78,
            height: 18
        });
    }

    if (get(form, 'sectionSevenClinician2.designation', null)) {
        doc.text(form.sectionSevenClinician2.designation.toString(), 31, 517, {
            width: 111,
            height: 18
        });
    }
    if (get(form, 'sectionSevenClinician2.name', null)) {
        doc.text(form.sectionSevenClinician2.name.toString(), 151, 517, {
            width: 154,
            height: 18
        });
    }
    if (get(form, 'sectionSevenClinician2.number', null)) {
        doc.text(form.sectionSevenClinician2.number.toString(), 314, 517, {
            width: 85,
            height: 18
        });
    }
    if (get(form, 'sectionSevenClinician2.name', null)) {
        doc.text(form.sectionSevenClinician2.name.toString(), 410, 517, {
            width: 154,
            height: 18
        });
    }
    if (get(form, 'sectionSevenClinician2.dateTime', null)) {
        doc.text(form.sectionSevenClinician2.dateTime.toString(), 506, 517, {
            width: 78,
            height: 18
        });
    }

    if (get(form, 'sectionSevenSeniorClinician.designation', null)) {
        doc.text(form.sectionSevenSeniorClinician.designation.toString(), 31, 537, {
            width: 111,
            height: 18
        });
    }
    if (get(form, 'sectionSevenSeniorClinician.name', null)) {
        doc.text(form.sectionSevenSeniorClinician.name.toString(), 151, 537, {
            width: 154,
            height: 18
        });
    }
    if (get(form, 'sectionSevenSeniorClinician.number', null)) {
        doc.text(form.sectionSevenSeniorClinician.number.toString(), 314, 537, {
            width: 85,
            height: 18
        });
    }
    if (get(form, 'sectionSevenSeniorClinician.name', null)) {
        doc.text(form.sectionSevenSeniorClinician.name.toString(), 410, 537, {
            width: 154,
            height: 18
        });
    }
    if (get(form, 'sectionSevenSeniorClinician.dateTime', null)) {
        doc.text(form.sectionSevenSeniorClinician.dateTime.toString(), 506, 537, {
            width: 78,
            height: 18
        });
    }

    // SECTION 8
    doc.fontSize(10);
    if (get(form, 'sectionEightContact1.role', null)) {
        doc.text(form.sectionEightContact1.role.toString(), 31, 605, {
            width: 111,
            height: 18
        });
    }
    if (get(form, 'sectionEightContact1.name', null)) {
        doc.text(form.sectionEightContact1.name.toString(), 151, 605, {
            width: 154,
            height: 18
        });
    }
    if (get(form, 'sectionEightContact1.telephone', null)) {
        doc.text(form.sectionEightContact1.telephone.toString(), 314, 605, {
            width: 117,
            height: 18
        });
    }

    if (get(form, 'sectionEightContact2.role', null)) {
        doc.text(form.sectionEightContact2.role.toString(), 31, 625, {
            width: 111,
            height: 18
        });
    }
    if (get(form, 'sectionEightContact2.name', null)) {
        doc.text(form.sectionEightContact2.name.toString(), 151, 625, {
            width: 154,
            height: 18
        });
    }
    if (get(form, 'sectionEightContact2.telephone', null)) {
        doc.text(form.sectionEightContact2.telephone.toString(), 314, 625, {
            width: 117,
            height: 18
        });
    }

    if (get(form, 'sectionEightContact3.role', null)) {
        doc.text(form.sectionEightContact3.role.toString(), 31, 644, {
            width: 111,
            height: 18
        });
    }
    if (get(form, 'sectionEightContact3.name', null)) {
        doc.text(form.sectionEightContact3.name.toString(), 151, 644, {
            width: 154,
            height: 18
        });
    }
    if (get(form, 'sectionEightContact3.telephone', null)) {
        doc.text(form.sectionEightContact3.telephone.toString(), 314, 644, {
            width: 117,
            height: 18
        });
    }

    if (get(form, 'sectionEightContact4.role', null)) {
        doc.text(form.sectionEightContact4.role.toString(), 31, 663, {
            width: 111,
            height: 18
        });
    }
    if (get(form, 'sectionEightContact4.name', null)) {
        doc.text(form.sectionEightContact4.name.toString(), 151, 663, {
            width: 154,
            height: 18
        });
    }
    if (get(form, 'sectionEightContact4.telephone', null)) {
        doc.text(form.sectionEightContact4.telephone.toString(), 314, 663, {
            width: 117,
            height: 18
        });
    }

    // SECTION 9
    doc.fontSize(10);
    if (get(form, 'sectionNineConfirmation1.reviewDate', null)) {
        doc.text(form.sectionNineConfirmation1.reviewDate.toString(), 31, 740, {
            width: 78,
            height: 18
        });
    }
    if (get(form, 'sectionNineConfirmation1.designation', null)) {
        doc.text(form.sectionNineConfirmation1.designation.toString(), 120, 740, {
            width: 108,
            height: 18
        });
    }
    if (get(form, 'sectionNineConfirmation1.name', null)) {
        doc.text(form.sectionNineConfirmation1.name.toString(), 234, 740, {
            width: 154,
            height: 18
        });
    }
    if (get(form, 'sectionNineConfirmation1.number', null)) {
        doc.text(form.sectionNineConfirmation1.number.toString(), 395, 740, {
            width: 108,
            height: 18
        });
    }
    if (get(form, 'sectionNineConfirmation1.name', null)) {
        doc.text(form.sectionNineConfirmation1.name.toString(), 510, 740, {
            width: 108,
            height: 18
        });
    }

    if (get(form, 'sectionNineConfirmation2.reviewDate', null)) {
        doc.text(form.sectionNineConfirmation2.reviewDate.toString(), 31, 760, {
            width: 78,
            height: 18
        });
    }
    if (get(form, 'sectionNineConfirmation2.designation', null)) {
        doc.text(form.sectionNineConfirmation2.designation.toString(), 120, 760, {
            width: 108,
            height: 18
        });
    }
    if (get(form, 'sectionNineConfirmation2.name', null)) {
        doc.text(form.sectionNineConfirmation2.name.toString(), 234, 760, {
            width: 154,
            height: 18
        });
    }
    if (get(form, 'sectionNineConfirmation2.number', null)) {
        doc.text(form.sectionNineConfirmation2.number.toString(), 395, 760, {
            width: 108,
            height: 18
        });
    }
    if (get(form, 'sectionNineConfirmation2.name', null)) {
        doc.text(form.sectionNineConfirmation2.name.toString(), 510, 760, {
            width: 108,
            height: 18
        });
    }

    doc.end();
    stream.on('finish', function() {
        let url = stream.toBlobURL('application/pdf');
        window.open(url, '_blank');
    });


    return true;
}