import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  StyleSheet,
  Alert,
  Dimensions,
  ScrollView,
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
        fetch('http://sqquad.x10host.com/api/users/' + sender_id, {
          method: 'GET',
        })
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

  accept(curinvite, curuser) {
    var body = JSON.stringify({
      acceptor_id: curinvite.acceptor_id,
      squad_id: curinvite.squad_id,
      invite_type: curinvite.invite_type,
      acceptor_email: curinvite.acceptor_email,
      status: 'accepted',
      sender_id: curinvite.sender_id,
    });

    var init = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body,
    };

    fetch('http://sqquad.x10host.com/api/invites/' + curinvite.id, init)
      .then(response => response.json())
      .then(responseJson => {
        /*if (Object.keys(responseJson[0]) == 'message') {
          this.error = responseJson[0];
          throw this.error;
        }*/
        //Alert.alert(responseJson[0].confirmation + '.');
      })
      .catch(error => {
        Alert.alert(error.message);
      });

    body = JSON.stringify({
      user_id: curuser.id,
      squad_id: curinvite.squad_id,
    });

    init = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    };

    fetch('http://sqquad.x10host.com/api/squads/join', init)
      .then(response => response.json())
      .then(responseJson => {
        /*if (Object.keys(responseJson[0]) == 'message') {
          this.error = responseJson[0];
          throw this.error;
        }*/
        Alert.alert(responseJson[0].confirmation + "!");
        this.props.navigation.navigate('Menu', {
          curuser: curuser,
        });
      })
      .catch(error => {
        Alert.alert(error.message);
      });
  }

  decline(curinvite, curuser) {
    var body = JSON.stringify({
      acceptor_id: curinvite.acceptor_id,
      squad_id: curinvite.squad_id,
      invite_type: curinvite.invite_type,
      acceptor_email: curinvite.acceptor_email,
      status: 'declined',
      sender_id: curinvite.sender_id,
    });

    var init = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body,
    };

    fetch('http://sqquad.x10host.com/api/invites/' + curinvite.id, init)
      .then(response => response.json())
      .then(responseJson => {
        /*if (Object.keys(responseJson[0]) == 'message') {
          this.error = responseJson[0];
          throw this.error;
        }*/
        Alert.alert(responseJson[0].confirmation + '.');
        this.props.navigation.navigate('Menu', {
          curuser: curuser,
        });
      })
      .catch(error => {
        Alert.alert(error.message);
      });
  }

  render() {
    const { params } = this.props.navigation.state;
    const curinvite = params.curinvite;
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
                {this.state.sender.first_name} {this.state.sender.last_name}
              </Text>
            </TouchableOpacity>
            <View style={styles.line} />
            <Text style={styles.generic}>Inviter</Text>
            <Text style={styles.info}>{curinvite.status}</Text>
            <View style={styles.line} />
            <Text style={styles.generic}>Status</Text>
            {curinvite.status == 'new' ? (
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  onPress={this.accept.bind(this, curinvite, curuser)}>
                  <View style={styles.customButton}>
                    <Text style={styles.buttonText}>Accept</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this.decline.bind(this, curinvite, curuser)}>
                  <View style={styles.customButton}>
                    <Text style={styles.buttonText}>Decline</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ) : null}
          </ScrollView>
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
    width: Dimensions.get('window').width * 0.375,
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
  buttonRow: {
    flexDirection: 'row',
    alignContent: 'center',
    alignSelf: 'center',
  },
});
