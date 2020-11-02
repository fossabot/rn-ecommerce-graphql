import React from 'react';
import {RoundSmallGreyBadge} from "./roundSmallGreyBadge";
import {RoundSmallGreyButtonWithX} from "./roundSmallGreyButtonWith_X";

const CHARACTER_LIMIT = 7;

function AutoTrimRoundSmallGreyBadge(props) {
    const limit = props.limit ?? CHARACTER_LIMIT;
    const displayTitle = props.title.length > 7 ? props.title.slice(0, 7) + '...' : props.title.slice;
    return (
        <RoundSmallGreyBadge title={displayTitle}/>
    );
}

export {AutoTrimRoundSmallGreyBadge};