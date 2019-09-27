import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';
import BottomMenu from '../components/BottomMenu';
import { LinearGradient } from 'expo-linear-gradient';
import { createStackNavigator } from 'react-navigation';

export default class SquadScreen extends React.Component {
  static navigationOptions = {
    title: 'Squad Info',
    //headerLeft: navigate back to home screen
  };

  constructor(props) {
    super(props);
    this.state = {
      squadOrganizer: '',
    };
  }

  componentWillMount() {
    var squads = '';
    const { params } = this.props.navigation.state;
    const squadOrganizerId = params.cursquad.organizer_id;
    fetch('http://sqquad.x10host.com/api/users/' + squadOrganizerId, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(responseJson => {
        if (Object.keys(responseJson[0]) == 'message') {
          this.error = responseJson[0];
          throw this.error;
        }
        this.setState({ squadOrganizer: responseJson[0] });
      })
      .catch(error => {
        Alert.alert(error.message);
      });
  }

  openUser(user) {
    this.props.navigation.navigate('User', {
      curuser: user,
    });
  }

  render() {
    const { params } = this.props.navigation.state;
    const cursquad = params.cursquad;
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
            <Text style={styles.info}>{cursquad.name}</Text>
            <View style={styles.line} />
            <Text style={styles.generic}>Name</Text>
            <Text style={styles.info}>{cursquad.description}</Text>
            <View style={styles.line} />
            <Text style={styles.generic}>Description</Text>
            <Text style={styles.info}>
              {cursquad.city}, {cursquad.state}, {cursquad.country}
            </Text>
            <View style={styles.line} />
            <Text style={styles.generic}>Location</Text>
            <TouchableOpacity
              onPress={this.openUser.bind(this, this.state.squadOrganizer)}>
              <Text style={styles.info}>
                {this.state.squadOrganizer.first_name}{' '}
                {this.state.squadOrganizer.last_name}
              </Text>
            </TouchableOpacity>
            <View style={styles.line} />
            <Text style={styles.generic}>Squad Organizer</Text>
          </View>
          {/*Add squad options like invite friend, leave group, etc.*/}
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
