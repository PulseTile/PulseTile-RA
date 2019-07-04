import React, { Component } from 'react';
import get from "lodash/get";

import GoogleMapReact from 'google-map-react';

import CircleOnMap from "./CircleOnMap";
import MapLegend from "./MapLegend";
import { COLOR_GREEN, COLOR_RED, COLOR_AMBER } from "../constants";

const API_KEY = 'AIzaSyCskY6-WDa0tfSayzD2gzu-EAKIfJUoUGA';

const dummyData = [
    { cityName: "Leeds", lat: 53.79648, lng: -1.54785, size: 70, healthScore: 82, color: COLOR_GREEN },
    { cityName: "Darlington", lat: 54.52429, lng: -1.55039, size: 40, healthScore: 86, color: COLOR_GREEN },
    { cityName: "Doncaster", lat: 53.52285, lng: -1.13116, size: 35, healthScore: 86, color: COLOR_GREEN },
    { cityName: "Scarborough", lat: 54.27966, lng: -0.40443, size: 30, healthScore: 62, color: COLOR_AMBER },
    { cityName: "Bridlington", lat: 54.08306, lng: -0.19192, size: 20, healthScore: 24, color: COLOR_RED },
    { cityName: "Rotherham", lat: 53.43012, lng: -1.35678, size: 30, healthScore: 61, color: COLOR_AMBER },
    { cityName: "Halifax", lat: 53.71667, lng: -1.85, size: 30, healthScore: 72, color: COLOR_GREEN },
    { cityName: "Bradford", lat: 53.79391, lng: -1.75206, size: 30, healthScore: 85, color: COLOR_GREEN },
    { cityName: "Harrogate", lat: 53.99078, lng: -1.5373, size: 45, healthScore: 23, color: COLOR_RED },
    { cityName: "Huddersfield", lat: 53.64904, lng: -1.78416, size: 20, healthScore: 79, color: COLOR_GREEN },
    { cityName: "Hull", lat: 53.7446, lng: -0.33525, size: 45, healthScore: 68, color: COLOR_AMBER },
    { cityName: "York", lat: 53.955413, lng: -1.08271, size: 60, healthScore: 68, color: COLOR_AMBER },
    { cityName: "Middlesbrough", lat: 54.57623, lng: -1.23483, size: 40, healthScore: 22, color: COLOR_RED },
    { cityName: "Sheffield", lat: 53.38297, lng: -1.4659, size: 30, healthScore: 20, color: COLOR_RED },
    { cityName: "Pickering", lat: 54.25, lng: -0.76667, size: 20, healthScore: 20, color: COLOR_RED },

];

class MapWithStatistics extends Component {

    static defaultProps = {
        center: {
            lat: 53.955413,
            lng: -1.08271
        },
        zoom: 9
    };

    state = {
        isPoorSelected: true,
        isGoodSelected: true,
        isVeryGoodSelected: true,
    };

    isItemVisible = item => {
        const { isPoorSelected, isGoodSelected, isVeryGoodSelected } = this.state;
        return (isPoorSelected && item.healthScore <= 25) ||
            (isGoodSelected && item.healthScore >= 26 && item.healthScore <= 75) ||
            (isVeryGoodSelected && item.healthScore >= 76 && item.healthScore < 100);
    };

    togglePoor = () => {
        this.setState({
            isPoorSelected: !this.state.isPoorSelected,
        });
    };

    toggleGood = () => {
        this.setState({
            isGoodSelected: !this.state.isGoodSelected,
        });
    };

    toggleVeryGood = () => {
        this.setState({
            isVeryGoodSelected: !this.state.isVeryGoodSelected,
        });
    };

    filterByHealthScore = healthScore => {
        const { businessIntelligence } = this.props;
        const healthScoreMin = get(businessIntelligence, 'healthScore[0]', 0);
        const healthScoreMax = get(businessIntelligence, 'healthScore[1]', 0);
        return !businessIntelligence || (healthScore >= healthScoreMin && healthScore <= healthScoreMax);
    };

    render() {
        const { isPoorSelected, isGoodSelected, isVeryGoodSelected } = this.state;
        return (
            <div style={{ height: '80vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: API_KEY, language: 'en', }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                >
                    { dummyData.filter(item => this.filterByHealthScore(item.healthScore)).map((item, key) => {
                        if (this.isItemVisible(item)) {
                            return (
                                <CircleOnMap
                                    key={key}
                                    lat={item.lat}
                                    lng={item.lng}
                                    size={item.size}
                                    color={item.color}
                                    cityName={item.cityName}
                                    healthScore={item.healthScore}
                                />
                            )
                        }
                    })}

                </GoogleMapReact>
                <MapLegend
                    isPoorSelected={isPoorSelected}
                    isGoodSelected={isGoodSelected}
                    isVeryGoodSelected={isVeryGoodSelected}
                    togglePoor={this.togglePoor}
                    toggleGood={this.toggleGood}
                    toggleVeryGood={this.toggleVeryGood}
                />
            </div>
        );
    }
};

export default MapWithStatistics;