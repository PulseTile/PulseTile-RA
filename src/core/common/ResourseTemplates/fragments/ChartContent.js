import React from "react";

const ChartContent = ({ chartBlock, ...rest }) => {
    const ChartBlock = chartBlock;
    return (
        <React.Fragment>
            <ChartBlock {...rest} />
        </React.Fragment>
    );
};

export default ChartContent;
