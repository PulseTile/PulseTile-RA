export const DANGER_COLOR = '#CA9193';
export const WARNING_COLOR = '#E4D19D';
export const SUCCESS_COLOR = '#94CFAA';

export const rangeLineLimits = {
    respirationRate: {
        greenMin: 9,
        greenMax: 21,
        redMin: 8,
        redMax: 25,
    },
    heartRate: {
        greenMin: 41,
        greenMax: 111,
        redMin: 40,
        redMax: 131,
    },
    oxygenSaturation: {
        greenMin: 92,
        greenMax: 95,
        redMin: 91,
        redMax: 96,
    },
    systolicBP: {
        greenMin: 101,
        greenMax: 219,
        redMin: 90,
        redMax: 220,
    },
    temperature: {
        greenMin: 36.0,
        greenMax: 38.1,
        redMin: 35.0,
        redMax: 39.1,
    }
};

export const rangeLineSettings = {
    respirationRate: [
        { label: '≤ 8', position: 'rangeAxisItemTop' },
        { label: null, position: 'rangeAxisItemTop' },
        { label: '9-11', position: 'rangeAxisItemTop' },
        { label: '12-20', position: 'rangeAxisItemBottom' },
        { label: null, position: 'rangeAxisItemTop' },
        { label: '21-24', position: 'rangeAxisItemBottom' },
        { label: '≥ 25', position: 'rangeAxisItemTop' },
    ],
    heartRate: [
        { label: '≤ 40', position: 'rangeAxisItemTop' },
        { label: null, position: 'rangeAxisItemTop' },
        { label: '41-50', position: 'rangeAxisItemTop' },
        { label: '51-90', position: 'rangeAxisItemBottom' },
        { label: '91-110', position: 'rangeAxisItemTop' },
        { label: '111-130', position: 'rangeAxisItemBottom' },
        { label: '≥ 131', position: 'rangeAxisItemTop' },
    ],
    temperature: [
        { label: '≤ 35.0', position: 'rangeAxisItemTop' },
        { label: null, position: 'rangeAxisItemTop' },
        { label: '35.1-36.0', position: 'rangeAxisItemTop' },
        { label: '36.1-38.0', position: 'rangeAxisItemBottom' },
        { label: '38.1-39.0', position: 'rangeAxisItemTop' },
        { label: '≥ 39.1', position: 'rangeAxisItemBottom' },
        { label: null, position: 'rangeAxisItemTop' },
    ],
    systolicBP: [
        { label: '≤ 90', position: 'rangeAxisItemTop' },
        { label: '91-100', position: 'rangeAxisItemBottom' },
        { label: '101-110', position: 'rangeAxisItemTop' },
        { label: '111-219', position: 'rangeAxisItemBottom' },
        { label: null, position: 'rangeAxisItemTop' },
        { label: null, position: 'rangeAxisItemTop' },
        { label: '≥ 220', position: 'rangeAxisItemTop' },
    ],
    oxygenSaturation: [
        { label: '≤ 91', position: 'rangeAxisItemTop' },
        { label: null, position: 'rangeAxisItemTop' },
        { label: '92-93', position: 'rangeAxisItemBottom' },
        { label: null, position: 'rangeAxisItemTop' },
        { label: '94-95', position: 'rangeAxisItemBottom' },
        { label: null, position: 'rangeAxisItemTop' },
        { label: '≥ 96', position: 'rangeAxisItemTop' }
    ]
};