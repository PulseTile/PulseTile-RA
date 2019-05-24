import get from "lodash/get";
import { domainName } from "../../token";

const url = domainName + `/api/initialise/`;
let options = {};
if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
}
options.headers = {
    'X-Requested-With': "XMLHttpRequest",
};

const OLD_PATIENT_DELAY = 1000;
const NEW_PATIENT_DELAY = 5000;

const fetchInitialize = (resolve, reject) => {
    const patientId = localStorage.getItem('patientId');
    const urlInitialize = url + patientId;
    fetch(urlInitialize, options)
        .then(res => res.json())
        .then(response => {
            if (get(response, 'status', null) !== 'loading_data') {
                return resolve(true);
            }
            const isNewPatient = get(response, 'new_patient', false);
            const delay = isNewPatient ? NEW_PATIENT_DELAY : OLD_PATIENT_DELAY;
            setTimeout(() => fetchInitialize(resolve, reject), delay);
        });
};

export default fetchInitialize;