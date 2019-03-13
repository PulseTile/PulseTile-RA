import React, { Component } from "react";

import { connect } from 'react-redux';
import { withStyles } from "@material-ui/core/styles";

import { initializeAction } from "../actions/initializeAction";
import { token } from "../token";

const styles = {
    mainSpinner: {
        display: "block",
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        paddingTop: 150,
        zIndex: 9999,
        backgroundColor: "#fff",
        transition: "opacity 1s ease, visibility 1s ease, background 1s ease",
    },
    slidesAndRings: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        left: "50%",
        position: "absolute",
        transform: "translate(-50%, -50%)",
        marginLeft: "-100px",
    },
    tips: {
        overflow: "hidden",
        width: 280,
        margin: "0 auto",
        position: "absolute",
        textAlign: "center",
        top: 180,
        left: -40,
        fontFamily: "HK_Grotesk_Regular",
        "& h2": {
            marginTop: 10,
            marginBottom: 10,
            fontSize: 24,
        },
        "& h3": {
            marginTop: 10,
            fontSize: 18,
        },
    },
    '@keyframes slide': {
        "0%": { marginLeft: 0 },
        "9.91%": { marginLeft: 0 },
        "10.01%": { marginLeft: -280 },
        "19.92%": { marginLeft: -280 },
        "20.02%": { marginLeft: -560 },
        "29.93%": { marginLeft: -560 },
        "30.03%": { marginLeft: -840 },
        "39.94%": { marginLeft: -840 },
        "40.04%": { marginLeft: -1120 },
        "49.95%": { marginLeft: -1120 },
        "50.05%": { marginLeft: -1400 },
        "59.96%": { marginLeft: -1400 },
        "60.06%": { marginLeft: -1680 },
        "69.97%": { marginLeft: -1680 },
        "70.07%": { marginLeft: -1960 },
        "79.98%": { marginLeft: -1960 },
        "80.08%": { marginLeft: -2240 },
        "89.99%": { marginLeft: -2240 },
        "90.09%": { marginLeft: -2520 },
        "100%": { marginLeft: -2520 },
    },
    slideWrapper: {
        width: 2800,
        WebkitAnimation: "slide 100.9s ease-out infinite",
        animation: "slide 100.9s ease-out infinite",
    },
    slide: {
        float: "left",
        width: 280,
    },
    slideNumber: {
        color: "#000",
        textAlign: "center",
        fontSize: 14,
    },
    '@keyframes rings': {
        "0%": {
            WebkitTransform: "rotate(0)",
            transform: "rotate(0)",
        },
        "100%": {
            WebkitTransform: "rotate(360deg)",
            transform: "rotate(360deg)",
        }
    },
    '@keyframes rings_reverse': {
        "0%": {
            WebkitTransform: "rotate(0)",
            transform: "rotate(0)",
        },
        "100%": {
            WebkitTransform: "rotate(-360deg)",
            transform: "rotate(-360deg)",
        }
    },
    rings: {
        position: "relative",
        "& div": {
            position: "absolute",
            width: 120,
            height: 120,
            top: 40,
            left: 40,
            borderRadius: "50%",
            border: "10px solid #000",
            borderColor: "#0078C8 transparent #0078C8 transparent",
            WebkitAnimation: "rings 1s linear infinite",
            animation: `rings 1s linear infinite`,
        },
        "& div:nth-child(2)": {
            width: 96,
            height: 96,
            top: 52,
            left: 52,
            borderColor: "transparent #cacaca transparent #cacaca",
            WebkitAnimation: "rings_reverse 1s linear infinite",
            animation: "rings_reverse 1s linear infinite",
        }
    },
};

class InitializePage extends Component {

    componentDidMount() {
        if (!token) {
            this.props.initializeAction();
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.mainSpinner}>
                <div className={classes.slidesAndRings}>
                {token &&
                    <div className={classes.tips}>
                        <h2>Top Tips to a Healthy Life</h2>
                        <div className={classes.slideWrapper}>
                            <div className={classes.slide}>
                                <div className={classes.slideNumber}>
                                    <h3>Give up smoking</h3>
                                    <p>If you're a smoker, quit. It's the single best thing you can do for your heart health.</p>
                                    <p>Smoking is one of the main causes of coronary heart disease. A year after giving up, your risk of a heart attack falls to about half that of a smoker.</p>
                                    <p>You're more likely to stop smoking for good if you use NHS stop smoking services. Visit the Smokefree website or ask your GP for help with quitting.</p>
                                </div>
                            </div>

                            <div className={classes.slide}>
                                <div className={classes.slideNumber}>
                                    <h3>Get active</h3>
                                    <p>Getting – and staying – active can reduce your risk of developing heart disease. It can also be a great mood booster and stress buster.</p>
                                    <p>Do 150 minutes of moderate-intensity aerobic activity every week. One way to achieve this target is by doing 30 minutes of activity on 5 days a week. Fit it in where you can, such as by cycling to work.</p>
                                </div>
                            </div>

                            <div className={classes.slide}>
                                <div className={classes.slideNumber}>
                                    <h3>Manage your weight</h3>
                                    <p>Being overweight can increase your risk of heart disease. Stick to a healthy, balanced diet low in fat and sugar, with plenty of fruit and vegetables, combined with regular physical activity.</p>
                                    <p>Find out if you're a healthy weight with the BMI calculator. If you're overweight, try our 12-week NHS weight loss plan.</p>
                                </div>
                            </div>

                            <div className={classes.slide}>
                                <div className={classes.slideNumber}>
                                    <h3>Eat more fibre</h3>
                                    <p>Eat plenty of fibre to help lower your risk of heart disease – aim for at least 30g a day.</p>
                                    <p>Eat fibre from a variety of sources, such as wholemeal bread, bran, oats and wholegrain cereals, potatoes with their skins on, and plenty of fruit and veg.</p>
                                </div>
                            </div>

                            <div className={classes.slide}>
                                <div className={classes.slideNumber}>
                                    <h3>Cut down on saturated fat</h3>
                                    <p>Eating too many foods that are high in saturated fat can raise the level of cholesterol in your blood. This increases your risk of heart disease.</p>
                                    <p>Choose leaner cuts of meat and lower fat dairy products like 1% fat milk over full-fat (or whole) milk.</p>
                                </div>
                            </div>

                            <div className={classes.slide}>
                                <div className={classes.slideNumber}>
                                    <h3>Get your 5 A Day</h3>
                                    <p>Eat at least 5 portions of a variety of fruit and vegetables a day. They're a good source of fibre, vitamins and minerals.</p>
                                    <p>There are lots of tasty ways to get your 5 A Day, like adding chopped fruit to cereal or including vegetables in your pasta sauces and curries.</p>
                                </div>
                            </div>

                            <div className={classes.slide}>
                                <div className={classes.slideNumber}>
                                    <h3>Cut down on salt</h3>
                                    <p>To maintain healthy blood pressure, avoid using salt at the table and try adding less to your cooking. Once you get used to the taste of food without added salt, you can cut it out completely.</p>
                                    <p>Watch out for high salt levels in ready-made foods. Most of the salt we eat is already in the foods we buy. Check the food labels – a food is high in salt if it has more than 1.5g salt (or 0.6g sodium) per 100g.</p>
                                    <p>Adults should eat less than 6g of salt a day in total – that's about 1 teaspoon.</p>
                                </div>
                            </div>

                            <div className={classes.slide}>
                                <div className={classes.slideNumber}>
                                    <h3>Eat Fish</h3>
                                    <p>Eat fish at least twice a week, including a portion of oily fish. Fish such as pilchards, sardines and salmon are a source of omega-3 fats, which may help protect against heart disease.</p>
                                    <p>Pregnant or breastfeeding women should not have more than 2 portions of oily fish a week.</p>
                                </div>
                            </div>

                            <div className={classes.slide}>
                                <div className={classes.slideNumber}>
                                    <h3>Drink less alcohol</h3>
                                    <p>Do not forget that alcohol contains calories. Regularly drinking more than the NHS recommends can have a noticeable impact on your waistline.</p>
                                    <p>Try to keep to the recommended daily alcohol limits to reduce the risk of serious problems with your health, including risks to your heart health.</p>
                                </div>
                            </div>

                            <div className={classes.slide}>
                                <div className={classes.slideNumber}>
                                    <h3>Read the food label</h3>
                                    <p>When shopping, it's a good idea to look at the label on food and drink packaging to see how many calories and how much fat, salt and sugar the product contains.</p>
                                    <p>Understanding what's in food and how it fits in with the rest of your diet will help you make healthier choices.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    }
                    <div className={classes.rings}>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        initializeAction() {
            dispatch(initializeAction.request());
        }
    }
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(InitializePage));
