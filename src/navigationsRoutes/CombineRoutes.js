import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

import StackRoutes from './StackRoutes';

const CombineRoutes = () => {
  return (
    <NavigationContainer>
      {/* <Routes /> */}
      {/* <DrawerRoutes /> */}
      <StackRoutes />
    </NavigationContainer>
  );
};

export default CombineRoutes;
