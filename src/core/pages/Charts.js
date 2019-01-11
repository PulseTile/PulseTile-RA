import React, { Component } from "react";
import { get } from "lodash";
import { connect } from 'react-redux';
import {
    BarChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Cell,
    Bar
} from "recharts";

import { patientStatisticAction } from "../actions/patientsStatisticAction";

const CustomLabel = () => {
    return (
        <div>Label</div>
    );
};

class Charts extends Component {

    componentDidMount() {
        this.props.getPatientsStatistic();
    }

    render() {
        const { patients } = this.props;

        console.log(patients)

        const dataGreen = [
            {
                AnswerRef: "one",
                Text: "Community Care",
                Score: 0,
                RespondentPercentage: 25,
                Rank: 1
            },
            {
                AnswerRef: "two",
                Text: "Hospital",
                Score: 0,
                RespondentPercentage: 16,
                Rank: 2
            },
            {
                AnswerRef: "three",
                Text: "Mental Health",
                Score: 1,
                RespondentPercentage: 9,
                Rank: 3
            },
            {
                AnswerRef: "four",
                Text: "Neighbourhood",
                Score: 0,
                RespondentPercentage: 20,
                Rank: 4
            },
            {
                AnswerRef: "five",
                Text: "Primary Care",
                Score: 0,
                RespondentPercentage: 29,
                Rank: 5
            }
        ];

        const dataViolet = [
            {
                AnswerRef: "one",
                Text: "19-30",
                Score: 0,
                RespondentPercentage: 16,
                Rank: 1
            },
            {
                AnswerRef: "two",
                Text: "31-60",
                Score: 0,
                RespondentPercentage: 37,
                Rank: 2
            },
            {
                AnswerRef: "three",
                Text: "61-80",
                Score: 1,
                RespondentPercentage: 33,
                Rank: 3
            },
            {
                AnswerRef: "four",
                Text: ">80",
                Score: 0,
                RespondentPercentage: 12,
                Rank: 4
            }
        ];

        return (
            <div>
                <div>
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
                            label={<CustomLabel />} >
                            {dataGreen.map((entry, index) => (
                                <Cell fill={"#c5e29f"} />
                            ))}
                        </Bar>
                    </BarChart>
                </div>
                <div>
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
                        <Bar
                            dataKey="RespondentPercentage"
                            barSize={170}
                            fontFamily="sans-serif"
                            label={<CustomLabel />} >
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

export default connect(mapStateToProps, mapDispatchToProps)(Charts);