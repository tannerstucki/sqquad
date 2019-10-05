import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  StyleSheet,
  Alert,
  HeaderBackButton,
  ScrollView,
  Dimensions,
} from 'react-native';
import BottomMenu from '../components/BottomMenu';
import { LinearGradient } from 'expo-linear-gradient';
import { createStackNavigator } from 'react-navigation';

export default class SquadScreen extends React.Component {
  static navigationOptions({ navigation }) {
    return {
      title: 'Squad Info',
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      squadOrganizer: '',
    };
  }

  componentWillMount() {
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

  openCreateInvite(cursquad, curuser){
    this.props.navigation.navigate('CreateInvite', {
      curuser: curuser,
      cursquad: cursquad,
    });
  }

  render() {
    const { params } = this.props.navigation.state;
    const cursquad = params.cursquad;
    const curuser = params.curuser;

    return (
      <React.Fragment>
        <LinearGradient
          colors={['#5B4FFF', '#D616CF']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 1 }}>
          <ScrollView
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
                <TouchableOpacity
                  onPress={this.openCreateInvite.bind(this, cursquad, curuser)}>
                  <View style={styles.customButton}>
                    <Text style={styles.buttonText}>Invite a Friend to this Squad</Text>
                  </View>
                </TouchableOpacity>
          </ScrollView>
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
    width: Dimensions.get('window').width * 0.9,
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    marginLeft: Dimensions.get('window').width * 0.05,
  },
  customButton: {
    backgroundColor: 'black',
    width: Dimensions.get('window').width * 0.75,
    height: Dimensions.get('window').height * 0.1,
    borderRadius: 15,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
    marginHorizontal: 15,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    alignContent: 'center',
    alignSelf: 'center',
  },
});
