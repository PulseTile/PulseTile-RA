import React, { Component } from 'react';
import get from "lodash/get";

import GoogleMapReact from 'google-map-react';

import CircleOnMap from "./CircleOnMap";
import MapLegend from "./MapLegend";

import { dummyCities } from "../dummyCityStatistic";

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
        const { changeCity } = this.props;
        const { isPoorSelected, isGoodSelected, isVeryGoodSelected } = this.state;
        return (
            <div style={{ height: '80vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: API_KEY, language: 'en', }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                >
                    { dummyCities.filter(item => this.filterByHealthScore(item.healthScore)).map((item, key) => {
                        if (this.isItemVisible(item)) {
                            return (
                                <CircleOnMap
                                    key={key}
                                    id={item.id}
                                    lat={item.lat}
                                    lng={item.lng}
                                    size={item.size}
                                    color={item.color}
                                    cityName={item.cityName}
                                    healthScore={item.healthScore}
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