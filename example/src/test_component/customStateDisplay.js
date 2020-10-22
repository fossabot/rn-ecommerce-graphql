import React from 'react';
import { Button, Text, View } from 'react-native';
import { connect, useSelector } from 'react-redux';
import { customContext } from 'simicart';
import { increment, asyncIncrease, reset } from '../customReducer/counterSlice';
import { bindActionCreators } from 'redux';

function CustomStateDisplay(props) {
  // const data = useSelector(state => state.counter)

  const displayData = props.x ? JSON.stringify(props.x, null, 2) : 'Such Empty';
  return (
    <View>
      <Text>{displayData}</Text>

      <Button title={'Click me +'} onPress={() => props.increment()} />
      <Button
        title={'Click me async +'}
        onPress={() => props.asyncIncrease()}
      />
      <Button title={'Click me reset'} onPress={() => props.reset()} />
    </View>
  );
}

const mapStateToProps = ({ counter }) => ({ x: counter });
const mapDispatchToProps = (dispatch) => ({
  increment: bindActionCreators(increment, dispatch),
  asyncIncrease: bindActionCreators(asyncIncrease, dispatch),
  reset: bindActionCreators(reset, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  context: customContext,
})(CustomStateDisplay);
