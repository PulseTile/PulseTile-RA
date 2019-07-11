import React, { Component } from 'react';
import get from "lodash/get";

import GoogleMapReact from 'google-map-react';

import CircleOnMap from "./CircleOnMap";
import MapLegend from "./MapLegend";

import { dummyCities } from "../dummyCityStatistic";
import { getColorByHealthScore, getAverageHealthScore } from "../functions";

const API_KEY = 'AIzaSyCskY6-WDa0tfSayzD2gzu-EAKIfJUoUGA';

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

    isItemVisible = (averageHealthScore) => {
        const { isPoorSelected, isGoodSelected, isVeryGoodSelected } = this.state;
        return (isPoorSelected && averageHealthScore <= 25) ||
            (isGoodSelected && averageHealthScore >= 26 && averageHealthScore <= 75) ||
            (isVeryGoodSelected && averageHealthScore >= 76 && averageHealthScore < 100);
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
        const { changeCity, patients, patientsNumberArray } = this.props;
        const { isPoorSelected, isGoodSelected, isVeryGoodSelected } = this.state;
        return (
            <div style={{ height: '80vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: API_KEY, language: 'en', }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                >
                    { dummyCities.map((item, key) => {
                        const patientsByCurrentCity = patients ? patients.filter(patientItem => patientItem.location === item.cityName) : [];
                        const patientNumberItem = patientsNumberArray.filter(cityItem => cityItem.city === item.cityName);
                        const averageHealthScore = getAverageHealthScore(patientsByCurrentCity);
                        const color = getColorByHealthScore(averageHealthScore);
                        if (this.isItemVisible(averageHealthScore) && this.filterByHealthScore(averageHealthScore) && get(patientNumberItem, '[0].number', 0) > 0) {
                            return (
                                <CircleOnMap
                                    key={key}
                                    id={item.id}
                                    lat={item.lat}
                                    lng={item.lng}
                                    size={item.size}
                                    color={color}
                                    cityName={item.cityName}
                                    healthScore={averageHealthScore}
                                    onClick={changeCity}
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