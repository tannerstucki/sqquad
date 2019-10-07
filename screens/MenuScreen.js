import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  StyleSheet,
  Linking,
} from 'react-native';
import BottomMenu from '../components/BottomMenu';
import { LinearGradient } from 'expo-linear-gradient';

export default class MenuScreen extends React.Component {
  static navigationOptions = {
    title: 'Menu',
    //headerLeft: null
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.forceUpdate();
  }

  accountClick(curuser) {
    this.props.navigation.navigate('User', {
      curuser: curuser
    });
  }

  mySquadsClick(curuser) {
    this.props.navigation.navigate('MySquads', {
      curuser: curuser
    });
  }
  
  myInvitesClick(curuser) {
    this.props.navigation.navigate('MyInvites', {
      curuser: curuser
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
          <View style={{ height: '90%' }}>
            <View
              style={{
                height: '15%',
                backgroundColor: '#91BEEC',
                flexDirection: 'row',
              }}>
              <Image
                style={styles.logo}
                source={require('assets/Squad18.png')}
              />
              <View style={{ flexDirection: 'column' }}>
                <Text style={styles.user_name}>
                  {' '}
                  {curuser.first_name} {curuser.last_name}
                </Text>
                <Text style={styles.user_location}>
                  {' '}
                  {curuser.city}, {curuser.state}
                </Text>
              </View>
            </View>
            {/*<TouchableOpacity>
              <Text style={styles.options}>FEED - COMING SOON</Text>
            </TouchableOpacity>*/}
            {/*<TouchableOpacity>
              <Text style={styles.options}>EXPLORE - COMING SOON</Text>
            </TouchableOpacity>*/}
            {/*<TouchableOpacity>
              <Text style={styles.options}>NOTIFICATIONS - COMING SOON</Text>
            </TouchableOpacity>*/}
            <TouchableOpacity onPress={this.accountClick.bind(this,curuser)}>
              <View style={styles.row}>
                <Image
                  style={styles.icon}
                  source={require('assets/icons/user.png')}
                />
                <Text style={styles.options}>ACCOUNT</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.mySquadsClick.bind(this,curuser)}>
              <View style={styles.row}>
                <Image
                  style={styles.icon}
                  source={require('assets/icons/squads.png')}
                />
                <Text style={styles.options}>MY SQUADS</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.myInvitesClick.bind(this,curuser)}>
              <View style={styles.row}>
                <Image
                  style={styles.icon}
                  source={require('assets/icons/invitation.png')}
                />
                <Text style={styles.options}>MY INVITES</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.row}>
                <Image
                  style={styles.icon}
                  source={require('assets/icons/settings.png')}
                />
                <Text style={styles.options}>SETTINGS</Text>
              </View>
            </TouchableOpacity>
            {/*<TouchableOpacity>
              <Text style={styles.options}>SEARCH - COMING SOON</Text>
            </TouchableOpacity>*/}
          </View>
          <Text
            style={{ color: 'white', marginLeft: 15, fontSize: 10 }}
            onPress={() =>
              Linking.openURL('https://www.flaticon.com/authors/smashicons')
            }>
            Icons made by Smashicons from Flaticon
          </Text>
        </LinearGradient>
        <BottomMenu curuser={curuser} />
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  options: {
    fontSize: 20,
    padding: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  user_name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    paddingTop: 20,
  },
  user_location: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  logo: {
    height: 75,
    width: 75,
    margin: 5,
    marginLeft: 15,
  },
  icon: {
    height: 35,
    width: 35,
    margin: 10,
  },
  row: {
    flexDirection: 'row',
    margin: 15,
  },
});
