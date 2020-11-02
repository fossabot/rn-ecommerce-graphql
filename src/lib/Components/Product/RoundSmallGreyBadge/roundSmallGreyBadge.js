import React from 'react';
import {Badge} from "react-native-elements";
import {StyleSheet, View} from "react-native";
import {StylableButton} from "../../Button";

function RoundSmallGreyBadge(props) {
    return (
        <View>
            <Badge value={props.title}
                   badgeStyle={styles.badge}
            >
                <StylableButton title={'x'}/>
            </Badge>
        </View>
    );
}

const styles = StyleSheet.create({
    badge: {
        backgroundColor: 'grey',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 7,
        paddingRight: 7,
    }
})

export {RoundSmallGreyBadge};
