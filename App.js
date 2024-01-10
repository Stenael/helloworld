import React, { Component } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, NativeModules } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import About from "./screens/About";
import Product from "./screens/Product";
import ProductDetail from "./screens/ProductDetail";
import Login from "./screens/Login";
import Setting from "./screens/Setting";
import PopularMovie from "./screens/popularMovies";
import PopularActor from "./screens/popularActor";
import DetailMovie from "./screens/DetailMovie";
import DetailActor from "./screens/DetailActor";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import Quiz from "./screens/Quiz";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Drawer = createDrawerNavigator();
import MatiMurupGame from "./screens/MatiMurupGame";
import popularMovies from "./screens/popularMovies";
const Stack = createNativeStackNavigator();
import EditMovie from "./screens/editmovie";
//IMPORT SCREEN UAS
import Signin from "./screensUAS/signin";
import Signup from "./screensUAS/signup";
import Jadwal from "./screensUAS/jadwal";
import ShowMember from "./screensUAS/member";
import UpdatePassword from "./screensUAS/updatePassword";
import GantiPassword from "./screensUAS/gantiPassword";
import CariJadwal from "./screensUAS/cariJadwal";
import Profile from "./screensUAS/profile";
import BuatJadwal from "./screensUAS/buatJadwal";

export default class App extends Component {
  state = {
    islogin: false,
  };
  CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label={() => <Text>Logout</Text>}
          onPress={() => {
            AsyncStorage.removeItem("username");
            alert("logged out");
            NativeModules.DevSettings.reload();
          }}
        />
      </DrawerContentScrollView>
    );
  }
  doLogout = async () => {
    try {
      await AsyncStorage.removeItem("username");
      alert("logged out");
      NativeModules.DevSettings.reload();
    } catch (e) {}
  };

  cekLogin = async () => {
    try {
      const value = await AsyncStorage.getItem("username");
      global.activeuser = value;

      //alert(value);
      if (value !== null) {
        return value;
      }
    } catch (e) {
      // error reading value
    }
  };

  constructor(props) {
    super(props);
    this.cekLogin().then((item) => {
      if (item != null) {
        this.setState(
          (this.state = {
            islogin: true,
          })
        );
      }
    });
  }

  Nav1() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            var iconName;
            if (route.name == "Home") {
              iconName = "home";
              var iconColor = focused ? "blue" : "gray";
            }
            if (route.name == "About") {
              iconName = "happy";
              var iconColor = focused ? "blue" : "gray";
            }
            if (route.name == "Product") {
              iconName = "football";
              var iconColor = focused ? "blue" : "gray";
            }
            return <Ionicons name={iconName} size={36} color={iconColor} />;
          },
          tabBarActiveTintColor: "blue",
          tabBarInactiveTintColor: "gray",
        })}
      >
        {/* <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Tab.Screen name="About" component={About} /> */}
        <Tab.Screen
          name="Jadwal"
          component={Jadwal}
          options={{ headerShown: false }}
        />
        <Tab.Screen name="Cari" component={CariJadwal} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    );
  }
  NavMovie() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="PopularMovie"
          component={PopularMovie}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="DetailMovie" component={DetailMovie} />
      </Stack.Navigator>
    );
  }
  NavActor() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="PopularActor"
          component={PopularActor}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="DetailActor" component={DetailActor} />
      </Stack.Navigator>
    );
  }
  NavPass() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="GantiPassword"
          component={GantiPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="UpdatePassword" component={UpdatePassword} />
      </Stack.Navigator>
    );
  }

  render() {
    if (!this.state.islogin) {
      return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen 
              name="Signin" 
              component={(props) => <Signin {...props} />} 
            />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="GantiPassword" component={this.NavPass} />
            <Stack.Screen name="Signup" component={Signup} />
          </Stack.Navigator>
        </NavigationContainer>
      );
     }
    if (this.state.islogin) {
      return (
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen
              name="Main"
              component={this.Nav1}
              options={{ headerShown: true }}
            />
            <Stack.Screen name="BuatJadwal" component={BuatJadwal} />
            <Stack.Screen name="ShowMember" component={ShowMember} />
      
          </Drawer.Navigator>
        </NavigationContainer>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
