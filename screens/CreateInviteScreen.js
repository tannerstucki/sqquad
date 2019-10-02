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
      not_found_show: false,
      cur_first_name: '',
      cur_last_name: '',
      chosen_user: '',
      chosen_squad: '',
      squad_name: 'Select Squad',
    };
  }

  componentWillMount() {
    const { params } = this.props.navigation.state;
    this.setState({ chosenSquad: params.cursquad });
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
        /*if (Object.keys(responseJson[0]) == 'message') {
          this.error = responseJson[0];
          throw this.error;
        }*/
        this.setState({
          found_users: responseJson,
          search_show: false,
          found_card_show: true,
        });
      })
      .catch(error => {
        Alert.alert(error.message);
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
    });
  }

  chooseSquad(item) {
    this.setState({
      squad_card_show: false,
      chosen_squad: item,
      final_message_show: true,
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
        </ScrollView>
        {this.state.found_card_show ? (
          <Card style={styles.resultsCard}>
            <FlatList
              style={{ width: '100%' }}
              data={this.state.found_users}
              renderItem={({ item }) => (
                <React.Fragment>
                  <TouchableOpacity onPress={this.chooseUser.bind(this, item)}>
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
            <Text style={styles.finalMessage}>You're sending an invite to</Text>
            <Text style={styles.finalMessage}>
              {this.state.chosen_user.first_name}{' '}
              {this.state.chosen_user.last_name}
            </Text>
            {this.state.chosen_squad ? (
              <React.Fragment>
                <Text style={styles.finalMessage}>to join the</Text>
                <Text style={styles.finalMessage}>
                  {' '}
                  {this.state.chosen_squad.name}{' '}
                </Text>
                <View style={styles.customButton}>
                <TouchableOpacity>
                  <Text
                    style={{
                      color: buttonColor,
                      fontSize: 18,
                      fontWeight: 'bold',
                    }}>
                    Send Invite
                  </Text>
                </TouchableOpacity>
              </View>
              </React.Fragment>
            ) : (
              <TouchableOpacity onPress={this.getSquads.bind(this, curuser.id)}>
                <Text style={styles.greyFinalMessage}>
                  {' '}
                  {this.state.squad_name}{' '}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ) : null}
        {this.state.squad_card_show ? (
          <Card style={styles.resultsCard}>
            <FlatList
              style={{ width: '100%' }}
              data={this.state.found_squads}
              renderItem={({ item }) => (
                <React.Fragment>
                  <TouchableOpacity onPress={this.chooseSquad.bind(this, item)}>
                    <Text style={styles.info}>{item.name}</Text>
                  </TouchableOpacity>
                  <View style={styles.line} />
                </React.Fragment>
              )}
            />
          </Card>
        ) : null}
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
  resultsCard: {
    width: '75%',
    height: '50%',
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
    marginTop: 10,
  },
  line: {
    backgroundColor: '#5B4FFF',
    height: 1,
    width: '100%',
    alignSelf: 'center',
    marginTop: 2,
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
  greyFinalMessage: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'grey',
    marginTop: 10,
    alignContent: 'center',
    textDecorationLine: 'underline',
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
