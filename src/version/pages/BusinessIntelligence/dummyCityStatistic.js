import { COLOR_AMBER, COLOR_GREEN, COLOR_RED } from "./constants";

export const dummyCities = [
    { id: 'leeds', cityName: "Leeds", lat: 53.79648, lng: -1.54785, size: 70, healthScore: 82, color: COLOR_GREEN, population: '781,700' },
    { id: 'darlington', cityName: "Darlington", lat: 54.52429, lng: -1.55039, size: 40, healthScore: 86, color: COLOR_GREEN, population: '105,564' },
    { id: 'doncaster', cityName: "Doncaster", lat: 53.52285, lng: -1.13116, size: 40, healthScore: 86, color: COLOR_GREEN, population: '109,805' },
    { id: 'scarborough', cityName: "Scarborough", lat: 54.27966, lng: -0.40443, size: 40, healthScore: 62, color: COLOR_AMBER, population: '108,600' },
    { id: 'bridlington', cityName: "Bridlington", lat: 54.08306, lng: -0.19192, size: 30, healthScore: 24, color: COLOR_RED, population: '35,369' },
    { id: 'rotherham', cityName: "Rotherham", lat: 53.43012, lng: -1.35678, size: 40, healthScore: 61, color: COLOR_AMBER, population: '109,691' },
    { id: 'halifax', cityName: "Halifax", lat: 53.71667, lng: -1.85, size: 30, healthScore: 72, color: COLOR_GREEN, population: '88,134' },
    { id: 'bradford', cityName: "Bradford", lat: 53.79391, lng: -1.75206, size: 60, healthScore: 85, color: COLOR_GREEN, population: '537,173' },
    { id: 'harrogate', cityName: "Harrogate", lat: 53.99078, lng: -1.5373, size: 30, healthScore: 23, color: COLOR_RED, population: '75,070' },
    { id: 'huddersfield', cityName: "Huddersfield", lat: 53.64904, lng: -1.78416, size: 40, healthScore: 79, color: COLOR_GREEN, population: '162,949' },
    { id: 'hull', cityName: "Hull", lat: 53.7446, lng: -0.33525, size: 45, healthScore: 68, color: COLOR_AMBER, population: '260,645' },
    { id: 'york', cityName: "York", lat: 53.955413, lng: -1.08271, size: 60, healthScore: 60, color: COLOR_AMBER, population: '209,893' },
    { id: 'middlesbrough', cityName: "Middlesbrough", lat: 54.57623, lng: -1.23483, size: 40, healthScore: 22, color: COLOR_RED, population: '174,700' },
    { id: 'sheffield', cityName: "Sheffield", lat: 53.38297, lng: -1.4659, size: 70, healthScore: 20, color: COLOR_RED, population: '582,506' },
    { id: 'pickering', cityName: "Pickering", lat: 54.25, lng: -0.76667, size: 20, healthScore: 20, color: COLOR_RED, population: '6,830' },
];

export function getCityById(id) {
    let result = null;
    for (let i = 0, n = dummyCities.length; i < n; i++) {
        let item = dummyCities[i];
        if (item.id === id) {
            result = item;
            break;
        }
    }
    return result;
}