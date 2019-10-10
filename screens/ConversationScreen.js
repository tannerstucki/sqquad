import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Dimentions,
  StyleSheet,
  Alert,
  StackActions,
  Dimensions,
} from 'react-native';
import BottomMenu from '../components/BottomMenu';
import { GiftedChat } from 'react-native-gifted-chat';
import { LinearGradient } from 'expo-linear-gradient';

export default class ConversationScreen extends React.PureComponent {
  static navigationOptions = {
    title: 'Conversation',
    //headerLeft: navigate back to home screen
  };

  constructor(props) {
    super(props);
    this.state = {
      data: '',
      curuser: '',
      curconversation: '',
    };

    console.log(this.props.navigation.state);
    var { params } = this.props.navigation.state;
    var curuser = params.curuser;
    var curconversation = params.curconversation;

    fetch('http://sqquad.x10host.com/api/messages/conversation', {
      method: 'GET',
      headers: {
        user_id: curuser.id,
        sender_id: curconversation.sender_id,
        message_type: curconversation.message_type,
        squad_id: curconversation.squad_id,
      },
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
        this.setState({ noSquads: true });
      });
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {
    var { params } = this.props.navigation.state;
    var curuser = params.curuser;
    var curconversation = params.curconversation;

    fetch('http://sqquad.x10host.com/api/messages/conversation', {
      method: 'GET',
      headers: {
        user_id: curuser.id,
        sender_id: curconversation.sender_id,
        message_type: curconversation.message_type,
        squad_id: curconversation.squad_id,
      },
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
        this.setState({ noSquads: true });
      });
  }

  componentWillUnmount() {
    console.log('You good');
  }

  render() {
    const { params } = this.props.navigation.state;
    const curuser = params.curuser;
    const curconversation = params.curconversation;

    return (
      <React.Fragment>
        <LinearGradient
          colors={['#5B4FFF', '#51FFE8']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 1 }}>
            <FlatList
              style={{
                height: '90%',
                width: Dimensions.get('window').width,
              }}
              data={this.state.data}
              renderItem={({ item }) => (
                <React.Fragment>
                  {item.message_type == 'user' ? (
                    <TouchableOpacity>
                      {item.sender_id == curuser.id ? (
                        <View flex left>
                          <View style={styles.left}>
                            <Text style={styles.messageData}>{item.data} </Text>
                          </View>
                        </View>
                      ) : (
                        <View flex right>
                          <View style={styles.right}>
                            <Text style={styles.messageData}>{item.data} </Text>
                          </View>
                        </View>
                      )}
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity>
                      {item.sender_id == curuser.id ? (
                        <View flex left>
                          <View style={styles.left}>
                            <Text style={styles.messageData}>{item.data} </Text>
                          </View>
                        </View>
                      ) : (
                        <View flex right>
                          <View style={styles.right}>
                            <Text style={styles.messageData}>{item.data} </Text>
                          </View>
                        </View>
                      )}
                    </TouchableOpacity>
                  )}
                </React.Fragment>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
        </LinearGradient>
        <BottomMenu curuser={curuser} />
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
    color: '#F4F4F4',
    marginTop: 15,
  },
  messageData: {
    fontSize: 15,
    padding: 20,
    color: 'black',
  },
  messageDate: {
    fontSize: 15,
    color: '#F4F4F4',
    marginTop: 29.5,
    alignSelf: 'right',
  },
  left: {
    alignSelf: 'flex-start',
    backgroundColor: '#F4F4F4',
    marginTop: 20,
    width: Dimensions.get('window').width * 0.5,
    borderRadius: 15,
    borderTopLeftRadius: 0,
    marginLeft: Dimensions.get('window').width * 0.05,
    alignContent: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    justifyContent: 'center',
  },
  right: {
    alignSelf: 'flex-start',
    backgroundColor: '#BCE0FD',
    marginTop: 20,
    width: Dimensions.get('window').width * 0.5,
    borderRadius: 15,
    borderBottomRightRadius: 0,
    marginLeft: Dimensions.get('window').width * 0.45,
    alignContent: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    justifyContent: 'center',
  },
});
