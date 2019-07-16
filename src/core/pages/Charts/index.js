import React, { Component } from "react";
import moment from "moment";
import { connect } from 'react-redux';
import get from "lodash/get";
import { setSidebarVisibility } from "react-admin";

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import dummyPatients from "../PatientsList/dummyPatients";

import BarChartTitle from "./fragments/BarChartTitle";
import BarChartTemplate from "./fragments/BarChartTemplate";
import { userSearchAction } from "../../actions/userSearchAction";

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        height: '100%',
        background: theme.patientSummaryPanel.container.background,
        backgroundSize: "cover",
    },
    chartsContainer: {
        width: "100%",
        backgroundColor: theme.palette.paperColor,
        padding: 5,
        margin: 0,
    },
    chart: {
        '& .recharts-text.recharts-cartesian-axis-tick-value': {
            fontFamily: '"HK Grotesk SemiBold", Arial, sans-serif',
            fontSize: 14,
        },
    },
    chartBlock: {
        border: `1px solid ${theme.palette.borderColor}`,
    }
});

class Charts extends Component {

    componentDidMount() {
        this.props.setSidebarVisibility(false);
    }

    /**
     * This function calculates percentage of patients by department
     *
     * @author Bogdan Shcherban <bsc@piogroup.net>
     * @param {array} patients
     * @return {array}
     */
    getDepartmentPercentage(patients) {
        let EdinburghCount = 0;
        let SomersetCount = 0;
        let GlasgowCount = 0;
        let HamiltonCount = 0;
        let NorthamptonCount = 0;
        let totalNumber = 0;
        for (let item in patients) {
            totalNumber++;
            switch(get(patients, '[' + item + '].city', null)) {
                case "Edinburgh":
                    EdinburghCount++;
                    break;
                case "Somerset":
                    SomersetCount++;
                    break;
                case "Glasgow":
                    GlasgowCount++;
                    break;
                case "Hamilton":
                    HamiltonCount++;
                    break;
                case "Northampton":
                    NorthamptonCount++;
                    break;
            }
        }
        const EdinburghCarePercentage = (totalNumber > 0) ? Math.round(((100 * EdinburghCount) / totalNumber)) : 0;
        const SomersetPercentage = (totalNumber > 0) ? Math.round(((100 * SomersetCount) / totalNumber)) : 0;
        const GlasgowPercentage = (totalNumber > 0) ? Math.round(((100 * GlasgowCount) / totalNumber)) : 0;
        const HamiltonPercentage = (totalNumber > 0) ? Math.round(((100 * HamiltonCount) / totalNumber)) : 0;
        const NorthamptonPercentage = (totalNumber > 0) ? Math.round(((100 * NorthamptonCount) / totalNumber)) : 0;
        return {
            Edinburgh: EdinburghCarePercentage,
            Somerset: SomersetPercentage,
            Glasgow: GlasgowPercentage,
            Hamilton: HamiltonPercentage,
            Northampton: NorthamptonPercentage
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
     * @param {string} searchType
     * @param {shape}  item
     */
    redirectTo = (history, searchType, item) => {
        const valueForSearch = get(item, 'payload.valueForSearch', null);
        if (valueForSearch) {
            this.props.setSearchType(searchType, valueForSearch)
        }
        let url = "/patients";
        history.push(url);
    };

    render() {
        const { classes, userSearch, history } = this.props;

        // const patientsInfo = customDataProvider(GET_LIST, 'patients', {});
        // const patientsInfo = [];
        // const patientsData = get(patientsInfo, 'data', []);

        const patientsData = dummyPatients;

        const DepartmentPercentage = this.getDepartmentPercentage(patientsData);
        const dataGreen = [
            { Text: "Edinburgh", sort: "Edinburgh", RespondentPercentage: get(DepartmentPercentage, 'Edinburgh', 0), valueForSearch: "Edinburgh" },
            { Text: "Somerset", sort: "Somerset", RespondentPercentage: get(DepartmentPercentage, 'Somerset', 0), valueForSearch: "Somerset" },
            { Text: "Glasgow", sort: "Glasgow", RespondentPercentage: get(DepartmentPercentage, 'Glasgow', 0), valueForSearch: "Glasgow" },
            { Text: "Hamilton", sort: "Hamilton", RespondentPercentage: get(DepartmentPercentage, 'Hamilton', 0), valueForSearch: "Hamilton" },
            { Text: "Northampton", sort: "Northampton", RespondentPercentage: get(DepartmentPercentage, 'Northampton', 0), valueForSearch: "Northampton" }
        ];

        const AgePercentage = this.getAgePercentage(patientsData);
        const dataViolet = [
            { Text: "<30", sort: "first", RespondentPercentage: get(AgePercentage, 'first', 0), valueForSearch: [0, 30] },
            { Text: "31-60", sort: "second", RespondentPercentage: get(AgePercentage, 'second', 0), valueForSearch: [31, 60] },
            { Text: "61-80", sort: "third", RespondentPercentage: get(AgePercentage, 'third', 0), valueForSearch: [61, 80] },
            { Text: ">80", sort: "fourth", RespondentPercentage: get(AgePercentage, 'fourth', 0), valueForSearch: [81, 100] }
        ];

        return (
            <div className={classes.root}>
                <Grid className={classes.chartsContainer} container spacing={16} >
                    <Grid className={classes.chart} item xs={12} sm={12} md={6}>
                        <div className={classes.chartBlock}>
                            <BarChartTitle
                                mainTitle="Patients By Cities"
                                secondTitle="Patients By Cities"
                                description="This is a brief description of patients by cities."
                            />
                            <BarChartTemplate
                                data={dataGreen}
                                onClickAction={this.redirectTo}
                                history={history}
                                searchType="by_city"
                                barColor="#c4e4d6"
                                borderColor="#78cea7"
                            />
                        </div>
                    </Grid>
                    <Grid className={classes.chart} item xs={12} sm={12} md={6}>
                        <div className={classes.chartBlock}>
                            <BarChartTitle
                                mainTitle="Patients By Age"
                                secondTitle="Patients By Age"
                                description="This is a brief description of patients by age."
                            />
                            <BarChartTemplate
                                data={dataViolet}
                                onClickAction={this.redirectTo}
                                history={history}
                                searchType="by_age"
                                barColor="#d3b2f4"
                                borderColor="#832edf"
                            />
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userSearch: state.custom.userSearch.data,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setSidebarVisibility(params) {
            dispatch(setSidebarVisibility(params));
        },
        setSearchType(type, value) {
            dispatch(userSearchAction.searchBy(type, value));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Charts));
