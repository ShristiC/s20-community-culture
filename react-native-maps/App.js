import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import MapView from "react-native-maps";
import sample_markers from './sample_markers.json';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Camera } from "expo-camera";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App(){
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Camera') {
              return (
                <Image source={require('./icons/camera.png')} style={styles.icon}/>
              );
            } else if (route.name === 'Account') {
              return (
                <Image source={require('./icons/account.png')} style={styles.icon}/>
              );
            } else if (route.name === 'MapContainer') {
              return (
                <Image source={require('./icons/account.png')} style={styles.icon}/>
              );
            } else if (route.name === 'Search'){
              return (
                <Image source={require('./icons/search.png')} style={styles.icon}/>
              );
            }
          },
        })}
        tabBarOptions={{
          style: styles.buttonRow,
          showLabel: false,
        }}
      >
        <Tab.Screen name="Account" component={AccountScreen} />
        <Tab.Screen name="MapContainer" component={MapPinContainer} />
        <Tab.Screen name="Camera" component={CameraScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


function CameraScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

function AccountScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Account</Text>
    </View>
  );
}

function SearchScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Search</Text>
    </View>
  );
}

function PinScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Pin</Text>
    </View>
  );
}

function MapPinContainer(){
  return (
    <Stack.Navigator>
      <Stack.Screen name="Map" component={MapScreen}/>
      <Stack.Screen name="Pin" component={PinScreen}/>
    </Stack.Navigator>
  );
}


class MapScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      markers: [],
    };

  }

  render() {
    return (
        <MapView
          style={{ flex: 1 }}
          provider="google"
          mapType="hybrid"
          showsMyLocationButton
          showsUserLocation
          region={{
            latitude: 30.267032,
            longitude: -97.742209,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {this.state.isLoading ? null : this.state.markers.map((marker, index) => {
        const coords = {
           latitude: marker.latitude,
           longitude: marker.longitude,
       };
       const descrip = `Time Status: ${marker.timeStatus}\nUser Rating: ${marker.userRating}\nAddress: ${marker.stAddress}\nTop comment: ${marker.topComment}`;
       const navigation = this.props.navigation;
       return (
           <MapView.Marker
              onPress={() => this.props.navigation.push('Pin')}
              key={index}
              coordinate={coords}
              title={marker.attractionName}
              description={descrip}
              pinColor={marker.pinColor}
           />
       );
        })}

      </MapView>
    );
  }


  componentDidMount() {
    this.fetchMarkerData();
  }

  fetchMarkerData() {
    this.setState({
      isLoading: false,
      markers: sample_markers.attractionList,
    });
    }
};

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#bdeaff',
    paddingBottom: 20,
  },
  button: {
    bottom: 0,
    backgroundColor: '#bdeaff',
    padding: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  icon: {
    width: 40,
    height: 40,
  }
});