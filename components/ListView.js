import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  Button,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import ReactList from 'react-list';
import { createStackNavigator, withNavigation } from 'react-navigation';

class ListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const data = this.props.data;
    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <React.Fragment>
              <TouchableOpacity>
                <Text style={styles.info}>{item.key} </Text>
              </TouchableOpacity>
              <View style={styles.line} />
            </React.Fragment>
          )}
        />
      </View>
    );
  }
}

export default withNavigation(ListView);

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
