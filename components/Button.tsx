import { View, Text } from "react-native";
import React from "react";

const Button = () => {
  return (
    <View className="w-full py-3.5 bg-primary-300 mx-4 flex flex-1 flex-row justify-center items-center rounded-full shadow-btn">
      <Text className="font-rubik-bold text-white text-lg">Book Now</Text>
    </View>
  );
};

export default Button;
