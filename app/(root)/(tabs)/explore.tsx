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
import { Card, ExploreCard } from "@/components/Cards";
import Filters from "@/components/Filters";

import { router, useLocalSearchParams } from "expo-router";
import { useAppwrite } from "@/lib/useAppwrite";
import { getProperties } from "@/lib/appwrite";
import { useEffect } from "react";
import NoResults from "@/components/NoResults";
import FilterHeader from "@/components/FilterHeader";

export default function Index() {
  const handlePress = () => {};

  const handleCardPress = (id: string) => router.push(`/properties/${id}`);

  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

  const {
    data: properties,
    refetch,
    loading,
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 20,
    },
    skip: true,
  });

  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 20,
    });
  }, [params.filter, params.query]);

  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={properties}
        keyExtractor={(item) => `${item.toString() + Math.random().toString()}`}
        renderItem={({ item }) => (
          <View className="px-5">
            <ExploreCard
              item={item}
              onPress={() => handleCardPress(item.$id)}
            />
          </View>
          // <Card item={item} onPress={() => handleCardPress(item.id)} />
        )}
        numColumns={1}
        // columnWrapperClassName="flex gap-3 px-5"
        contentContainerClassName="pb-32"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          loading ? <ActivityIndicator size="large" /> : <NoResults />
        }
        ListHeaderComponent={
          <View className="px-5">
            <FilterHeader
              leftIcon={icons.backArrow}
              rightIcon={icons.bell}
              label="Search for Your Ideal Home"
            />
            <Search />
            <Filters />
            <Text className="text-lg font-rubik-bold mt-5 mb-3">
              Found {properties?.length} Apartments
            </Text>
          </View>
        }
      ></FlatList>
    </SafeAreaView>
  );
}
