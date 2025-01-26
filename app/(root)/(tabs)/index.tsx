import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import Search from "@/components/Search";
import { Card, FeaturedCard } from "@/components/Cards";
import Filters from "@/components/Filters";
import { useGlobalContext } from "@/lib/global-provider";
import { router, useLocalSearchParams } from "expo-router";
import { useAppwrite } from "@/lib/useAppwrite";
import { getLatestProperties, getProperties } from "@/lib/appwrite";
import { useEffect } from "react";
import NoResults from "@/components/NoResults";

export default function Index() {
  const handlePress = () => {};

  const handleCardPress = (id: string) => router.push(`/properties/${id}`);

  const { user } = useGlobalContext();

  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

  const { data: latestProperties, loading: latestPropertiesLoading } =
    useAppwrite({
      fn: getLatestProperties,
    });

  const {
    data: properties,
    refetch,
    loading,
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 6,
    },
    skip: true,
  });

  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 6,
    });
  }, [params.filter, params.query]);

  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={properties}
        keyExtractor={(item) => `${item.toString() + Math.random().toString()}`}
        renderItem={({ item }) => (
          <Card item={item} onPress={() => handleCardPress(item.id)} />
        )}
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-3 px-5"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          loading ? <ActivityIndicator size="large" /> : <NoResults />
        }
        ListHeaderComponent={
          <View className="px-5">
            {/* Heading part start */}
            <View className="flex flex-row justify-between items-center">
              <View className="flex flex-row items-center">
                <Image
                  source={{ uri: user?.avatar }}
                  className="size-12 rounded-full"
                />
                <View className="flex flex-col items-start justify-center ml-2">
                  <Text className="text-xs font-rubik text-black-100">
                    Good Morning
                  </Text>
                  <Text className="text-base font-rubik-medium text-black-300">
                    {user?.name}
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

              {/* Featured list */}
              {latestPropertiesLoading ? (
                <ActivityIndicator size="large" />
              ) : latestProperties?.length == 0 || !latestProperties ? (
                <NoResults />
              ) : (
                <FlatList
                  data={latestProperties}
                  keyExtractor={(item) =>
                    `${item.toString() + Math.random().toString()}`
                  }
                  renderItem={({ item }) => (
                    <FeaturedCard
                      item={item}
                      onPress={() => handleCardPress(item.id)}
                    />
                  )}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerClassName="flex flex-row gap-4 mt-5"
                  bounces={false}
                />
              )}
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
            </View>
          </View>
        }
      ></FlatList>
    </SafeAreaView>
  );
}
