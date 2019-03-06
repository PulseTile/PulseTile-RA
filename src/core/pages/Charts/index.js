import React, { Component } from "react";
import moment from "moment";
import get from "lodash/get";
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import {
    BarChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Cell,
    Bar
} from "recharts";

import { withStyles } from '@material-ui/core/styles';

import { patientStatisticAction } from "../../actions/patientsStatisticAction";
import dummyPatients from "../dummyPatients";

const styles = {
    chartsContainer: {
        display: "flex",
        justifyContent: "space-around",
        backgroundColor: "white",
    },
    chartBlock: {
        display: "inline-block",
    }
};

class Charts extends Component {

    componentDidMount() {
        this.props.getPatientsStatistic();
    }

    /**
     * This function calculates percentage of patients by department
     *
     * @author Bogdan Shcherban <bsc@piogroup.net>
     * @param {array} patients
     * @return {array}
     */
    getDepartmentPercentage(patients) {
        let CommunityCareCount = 0;
        let HospitalCount = 0;
        let MentalHealthCount = 0;
        let NeighbourhoodCount = 0;
        let PrimaryCareCount = 0;
        let totalNumber = 0;
        for (let item in patients) {
            totalNumber++;
            switch(get(patients, '[' + item + '].department', null)) {
                case "Community Care":
                    CommunityCareCount++;
                    break;
                case "Hospital":
                    HospitalCount++;
                    break;
                case "Mental Health":
                    MentalHealthCount++;
                    break;
                case "Neighbourhood":
                    NeighbourhoodCount++;
                    break;
                case "Primary Care":
                    PrimaryCareCount++;
                    break;
            }
        }
        const CommunityCarePercentage = (totalNumber > 0) ? Math.round(((100 * CommunityCareCount) / totalNumber)) : 0;
        const HospitalPercentage = (totalNumber > 0) ? Math.round(((100 * HospitalCount) / totalNumber)) : 0;
        const MentalHealthPercentage = (totalNumber > 0) ? Math.round(((100 * MentalHealthCount) / totalNumber)) : 0;
        const NeighbourhoodPercentage = (totalNumber > 0) ? Math.round(((100 * NeighbourhoodCount) / totalNumber)) : 0;
        const PrimaryCarePercentage = (totalNumber > 0) ? Math.round(((100 * PrimaryCareCount) / totalNumber)) : 0;
        return {
            CommunityCare: CommunityCarePercentage,
            Hospital: HospitalPercentage,
            MentalHealth: MentalHealthPercentage,
            Neighbourhood: NeighbourhoodPercentage,
            PrimaryCare: PrimaryCarePercentage
        };
    }

    /**
     * This function calculates percentage of patients by age
     *
     * @author Bogdan Shcherban <bsc@piogroup.net>
     * @param {array} patients
     * @return {array}
     */
    getAgePercentage(patients) {
        let firstCount = 0;
        let secondCount = 0;
        let thirdCount = 0;
        let fourthCount = 0;
        let totalNumber = 0;
        const currentDate = new Date().getTime();
        const endDate = new moment(currentDate);
        for (let item in patients) {
            totalNumber++;
            let birthDate = get(patients, '[' + item + '].dateOfBirth', null);
            let startDate = new moment(birthDate);
            let duration = moment.duration(endDate.diff(startDate)).get('year');
            if (duration >= 19 && duration <= 30) {
                firstCount++;
            } else if (duration >= 31 && duration <= 60) {
                secondCount++;
            } else if (duration >= 61 && duration <= 80) {
                thirdCount++;
            } else if (duration > 80) {
                fourthCount++;
            }
        }
        const firstPercentage = (totalNumber > 0) ? Math.round(((100 * firstCount) / totalNumber)) : 0;
        const secondPercentage = (totalNumber > 0) ? Math.round(((100 * secondCount) / totalNumber)) : 0;
        const thirdPercentage = (totalNumber > 0) ? Math.round(((100 * thirdCount) / totalNumber)) : 0;
        const fourthPercentage = (totalNumber > 0) ? Math.round(((100 * fourthCount) / totalNumber)) : 0;
        return {
            first: firstPercentage,
            second: secondPercentage,
            third: thirdPercentage,
            fourth: fourthPercentage,
        };
    }

    /**
     * This function redirects to patients list when user clicks on Bar
     *
     * @author Bogdan Shcherban <bsc@piogroup.net>
     * @param {shape}  history
     * @param {shape}  item
     */
    redirectTo(history, item) {
        let url = "/patients?sort="+item.sort;
        history.push(url);
    }

    render() {
        const { classes, patients, history } = this.props;

        const patientsList = (patients && patients.length > 0) ? patients : dummyPatients;

        const DepartmentPercentage = this.getDepartmentPercentage(patientsList);
        const dataGreen = [
            { Text: "Community Care", sort: "CommunityCare", RespondentPercentage: get(DepartmentPercentage, 'CommunityCare', 0) },
            { Text: "Hospital", sort: "Hospital", RespondentPercentage: get(DepartmentPercentage, 'Hospital', 0) },
            { Text: "Mental Health", sort: "MentalHealth", RespondentPercentage: get(DepartmentPercentage, 'MentalHealth', 0) },
            { Text: "Neighbourhood", sort: "Neighbourhood", RespondentPercentage: get(DepartmentPercentage, 'Neighbourhood', 0) },
            { Text: "Primary Care", sort: "PrimaryCare", RespondentPercentage: get(DepartmentPercentage, 'PrimaryCare', 0) }
        ];

        const AgePercentage = this.getAgePercentage(patientsList);
        const dataViolet = [
            { Text: "19-30", sort: "first", RespondentPercentage: get(AgePercentage, 'first', 0) },
            { Text: "31-60", sort: "second", RespondentPercentage: get(AgePercentage, 'second', 0) },
            { Text: "61-80", sort: "third", RespondentPercentage: get(AgePercentage, 'third', 0) },
            { Text: ">80", sort: "fourth", RespondentPercentage: get(AgePercentage, 'fourth', 0) }
        ];

        return (
            <div className={classes.chartsContainer}>
                <div className={classes.chartBlock}>
                    <h3>Patients By Setting</h3>
                    <p>This is a brief description of patients by setting.</p>
                    <BarChart
                        width={800}
                        height={260}
                        data={dataGreen}
                        margin={{ top: 5, right: 0, left: 0, bottom: 25 }} >
                        <XAxis dataKey="Text" fontFamily="sans-serif" tickSize dy="25" />
                        <YAxis hide />
                        <CartesianGrid vertical={false} stroke="#E8E8E8" />
                        <Bar
                            dataKey="RespondentPercentage"
                            barSize={170}
                            fontFamily="sans-serif"
                            onClick={(item) => this.redirectTo(history, item)}
                        >
                            {dataGreen.map((entry, index) => (
                                <Cell fill={"#c5e29f"} />
                            ))}
                        </Bar>
                    </BarChart>
                </div>
                <div className={classes.chartBlock}>
                    <h3>Patients By Age</h3>
                    <p>This is a brief description of patients by age.</p>
                    <BarChart
                        width={800}
                        height={260}
                        data={dataViolet}
                        margin={{ top: 5, right: 0, left: 0, bottom: 25 }} >
                        <XAxis dataKey="Text" fontFamily="sans-serif" tickSize dy="25" />
                        <YAxis hide />
                        <CartesianGrid vertical={false} stroke="#E8E8E8" />
                        <Bar dataKey="RespondentPercentage" barSize={170} fontFamily="sans-serif" onClick={(item) => this.redirectTo(history, item)} >
                            {dataViolet.map((entry, index) => (
                                <Cell fill={"#d3b2f4"} />
                            ))}
                        </Bar>
                    </BarChart>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        patients: get(state, "custom.patientsStatistic.data", []),
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getPatientsStatistic() {
            dispatch(patientStatisticAction.request());
        }
    }
};

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(Charts);
