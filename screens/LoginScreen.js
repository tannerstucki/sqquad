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
} from 'react-native';
import Constants from 'expo-constants';
import { createStackNavigator } from 'react-navigation';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from 'react-native-paper';
import User from '../objects/User';
import HomeScreen from './HomeScreen';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Login',
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  onLoginPress(email, password) {
    fetch('https://sqquad.x10host.com/api/users/validate', {
      method: 'GET',
      headers: { email: email, password: password },
    })
      .then(response => response.json())
      .then(responseJson => {
        if (Object.keys(responseJson[0]) == 'message') {
          this.error = responseJson[0];
          throw this.error;
        }
        this.props.navigation.navigate('Home', {
          curuser: responseJson[0],
        });
      })
      .catch(error => {
        Alert.alert(error.message);
      });
  }

  openRegister() {
    this.props.navigation.navigate('Register', {});
  }

  render() {
    return (
      <LinearGradient
        colors={['#5B4FFF', '#D616CF']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 1 }}>
        <View
          style={[
            {
              height: '100%',
            },
          ]}>
          <Image style={styles.logo} source={require('assets/Squad19.png')} />
          <TextInput
            style={styles.user_input}
            placeholder="Email"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
          <TextInput
            style={styles.user_input}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
          <TouchableOpacity onPress={this.openRegister.bind(this)}>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                alignSelf: 'center',
                margin: 15,
              }}>
              Don't have an account?
            </Text>
          </TouchableOpacity>
          <View
            style={[
              {
                width: '50%',
                alignSelf: 'center',
                variant: 'primary',
                margin: 10,
              },
            ]}>
            <Button
              variant="primary"
              color="white"
              borderRadius="10"
              onPress={this.onLoginPress.bind(
                this,
                this.state.email,
                this.state.password
              )}
              title="Login"
            />
          </View>
        </View>
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
    width: 200,
    borderColor: 'black',
    backgroundColor: 'lightgrey',
    borderWidth: 1,
    margin: 10,
    padding: 10,
    alignSelf: 'center',
  },
});
