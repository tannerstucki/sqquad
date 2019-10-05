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
  FlatList,
  Dimensions,
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
      found_squads: '',
      search_show: true,
      final_message_show: false,
      found_card_show: false,
      squad_card_show: false,
      found_user_show: false,
      not_found_show: false,
      cur_first_name: '',
      cur_last_name: '',
      chosen_user: '',
      chosen_squad: '',
      acceptor_email: '',
    };
  }

  componentWillMount() {
    const { params } = this.props.navigation.state;
    this.setState({ chosen_squad: params.cursquad });
  }

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
        if (Object.keys(responseJson[0]) == 'message') {
          this.error = responseJson[0];
          throw this.error;
        }
        this.setState({
          found_users: responseJson,
          search_show: false,
          found_card_show: true,
        });
      })
      .catch(error => {
        Alert.alert(error.message + ' Invite them by email instead!');
        this.setState({
          search_show: false,
          final_message_show: true,
          found_user_show: false,
        });
      });
  }

  getSquads(user_id) {
    this.setState({ squad_card_show: true });
    fetch('http://sqquad.x10host.com/api/squads/user/' + user_id, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(responseJson => {
        if (Object.keys(responseJson[0]) == 'message') {
          this.error = responseJson[0];
          throw this.error;
        }
        this.setState({ found_squads: responseJson });
      })
      .catch(error => {
        Alert.alert(error.message);
      });
  }

  chooseUser(item) {
    this.setState({
      found_card_show: false,
      chosen_user: item,
      final_message_show: true,
      found_user_show: true,
    });
  }

  chooseSquad(item) {
    this.setState({
      squad_card_show: false,
      chosen_squad: item,
      final_message_show: true,
    });
  }

  createInvite(curuser) {
    var body = '';
    if (!this.state.acceptor_email) {
      body = JSON.stringify({
        sender_id: curuser.id,
        acceptor_id: this.state.chosen_user.id,
        squad_id: this.state.chosen_squad.id,
        invite_type: 'internal',
        acceptor_email: this.state.chosen_user.email,
        status: 'new',
      });
    } else {
      body = JSON.stringify({
        sender_id: curuser.id,
        acceptor_id: null,
        squad_id: this.state.chosen_squad.id,
        invite_type: 'external',
        acceptor_email: this.state.acceptor_email,
        status: 'new',
      });
    }

    const init = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    };

    fetch('http://sqquad.x10host.com/api/invites', init)
      .then(response => response.json())
      .then(responseJson => {
        /*if (Object.keys(responseJson[0]) == 'message') {
          this.error = responseJson[0];
          throw this.error;
        }*/
        //Alert.alert("You made it!");
        Alert.alert(
          responseJson[0].confirmation +
            ". We'll let you know when they respond!"
        );
        this.props.navigation.navigate('Menu', {
          curuser: curuser,
        });
      })
      .catch(error => {
        Alert.alert(error.message);
      });
  }

  noAccountOption() {
    this.setState({
      search_show: false,
      final_message_show: true,
      found_user_show: false,
    });
  }

  setSquad(cursquad) {
    this.setState({
      chosen_squad: cursquad,
    });
  }

  getEmailButton(){

  }

  render() {
    const { params } = this.props.navigation.state;
    const curuser = params.curuser;

    var isEnabled = 'false';
    var buttonColor = 'grey';
    if (
      (this.state.first_name.length > 0) &
      (this.state.last_name.length > 0)
    ) {
      isEnabled = '';
      buttonColor = 'white';
    }

    var emailIsEnabled = 'false';
    var emailButtonColor = 'grey';
    if (this.state.acceptor_email.length > 0) {
      emailIsEnabled = '';
      emailIsEnabled = 'white';
    }

    return (
      <LinearGradient
        height="100%"
        colors={['#5B4FFF', '#D616CF']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 1 }}>
        <View style={{ height: '100%' }}>
          {this.state.search_show ? (
            <React.Fragment style={{ position: 'absolute' }}>
              <View style={{ marginTop: 40 }}>
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
                <TouchableOpacity
                  onPress={this.searchUser.bind(this, curuser)}
                  disabled={isEnabled}>
                  <View style={styles.customButton}>
                    <Text
                      style={{
                        color: buttonColor,
                        fontSize: 18,
                        fontWeight: 'bold',
                      }}>
                      Search For User
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.noAccountOption.bind(this)}>
                  <Text style={{ color: 'white', alignSelf: 'center' }}>
                    I know this person does not have an account
                  </Text>
                </TouchableOpacity>
              </View>
            </React.Fragment>
          ) : null}
          {this.state.found_card_show ? (
            <Card style={styles.resultsCard}>
              <FlatList
                style={{ padding: 10 }}
                data={this.state.found_users}
                renderItem={({ item }) => (
                  <React.Fragment>
                    <TouchableOpacity
                      onPress={this.chooseUser.bind(this, item)}>
                      <Text style={styles.info}>
                        {item.first_name} {item.last_name}
                      </Text>
                      <Text style={styles.generic}>{item.email}</Text>
                      <Text style={styles.generic}>
                        {item.city}, {item.state}, {item.country}
                      </Text>
                    </TouchableOpacity>
                    <View style={styles.line} />
                  </React.Fragment>
                )}
              />
            </Card>
          ) : null}
          {this.state.final_message_show ? (
            <View
              style={[
                {
                  height: '100%',
                  alignContent: 'center',
                  alignSelf: 'center',
                  marginTop: '20%',
                  position: 'absolute',
                },
              ]}>
              <Text style={styles.finalMessage}>
                You're sending an invite to
              </Text>
              {this.state.found_user_show ? (
                <Text style={styles.finalMessage}>
                  {this.state.chosen_user.first_name}{' '}
                  {this.state.chosen_user.last_name}
                </Text>
              ) : (
                <TextInput
                  style={styles.user_input}
                  placeholder="Email"
                  onChangeText={acceptor_email =>
                    this.setState({ acceptor_email })
                  }
                  value={this.state.acceptor_email}
                />
              )}
              {this.state.chosen_squad ? (
                <React.Fragment>
                  <Text style={styles.finalMessage}>to join the</Text>
                  <Text style={styles.finalMessage}>
                    {this.state.chosen_squad.name}
                  </Text>
                  <TouchableOpacity
                    onPress={this.createInvite.bind(this, curuser)}
                    disabled={(this.state.acceptor_email.length > 0 && this.state.acceptor_email.includes("@")) || this.state.chosen_user ? (''):'false'}>
                    <View style={styles.customButton}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          color: (this.state.acceptor_email.length > 0 && this.state.acceptor_email.includes("@")) || this.state.chosen_user ? ('white'):'grey',
                          fontSize: 20,
                          alignContent: 'center',
                          alignSelf: 'center',
                        }}>
                        Send Invite
                      </Text>
                    </View>
                  </TouchableOpacity>
                </React.Fragment>
              ) : (
                <TouchableOpacity
                  onPress={this.getSquads.bind(this, curuser.id)}>
                  <View style={styles.customButton}>
                    <Text style={styles.buttonText}>Select Squad</Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          ) : null}
          {this.state.squad_card_show ? (
            <Card style={styles.resultsCard}>
              <FlatList
                style={{ padding: 10 }}
                data={this.state.found_squads}
                renderItem={({ item }) => (
                  <React.Fragment>
                    <TouchableOpacity
                      onPress={this.chooseSquad.bind(this, item)}>
                      <Text style={styles.info}>{item.name}</Text>
                    </TouchableOpacity>
                    <View style={styles.squadLine} />
                  </React.Fragment>
                )}
              />
            </Card>
          ) : null}
        </View>
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
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  resultsCard: {
    width: Dimensions.get('window').width * 0.75,
    height: Dimensions.get('window').width * 1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    position: 'absolute',
    marginTop: '20%',
  },
  info: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5B4FFF',
    marginTop: 15,
  },
  line: {
    backgroundColor: '#5B4FFF',
    height: 1,
    alignSelf: 'center',
    marginTop: 2,
    marginBottom: 2,
    width: Dimensions.get('window').width * 0.6,
  },
  squadLine: {
    backgroundColor: '#5B4FFF',
    height: 1,
    alignSelf: 'center',
    marginTop: 2,
    marginBottom: 10,
    width: Dimensions.get('window').width * 0.6,
  },
  generic: {
    fontSize: 12,
    padding: 2,
    color: '#5B4FFF',
  },
  finalMessage: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
    alignContent: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
    alignContent: 'center',
    alignSelf: 'center',
  },
});

/*
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
              <Picker
                selectedValue={this.state.found_users}
                onValueChange={(itemValue, itemIndex) =>
                  this.pickerChange(itemIndex)
                }>
                {this.state.found_users.map(user => {
                  curlabel = user.first_name + " " + user.last_name + " (" + user.email + ")";
                  return <Picker.Item label={curlabel} value={user.first_name}/>;
                })}
              </Picker>*/
