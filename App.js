import React from 'react';
import { createStackNavigator, HeaderBackButton } from 'react-navigation';

// SCREENS
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import MenuScreen from './screens/MenuScreen';
import MessageScreen from './screens/MessageScreen';
import TaskScreen from './screens/TaskScreen';
import PollScreen from './screens/PollScreen';
import ScheduleScreen from './screens/ScheduleScreen';
import UserScreen from './screens/UserScreen';
import MySquadsScreen from './screens/MySquadsScreen';
import SquadScreen from './screens/SquadScreen';
import MyInvitesScreen from './screens/MyInvitesScreen';
import InviteScreen from './screens/InviteScreen';
import RegisterScreen from './screens/RegisterScreen';
import CreateSquadScreen from './screens/CreateSquadScreen';

export default createStackNavigator({
  /*Home: {
    screen: HomeScreen,
  },*/
  Login: {
    screen: LoginScreen,
  },
  Home: {
    screen: HomeScreen,
  },
  Menu: {
    screen: MenuScreen,
    navigationOptions({ navigation }) {
      return {
        headerLeft: (
          <HeaderBackButton
            title="Home"
            onPress={() => navigation.navigate('Home')}
          />
        )
      }
    },
  },
  Messages: {
    screen: MessageScreen,
    navigationOptions({ navigation }) {
      return {
        headerLeft: (
          <HeaderBackButton
            title="Home"
            onPress={() => navigation.navigate('Home')}
          />
        )
      }
    },
  },
  Tasks: {
    screen: TaskScreen,
    navigationOptions({ navigation }) {
      return {
        headerLeft: (
          <HeaderBackButton
            title="Home"
            onPress={() => navigation.navigate('Home')}
          />
        )
      }
    },
  },
  Polls: {
    screen: PollScreen,
    navigationOptions({ navigation }) {
      return {
        headerLeft: (
          <HeaderBackButton
            title="Home"
            onPress={() => navigation.navigate('Home')}
          />
        )
      }
    },
  },
  Schedule: {
    screen: ScheduleScreen,
    navigationOptions({ navigation }) {
      return {
        headerLeft: (
          <HeaderBackButton
            title="Home"
            onPress={() => navigation.navigate('Home')}
          />
        )
      }
    },
  },
  User: {
    screen: UserScreen,
  },
  MySquads: {
    screen: MySquadsScreen,
  },
  Squad: {
    screen: SquadScreen,
    navigationOptions({ navigation }) {
      return {
        headerLeft: (
          <HeaderBackButton
            title="My Squads"
            onPress={() => navigation.navigate('MySquads')}
          />
        )
      }
    },
  },
  MyInvites: {
    screen: MyInvitesScreen,
  },
  Invite: {
    screen: InviteScreen,
  },
  Register: {
    screen: RegisterScreen,
  },
  CreateSquad: {
    screen: CreateSquadScreen,
  },
});
