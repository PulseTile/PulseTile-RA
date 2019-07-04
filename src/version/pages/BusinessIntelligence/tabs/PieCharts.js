import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles/index";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import PieChartByGender from "../charts/PieChartByGender";
import { COLOR_MALE, COLOR_FEMALE } from "../constants";
import EmptyListBlock from "../../../../core/common/ResourseTemplates/EmptyListBlock";

const styles = theme => ({
    chartsContainer: {
        padding: 5,
    },
    chartsRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    singlePieChart: {
        [theme.breakpoints.only('xs')]: {
            width: '100%',
        },
    },
    legend: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    legendParameter: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5,
    },
    square: {
        width: 16,
        height: 16,
        borderRadius: 8,
        marginRight: 5,
    }
});


const dummyData = [
    { type: 'diabetes', label: "Diabetes", male: 680, female: 320 },
    { type: 'measles',  label: "Measles",  male: 540, female: 460 },
    { type: 'asthma',   label: "Asthma",   male: 620, female: 380 },
    { type: 'dementia', label: "Dementia", male: 490, female: 510 },
];

class PieCharts extends Component {
    render() {
        const { classes, isDiagnosisVisible, isGenderVisible, isEmptyResults } = this.props;
        return (
            <React.Fragment>
                <Grid className={classes.chart} item xs={12} sm={12} md={11}>
                    <div className={classes.tableBlock}>
                        <Typography variant="h1">Diagnosis By Gender</Typography>
                    </div>
                    {
                        isEmptyResults()
                            ? <EmptyListBlock />
                            :
                            <React.Fragment>
                                <div className={classes.chartsContainer}>
                                    <Grid container sm={12} spacing={16}>
                                        {
                                            dummyData.map((item, key) => {
                                                if (isDiagnosisVisible(item.type)) {
                                                    return (
                                                        <Grid item key={key} sm={12} md={6} lg={3}>
                                                            <PieChartByGender label={item.label} male={item.male} female={item.female} isGenderVisible={isGenderVisible} />
                                                        </Grid>
                                                    )
                                                }
                                            })
                                        }
                                    </Grid>
                                </div>
                                <div className={classes.legend}>
                                    {
                                        isGenderVisible('male') &&
                                            <div className={classes.legendParameter}>
                                                <div className={classes.square} style={{ backgroundColor: COLOR_MALE, border: `1px solid ${COLOR_MALE}`}} ></div>
                                                <Typography>Male</Typography>
                                            </div>
                                    }
                                    {
                                        isGenderVisible('female') &&
                                            <div className={classes.legendParameter}>
                                                <div className={classes.square} style={{ backgroundColor: COLOR_FEMALE, border: `1px solid ${COLOR_FEMALE}`}} ></div>
                                                <Typography>Female</Typography>
                                            </div>
                                    }
                                </div>
                            </React.Fragment>
                    }

                </Grid>
            </React.Fragment>
        );
    }
};

export default withStyles(styles)(PieCharts);