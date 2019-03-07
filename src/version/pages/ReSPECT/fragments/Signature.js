import React from "react";
import SignaturePad from 'react-signature-pad-wrapper'

import { withStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

const styles = {
    titleBlock: {
        paddingLeft: 25,
        paddingTop: 15,
        paddingBottom: 15,
    },
    mainTitle: {
        color: "#000",
        fontWeight: 800,
    },
    subTitle: {
        color: "#000",
        fontSize: 12,
    },
    signatureField: {
        marginLeft: 20,
        marginRight: 20,
        '& canvas': {
            marginTop: 10,
            border: '1px solid #000',
            height: 100,
        },
    }
};

const Signature = ({ classes, name, onEnd, isSubTitle }) => (
    <div className={classes.signatureField}>
        <FormLabel className={isSubTitle ? classes.subTitle : classes.mainTitle}>Clinical signature</FormLabel>
        <SignaturePad
            ref={ref => this.signature = ref}
            options={{
                penColor: '#000080',
                onEnd: () => onEnd(name, this.signature)
            }}
        />
        <FormHelperText>Type name into box, click to draw your signature</FormHelperText>
    </div>
);

export default withStyles(styles)(Signature);