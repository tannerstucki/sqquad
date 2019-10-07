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
  Dimensions,
} from 'react-native';
import Constants from 'expo-constants';
import { createStackNavigator } from 'react-navigation';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from 'react-native-paper';
import User from '../objects/User';
import HomeScreen from './HomeScreen';

export default class RegisterScreen extends React.Component {
  static navigationOptions = {
    title: 'Register',
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      age: '',
      city: '',
      state: '',
      country: '',
      password: '',
    };
  }

  onRegisterPress() {
    const body = JSON.stringify({
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      phone_number: this.state.phone_number,
      age: this.state.age,
      city: this.state.city,
      state: this.state.state,
      country: this.state.country,
      password: this.state.password,
      user_type: 'user',
    });

    const init = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    };

    fetch('http://sqquad.x10host.com/api/users', init)
      .then(response => response.json())
      .then(responseJson => {
        if (Object.keys(responseJson[0]) == 'message') {
          this.error = responseJson[0];
          throw this.error;
        }
        const curuser = {
          id: responseJson[0].id,
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          email: this.state.email,
          phone_number: this.state.phone_number,
          age: this.state.age,
          city: this.state.city,
          state: this.state.state,
          country: this.state.country,
          password: this.state.password,
          user_type: 'user',
        };
        Alert.alert(responseJson[0].confirmation);
        this.props.navigation.navigate('Home', {
          curuser: curuser,
        });
      })
      .catch(error => {
        Alert.alert(error.message);
      });
  }

  openLogin() {
    this.props.navigation.navigate('Login', {});
  }

  render() {
    var isEnabled = 'false';
    var text_color = 'grey';
    if (
      (this.state.first_name.length > 0) &
      (this.state.last_name.length > 0) &
      (this.state.email.length > 0) &
      (this.state.phone_number.length > 0) &
      (this.state.age.length > 0) &
      (this.state.city.length > 0) &
      (this.state.state.length > 0) &
      (this.state.country.length > 0) &
      (this.state.password.length > 0)
    ) {
      isEnabled = '';
      text_color = 'white';
    }

    return (
      <LinearGradient
        colors={['#5B4FFF', '#D616CF']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 1 }}>
        <ScrollView>
          <View
            style={[
              {
                height: '100%',
                alignContent: 'center',
                justifyContent: 'center',
              },
            ]}>
            <Image style={styles.logo} source={require('assets/Squad19.png')} />
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
            <TextInput
              style={styles.user_input}
              placeholder="Email"
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
            />
            <TextInput
              style={styles.user_input}
              placeholder="Phone Number"
              onChangeText={phone_number => this.setState({ phone_number })}
              value={this.state.phone_number}
            />
            <TextInput
              style={styles.user_input}
              placeholder="Age"
              onChangeText={age => this.setState({ age })}
              value={this.state.age}
            />
            <TextInput
              style={styles.user_input}
              placeholder="City"
              onChangeText={city => this.setState({ city })}
              value={this.state.city}
            />
            <TextInput
              style={styles.user_input}
              placeholder="State"
              onChangeText={state => this.setState({ state })}
              value={this.state.state}
            />
            <TextInput
              style={styles.user_input}
              placeholder="Country"
              onChangeText={country => this.setState({ country })}
              value={this.state.country}
            />
            <TextInput
              style={styles.user_input}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
            />
            <TouchableOpacity
              onPress={this.onRegisterPress.bind(this)}
              disabled={isEnabled}>
              <View style={styles.customButton}>
                <Text
                  style={{
                    color: text_color,
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}>
                  Create Account
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.openLogin.bind(this)}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 18,
                  alignSelf: 'center',
                  margin: 15,
                  marginBottom: 80,
                }}>
                Already Have An Account?
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    height: 150,
    width: 150,
    margin: 10,
    alignSelf: 'center',
    marginTop: 100,
  },
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
    backgroundColor: 'black',
    width: Dimensions.get('window').width * 0.75,
    height: Dimensions.get('window').height * 0.1,
    borderRadius: 15,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
});
