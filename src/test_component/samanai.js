import React, {useState} from 'react';
import {Button, ScrollView, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {useAppContext} from '../lib/context/app';
import ColorfulButton from '../visualComponent/ColorfulButton';
import StateDisplayer from "./stateDisplayer";

function Samanai(props) {
    const data = useSelector(state => state.app);

    const [count, setCount] = useState(0);
    const [appState, appApi] = useAppContext();
    const {toggleDrawer, closeDrawer, toggleSearch, setOnline, setOffline} = appApi;

    return (
        <View>
            <StateDisplayer data={data} title={'App'}/>
            <ColorfulButton
                title={'TOGGLE_DRAWER'}
                onPress={() => {
                    toggleDrawer(count % 2 === 0 ? 'samanai' : 'siminia');
                    setCount((prevState) => (prevState + 1) % 2);
                }}
            />
            <ColorfulButton
                title={'CLOSE_DRAWER'}
                onPress={() => {
                    closeDrawer();
                }}
            />
            <ColorfulButton
                title={'TOGGLE_SEARCH'}
                onPress={() => {
                    toggleSearch();
                }}
            />
            <ColorfulButton
                title={'SET_ONLINE'}
                onPress={() => {
                    setOnline();
                }}
            />
            <ColorfulButton
                title={'SET_OFFLINE'}
                onPress={() => {
                    setOffline();
                }}
            />
        </View>
    );
}

export default Samanai;
