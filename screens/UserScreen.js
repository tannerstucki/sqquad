import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  StyleSheet,
} from 'react-native';
import BottomMenu from '../components/BottomMenu';
import { LinearGradient } from 'expo-linear-gradient';
import { createStackNavigator } from 'react-navigation';

export default class UserScreen extends React.Component {
  static navigationOptions = {
    title: 'Account Info',
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
          colors={['#5B4FFF', '#D616CF']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 1 }}>
          <View
            style={{
              height: '100%',
              alignItems: 'left',
              justifyContent: 'left',
            }}>
            <Text style={styles.info}>
              {curuser.first_name} {curuser.last_name}
            </Text>
            <View style={styles.line} />
            <Text style={styles.generic}>Name</Text>
            <Text style={styles.info}>
              {curuser.email}
            </Text>
            <View style={styles.line} />
            <Text style={styles.generic}>Email</Text>
            <Text style={styles.info}>
              {curuser.phone_number}
            </Text>
            <View style={styles.line} />
            <Text style={styles.generic}>Phone Number</Text>
            <Text style={styles.info}>
              {curuser.city}, {curuser.state}, {curuser.country}
            </Text>
            <View style={styles.line} />
            <Text style={styles.generic}>Location</Text>
          </View>
          {/*Add change password and edit button here*/}
        </LinearGradient>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  info: {
    fontSize: 20,
    padding: 10,
    marginLeft: 10,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
  },
  generic: {
    fontSize: 12,
    padding: 10,
    marginLeft: 10,
    color: '#E8E8E8',
  },
  line: {
    backgroundColor: '#E8E8E8',
    height: 1,
    width: '90%',
    alignSelf: 'center',
  },
});
