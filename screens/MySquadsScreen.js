import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  Alert,
  FlatList,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { createStackNavigator } from 'react-navigation';

export default class MySquadsScreen extends React.Component {
  static navigationOptions = {
    title: 'My Squads',
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
    fetch('http://sqquad.x10host.com/api/squads/user/' + curuser.id, {
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

  openSquad(cursquad) {
    this.props.navigation.navigate('Squad', {
      cursquad: cursquad,
    });
  }

  openCreateSquad(curuser){
    this.props.navigation.navigate('CreateSquad',{
      curuser: curuser,
    })
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
                    <TouchableOpacity onPress={this.openSquad.bind(this, item)}>
                      <Text style={styles.info}>{item.name} </Text>
                    </TouchableOpacity>
                    <View style={styles.line} />
                  </React.Fragment>
                )}
              />
              <View style={styles.customButton}>
                <TouchableOpacity onPress={this.openCreateSquad.bind(this,curuser)}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 18,
                      fontWeight: 'bold',
                    }}>
                    Create New Squad
                  </Text>
                </TouchableOpacity>
              </View>
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
    paddingBottom: 50,
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
  customButton: {
    flexDirection: 'row',
    backgroundColor: 'black',
    width: '75%',
    height: '10%',
    borderRadius: 15,
    //marginBottom: 25,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
