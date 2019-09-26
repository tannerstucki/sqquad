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
} from 'react-native';
import Constants from 'expo-constants';

export default class User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: string;
  age: integer;
  city: string;
  state: string;
  country: string;
  user_type: string;

  constructor(
    id,
    first_name,
    last_name,
    email,
    password,
    phone_number,
    age,
    city,
    state,
    country,
    user_type
  ) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.password = password;
    this.phone_number = phone_number;
    this.age = age;
    this.city = city;
    this.state = state;
    this.country = country;
    this.user_type = user_type;
  }
}

/*
        var curuser = new User(
          responseJson[0].id,
          responseJson[0].first_name,
          responseJson[0].last_name,
          responseJson[0].email,
          responseJson[0].password,
          responseJson[0].phone_number,
          responseJson[0].age,
          responseJson[0].city,
          responseJson[0].state,
          responseJson[0].country,
          responseJson[0].user_type
        );*/
