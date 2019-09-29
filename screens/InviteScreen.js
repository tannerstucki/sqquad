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

export default class InviteScreen extends React.Component {
  static navigationOptions = {
    title: 'Invite Info',
  };

  constructor(props) {
    super(props);
    this.state = {
      sender: '',
      squad: '',
    };
  }

  componentWillMount() {
    const { params } = this.props.navigation.state;
    const squad_id = params.curinvite.squad_id;
    const sender_id = params.curinvite.sender_id;
    fetch('http://sqquad.x10host.com/api/squads/' + squad_id, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(responseJson => {
        if (Object.keys(responseJson[0]) == 'message') {
          this.error = responseJson[0];
          throw this.error;
        }
        this.setState({ squad: responseJson[0] });
        return responseJson;
      })
      .then(responseJson => {
        fetch(
          'http://sqquad.x10host.com/api/users/' + sender_id,
          {
            method: 'GET',
          }
        )
          .then(response => response.json())
          .then(responseJson => {
            if (Object.keys(responseJson[0]) == 'message') {
              this.error = responseJson[0];
              throw this.error;
            }
            this.setState({ sender: responseJson[0] });
          });
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
    const curinvite = params.curinvite;
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
            <Text style={styles.info}>{curinvite.squad_name}</Text>
            <View style={styles.line} />
            <Text style={styles.generic}>Name</Text>
            <Text style={styles.info}>{this.state.squad.description}</Text>
            <View style={styles.line} />
            <Text style={styles.generic}>Description</Text>
            <Text style={styles.info}>
              {this.state.squad.city}, {this.state.squad.state},{' '}
              {this.state.squad.country}
            </Text>
            <View style={styles.line} />
            <Text style={styles.generic}>Location</Text>
            <TouchableOpacity
              onPress={this.openUser.bind(this, this.state.sender)}>
              <Text style={styles.info}>
                {this.state.sender.first_name}{' '}
                {this.state.sender.last_name}
              </Text>
            </TouchableOpacity>
            <View style={styles.line} />
            <Text style={styles.generic}>Inviter</Text>
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

/*  componentWillMount() {
    const { params } = this.props.navigation.state;
    const squad_id = params.curinvite.squad_id;
    fetch('http://sqquad.x10host.com/api/squads/' + squad_id, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(responseJson => {
        if (Object.keys(responseJson[0]) == 'message') {
          this.error = responseJson[0];
          throw this.error;
        }
        this.setState({ squad: responseJson[0] });
        return responseJson;
      })
      .then(responseJson => {
        fetch(
          'http://sqquad.x10host.com/api/users/' + responseJson[0].organizer_id,
          {
            method: 'GET',
          }
        )
          .then(response => response.json())
          .then(responseJson => {
            if (Object.keys(responseJson[0]) == 'message') {
              this.error = responseJson[0];
              throw this.error;
            }
            this.setState({ squadOrganizer: responseJson[0] });
          });
      })
      .catch(error => {
        Alert.alert(error.message);
      });
  }*/
