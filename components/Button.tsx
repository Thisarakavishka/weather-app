import { TouchableOpacity, Text } from 'react-native';
import React from 'react';

const Button = ({ title, onPress }) => {
  return (
    <TouchableOpacity className='bg-blue-500 p-4 rounded-lg' onPress={onPress}>
      <Text className='text-white text-center font-bold'>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
