import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import Samanai from './test_component/samanai';
import { AppContextProvider } from 'simicart';
import FakeProvider from './hypo/FakeProvider';
import StateDisplayer from './test_component/stateDisplayer';
import Xocalova from './test_component/Xocalova';

// export default function App() {
//     return (
//         <View style={{alignSelf: 'stretch', marginLeft: 7, marginRight: 7}}>
//             <Provider store={demoStore}>
//                 <AppContextProvider>
//                     <CatalogContextProvider>
//                         <ScrollView>
//                             <DemoBanner/>
//                             <Samanai/>
//                             <Xocalova/>
//                         </ScrollView>
//                     </CatalogContextProvider>
//                 </AppContextProvider>
//             </Provider>
//         </View>
//     );
// }

export default function App() {
  const data = useSelector((state) => state);
  return (
    <View>
      <ScrollView>
        {/*<AppContextProvider>*/}
        {/*    <Text>Hello</Text>*/}
        {/*</AppContextProvider>*/}
        <StateDisplayer data={data} />
        <FakeProvider>
          <Samanai />
        </FakeProvider>
      </ScrollView>
    </View>
  );
}
