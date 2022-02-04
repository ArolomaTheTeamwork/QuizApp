import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import {HomeScreen, LoginScreen, SettingScreen} from './../screens';

const Drawer = createDrawerNavigator();
const DrawerRoutes = () => {
  return (
    <Drawer.Navigator>
      {/* <Drawer.Screen name="LoginScreen" component={LoginScreen} /> */}
      <Drawer.Screen name="HomeScreen" component={HomeScreen} />
      <Drawer.Screen name="SettingScreen" component={SettingScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerRoutes;
