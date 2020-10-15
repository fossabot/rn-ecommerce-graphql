import React from 'react';
import { ScrollView } from 'react-native';
import AppStateDisplay from './test_component/appStateDisplay.js';
import CatalogStateDisplay from './test_component/catalogStateDisplay.js';

export default function App() {
  return (
    <ScrollView>
      <AppStateDisplay />
      <CatalogStateDisplay />
    </ScrollView>
  );
}
