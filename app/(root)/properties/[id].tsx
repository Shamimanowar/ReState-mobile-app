import {
  View,
  Text,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/components/Button";

import images from "@/constants/images";
import icons from "@/constants/icons";
import { owner } from "@/constants/data";

const Property = () => {
  const { id } = useLocalSearchParams();

  const onChatPress = (
    phoneNumber: string,
    message: string = `Greeting from ${owner.name}`
  ) => {
    const url = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
    Linking.openURL(url).catch((err) => console.error("Error:", err));
  };
  const onCallPress = (phoneNumber: string) => {
    const url = `tel:${phoneNumber}`;
    Linking.openURL(url).catch((err) => console.error("Error:", err));
  };

  function truncateText(text: string, maxLength = 10) {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  }

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-8"
      >
        <View className="relative top-0 h-80 w-full flex flex-col justify-start items-center">
          <Image
            source={images.japan}
            className="size-full absolute top-0 left-0 right-0 bottom-0 object-contain"
          />
          <View className="absolute w-full px-5 py-4 top-3 flex flex-row justify-between bg-white/10">
            <TouchableOpacity onPress={router.back}>
              <Image
                source={icons.backArrow}
                className="size-8"
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View className="flex flex-row gap-5">
              <Image
                source={icons.heart}
                className="size-8"
                resizeMode="contain"
                tintColor="#8C8E98"
              />
              <Image
                source={icons.send}
                className="size-8"
                resizeMode="contain"
                tintColor="#8C8E98"
              />
            </View>
          </View>
        </View>

        <View className="mx-5">
          {/* Modern section */}
          <View className="flex flex-col gap-4 my-6">
            <Text className="text-2xl font-rubik-bold text-black-300">
              Modernica Apartment
            </Text>

            <View className="flex flex-row justify-start items-center gap-2">
              <Text className="uppercase px-2.5 py-1.5 bg-primary-100 text-primary-300 rounded-full text-xs font-rubik-bold">
                Apartment
              </Text>
              <View className="flex flex-row gap-1 justify-center items-center">
                <Image
                  source={icons.star}
                  className="size-5"
                  resizeMode="contain"
                />
                <Text className="font-rubik text-sm text-black-200 mt-1">
                  4.9 (1,275 reviews)
                </Text>
              </View>
            </View>

            <View className="flex flex-row justify-between mt-1">
              <View className="flex flex-row gap-3 justify-center items-center">
                <View className=" bg-primary-200 rounded-full p-3">
                  <Image
                    source={icons.bed}
                    className="size-5 rounded-full"
                    // tintColor="#0061FF0A"
                  />
                </View>
                <Text>8 Beds</Text>
              </View>
              <View className="flex flex-row gap-3 justify-center items-center">
                <View className=" bg-primary-200 rounded-full p-3">
                  <Image
                    source={icons.bath}
                    className="size-5 rounded-full"
                    // tintColor="#0061FF0A"
                  />
                </View>
                <Text>3 bath</Text>
              </View>
              <View className="flex flex-row gap-3 justify-center items-center">
                <View className=" bg-primary-200 rounded-full p-3">
                  <Image
                    source={icons.area}
                    className="size-5 rounded-full"
                    // tintColor="#0061FF0A"
                  />
                </View>
                <Text>2000 sqft</Text>
              </View>
            </View>
          </View>

          {/* Agent */}
          <View className="flex flex-col border-t mt-4 border-primary-200">
            <Text className="text-xl font-rubik-bold mt-7">Agent</Text>
            <View className="flex flex-row gap-4 my-3">
              <Image
                source={images.shamim}
                className="size-16 rounded-full border border-primary-200"
                resizeMode="contain"
              />
              <View className="flex flex-row justify-between items-center flex-1">
                <View className="flex flex-colo items-stretch">
                  <Text className="font-rubik-bold text-lg text-black-300">
                    {owner.name}
                  </Text>
                  <Text className="font-normal text-sm text-black-200">
                    Owner
                  </Text>
                </View>

                {/* chat and call */}
                <View className="flex flex-row gap-5 justify-center items-center">
                  <TouchableOpacity
                    onPress={() =>
                      onChatPress(
                        "+8801622899888",
                        `Hi, you are doing very good job \n\n Call me at ${owner.phone} \n Feel to say hi at ${owner.email}`
                      )
                    }
                  >
                    <Image
                      source={icons.chat}
                      className="size-8 object-contain"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => onCallPress(`${owner.phone}`)}
                  >
                    <Image
                      source={icons.phone}
                      className="size-8 object-contain"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {/* Overview */}
            <Text className="text-xl font-rubik-bold mt-6 mb-2">Overview</Text>
            <Text className="text-base text-black-200">
              Sleek, modern 2-bedroom apartment with open living space, high-end
              finishes, and city views. Minutes from downtown, dining, and
              transit.
            </Text>
          </View>

          {/* Facilities */}
          <View className="flex flex-col gap-3 mt-8">
            <Text className="font-rubik-bold text-xl leading-6 text-black-300">
              Facilities
            </Text>
            <View className="flex flex-row flex-1 justify-start items-center flex-wrap gap-3">
              <View className="flex flex-col gap-3 justify-center items-center">
                <View className="bg-primary-100 p-4 rounded-full">
                  <Image
                    source={icons.carPark}
                    className="size-8 object-contain"
                  />
                </View>
                <Text className=" text-sm text-center text-black-300 font-rubik truncate whitespace-nowrap">
                  {truncateText("Car Parking")}
                </Text>
              </View>
              <View className="flex flex-col gap-3 justify-center items-center">
                <View className="bg-primary-100 p-4 rounded-full">
                  <Image
                    source={icons.swim}
                    className="size-8 object-contain"
                  />
                </View>
                <Text className=" text-sm text-center text-black-300 font-rubik truncate whitespace-nowrap">
                  {truncateText("Swimming Pool")}
                </Text>
              </View>
              <View className="flex flex-col gap-3 justify-center items-center">
                <View className="bg-primary-100 p-4 rounded-full">
                  <Image
                    source={icons.dumbell}
                    className="size-8 object-contain"
                  />
                </View>
                <Text className=" text-sm text-center text-black-300 font-rubik truncate whitespace-nowrap">
                  {truncateText("Gym & Fitness")}
                </Text>
              </View>
              <View className="flex flex-col gap-3 justify-center items-center">
                <View className="bg-primary-100 p-4 rounded-full">
                  <Image
                    source={icons.cutlery}
                    className="size-8 object-contain"
                  />
                </View>
                <Text className=" text-sm text-center text-black-300 font-rubik truncate whitespace-nowrap">
                  {truncateText("Restaurant")}
                </Text>
              </View>
            </View>
          </View>

          {/* Gallery */}
          <View className="flex flex-col gap-4 mt-8 border-t border-primary-100">
            <Text className="font-rubik-bold text-xl leading-6 text-black-300 mt-5">
              Gallery
            </Text>
            <View className="flex flex-row gap-5 flex-nowrap">
              <View className="flex rounded-xl">
                <Image
                  source={images.japan}
                  className="size-32 rounded-xl"
                  resizeMode="cover"
                />
              </View>
              <View className="flex rounded-xl">
                <Image
                  source={images.newYork}
                  className="size-32 rounded-xl"
                  resizeMode="cover"
                />
              </View>
              <View className="flex rounded-xl">
                <Image
                  source={images.japan}
                  className="size-32 rounded-xl"
                  resizeMode="cover"
                />
              </View>
            </View>
          </View>

          {/* Location */}
          <View className="flex flex-col gap-4 mt-8 border-t border-primary-100">
            <Text className="font-rubik-bold text-xl text-black-300 mt-5">
              Location
            </Text>

            <View className="flex flex-row gap-3 items-center">
              <Image source={icons.location} className="size-5 object-cover" />
              <Text className="font-rubik text-sm text-black-200 mt-1">
                Grand City St. 100, New York, United States
              </Text>
            </View>

            <View className="flex flex-col justify-start items-start rounded-xl">
              <Image
                source={images.map}
                className="size-full w-full h-60 rounded-2xl object-contain"
                resizeMode="cover"
              />
            </View>
          </View>

          {/* Reviews */}
          <View className="flex flex-row gap-4 items-center mt-8">
            <Image
              source={icons.star}
              className="size-6"
              resizeMode="contain"
            />
            <View className="flex flex-row flex-1 justify-between items-center">
              <Text className="font-rubik-medium text-2xl text-black-300">
                4.8 (1,278 reviews)
              </Text>
              <TouchableOpacity>
                <Text className="font-rubik-bold text-base text-primary-300">
                  See All
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Bottom Review */}
          <View className="flex flex-col gap-4 mt-10">
            <View className="flex flex-row gap-4 items-center">
              <Image source={images.avatar} className="size-12 rounded-full" />
              <Text className="font-rubik-bold text-base text-black-300">
                Charolette Hanlin
              </Text>
            </View>

            <Text className="font-rubik text-base text-black-200 leading-7">
              The apartment is very clean and modern. I really like the interior
              design. Looks like I'll feel at home 😍
            </Text>

            <View className="flex flex-row justify-between">
              <View className="flex flex-row gap-3 items-center">
                <Image
                  source={icons.heart}
                  className="size-6"
                  tintColor={"#0061FF"}
                />
                <Text className="text-base font-rubik-medium text-black-300">
                  938
                </Text>
              </View>
              <Text className="text-base font-rubik text-black-100">
                6 days ago
              </Text>
            </View>
          </View>

          {/* Bottom Price */}
          <View className="flex flex-row justify-between mt-28 flex-1">
            <View>
              <Text className="uppercase text-sm font-rubik text-black-200 tracking-widest">
                Price
              </Text>
              <Text className="font-rubik-bold text-2xl text-primary-300">
                $17821
              </Text>
            </View>
            <View className="mr-3">
              <Button />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Property;
