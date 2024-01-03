import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, NativeModules } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import About from "./screens/About";
import Product from './screens/Product';
import ProductDetail from './screens/ProductDetail';
import Login from './screens/Login';
import Setting from './screens/Setting';
import PopularMovie from './screens/popularMovies';
import PopularActor from './screens/popularActor';
import DetailMovie from './screens/DetailMovie';
import DetailActor from './screens/DetailActor';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import Quiz from './screens/Quiz';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Drawer = createDrawerNavigator();
import MatiMurupGame from './screens/MatiMurupGame';
import popularMovies from './screens/popularMovies';
const Stack = createNativeStackNavigator();
import EditMovie from './screens/editmovie';
//IMPORT SCREEN UAS
import Signin from './screensUAS/signin';
import Signup from './screensUAS/signup';
import Jadwal from './screensUAS/jadwal';
import CariJadwal from './screensUAS/cariJadwal';
import Profile from './screensUAS/profile';
import BuatJadwal from './screensUAS/buatJadwal';





export default class App extends Component {
  state = {
    islogin: false,
  }
  CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem label={() => <Text>Logout</Text>}
          onPress={() => {
            AsyncStorage.removeItem('username')
            alert('logged out');
            NativeModules.DevSettings.reload();


          }}
        />
      </DrawerContentScrollView>
    );
  }
  doLogout = async () => {
    try {
      await AsyncStorage.removeItem('username')
      alert('logged out');
      NativeModules.DevSettings.reload();
    } catch (e) {
    }
  }

  cekLogin = async () => {
    try {
      const value = await AsyncStorage.getItem('username');
      global.activeuser = value
      
      //alert(value);
      if (value !== null) {
        return value;
      }
    } catch (e) {
      // error reading value
    }
  }

  constructor(props) {
    super(props);
    this.cekLogin().then((item) => {
      if (item != null) {
        this.setState(
          this.state = {
            islogin: true
          })
      }
    })
    

    
  }



  Nav2() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Product List" component={Product} />
        <Stack.Screen name="Product Detail" component={ProductDetail} />
      </Stack.Navigator>
    );
  }

  Nav1() {
    return (
      <Tab.Navigator

        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            var iconName;
            if (route.name == 'Home') {
              iconName = 'home';
              var iconColor = (focused) ? 'blue' : 'gray';
            }
            if (route.name == 'About') {
              iconName = 'happy';
              var iconColor = (focused) ? 'blue' : 'gray';
            }
            if (route.name == 'Product') {
              iconName = 'football';
              var iconColor = (focused) ? 'blue' : 'gray';
            }
            return <Ionicons name={iconName} size={36} color={iconColor} />;
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
        })}

      >
        {/* <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Tab.Screen name="About" component={About} /> */}
        <Tab.Screen name="Jadwal" component={Jadwal} options={{ headerShown: false }} />
        <Tab.Screen name="Cari" component={CariJadwal} />
        <Tab.Screen name="Profile" component={Profile} />

      </Tab.Navigator>
    )
  }
  NavMovie() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="PopularMovie" component={PopularMovie} 
         options={{ headerShown: false }}/>
        <Stack.Screen name="DetailMovie" component={DetailMovie} />
      </Stack.Navigator>
    );
  }
  NavActor(){
    return (
      <Stack.Navigator>
        <Stack.Screen name="PopularActor" component={PopularActor} 
         options={{ headerShown: false }}/>
        <Stack.Screen name="DetailActor" component={DetailActor} />
      </Stack.Navigator>
    );
  }

  render() {
    if (!this.state.islogin) {
      return (
        <NavigationContainer><Stack.Navigator>
          <Stack.Screen name="Signin" component={Signin} />
        </Stack.Navigator>
        </NavigationContainer>);
    } 
    if (this.state.islogin ) {

      return (
       
        <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Main" component={this.Nav1}
            options={{ headerShown: true }} />
          {/* <Drawer.Screen name="Setting" component={Setting} />
          <Drawer.Screen name="Quiz" component={Quiz} />
          <Drawer.Screen name="Mati Murup Game" component={MatiMurupGame} />
          <Drawer.Screen name="Popular Movies" component={this.NavMovie} />
          <Drawer.Screen name="Popular Actor" component={this.NavActor} /> */}
          <Drawer.Screen name="Buat Jadwal" component={BuatJadwal} />
          <Drawer.Screen name="Signup" component={Signup} />
          <Stack.Screen name="BuatJadwal" component={BuatJadwal} />
          <Drawer.Screen name="EditMovie" component={EditMovie} />

        </Drawer.Navigator>
      </NavigationContainer>
        // <NavigationContainer>
        //   <Drawer.Navigator initialRouteName="Home">
        //     <Drawer.Screen name="Main" component={this.Nav1}
        //       options={{ headerShown: true }} />
        //     <Drawer.Screen name="Setting" component={Setting} />
        //     <Drawer.Screen name="Quiz" component={Quiz} />
        //     <Drawer.Screen name="Mati Murup Game" component={MatiMurupGame} />
        //     <Drawer.Screen name="Popular Movies" component={this.NavMovie} />
        //     <Drawer.Screen name="Popular Actor" component={this.NavActor} />

        //   </Drawer.Navigator>
        // </NavigationContainer>


      );
    }
    
  }

}








const SetColour = () => {
  const [fontSize, perbesar] = useState(50);
  const [R, recolorR] = useState(225);
  const [G, recolorG] = useState(0);
  const [B, recolorB] = useState(0);

  return (
    <view>
      <Text id="text" style={{ fontSize: fontSize, backgroundColor: `rgb(${R}, ${G}, ${B})` }}>
        &nbsp;&nbsp;&nbsp;&nbsp;
      </Text>

      <Button title="Perbesar" onPress={() => perbesar((fontSize) => fontSize + 1)} />
      <View style={{ flexDirection: 'row' }}>
        <Button title="R+" onPress={() => recolorR((R) => R + 10)} />
        <Button title="R-" onPress={() => recolorR((R) => R - 10)} />
        <Button title="G+" onPress={() => recolorG((G) => G + 10)} />
        <Button title="G-" onPress={() => recolorG((G) => G - 10)} />
        <Button title="B+" onPress={() => recolorB((B) => B + 10)} />
        <Button title="B-" onPress={() => recolorB((B) => B - 10)} />
      </View>

    </view>
  )



}
// const Quiz = ()=>{
//   const [count, setCount] = useState(0);
//   return(
//     <View>
//       <text>Count: {count}</text>
//       <button></button>
//     </View>
//   )
// };

const KomNilai = () => {
  const [nilai, setNilai] = useState(99);
  const nisbi = (nilai) => {
    if (nilai >= 86) return "Sangat Baik(A)";
    if (nilai >= 71 && nilai < 86) return "Baik(B)";
    if (nilai >= 56 && nilai < 71) return "Cukup(C)";
    if (nilai <= 55) return "Kurang(D)";

  }
  return (
    <View>
      <Text>Skor anda {nilai} dengan predikat {nisbi(nilai)}</Text>
      <Button title="+" onPress={() => setNilai((nilai) => nilai + 5)} />
      <Button title="-" onPress={() => setNilai((nilai) => nilai - 5)} />
    </View>
  )

};
const Pet = (prop) => {
  const [action, setAction] = useState(prop.type);
  const voice = (tipe) => {
    var v = "";
    if (tipe == 'cat') v = 'Meoow meoow';
    if (tipe == 'dog') v = 'Woof woof';
    if (tipe == 'duck') v = 'kwaak kwaak';
  }
  return (
    <View>
      <Text>I am your pet! I am a {prop.type}. {voice(action)}</Text>
      <Button title="Feed me" onPress={() => setAction('feed')} />
      <Button title="Cuddle me" onPress={() => setAction('cuddle')} />
      <Button title="Play with me" onPress={() => setAction(prop.type)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});
