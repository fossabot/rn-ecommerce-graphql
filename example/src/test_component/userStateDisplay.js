import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useUserContext } from 'simicart';
import StateDisplayer from './stateDisplayer.js';
import ColorfulButton from '../visualComponent/ColorfulButton.js';
import { getRandomLargeNumber } from '../Helper/getRandomLargeNumber.js';

function UserStateDisplay(props) {
  const [userState, userApi] = useUserContext();
  const { setToken, clearToken, getUserDetails, resetPassword, reset, signOut } = userApi;

  function fetchUserDetails() {
    return (
      {
        email: 'chau@simicart.com',
        firstname: 'chau',
        lastname: 'nguyen'
      }
    )
  }
  return (
    <ScrollView>
      <StateDisplayer data={userState} title={'User'} />
      <ColorfulButton
        title={'setToken'}
        onPress={() => {
          setToken(getRandomLargeNumber());
        }}
      />
      <ColorfulButton
        title={'clearToken'}
        onPress={() => {
          clearToken();
        }}
      />
      <ColorfulButton
        title={'getUserDetails'}
        onPress={() => {
          getUserDetails(fetchUserDetails());
        }}
      />
      <ColorfulButton
        title={'reset'}
        onPress={() => {
          reset();
        }}
      />
      <ColorfulButton
        title={'resetPassword'}
        onPress={() => {
          resetPassword('chau@simicart.com');
        }}
      />
      <ColorfulButton
        title={'signOut'}
        onPress={() => {
          signOut();
        }}
      />
    </ScrollView>
  );
}

export default UserStateDisplay;
