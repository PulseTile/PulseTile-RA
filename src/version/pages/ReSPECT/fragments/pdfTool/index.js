import moment from "moment";
import get from "lodash/get";
import PDFDocument from "@react-pdf/pdfkit";
import blobStream from "blob-stream";
import ace from 'brace';

import 'brace/mode/javascript';
import 'brace/theme/monokai';

import page1 from "./page1";
import page2 from "./page2";

function address(obj){
    let arr = [];

    let streetAddress = get(obj, 'sections.personalDetails.streetAddress', null);
    let addressSecondLine = get(obj, 'sections.personalDetails.addressSecondLine', null);
    let city = get(obj, 'sections.personalDetails.city', null);
    let country = get(obj, 'sections.personalDetails.country', null);
    let county = get(obj, 'sections.personalDetails.county', null);
    let postCode = get(obj, 'sections.personalDetails.postCode', null);

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
    return moment(date).isValid() ? moment(date).format('DD-MMM-YYYY') : moment().format('DD-MMM-YYYY');
}


function getClinicalRecommendations(obj){
    const focusValue = get(obj, 'sections.clinicalRecommendations.focusValue', null);
    let result = 50;
    if (focusValue < 50) {
        result = 5;
    } else if (focusValue > 50) {
        result = 95;
    }
    return result;
}

export default (obj) => {

    let doc = new PDFDocument();
    let stream = doc.pipe(blobStream());

    let seniorClinician;
    let clinicians = [];

    const signaturesArray = get(obj, 'sections.clinicalSignatures.signaturesArray', []);
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
        preferredName: get(obj, 'sections.personalDetails.preferredName', null),
        fullName: get(obj, 'sections.personalDetails.firstName', null) + ' ' + get(obj, 'sections.personalDetails.surname', null),
        dateOfBirth: getDDMMMYYYY(get(obj, 'sections.personalDetails.birthDate', null)),
        dateCompleted: get(obj, 'sections.personalDetails.dateCompleted', null),
        chiNumber: get(obj, 'sections.personalDetails.nhsNumber', null),
        address: address(obj),
        sectionTwoDiagnostics: get(obj, 'sections.summaryInformation.summary', null),
        sectionTwoDetails: get(obj, 'sections.summaryInformation.details', null),
        sectionThreeX: get(obj, 'sections.personalPreferences.preferencesValue', null),
        sectionThreeDetails: get(obj, 'sections.personalPreferences.preferencesText', null),
        sectionFourClinicalRecommendationsX: getClinicalRecommendations(obj),
        sectionFourClinicalRecommendations: get(obj, 'sections.clinicalRecommendations.clinicalGuidance', null),
        sectionFiveCapacity: get(obj, 'sections.capacityAndRepresentation.capacityFirst', null),
        sectionFiveLegalProxy: get(obj, 'sections.capacityAndRepresentation.capacitySecond', null),
        sectionSixA: (get(obj, 'sections.involvement.variant', null) === 'variantA'),
        sectionSixB: (get(obj, 'sections.involvement.variant', null) === 'variantB'),
        sectionSixC: (get(obj, 'sections.involvement.variant', null) === 'variantC'),
        sectionSixC1: (get(obj, 'sections.involvement.variant', null) === 'at0005'),
        sectionSixC2: (get(obj, 'sections.involvement.variant', null) === 'at0011'),
        sectionSixC3: (get(obj, 'sections.involvement.variant', null) === 'at0012'),
        sectionSixD: get(obj, 'sections.involvement.variantD', null),
        sectionSixDetailsOfDecision: get(obj, 'sections.involvement.detailsOfDecision', null),
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
            role: get(obj, 'sections.emergencyContacts.contactsArray[0].role', null),
            name: get(obj, 'sections.emergencyContacts.contactsArray[0].name', null),
            telephone: get(obj, 'sections.emergencyContacts.contactsArray[0].phone', null),
            details: get(obj, 'sections.emergencyContacts.contactsArray[0].details', null),
        },
        sectionEightContact2: {
            role: get(obj, 'sections.emergencyContacts.contactsArray[1].role', null),
            name: get(obj, 'sections.emergencyContacts.contactsArray[1].name', null),
            telephone: get(obj, 'sections.emergencyContacts.contactsArray[1].phone', null),
            details: get(obj, 'sections.emergencyContacts.contactsArray[1].details', null),
        },
        sectionEightContact3: {
            role: get(obj, 'sections.emergencyContacts.contactsArray[2].role', null),
            name: get(obj, 'sections.emergencyContacts.contactsArray[2].name', null),
            telephone: get(obj, 'sections.emergencyContacts.contactsArray[2].phone', null),
            details: get(obj, 'sections.emergencyContacts.contactsArray[2].details', null),
        },
        sectionEightContact4: {
            role: get(obj, 'sections.emergencyContacts.contactsArray[3].role', null),
            name: get(obj, 'sections.emergencyContacts.contactsArray[3].name', null),
            telephone: get(obj, 'sections.emergencyContacts.contactsArray[3].phone', null),
            details: get(obj, 'sections.emergencyContacts.contactsArray[3].details', null),
        },
        sectionNineConfirmation1: {
            reviewDate: getDDMMMYYYY(get(obj, ['sections.confirmation.confirmationsArray', [0], 'reviewDate'], null)),
            designation: get(obj, ['sections.confirmation.confirmationsArray', [0], 'designation'], null),
            name: get(obj, ['sections.confirmation.confirmationsArray', [0], 'clinicialName'], null),
            number: get(obj, ['sections.confirmation.confirmationsArray', [0], 'gmcNumber'], null),
        },
        sectionNineConfirmation2: {
            reviewDate: getDDMMMYYYY(get(obj, ['sections.confirmation.confirmationsArray', [1], 'reviewDate'], null)),
            designation: get(obj, ['sections.confirmation.confirmationsArray', [1], 'designation'], null),
            name: get(obj, ['sections.confirmation.confirmationsArray', [1], 'clinicialName'], null),
            number: get(obj, ['sections.confirmation.confirmationsArray', [1], 'gmcNumber'], null),
        }
    };

    doc.image(page1, 0, 0, {width: doc.page.width, height: doc.page.height});

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

    if (get(form, 'dateCompleted', null)) {
        doc.text(form.dateCompleted, 505, 100, {
            width: 75,
            height: 23
        });
    }

    if (get(form, 'chiNumber', null)) {
        doc.fontSize(12)
            .text(form.chiNumber, 33, 129, {
                width: 285,
                height: 23,
                characterSpacing: 16.5
            });
    }

    if (get(form, 'address', null)) {
        doc.fontSize(10)
            .text(form.address, 316, 115, {
                width: 172,
                height: 36,
                lineGap: -1,
            });
    }

    if (get(form, 'sectionTwoDiagnostics', null)) {
        doc.text(form.sectionTwoDiagnostics, 31, 208, {
                width: 553,
                height: 58,
                lineGap: 1,
            });
    }

    if (get(form, 'sectionTwoDetails', null)) {
        doc.text(form.sectionTwoDetails, 31, 300, {
            width: 553,
            height: 36
        });
    }

    if (get(form, 'sectionThreeX', null)) {
        doc.fontSize(14)
            .text('X', (278 * (form.sectionThreeX / 100))+169, 389, {
                width: 10,
                height: 23
            });
    }

    if (get(form, 'sectionThreeDetails', null)) {
        doc.fontSize(10)
            .text(form.sectionThreeDetails, 31, 447, {
                width: 553,
                height: 41
            });
    }

    if (get(form, 'sectionFourClinicalRecommendationsX', null)) {
        doc.fontSize(14)
            .text('X', (171 * (form.sectionFourClinicalRecommendationsX / 100))+187, 544, {
                width: 10,
                height: 23
            });
    }

    if (get(form, 'sectionFourClinicalRecommendations', null)) {
        doc.fontSize(10)
            .text(form.sectionFourClinicalRecommendations, 31, 618, {
                width: 553,
                height: 100
            });
    }

    doc.addPage();
    doc.image(page2, 0, 0, {width: doc.page.width, height: doc.page.height});

    if (form.sectionFiveCapacity === '1') {
        doc.ellipse(535, 52, 16, 10)
            .lineWidth(2)
            .strokeColor('#ff0000')
            .stroke();
    } else if (form.sectionFiveCapacity === '0') {
        doc.ellipse(562, 52, 16, 10)
            .lineWidth(2)
            .strokeColor('#ff0000')
            .stroke();
    }

    // Legal Proxy
    switch (get(form, 'sectionFiveLegalProxy', null)) {
        case 'at0004': // Yes
            doc.ellipse(470, 89, 16, 10)
                .lineWidth(2)
                .strokeColor('#ff0000')
                .stroke();
            break;
        case 'at0005': // No
            doc.ellipse(498, 89, 14, 10)
                .lineWidth(2)
                .strokeColor('#ff0000')
                .stroke();
            break;
        case 'at0006': // Unknown
            doc.ellipse(544, 89, 35, 12)
                .lineWidth(2)
                .strokeColor('#ff0000')
                .stroke();
            break;
    }

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

    if (get(form, 'sectionSixD', null)) {
        doc.fontSize(10)
            .text(form.sectionSixD, 31, 359, {
                width: 553,
                height: 41
            });
    }

    if (get(form, 'sectionSixDetailsOfDecision', null)) {
        doc.fontSize(10)
            .text(form.sectionSixDetailsOfDecision, 31, 419, {
                width: 553,
                height: 41
            });
    }

    if (get(form, 'sectionSevenClinician1.designation', null)) {
        doc.text(form.sectionSevenClinician1.designation, 31, 497, {
            width: 111,
            height: 18
        });
    }
    if (get(form, 'sectionSevenClinician1.name', null)) {
        doc.text(form.sectionSevenClinician1.name, 151, 497, {
            width: 154,
            height: 18
        });
    }
    if (get(form, 'sectionSevenClinician1.number', null)) {
        doc.text(form.sectionSevenClinician1.number, 314, 497, {
            width: 85,
            height: 18
        });
    }
    if (get(form, 'sectionSevenClinician1.dateTime', null)) {
        doc.text(form.sectionSevenClinician1.dateTime, 506, 497, {
            width: 78,
            height: 18
        });
    }

    if (get(form, 'sectionSevenClinician2.designation', null)) {
        doc.text(form.sectionSevenClinician2.designation, 31, 497, {
            width: 111,
            height: 18
        });
    }
    if (get(form, 'sectionSevenClinician2.name', null)) {
        doc.text(form.sectionSevenClinician2.name, 151, 497, {
            width: 154,
            height: 18
        });
    }
    if (get(form, 'sectionSevenClinician2.number', null)) {
        doc.text(form.sectionSevenClinician2.number, 314, 497, {
            width: 85,
            height: 18
        });
    }
    if (get(form, 'sectionSevenClinician2.dateTime', null)) {
        doc.text(form.sectionSevenClinician2.dateTime, 506, 497, {
            width: 78,
            height: 18
        });
    }


    if (get(form, 'sectionSevenSeniorClinician.designation', null)) {
        doc.text(form.sectionSevenSeniorClinician.designation, 31, 537, {
            width: 111,
            height: 18
        });
    }

    if (get(form, 'sectionSevenSeniorClinician.name', null)) {
        doc.text(form.sectionSevenSeniorClinician.name, 151, 537, {
            width: 154,
            height: 18
        });
    }

    if (get(form, 'sectionSevenSeniorClinician.number', null)) {
        doc.text(form.sectionSevenSeniorClinician.number, 314, 537, {
            width: 85,
            height: 18
        });
    }

    if (get(form, 'sectionSevenSeniorClinician.dateTime', null)) {
        doc.text(form.sectionSevenSeniorClinician.dateTime, 506, 537, {
            width: 78,
            height: 18
        });

    }

    if (get(form, 'sectionEightContact1.role', null)) {
        doc.text(form.sectionEightContact1.role, 31, 605, {
            width: 111,
            height: 18
        });
    }
    if (get(form, 'sectionEightContact1.name', null)) {
        doc.text(form.sectionEightContact1.name, 151, 605, {
            width: 154,
            height: 18
        });
    }
    if (get(form, 'sectionEightContact1.telephone', null)) {
        doc.text(form.sectionEightContact1.telephone, 314, 605, {
            width: 117,
            height: 18
        });
    }

    if (get(form, 'sectionEightContact2.role', null)) {
        doc.text(form.sectionEightContact2.role, 31, 625, {
            width: 111,
            height: 18
        });
    }
    if (get(form, 'sectionEightContact2.name', null)) {
        doc.text(form.sectionEightContact2.name, 151, 625, {
            width: 154,
            height: 18
        });
    }
    if (get(form, 'sectionEightContact2.telephone', null)) {
        doc.text(form.sectionEightContact2.telephone, 314, 625, {
            width: 117,
            height: 18
        });
    }

    if (get(form, 'sectionEightContact3.role', null)) {
        doc.text(form.sectionEightContact3.role, 31, 644, {
            width: 111,
            height: 18
        });
    }
    if (get(form, 'sectionEightContact3.name', null)) {
        doc.text(form.sectionEightContact3.name, 151, 644, {
            width: 154,
            height: 18
        });
    }
    if (get(form, 'sectionEightContact3.telephone', null)) {
        doc.text(form.sectionEightContact3.telephone, 314, 644, {
            width: 117,
            height: 18
        });
    }

    if (get(form, 'sectionEightContact4.role', null)) {
        doc.text(form.sectionEightContact4.role, 31, 663, {
            width: 111,
            height: 18
        });
    }
    if (get(form, 'sectionEightContact4.name', null)) {
        doc.text(form.sectionEightContact4.name, 151, 663, {
            width: 154,
            height: 18
        });
    }
    if (get(form, 'sectionEightContact4.telephone', null)) {
        doc.text(form.sectionEightContact4.telephone, 314, 663, {
            width: 117,
            height: 18
        });
    }


    if (get(form, 'sectionNineConfirmation1.reviewDate', null)) {
        doc.text(form.sectionNineConfirmation1.reviewDate, 31, 740, {
            width: 78,
            height: 18
        });
    }
    if (get(form, 'sectionNineConfirmation1.designation', null)) {
        doc.text(form.sectionNineConfirmation1.designation, 120, 740, {
            width: 108,
            height: 18
        });
    }
    if (get(form, 'sectionNineConfirmation1.name', null)) {
        doc.text(form.sectionNineConfirmation1.name, 234, 740, {
            width: 154,
            height: 18
        });
    }
    if (get(form, 'sectionNineConfirmation1.number', null)) {
        doc.text(form.sectionNineConfirmation1.number, 395, 740, {
            width: 108,
            height: 18
        });
    }

    if (get(form, 'sectionNineConfirmation2.reviewDate', null)) {
        doc.text(form.sectionNineConfirmation2.reviewDate, 31, 740, {
            width: 78,
            height: 18
        });
    }
    if (get(form, 'sectionNineConfirmation2.designation', null)) {
        doc.text(form.sectionNineConfirmation2.designation, 120, 740, {
            width: 108,
            height: 18
        });
    }
    if (get(form, 'sectionNineConfirmation2.name', null)) {
        doc.text(form.sectionNineConfirmation2.name, 234, 740, {
            width: 154,
            height: 18
        });
    }
    if (get(form, 'sectionNineConfirmation2.number', null)) {
        doc.text(form.sectionNineConfirmation2.number, 395, 740, {
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