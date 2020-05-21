import { CommonActions } from '@react-navigation/native';

let navigator;

export const setNavigator = (nav) => {
  navigator = nav;
};

export const navigate = (routeName, params) => {
  navigator.dispatch(
    CommonActions.navigate({
      routeName,
      params
    })
  );
};
