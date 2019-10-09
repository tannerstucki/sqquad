import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  FlatList,
  Dimensions,
  StyleSheet,
  Alert,
} from 'react-native';
import BottomMenu from '../components/BottomMenu';
import { LinearGradient } from 'expo-linear-gradient';
import { createStackNavigator } from 'react-navigation';

export default class MessageScreen extends React.Component {
  static navigationOptions = {
    title: 'Messages',
    //headerLeft: navigate back to home screen
  };

  constructor(props) {
    super(props);
    this.state = {
      data: '',
      curuser: '',
      curconversation: '',
    };
  }

  componentWillMount() {
    const { params } = this.props.navigation.state;
    const curuser = params.curuser;
    fetch('http://sqquad.x10host.com/api/messages/page/' + curuser.id, {
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
        //Alert.alert(error.message);
        this.setState({ noMessages: true });
      });
  }

  openConversation(curconversation, curuser) {
    var { params } = this.props.navigation.state;
    Alert.alert("1: " + curconversation.message_type);
    this.props.navigation.navigate('Conversation', {
      curuser: curuser,
      curconversation: curconversation,
    });
  }

  render() {
    const { params } = this.props.navigation.state;
    const curuser = params.curuser;

    return (
      <React.Fragment>
        <LinearGradient
          colors={['#5B4FFF', '#51FFE8']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 1 }}>
          <View
            style={{
              height: '90%',
            }}>
            <View style={styles.container}>
              {this.state.noMessages ? (
                <React.Fragment>
                  <Text style={styles.info}>Sorry, you have no messages.</Text>
                  <Text style={styles.info}>
                    Create a new message with another user or on your squad board!
                  </Text>
                </React.Fragment>
              ) : null}
              <FlatList
                data={this.state.data}
                renderItem={({ item }) => (
                  <React.Fragment>
                    {item.message_type == 'user' ? (
                      <TouchableOpacity onPress={this.openConversation.bind(this,item,curuser)}>
                        <View style={{ width: '100%', flexDirection: 'row' }}>
                          <Text style={styles.info}>{item.name}</Text>
                          <Text style={styles.messageDate}>
                            {item.date_time}
                          </Text>
                        </View>
                        <Text style={styles.messageData}>{item.data} </Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity onPress={this.openConversation.bind(this,item,curuser)}>
                        <View style={{ width: '100%', flexDirection: 'row' }}>
                          <Text style={styles.info}>{item.squad_name} </Text>
                          <Text style={styles.messageDate}>
                            {item.date_time}
                          </Text>
                        </View>
                        <Text style={styles.messageData}>{item.data} </Text>
                      </TouchableOpacity>
                    )}
                    <View style={styles.line} />
                  </React.Fragment>
                )}
              />
              <TouchableOpacity>
                <View style={styles.customButton}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 18,
                      fontWeight: 'bold',
                    }}>
                    New Message
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
        <BottomMenu curuser={curuser} />
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    //paddingBottom: 50,
  },
  info: {
    fontSize: 20,
    padding: 10,
    marginLeft: 10,
    fontWeight: 'bold',
    color: '#F4F4F4',
    marginTop: 15,
  },
  messageData: {
    fontSize: 15,
    padding: 10,
    paddingTop: 0,
    marginLeft: 10,
    color: 'white',
  },
  messageDate: {
    fontSize: 15,
    color: '#F4F4F4',
    marginTop: 29.5,
    alignSelf: 'right',
  },
  line: {
    backgroundColor: '#E8E8E8',
    height: 1,
    width: '90%',
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
  },
});
