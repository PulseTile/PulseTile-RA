import React from "react";

const TimelineContent = ({ timelineBlock, ...rest }) => {
    const TimelineBlock = timelineBlock;
    return (
        <React.Fragment>
            <TimelineBlock {...rest} />
        </React.Fragment>
    );
};

export default TimelineContent;
