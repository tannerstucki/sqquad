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
} from 'react-native';
import BottomMenu from '../components/BottomMenu';
import { LinearGradient } from 'expo-linear-gradient';

export default class ConversationScreen extends React.Component {
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
  }

  componentWillMount() {
    var { params } = this.props.navigation.state;
    var curuser = params.curuser;
    var curconversation = params.curconversation;
    Alert.alert("2: " + params.curconversation.message_type);

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
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <FlatList
              data={this.state.data}
              renderItem={({ item }) => (
                <React.Fragment>
                  {item.message_type == 'user' ? (
                    <TouchableOpacity>
                      <View style={{ width: '100%', flexDirection: 'row' }}>
                        <Text style={styles.info}>{item.name}</Text>
                        <Text style={styles.messageDate}>{item.date_time}</Text>
                      </View>
                      <Text style={styles.messageData}>{item.data} </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity>
                      <View style={{ width: '100%', flexDirection: 'row' }}>
                        <Text style={styles.info}>{item.squad_name} </Text>
                        <Text style={styles.messageDate}>{item.date_time}</Text>
                      </View>
                      <Text style={styles.messageData}>{item.data} </Text>
                      <Text style={styles.messageData}>{item.name} </Text>
                    </TouchableOpacity>
                  )}
                  <View style={styles.line} />
                </React.Fragment>
              )}
            />
          </View>
        </LinearGradient>
        {/*<BottomMenu curuser={curuser} />*/}
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
});
