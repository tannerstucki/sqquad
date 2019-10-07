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

export default class CreateSquadScreen extends React.Component {
  static navigationOptions = {
    title: 'Create New Squad',
  };

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      description: '',
      city: '',
      state: '',
      country: '',
      organizer_id: '',
    };
  }

  componentWillMount() {
    const { params } = this.props.navigation.state;
    const organizer_id = params.curuser.id;
    this.setState({ organizer_id: organizer_id });
  }

  onCreatePress(curuser) {
    const body = JSON.stringify({
      name: this.state.name,
      description: this.state.description,
      city: this.state.city,
      state: this.state.state,
      country: this.state.country,
      organizer_id: this.state.organizer_id,
    });

    const init = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    };

    fetch('http://sqquad.x10host.com/api/squads', init)
      .then(response => response.json())
      .then(responseJson => {
        /*if (Object.keys(responseJson[0]) == 'message') {
          this.error = responseJson[0];
          throw this.error;
        }*/
        Alert.alert(responseJson[0].confirmation);
        const cursquad = {
          id: responseJson[0].id,
          name: this.state.name,
          description: this.state.description,
          city: this.state.city,
          state: this.state.state,
          country: this.state.country,
          organizer_id: this.state.organizer_id,
        };
        this.props.navigation.navigate('Squad', {
          cursquad: cursquad,
          curuser: curuser,
        });
      })
      .catch(error => {
        Alert.alert(error.message);
      });
  }

  render() {
    const { params } = this.props.navigation.state;
    const curuser = params.curuser;

    var isEnabled = 'false';
    var text_color = 'grey';
    if (
      (this.state.name.length > 0) &
      (this.state.description.length > 0) &
      (this.state.city.length > 0) &
      (this.state.state.length > 0) &
      (this.state.country.length > 0)
    ) {
      isEnabled = '';
      text_color = 'white';
    }

    return (
      <LinearGradient
        colors={['#5B4FFF', '#D616CF']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 1 }}>
        <ScrollView style={{ height: '100%' }}>
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
              placeholder="Name"
              onChangeText={name => this.setState({ name })}
              value={this.state.name}
            />
            <TextInput
              style={styles.user_input}
              placeholder="Description"
              onChangeText={description => this.setState({ description })}
              value={this.state.description}
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
            <TouchableOpacity
              onPress={this.onCreatePress.bind(this, curuser)}
              disabled={isEnabled}>
              <View style={styles.customButton}>
                <Text
                  style={{
                    color: text_color,
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}>
                  Create Squad
                </Text>
              </View>
            </TouchableOpacity>
          </View>
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
