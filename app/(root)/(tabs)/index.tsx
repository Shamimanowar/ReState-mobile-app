import { Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import icons from "@/constants/icons";
import Search from "@/components/Search";
import { Card, FeaturedCard } from "@/components/Cards";
import Filters from "@/components/Filters";

export default function Index() {
  const handlePress = () => {};

  return (
    <SafeAreaView className="bg-white h-full">
      <View className="px-5">
        {/* Heading part start */}
        <View className="flex flex-row justify-between items-center">
          <View className="flex flex-row items-center">
            <Image source={images.avatar} className="size-12 rounded-full" />
            <View className="flex flex-col items-start justify-center ml-2">
              <Text className="text-xs font-rubik text-black-100">
                Good Morning
              </Text>
              <Text className="text-base font-rubik-medium text-black-300">
                Shamim Anowar
              </Text>
            </View>
          </View>
          <Image source={icons.bell} className="size-7" />
        </View>
        {/* Heading close */}

        {/* Search bar start */}
        <Search />

        {/* Featured section */}
        <View className="my-5">
          <View className="flex flex-row justify-between items-center">
            <Text className="text-xl font-rubik-bold text-black-300">
              Featured
            </Text>
            <TouchableOpacity onPress={handlePress}>
              <Text className="font-rubik-bold text-primary-300 text-base">
                See All
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex flex-row gap-3">
          <FeaturedCard />
          <FeaturedCard />
          <FeaturedCard />
        </View>

        {/* Recommendation */}

        <View>
          <View className="flex flex-row justify-between items-center mt-5">
            <Text className="text-xl font-rubik-bold text-black-300">
              Our Recommendation
            </Text>
            <TouchableOpacity onPress={handlePress}>
              <Text className="font-rubik-bold text-primary-300 text-base">
                See All
              </Text>
            </TouchableOpacity>
          </View>

          <Filters />

          <View className="flex flex-row gap-5 mt-5">
            <Card />
            <Card />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
