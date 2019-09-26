import React from 'react';
import { View, Text, Image, TouchableOpacity, Button } from 'react-native';
import BottomMenu from '../components/BottomMenu'
import { LinearGradient } from 'expo-linear-gradient';
import { createStackNavigator } from 'react-navigation';

export default class MessageScreen extends React.Component {
  static navigationOptions = {
    title: 'Messages',
    //headerLeft: navigate back to home screen
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { params } = this.props.navigation.state;
    const curuser = params.curuser;
    return (
      <React.Fragment>
      <LinearGradient
        colors={['#5B4FFF', '#91BEEC']}
        start={{ x: 0, y: .5 }}
        end={{ x: 1, y: 1 }}>
      <View style={{ height: '90%', alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 18, padding: 16, fontWeight: 'bold', color:'white' }}>
          Messages Screen
        </Text>
      </View>
      </LinearGradient>
      <BottomMenu curuser={curuser}/>
      </React.Fragment>
    );
  }
}
