import { View, TouchableOpacity } from 'react-native';
import React from 'react';
import { MapIcon, MapPinIcon, Cog6ToothIcon } from 'react-native-heroicons/outline';
import colors from '../theme/colors'; 

const TabBar = ({ state, descriptors, navigation }) => {

  const icons = {
    index: (props) => <MapIcon size={25} color={props.color} {...props} />,
    location: (props) => <MapPinIcon size={25} color={props.color} {...props} />,
    setting: (props) => <Cog6ToothIcon size={25} color={props.color} {...props} />,
  };

  return (
    <View className="flex-row justify-around p-2 bottom-0 bg-white absolute w-full">
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        if (['_sitemap', '+not-found'].includes(route.name)) return null;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            className="flex-1 items-center p-2"
          >
            {
              icons[route.name]({
                color: isFocused ? colors.tabBarActive : colors.tabBarInactive
              })
            }
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;
