// import { CommonActions } from '@react-navigation/native';
//
// let navigator;
//
// export const setNavigator = (nav) => {
//   navigator = nav;
// };
//
// export const navigate = (routeName, params) => {
//   navigator.dispatch(
//     CommonActions.navigate({
//       routeName,
//       params
//     })
//   );
// };

import * as React from 'react';

export const navigationRef = React.createRef();

export const navigate = (routeName, params) => {
  navigationRef.current?.navigate(routeName, params);
};
