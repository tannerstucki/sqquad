import React from 'react';
import { createStackNavigator } from 'react-navigation';

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
  },
  Messages: {
    screen: MessageScreen,
  },
  Tasks: {
    screen: TaskScreen,
  },
  Polls: {
    screen: PollScreen,
  },
  Schedule: {
    screen: ScheduleScreen,
  },
  User: {
    screen: UserScreen,
  },
  MySquads: {
    screen: MySquadsScreen,
  },
  Squad: {
    screen: SquadScreen,
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
});
