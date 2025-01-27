import { View, Text } from "react-native";
import React from "react";

interface Props {
  title?: string;
}
const Button = ({ title }: Props) => {
  return (
    <View className="w-full py-3.5 bg-primary-300 mx-4 flex flex-1 flex-row justify-center items-center rounded-full shadow-md shadow-zinc-400">
      <Text className="font-rubik-bold text-white text-lg">
        {title || "Book Now"}
      </Text>
    </View>
  );
};

export default Button;
