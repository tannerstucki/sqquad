import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Button,
  Alert,
  Headers,
  TouchableOpacity,
  ScrollView,
  Picker,
} from 'react-native';
import Constants from 'expo-constants';
import { createStackNavigator } from 'react-navigation';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from 'react-native-paper';
import User from '../objects/User';
import HomeScreen from './HomeScreen';

export default class CreateInviteScreen extends React.Component {
  static navigationOptions = {
    title: 'Invite A Friend',
  };

  constructor(props) {
    super(props);
    this.state = {
      curuser: '',
      first_name: '',
      last_name: '',
      found_users: '',
      search_show: true,
      found_show: false,
      not_found_show: false,
      cur_first_name: '',
      cur_last_name: '',
    };
  }

  componentWillMount() {}

  searchUser() {
    const init = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };

    fetch(
      'http://sqquad.x10host.com/api/users/name/' +
        this.state.first_name +
        '&' +
        this.state.last_name,
      init
    )
      .then(response => response.json())
      .then(responseJson => {
        /*if (Object.keys(responseJson[0]) == 'message') {
          this.error = responseJson[0];
          throw this.error;
        }*/
        this.setState({
          found_users: responseJson,
          search_show: false,
          found_show: true,
        });
        Alert.alert(this.state.found_users[0]);
      })
      .catch(error => {
        Alert.alert(error.message);
      });
  }

  pickerChange(index) {
    this.state.found_users.map((v, i) => {
      if (index === i) {
        this.setState({
          cur_first_name: this.state.found_users[index].first_name,
          cur_last_name: this.state.found_users[index].last_name,
        });
      }
    });
  }

  render() {
    const { params } = this.props.navigation.state;
    const curuser = params.curuser;
    var curlabel = '';

    var isEnabled = 'false';
    var buttonColor = 'grey';
    if (
      (this.state.first_name.length > 0) &
      (this.state.last_name.length > 0)
    ) {
      isEnabled = '';
      buttonColor = 'white';
    }

    return (
      <LinearGradient
        height="100%"
        colors={['#5B4FFF', '#D616CF']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 1 }}>
        <ScrollView style={{ height: '100%' }}>
          {this.state.search_show ? (
            <React.Fragment>
              <View
                style={[
                  {
                    height: '100%',
                    alignContent: 'center',
                    justifyContent: 'center',
                    marginTop: 50,
                  },
                ]}>
                <TextInput
                  style={styles.user_input}
                  placeholder="First Name"
                  onChangeText={first_name => this.setState({ first_name })}
                  value={this.state.first_name}
                />
                <TextInput
                  style={styles.user_input}
                  placeholder="Last Name"
                  onChangeText={last_name => this.setState({ last_name })}
                  value={this.state.last_name}
                />
              </View>
              <View style={styles.customButton}>
                <TouchableOpacity
                  onPress={this.searchUser.bind(this, curuser)}
                  disabled={isEnabled}>
                  <Text
                    style={{
                      color: buttonColor,
                      fontSize: 18,
                      fontWeight: 'bold',
                    }}>
                    Search For User
                  </Text>
                </TouchableOpacity>
              </View>
            </React.Fragment>
          ) : null}
          {this.state.found_show ? (
            <View
              style={[
                {
                  height: '100%',
                  alignContent: 'center',
                  justifyContent: 'center',
                  marginTop: 50,
                },
              ]}>
              <Picker
                selectedValue={this.state.found_users}
                onValueChange={(itemValue, itemIndex) =>
                  this.pickerChange(itemIndex)
                }>
                {this.state.found_users.map(user => {
                  curlabel = user.first_name + " " + user.last_name + " (" + user.email + ")";
                  return <Picker.Item label={curlabel} value={user.first_name}/>;
                })}
              </Picker>
              {/*
              <Picker selectedValue={this.state.found_users[0]}>
                <Picker.Item label="Steve" value="steve" />
                <Picker.Item label="Ellen" value="ellen" />
                <Picker.Item label="Maria" value="maria" />
              </Picker>
              */}
            </View>
          ) : null}
        </ScrollView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  user_input: {
    height: 40,
    width: '75%',
    borderColor: 'black',
    backgroundColor: 'lightgrey',
    borderWidth: 1,
    margin: 10,
    padding: 10,
    alignSelf: 'center',
  },
  customButton: {
    flexDirection: 'row',
    backgroundColor: 'black',
    width: '75%',
    height: '30%',
    borderRadius: 15,
    marginBottom: 40,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
