// import React, { useEffect, useState } from 'react';
// import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
// import { useTheme } from 'react-native-paper';
//
// function Color_paper_StateDisplay(props) {
//   const x = useTheme();
//
//   const { colors, fonts } = x;
//
//   const [buttonColor, setButtonColor] = useState(
//     colors.sea_sand || colors.primary
//   );
//
//   useEffect(() => {
//     console.log(JSON.stringify(colors, null, 2));
//     setButtonColor((prevState) => colors.sea_sand || prevState);
//   }, [colors]);
//
//   const changeColor = () => {
//     if (buttonColor === colors.sea_sand) {
//       setButtonColor(colors.choco_beam || colors.primary);
//     } else {
//       setButtonColor(colors.sea_sand || colors.primary);
//     }
//   };
//
//   return (
//     <ScrollView>
//       <TouchableOpacity
//         onPress={changeColor}
//         style={{
//           backgroundColor: buttonColor,
//
//           paddingTop: 20,
//           paddingBottom: 20,
//         }}
//       >
//         <Text
//           style={{
//             marginLeft: 'auto',
//             marginRight: 'auto',
//             fontSize: 20,
//             fontFamily: fonts.medium.fontFamily,
//             fontWeight: fonts.medium.fontWeight,
//           }}
//         >
//           Hello
//         </Text>
//       </TouchableOpacity>
//       <View style={{ height: 30 }} />
//       <Text>{JSON.stringify(x, null, 2)}</Text>
//     </ScrollView>
//   );
// }
//
// export { Color_paper_StateDisplay };
