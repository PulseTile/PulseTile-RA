import React, { Component } from "react";
import moment from "moment";
import { connect } from 'react-redux';
import get from "lodash/get";
import { ResponsiveContainer, BarChart, XAxis, YAxis, CartesianGrid, Cell, Bar } from "recharts";

import { withStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";

import dummyPatients from "../PatientsList/dummyPatients";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartBar } from '@fortawesome/free-solid-svg-icons';
import Tooltip from "@material-ui/core/Tooltip";

import BarChartTemplate from "./BarChartTemplate";

const styles = theme => ({
    chartsContainer: {
        display: "flex",
        justifyContent: "space-around",
        backgroundColor: theme.palette.paperColor,
    },
});

class Charts extends Component {

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
        const { classes, userSearch, history } = this.props;

        // const patientsInfo = customDataProvider(GET_LIST, 'patients', {});
        // const patientsInfo = [];
        // const patientsData = get(patientsInfo, 'data', []);

        const patientsData = dummyPatients;

        const DepartmentPercentage = this.getDepartmentPercentage(patientsData);
        const dataGreen = [
            { Text: "Community Care", sort: "CommunityCare", RespondentPercentage: get(DepartmentPercentage, 'CommunityCare', 0) },
            { Text: "Hospital", sort: "Hospital", RespondentPercentage: get(DepartmentPercentage, 'Hospital', 0) },
            { Text: "Mental Health", sort: "MentalHealth", RespondentPercentage: get(DepartmentPercentage, 'MentalHealth', 0) },
            { Text: "Neighbourhood", sort: "Neighbourhood", RespondentPercentage: get(DepartmentPercentage, 'Neighbourhood', 0) },
            { Text: "Primary Care", sort: "PrimaryCare", RespondentPercentage: get(DepartmentPercentage, 'PrimaryCare', 0) }
        ];

        const AgePercentage = this.getAgePercentage(patientsData);
        const dataViolet = [
            { Text: "19-30", sort: "first", RespondentPercentage: get(AgePercentage, 'first', 0) },
            { Text: "31-60", sort: "second", RespondentPercentage: get(AgePercentage, 'second', 0) },
            { Text: "61-80", sort: "third", RespondentPercentage: get(AgePercentage, 'third', 0) },
            { Text: ">80", sort: "fourth", RespondentPercentage: get(AgePercentage, 'fourth', 0) }
        ];

        return (
            <div className={classes.chartsContainer}>
                <BarChartTemplate
                    mainTitle="Patients By Setting"
                    secondTitle="Patients By Setting"
                    description="This is a brief description of patients by setting."
                    data={dataGreen}
                    barSize={120}
                    onClickAction={this.redirectTo}
                    history={history}
                    barColor="#c5e29f"
                />
                <BarChartTemplate
                    mainTitle="Patients By Age"
                    secondTitle="Patients By Age"
                    description="This is a brief description of patients by age."
                    data={dataViolet}
                    barSize={170}
                    onClickAction={this.redirectTo}
                    history={history}
                    barColor="#d3b2f4"
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userSearch: state.custom.userSearch.data,
    }
};

export default connect(mapStateToProps, null)(withStyles(styles)(Charts));
