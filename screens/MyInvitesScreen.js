import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  Alert,
  FlatList,
  StyleSheet
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { createStackNavigator } from 'react-navigation';

export default class MyInvitesScreen extends React.Component {
  static navigationOptions = {
    title: 'My Invites',
  };

  constructor(props) {
    super(props);
    this.state = {
      data: '',
    };
  }

  componentWillMount() {
    const { params } = this.props.navigation.state;
    const curuser = params.curuser;
    fetch('http://sqquad.x10host.com/api/invites/user/' + curuser.id, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(responseJson => {
        if (Object.keys(responseJson[0]) == 'message') {
          this.error = responseJson[0];
          throw this.error;
        }
        this.setState({ data: responseJson });
      })
      .catch(error => {
        Alert.alert(error.message);
      });
  }

  openInvite(invite){
    this.props.navigation.navigate('Invite', {
      curinvite: invite,
    });
  }

  render() {
    const { params } = this.props.navigation.state;
    const curuser = params.curuser;
    return (
      <React.Fragment>
        <LinearGradient
          colors={['#5B4FFF', '#D616CF']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 1 }}>
          <View
            style={{
              height: '100%',
            }}>
            <View style={styles.container}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <React.Fragment>
              <TouchableOpacity onPress={this.openInvite.bind(this,item)}>
                <Text style={styles.info}>{item.squad_name} </Text>
              </TouchableOpacity>
              <View style={styles.line} />
            </React.Fragment>
          )}
        />
      </View>
          </View>
        </LinearGradient>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  info: {
    fontSize: 20,
    padding: 10,
    marginLeft: 10,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
  },
  line: {
    backgroundColor: '#E8E8E8',
    height: 1,
    width: '90%',
    alignSelf: 'center',
  },
});