import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import images from "@/constants/images";
import icons from "@/constants/icons";
import { Models } from "react-native-appwrite";

interface Props {
  item: Models.Document;
  onPress?: () => void;
}

export const FeaturedCard = ({ item, onPress }: Props) => {
  return (
    <TouchableOpacity
      className="w-60 h-80 flex flex-col relative items-start"
      onPress={onPress}
    >
      <Image source={{ uri: item.image }} className="size-full rounded-2xl" />
      <Image
        source={images.cardGradient}
        className="size-full rounded-2xl absolute bottom-0"
      />

      <View className="flex flex-row items-center bg-white/90 absolute top-5 right-5 gap-1 py-1.5 rounded-full px-3">
        <Image source={icons.star} className="size-3.5" />
        <Text className="text-xs font-rubik-bold text-primary-300 mt-1.5">
          {item.rating}
        </Text>
      </View>

      <View className="absolute px-3 py-2 bottom-5 inset-x-3 flex flex-col items-start">
        <Text
          className="text-white text-xl font-rubik-extrabold"
          numberOfLines={1}
        >
          {item.name}
        </Text>
        <Text className="text-white text-base font-rubik">{item.address}</Text>
        <View className="flex flex-row justify-between items-center w-full">
          <Text className="text-white text-xl font-rubik-extrabold">
            ${item.price}
          </Text>
          <Image source={icons.heart} className="size-5" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const Card = ({ item, onPress }: Props) => {
  return (
    <TouchableOpacity
      className="flex-1 w-full mt-4 px-3 py-4 rounded-lg bg-white shadow-xl shadow-black-200/90 relative"
      onPress={onPress}
    >
      <Image
        source={{ uri: item.image }}
        className="size-full rounded-lg w-full h-40"
      />

      <View className="flex flex-row items-center bg-white/90 absolute top-5 right-5 gap-1 py-1 rounded-full px-2 z-50">
        <Image source={icons.star} className="size-3.5" />
        <Text className="text-xs font-rubik-bold text-primary-300 mt-1.5">
          {item.rating}
        </Text>
      </View>

      <View className="flex flex-col mt-2">
        <Text className="text-black-300 text-base font-rubik-bold">
          {item.name}
        </Text>
        <Text className="text-black-200 text-xs font-rubik">
          {item.address}
        </Text>
        <View className="flex flex-row justify-between items-center mt-2">
          <Text className="text-primary-300 text-base font-rubik-bold">
            ${item.price}
          </Text>
          <Image
            source={icons.heart}
            className="size-5 mr-2"
            tintColor={"#191d31"}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
