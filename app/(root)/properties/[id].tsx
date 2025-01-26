import {
  View,
  Text,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
  Dimensions,
  Platform,
  FlatList,
} from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/components/Button";
import Comment from "@/components/Comment";

import images from "@/constants/images";
import icons from "@/constants/icons";
import { facilities, owner } from "@/constants/data";
import { useAppwrite } from "@/lib/useAppwrite";
import { getPropertyById } from "@/lib/appwrite";

const Property = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();

  const { data: property } = useAppwrite({
    fn: getPropertyById,
    params: {
      id: id!,
    },
  });

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

  const screenHeight = Dimensions.get("window").height;

  return (
    <View className="">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-36 bg-white"
      >
        <View
          className={`relative w-full`}
          style={{ height: screenHeight / 2 }}
        >
          <Image
            source={{ uri: property?.image }}
            className="size-full"
            resizeMode="cover"
          />
          <Image
            source={images.whiteGradient}
            className="absolute top-0 w-full z-40"
          />

          {/*  */}
          <View
            className="z-50 absolute inset-x-7"
            style={{
              top: Platform.OS === "ios" ? 70 : 40,
            }}
          >
            <View className="flex flex-row items-center w-full justify-between">
              <TouchableOpacity
                onPress={() => router.back()}
                className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center"
              >
                <Image source={icons.backArrow} className="size-5" />
              </TouchableOpacity>

              <View className="flex flex-row items-center gap-3">
                <Image
                  source={icons.heart}
                  className="size-7"
                  tintColor={"#191D31"}
                />
                <Image source={icons.send} className="size-7" />
              </View>
            </View>
          </View>
          {/*  */}
        </View>

        <View className="px-5 mt-3 flex gap-3">
          {/* Modern section */}
          <View className="flex flex-col gap-4 my-6">
            <Text className="text-2xl font-rubik-bold text-black-300">
              {property?.name}
            </Text>

            <View className="flex flex-row justify-start items-center gap-2">
              <Text className="uppercase px-2.5 py-1.5 bg-primary-100 text-primary-300 rounded-full text-xs font-rubik-bold">
                {property?.type}
              </Text>
              <View className="flex flex-row gap-1 justify-center items-center">
                <Image
                  source={icons.star}
                  className="size-5"
                  resizeMode="contain"
                />
                <Text className="font-rubik text-sm text-black-200 mt-1">
                  {property?.rating} ({property?.reviews.length} reviews)
                </Text>
              </View>
            </View>

            <View className="flex flex-row justify-between mt-1">
              <View className="flex flex-row gap-3 justify-center items-center">
                <View className=" bg-primary-200 rounded-full p-3 size-10">
                  <Image
                    source={icons.bed}
                    className="size-4 rounded-full"
                    // tintColor="#0061FF0A"
                  />
                </View>
                <Text>{property?.bedrooms} bed</Text>
              </View>
              <View className="flex flex-row gap-3 justify-center items-center">
                <View className=" bg-primary-200 rounded-full p-3 size-10">
                  <Image
                    source={icons.bath}
                    className="size-4 rounded-full"
                    // tintColor="#0061FF0A"
                  />
                </View>
                <Text>{property?.bathrooms} bath</Text>
              </View>
              <View className="flex flex-row gap-3 justify-center items-center">
                <View className=" bg-primary-200 rounded-full p-3 size-10">
                  <Image
                    source={icons.area}
                    className="size-4 rounded-full"
                    // tintColor="#0061FF0A"
                  />
                </View>
                <Text>{property?.area} sqft</Text>
              </View>
            </View>
          </View>

          {/* Agent */}
          <View className="w-full border-t border-primary-200 pt-4 mt-3">
            <Text className="text-xl font-rubik-bold mt-7">Agent</Text>
            <View className="flex flex-row gap-4 my-3">
              <Image
                source={{ uri: property?.agent.avatar }}
                className="size-14 rounded-full border border-primary-200"
                resizeMode="contain"
              />
              <View className="flex flex-row justify-between items-center flex-1">
                <View className="flex flex-colo items-stretch">
                  <Text className="font-rubik-bold text-lg text-black-300">
                    {property?.agent.name}
                  </Text>
                  <Text className="font-normal text-sm text-black-200">
                    {property?.agent.email}
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
            <Text className="text-xl font-rubik-bold mt-8 mb-2">Overview</Text>
            <Text className="text-base text-black-200">
              {property?.description}
            </Text>
          </View>

          {/* Facilities */}
          {property?.facilities?.length !== 0 && (
            <View className="flex flex-col gap-4 mt-8">
              <Text className="font-rubik-bold text-xl leading-6 text-black-300">
                Facilities
              </Text>
              <View className="flex flex-row flex-wrap items-start justify-start mt-2 gap-5">
                {property?.facilities.map((item: string, index: number) => {
                  const facility = facilities.find(
                    (facility) => facility.title === item
                  );
                  return (
                    <View
                      key={index}
                      className="flex flex-1 flex-col gap-1.5 items-center min-w-16 max-w-20"
                    >
                      <View className="bg-primary-100 p-4 rounded-full">
                        <Image source={facility?.icon} className="size-6" />
                      </View>
                      <Text
                        className="text-sm text-center text-black-300 font-rubik"
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {facility?.title}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          )}

          {/* Gallery */}
          {property?.gallery.length > 0 && (
            <View className="flex flex-col gap-4 mt-8 border-t border-primary-100">
              <Text className="font-rubik-bold text-xl leading-6 text-black-300 mt-5">
                Gallery
              </Text>

              <FlatList
                data={property?.gallery}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) => (
                  <Image
                    source={{ uri: item.image }}
                    className="size-40 rounded-xl"
                    resizeMode="cover"
                  />
                )}
                horizontal
                contentContainerClassName="flex gap-4 mt-3"
                contentContainerStyle={{ paddingRight: 20 }}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          )}

          {/* Location */}

          <View className="mt-7">
            <Text className="text-black-300 text-xl font-rubik-bold">
              Location
            </Text>
            <View className="flex flex-row items-center justify-start mt-4 gap-2">
              <Image source={icons.location} className="w-7 h-7" />
              <Text className="text-black-200 text-sm font-rubik-medium">
                {property?.address}
              </Text>
            </View>

            <Image
              source={images.map}
              className="h-52 w-full mt-5 rounded-xl"
            />
          </View>

          {/* Reviews */}
          {property?.reviews.length > 0 && (
            <View>
              <View className="flex flex-row gap-4 items-center mt-8">
                <Image
                  source={icons.star}
                  className="size-6"
                  resizeMode="contain"
                />
                <View className="flex flex-row flex-1 justify-between items-center">
                  <Text className="font-rubik-medium text-2xl text-black-300">
                    {property?.rating} ({property?.reviews.length} reviews)
                  </Text>
                  <TouchableOpacity>
                    <Text className="font-rubik-bold text-base text-primary-300">
                      See All
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Bottom Review */}
              {/* <View className="flex flex-col gap-4 mt-10">
                <View className="flex flex-row gap-4 items-center">
                  <Image
                    source={images.avatar}
                    className="size-12 rounded-full"
                  />
                  <Text className="font-rubik-bold text-base text-black-300">
                    Charolette Hanlin
                  </Text>
                </View>

                <Text className="font-rubik text-base text-black-200 leading-7">
                  The apartment is very clean and modern. I really like the
                  interior design. Looks like I'll feel at home 😍
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
              </View> */}
              <View className="mt-5">
                <Comment item={property?.reviews[0]} />
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Price */}

      <View className="absolute bottom-0 border-t bg-white w-full p-7 rounded-t-2xl border-l border-r border-primary-200">
        <View className="flex flex-row justify-between w-full gap-10">
          <View className="flex flex-col items-start">
            <Text className="uppercase text-sm font-rubik text-black-200 tracking-widest">
              Price
            </Text>
            <Text
              className="font-rubik-bold text-2xl text-primary-300"
              numberOfLines={1}
            >
              ${property?.price}
            </Text>
          </View>
          <TouchableOpacity className="flex mr-10">
            <Button />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Property;
