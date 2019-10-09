import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  Button,
  TouchableOpacity,
} from 'react-native';
import { createStackNavigator, withNavigation } from 'react-navigation';

class BottomMenu extends React.Component {
  static navigationOptions = {
    title: 'BottomMenu',
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  menuClick(curuser) {
    this.props.navigation.navigate('Menu', {
      curuser: curuser
    });
  }

  chatClick(curuser) {
    this.props.navigation.navigate('Messages', {
      curuser: curuser
    });
  }

  tasksClick(curuser) {
    this.props.navigation.navigate('Tasks', {
      curuser: curuser
    });
  }

  pollsClick(curuser) {
    this.props.navigation.navigate('Polls', {
      curuser: curuser
    });
  }

  timersClick(curuser) {
    this.props.navigation.navigate('Schedule', {
      curuser: curuser
    });
  }

  render() {
    const curuser = this.props.curuser;
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          width: '100%',
          height: '10%',
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity onPress={this.menuClick.bind(this, curuser)}>
          <Image
            style={styles.icon}
            source={require('assets/icons/menu.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.chatClick.bind(this, curuser)}>
        <Image style={styles.icon} source={require('assets/icons/chat.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.tasksClick.bind(this, curuser)}>
        <Image style={styles.icon} source={require('assets/icons/list.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.pollsClick.bind(this, curuser)}>
        <Image
          style={styles.icon}
          source={require('assets/icons/question.png')}
        />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.timersClick.bind(this, curuser)}>
        <Image style={styles.icon} source={require('assets/icons/time.png')} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default withNavigation(BottomMenu);

const styles = StyleSheet.create({
  icon: {
    height: 30,
    width: 30,
    margin: 20,
  },
});
