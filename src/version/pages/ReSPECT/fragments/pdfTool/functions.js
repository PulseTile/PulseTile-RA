import moment from "moment";
import PDFDocument from "pdfkit";
import blobStream from "blob-stream";

import page1 from "./page1";
import page2 from "./page2";

function address(obj){
    let arr = [];
    if( obj.sections.personalDetails.streetAddress ){ arr.push(obj.sections.personalDetails.streetAddress); }
    if( obj.sections.personalDetails.addressSecondLine ){ arr.push(obj.sections.personalDetails.addressSecondLine); }
    if( obj.sections.personalDetails.city ){ arr.push(obj.sections.personalDetails.city); }
    if( obj.sections.personalDetails.country ){ arr.push(obj.sections.personalDetails.country); }
    if( obj.sections.personalDetails.county ){ arr.push(obj.sections.personalDetails.county); }
    if( obj.sections.personalDetails.postCode ){ arr.push(obj.sections.personalDetails.postCode); }
    return arr.join(', ');
}


function getDDMMMYYYY(date){
    return moment(date).isValid() ? moment(date).format('DD-MMM-YYYY') : moment().format('DD-MMM-YYYY');
}


function getClinicalRecommendations(obj){
    switch( obj.sections.clinicalRecommendation.focusValue ){
        case 'Life-sustaining treatment':
            return 5;
            break;
        case 'Symptom control':
            return 95;
            break;
        default:
            return 50;
            break;
    }
}

export function makePDF(iframe) {

    // console.log('versionInfo', versionInfo);

    // create a document and pipe to a blob
    let doc = new PDFDocument();
    let stream = doc.pipe(blobStream());

// This is an example of the JSON Object provided by Rob
    let json  = `{
  "sections": {
    "personalDetails": {
      "nhsNumber": "9999999801",
      "dateCompleted": "22-Mar-2019",
      "preferredName": "Mr",
      "firstName": "John",
      "surname": "Doe",
      "streetAddress": "Some address...",
      "addressSecondLine": "Some address...",
      "city": "London",
      "county": "Some county...",
      "postCode": "QWERTY1234",
      "country": "UK",
      "birthDate": "2019-03-05T22:00:00.000Z",
      "status": "Completed"
    },
    "summaryInformation": {
      "dateCompleted": "22-Mar-2019",
      "summary": "Summary text...",
      "details": "Details text...",
      "status": "Completed"
    },
    "personalPreferences": {
      "dateCompleted": "22-Mar-2019",
      "preferencesText": "Some text...",
      "preferencesValue": 8.9,
      "status": "Completed"
    },
    "clinicalRecommendation": {
      "clinicalSignatureFirst": "Robert Tweed",
      "clinicalSignatureSecond": "Robert Tweed",
      "dateCompleted": "22-Mar-2019",
      "clinicalGuidance": "Some text...",
      "cprValue": "2",
      "focusValue": "Life-sustaining treatment",
      "status": "Completed"
    },
    "capacityAndRepresentation": {
      "dateCompleted": "22-Mar-2019",
      "capacityFirst": "2",
      "capacitySecond": "2",
      "status": "Completed"
    },
    "involvement": {
      "dateCompleted": "22-Mar-2019",
      "records": "Some text...",
      "variant": "variantB",
      "status": "Completed"
    },
    "clinicalSignatures": {
      "dateCompleted":"22-Mar-2019",
      "signaturesArray": [
        {
          "clinicalSignature": "Robert Tweed",
          "designation": "qwerty",
          "clinicialName": "qwerty",
          "gmcNumber": "123456789",
          "isSrc": true,
          "dateAndTime": "2019-03-09T22:00:00.000Z"
        },
        {
          "designation": "ytrewq",
          "clinicialName": "asdfg",
          "gmcNumber": "741852963",
          "clinicalSignature":" Robert Tweed",
          "dateAndTime": "2019-02-23T22:00:00.000Z"
        }
      ],
      "status": "Completed"
    },
    "emergencyContacts": {
      "dateCompleted": "22-Mar-2019",
      "contactsArray": [
        {
          "details": "Some text...",
          "role": "Husband",
          "name": "John",
          "phone": "+380663729988"
        },
        {
          "role": "Father",
          "name": "James",
          "phone": "+38050802287",
          "details": "Some text..."
        }
      ],
      "status": "Completed"
    },
    "confirmation": {
      "dateCompleted": "22-Mar-2019",
      "confirmationsArray": [
        {
          "clinicalSignature": "Robert Tweed",
          "designation": "qwerty",
          "clinicialName": "Nick",
          "gmcNumber": "963852741",
          "reviewDate": "2019-03-03T22:00:00.000Z"
        },
        {
          "designation": "ytgfred",
          "clinicialName": "Carl",
          "gmcNumber": "789321456",
          "clinicalSignature": "Robert Tweed",
          "reviewDate": "2019-03-04T22:00:00.000Z"
        }
      ],
      "status": "Completed"
    },
    "emergencyView": {
      "status": "Completed",
      "dateCompleted": "22-Mar-2019 10:26",
      "author": "Robert Tweed"
    }
  },
  "status": "Completed",
  "dateCompleted": "22-Mar-2019 10:26",
  "author": "Robert Tweed"
}`;
    let obj = JSON.parse(json);


    console.log( obj );

// START DOCUMENT


// If senior clinician, don't include in other columns.
    let seniorClinician;
    for(let i = 0; i < obj.sections.clinicalSignatures.signaturesArray.length; i++ ){
        if( obj.sections.clinicalSignatures.signaturesArray[i].isSrc ){
            seniorClinician = obj.sections.clinicalSignatures.signaturesArray[i];
        }
    }

// Include all other clinicians in here
    let clinicians = [];
    for( let i=0; i<obj.sections.clinicalSignatures.signaturesArray.length; i++ ){
        if( !obj.sections.clinicalSignatures.signaturesArray[i].isSrc ){
            clinicians.push(obj.sections.clinicalSignatures.signaturesArray[i]);
        }
    }

    let form = {
        // Map all properties from the json object (obj)
        preferredName: obj.sections.personalDetails.preferredName,
        fullName: obj.sections.personalDetails.firstName + ' ' + obj.sections.personalDetails.surname,
        dateOfBirth: getDDMMMYYYY(obj.sections.personalDetails.birthDate),
        dateCompleted: obj.sections.personalDetails.dateCompleted,
        chiNumber: obj.sections.personalDetails.nhsNumber,
        address: address(obj),
        sectionTwoDiagnostics: obj.sections.summaryInformation.summary,
        sectionTwoDetails: obj.sections.summaryInformation.details,
        sectionThreeX: obj.sections.personalPreferences.preferencesValue,
        sectionThreeDetails: obj.sections.personalPreferences.preferencesText,
        sectionFourClinicalRecommendationsX: getClinicalRecommendations(obj), // Returns position for the 'X' that appears on the form. 'Life-sustaining treatment' = 10 (left side), 'Symptom control' = 90 (right side)
        sectionFourClinicalRecommendations: obj.sections.clinicalRecommendation.clinicalGuidance,
        sectionFiveCapacity: obj.sections.capacityAndRepresentation.capacityFirst, // Yes or No
        sectionFiveLegalProxy: obj.sections.capacityAndRepresentation.capacitySecond, // Yes, No or Unknown
        sectionSixA: (obj.sections.involvement.variant == 'variantA'),
        sectionSixB: (obj.sections.involvement.variant == 'variantB'),
        sectionSixC: (obj.sections.involvement.variant == 'variantC'),
        sectionSixC1: (obj.sections.involvement.variant == 'variantC1'),
        sectionSixC2: (obj.sections.involvement.variant == 'variantC2'),
        sectionSixC3: (obj.sections.involvement.variant == 'variantC3'),
        sectionSixD: obj.sections.involvement.records,
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
            role: ( obj.sections.emergencyContacts.contactsArray[0] ? obj.sections.emergencyContacts.contactsArray[0].role : '' ),
            name: ( obj.sections.emergencyContacts.contactsArray[0] ? obj.sections.emergencyContacts.contactsArray[0].name : '' ),
            telephone: ( obj.sections.emergencyContacts.contactsArray[0] ? obj.sections.emergencyContacts.contactsArray[0].phone : '' ),
            details: ( obj.sections.emergencyContacts.contactsArray[0] ? obj.sections.emergencyContacts.contactsArray[0].details : '' )
        },
        sectionEightContact2: {
            role: ( obj.sections.emergencyContacts.contactsArray[1] ? obj.sections.emergencyContacts.contactsArray[1].role : '' ),
            name: ( obj.sections.emergencyContacts.contactsArray[1] ? obj.sections.emergencyContacts.contactsArray[1].name : '' ),
            telephone: ( obj.sections.emergencyContacts.contactsArray[1] ? obj.sections.emergencyContacts.contactsArray[1].phone : '' ),
            details: ( obj.sections.emergencyContacts.contactsArray[1] ? obj.sections.emergencyContacts.contactsArray[1].details : '' )
        },
        sectionEightContact3: {
            role: ( obj.sections.emergencyContacts.contactsArray[2] ? obj.sections.emergencyContacts.contactsArray[2].role : '' ),
            name: ( obj.sections.emergencyContacts.contactsArray[2] ? obj.sections.emergencyContacts.contactsArray[2].name : '' ),
            telephone: ( obj.sections.emergencyContacts.contactsArray[2] ? obj.sections.emergencyContacts.contactsArray[2].phone : '' ),
            details: ( obj.sections.emergencyContacts.contactsArray[2] ? obj.sections.emergencyContacts.contactsArray[2].details : '' )
        },
        sectionEightContact4: {
            role: ( obj.sections.emergencyContacts.contactsArray[3] ? obj.sections.emergencyContacts.contactsArray[3].role : '' ),
            name: ( obj.sections.emergencyContacts.contactsArray[3] ? obj.sections.emergencyContacts.contactsArray[3].name : '' ),
            telephone: ( obj.sections.emergencyContacts.contactsArray[3] ? obj.sections.emergencyContacts.contactsArray[3].phone : '' ),
            details: ( obj.sections.emergencyContacts.contactsArray[3] ? obj.sections.emergencyContacts.contactsArray[3].details : '' )
        },
        sectionNineConfirmation1: {
            reviewDate: ( obj.sections.confirmation.confirmationsArray[0] ? getDDMMMYYYY(obj.sections.confirmation.confirmationsArray[0].reviewDate) : '' ),
            designation: ( obj.sections.confirmation.confirmationsArray[0] ? obj.sections.confirmation.confirmationsArray[0].designation : '' ),
            name: ( obj.sections.confirmation.confirmationsArray[0] ? obj.sections.confirmation.confirmationsArray[0].clinicialName : '' ),
            number: ( obj.sections.confirmation.confirmationsArray[0] ? obj.sections.confirmation.confirmationsArray[0].gmcNumber : '' )
        },
        sectionNineConfirmation2: {
            reviewDate: ( obj.sections.confirmation.confirmationsArray[1] ? getDDMMMYYYY(obj.sections.confirmation.confirmationsArray[1].reviewDate) : '' ),
            designation: ( obj.sections.confirmation.confirmationsArray[1] ? obj.sections.confirmation.confirmationsArray[1].designation : '' ),
            name: ( obj.sections.confirmation.confirmationsArray[1] ? obj.sections.confirmation.confirmationsArray[1].clinicialName : '' ),
            number: ( obj.sections.confirmation.confirmationsArray[1] ? obj.sections.confirmation.confirmationsArray[1].gmcNumber : '' )
        }
    }

// PAGE 1

// Import RESPECT image
    doc.image(page1, 0, 0, {width: doc.page.width, height: doc.page.height});

// Preferred Name
    doc.fontSize(10)
        .text(form.preferredName, 316, 28, {
            width: 267,
            height: 23
        });

// SECTION 1

    // Full Name
    doc.text(form.fullName, 31, 85, {
        width: 267,
        height: 23
    });

    // Date of Birth
    doc.text(form.dateOfBirth, 316, 83, {
        width: 172,
        height: 23
    });

    // Date Completed
    doc.text(form.dateCompleted, 505, 100, {
        width: 75,
        height: 23
    });

    // CHI number
    doc.fontSize(12)
        .text(form.chiNumber, 33, 129, {
            width: 285,
            height: 23,
            characterSpacing: 16.5
        });

    // Address
    doc.fontSize(10)
        .lineGap(-1)
        .text(form.address, 316, 115, {
            width: 172,
            height: 36
        });

// SECTION 2

    // Diagnostics...
    doc.lineGap(0)
        .text(form.sectionTwoDiagnostics, 31, 208, {
            width: 553,
            height: 58
        });

    // Details...
    doc.text(form.sectionTwoDetails, 31, 300, {
        width: 553,
        height: 36
    });


// SECTION 3

    // Balance Scale
    doc.fontSize(14)
        .text('X', (278 * (form.sectionThreeX / 100))+169, 389, {
            width: 10,
            height: 23
        });

    // Details...
    doc.fontSize(10)
        .text(form.sectionThreeDetails, 31, 447, {
            width: 553,
            height: 41
        });


// SECTION 4

    // Clinical Recommendations Scale
    doc.fontSize(14)
        .text('X', (171 * (form.sectionFourClinicalRecommendationsX / 100))+187, 544, {
            width: 10,
            height: 23
        });

    // Clinical Recommendations Details...
    doc.fontSize(10)
        .text(form.sectionFourClinicalRecommendations, 31, 618, {
            width: 553,
            height: 100
        });



// PAGE 2

    doc.addPage();
    doc.image(page2, 0, 0, {width: doc.page.width, height: doc.page.height});

// SECTION 5

    // Capacity
    switch( form.sectionFiveCapacity ){
        case '2': // Yes
            doc.ellipse(535, 52, 16, 10)
                .lineWidth(2)
                .strokeColor('#ff0000')
                .stroke();
            break;
        case '1': // No
            doc.ellipse(562, 52, 16, 10)
                .lineWidth(2)
                .strokeColor('#ff0000')
                .stroke();
            break;
    }

    // Legal Proxy
    switch( form.sectionFiveLegalProxy ){
        case '2': // Yes
            doc.ellipse(470, 89, 16, 10)
                .lineWidth(2)
                .strokeColor('#ff0000')
                .stroke();
            break;
        case '1': // No
            doc.ellipse(498, 89, 14, 10)
                .lineWidth(2)
                .strokeColor('#ff0000')
                .stroke();
            break;
        case '3': // Unknown
            doc.ellipse(544, 89, 35, 12)
                .lineWidth(2)
                .strokeColor('#ff0000')
                .stroke();
            break;
    }

// SECTION 6

    // Involvement

    // A
    if( form.sectionSixA ){
        doc.fontSize(14)
            .text('X', 34, 163, {
                width: 10,
                height: 23
            });
    }

    // B
    if( form.sectionSixB ){
        doc.fontSize(14)
            .text('X', 34, 196, {
                width: 10,
                height: 23
            });
    }

    // C
    if( form.sectionSixC ){
        doc.fontSize(14)
            .text('X', 34, 242, {
                width: 10,
                height: 23
            });
    }

    // C1
    if( form.sectionSixC1 ){
        doc.fontSize(14)
            .text('X', 42, 271, {
                width: 10,
                height: 23
            });
    }

    // C2
    if( form.sectionSixC2 ){
        doc.fontSize(14)
            .text('X', 42, 288, {
                width: 10,
                height: 23
            });
    }

    // C3
    if( form.sectionSixC3 ){
        doc.fontSize(14)
            .text('X', 42, 315, {
                width: 10,
                height: 23
            });
    }

    // D - Details...
    doc.fontSize(10)
        .text(form.sectionSixD, 31, 409, {
            width: 553,
            height: 41
        });

// SECTION 7

    // Clinicial 1
    doc.text(form.sectionSevenClinician1.designation, 31, 497, {
        width: 111,
        height: 18
    });

    doc.text(form.sectionSevenClinician1.name, 151, 497, {
        width: 154,
        height: 18
    });

    doc.text(form.sectionSevenClinician1.number, 314, 497, {
        width: 85,
        height: 18
    });

    doc.text(form.sectionSevenClinician1.dateTime, 506, 497, {
        width: 78,
        height: 18
    });

    // Clinicial 2
    doc.text(form.sectionSevenClinician2.designation, 31, 517, {
        width: 111,
        height: 18
    });

    doc.text(form.sectionSevenClinician2.name, 151, 517, {
        width: 154,
        height: 18
    });

    doc.text(form.sectionSevenClinician2.number, 314, 517, {
        width: 85,
        height: 18
    });

    doc.text(form.sectionSevenClinician2.dateTime, 506, 517, {
        width: 78,
        height: 18
    });

    // Clinicial 3
    doc.text(form.sectionSevenSeniorClinician.designation, 31, 537, {
        width: 111,
        height: 18
    });

    doc.text(form.sectionSevenSeniorClinician.name, 151, 537, {
        width: 154,
        height: 18
    });

    doc.text(form.sectionSevenSeniorClinician.number, 314, 537, {
        width: 85,
        height: 18
    });

    doc.text(form.sectionSevenSeniorClinician.dateTime, 506, 537, {
        width: 78,
        height: 18
    });

// SECTION 8

    // Contact 1
    doc.text(form.sectionEightContact1.role, 31, 605, {
        width: 111,
        height: 18
    });

    doc.text(form.sectionEightContact1.name, 151, 605, {
        width: 154,
        height: 18
    });

    doc.text(form.sectionEightContact1.telephone, 314, 605, {
        width: 117,
        height: 18
    });

    doc.text(form.sectionEightContact1.details, 439, 605, {
        width: 145,
        height: 18
    });

    // Contact 2
    doc.text(form.sectionEightContact2.role, 31, 625, {
        width: 111,
        height: 18
    });

    doc.text(form.sectionEightContact2.name, 151, 625, {
        width: 154,
        height: 18
    });

    doc.text(form.sectionEightContact2.telephone, 314, 625, {
        width: 117,
        height: 18
    });

    doc.text(form.sectionEightContact2.details, 439, 625, {
        width: 145,
        height: 18
    });

    // Contact 3
    doc.text(form.sectionEightContact3.role, 31, 644, {
        width: 111,
        height: 18
    });

    doc.text(form.sectionEightContact3.name, 151, 644, {
        width: 154,
        height: 18
    });

    doc.text(form.sectionEightContact3.telephone, 314, 644, {
        width: 117,
        height: 18
    });

    doc.text(form.sectionEightContact3.details, 439, 644, {
        width: 145,
        height: 18
    });

    // Contact 4
    doc.text(form.sectionEightContact4.role, 31, 663, {
        width: 111,
        height: 18
    });

    doc.text(form.sectionEightContact4.name, 151, 663, {
        width: 154,
        height: 18
    });

    doc.text(form.sectionEightContact4.telephone, 314, 663, {
        width: 117,
        height: 18
    });

    doc.text(form.sectionEightContact4.details, 439, 663, {
        width: 145,
        height: 18
    });

// SECTION 9

    // Confirmation 1
    doc.text(form.sectionNineConfirmation1.reviewDate, 31, 740, {
        width: 78,
        height: 18
    });

    doc.text(form.sectionNineConfirmation1.designation, 120, 740, {
        width: 108,
        height: 18
    });

    doc.text(form.sectionNineConfirmation1.name, 234, 740, {
        width: 154,
        height: 18
    });

    doc.text(form.sectionNineConfirmation1.number, 395, 740, {
        width: 108,
        height: 18
    });

    // Confirmation 2
    doc.text(form.sectionNineConfirmation2.reviewDate, 31, 760, {
        width: 78,
        height: 18
    });

    doc.text(form.sectionNineConfirmation2.designation, 120, 760, {
        width: 108,
        height: 18
    });

    doc.text(form.sectionNineConfirmation2.name, 234, 760, {
        width: 154,
        height: 18
    });

    doc.text(form.sectionNineConfirmation2.number, 395, 760, {
        width: 108,
        height: 18
    });

// end and display the document in the iframe to the right
    doc.end();
    stream.on('finish', function() {
        iframe.src = stream.toBlobURL('application/pdf');
    });

    return true;
}