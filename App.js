import * as React from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, StatusBar} from 'react-native';
import {KeyboardAvoidingView, ScrollView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const stylesByPlatform = Platform.select({
  ios: { fontFamily: 'Roboto' },
  android: { },
})

function TitleScreen({navigation, props}) {
    return(
      <NavigationContainer independent = {true}>
        <View style={styles.container}>
            <StatusBar barStyle = "light-content"/>
            <TouchableOpacity onPress = {() => navigation.navigate('UserScreen')} >
              <Image 
                  style = {styles.logo}
                  source = {require('./images/TitleLogo.png')} 
                  resizeMode = "contain"
              />
              <Text adjustsFontSizeToFit = {true}
                  numberOfLines= {1}
                  style = {styles.titleText}>PictureThis!</Text>
            </TouchableOpacity>
        </View>
      </NavigationContainer>
    );
  }

function UserScreen({navigation}) {
  return (
    <NavigationContainer independent = {true}>
      <View style = {styles.container}>
        <Image
          style = {styles.loginLogo}
          source = {require('./images/PictureThisLogo.png')}
          resizeMode = 'contain'
        />
      </View>
      <Text style = {styles.userTitle}>PictureThis!</Text>
      <KeyboardAvoidingView behavior= "padding" style = {styles.container}>
        <StatusBar barStyle = "light-content"/>
        <TextInput 
            style = {styles.input}
            placeholder = "username or email"
            placeholderTextColor = '#ffffff'
            returnKeyType = "next"
            onSubmitEditing = {() => this.password.focus()}
            keyboardType = "email-address"
            autoCapitalize="none"
            autoCorrect={false}
        />
        <TextInput 
            style = {styles.input}
            placeholder = "password"
            placeholderTextColor = '#ffffff'
            secureTextEntry = {true}
        />
        <TouchableOpacity onPress ={() => navigation.navigate('TabScreen')} style = {styles.buttonContainer}>
          <Text style = {styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <View style = {styles.LoginSignUp}>
            <Text style = {styles.SignUpText}>Don't have an Account? </Text>
            <Text  onPress = {() => navigation.navigate('SignUpScreen')} style = {styles.SignUpButton}>Sign Up!</Text>
        </View>
      </KeyboardAvoidingView>
    </NavigationContainer>
  );
}

function SignUpScreen({navigation}) {
  return(
    <NavigationContainer independent = {true}>
      <View style = {styles.container}>
        <Image
          style = {styles.loginLogo}
          source = {require('./images/PictureThisLogo.png')}
          resizeMode = 'contain'
        />
      </View>
      <KeyboardAvoidingView behavior= "padding" style = {styles.container}>
        <StatusBar barStyle = "light-content"/>
        <TextInput 
            style = {styles.input}
            placeholder = "first and last name"
            placeholderTextColor = '#ffffff'
            returnKeyType = "next"
            autoCapitalize="none"
            autoCorrect={false}
        />
         <TextInput 
            style = {styles.input}
            placeholder = "username or email"
            placeholderTextColor = '#ffffff'
            returnKeyType = "next"
            keyboardType = "email-address"
            autoCapitalize="none"
            autoCorrect={false}
        />
        <TextInput 
            style = {styles.input}
            placeholder = "password"
            placeholderTextColor = '#ffffff'
            secureTextEntry = {true}
        />
        <TouchableOpacity onPress ={() => navigation.navigate('TabScreen')} style = {styles.buttonContainer}>
          <Text style = {styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </NavigationContainer>
  );
}

function TabScreen({navigation}) {
  return (
    <NavigationContainer independent = {true}>
      <StatusBar barStyle = "light-content"/>
      <Tab.Navigator 
        screenOptions = {({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'HotSpotScreen') {
              return (
                <Image source = {require('./images/fire.png')} style = {styles.icon} />
              );
            } else if (route.name === 'SettingsScreen') {
              return (
                <Image source = {require('./images/user.png')} style = {styles.icon}/>
              );
            } else if (route.name === 'CameraScreen') {
              return(
                <Image source = {require('./images/camera.png')} style = {styles.icon}/>
              );
            } else if (route.name === 'HomeScreen') {
                return(
                  <Image source = {require('./images/home.png')} style = {styles.icon}/>
                );
            }
          }
        })}
        tabBarOptions = {{
          style: styles.buttonRow,
          showLabel: false,
        }}
      >
        <Tab.Screen name = "HomeScreen" component = {HomeScreen} />
        <Tab.Screen name = "HotSpotScreen" component = {HotSpotScreen} />
        <Tab.Screen name = "CameraScreen" component = {CameraScreen} />
        <Tab.Screen name = "SettingsScreen" component = {SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


function HomeScreen() {
  return (
    <View style={styles.pages}>
        <StatusBar barStyle = "dark-content"/>
        <Image source = {require('./images/menu.png')} style = {{width: 50, height: 50, marginTop: 30, marginLeft: 20, borderRadius: 10,}}/>
        <Text 
          style = {{
            marginVertical: 70,
            marginHorizontal: 60,
            fontSize: 50}}>HOME PAGE</Text>
    </View>
  );
}

function HotSpotScreen() {
  return (
    <ScrollView style={styles.pages}>
        <StatusBar barStyle = "dark-content"/>
        <Image source = {require('./images/tower.jpg')} style = {styles.galleryImages}/>
        <Image source = {require('./images/nightTower.jpg')} style = {styles.galleryImages}/>
        <Image source = {require('./images/tower3.jpg')} style = {styles.galleryImages}/>
        <Image source = {require('./images/tower4.jpg')} style = {styles.galleryImages}/>
        <Image source = {require('./images/tower5.jpg')} style = {styles.galleryImages}/>
    </ScrollView>
  );
}

function CameraScreen() {
  return(
    <View style={styles.pages}>
        <StatusBar barStyle = "dark-content"/>
        <Text 
          style = {{
            marginVertical: 250,
            marginHorizontal: 30,
            fontSize: 50}}>CAMERA PAGE</Text>
    </View>
  );
}

function SettingsScreen() {
  return(
    <View style={styles.pages}>
        <StatusBar barStyle = "dark-content"/>
        <View style = {styles.rectangle}>
          <Text styles = {styles.settingsText}>PROFILE</Text>
        </View>
        <View style = {styles.rectangle}>
          <Text styles = {styles.settingsText}>NOTIFICATIONS</Text>
        </View>
        <View style = {styles.rectangle}>
          <Text styles = {styles.settingsText}>HELP CENTER</Text>
        </View>
        
    </View>
  );
}

function App() {
  return(
    <NavigationContainer independent = {true}>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName = "Home">
        <Stack.Screen name = "TitleScreen" component = {TitleScreen} />
        <Stack.Screen name = "UserScreen" component = {UserScreen} />
        <Stack.Screen name = "TabScreen" component = {TabScreen} />
        <Stack.Screen name = "SignUpScreen" component = {SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  //general page style guidelines
  container: {
    flex: 1,
    backgroundColor: '#aa192f',
    //backgroundColor: '#c1273f',
    justifyContent: "center",
    alignItems: 'center',
  },
  //title page
  titleText: {
    fontSize : 50,
    fontWeight : '500',
    paddingLeft: 25,
    color: "#ffffff",
    paddingBottom: 250,
    textShadowColor: '#880E4F',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },

  logo: {
    flex: 1,
    height: 150,
    width: 300,
    top: 100,
  },

  //Login Screen
  loginLogo: {
    flexGrow: 1,
    width: 300,
  },

  userTitle: {
    fontSize: 50,
    fontWeight: '500',
    paddingBottom: 70,
    paddingLeft: 90,
    backgroundColor: '#aa192f',
    alignItems: 'center',
    color: 'white',

  },

  input: {
    height: 60,
    width: 300,
    fontSize: 16,
    backgroundColor: '#EF9A9A',
    color: 'white',
    paddingHorizontal: 20,
    marginBottom: 30,
    borderRadius: 50,
  },

  buttonContainer: {
    backgroundColor: "#E57373",
    width: 200,
    height: 40,
    paddingVertical: 5,
    borderRadius: 50,
  },

  buttonText: {
    fontSize: 24,
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: {width: 0.5, height: 0.5},
    textShadowRadius: 1,
    fontWeight: '500',
    color: '#ffffff'
  },

  LoginSignUp: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginVertical: 16,
    flexDirection: 'row',
  },

  SignUpText: {
    color: 'white',
    fontSize: 16,
    textShadowColor: '#000',
    textShadowOffset: {width: 0.5, height: 0.5},
    textShadowRadius: 1,
  },

  SignUpButton: {
    color: 'white',
    fontSize: 16,
    fontWeight: '900',
    textShadowColor: '#000',
    textShadowOffset: {width: 0.5, height: 0.5},
    textShadowRadius: 1,
  },

  //Tab Navigation
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#aa192f',
    height: 65,
  },

  icon: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },

  pages: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  menuIcon: {
    width: 50,
    height: 50,
    borderRadius: 10,
    margin: 20,
  },

  titleLogo: {
    width: 150,
    marginBottom: 250,
  },

  galleryImages: {
    flexDirection: 'row',
    width: 450,
    marginVertical: 2,
    height: 200
  },

  rectangle: {
    flexDirection: 'row',
    width: 380,
    height: 150,
    backgroundColor: '#E57373',
    marginVertical: 25,
    marginHorizontal: 15,
    borderRadius: 10,
  },
  
});

export default App;