import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { router, useLocalSearchParams, usePathname } from "expo-router";
import { useDebouncedCallback } from "use-debounce";

import icons from "@/constants/icons";

const Search = () => {
  const path = usePathname();
  const params = useLocalSearchParams<{ query?: string }>();
  const [search, setSearch] = useState();

  const debouncedSearch = useDebouncedCallback((text: string) => {
    router.setParams({ query: text });
  }, 700);

  //   console.log(`----------------------- ${path} q=${params.query}`);
  const handleSearch = (text: string) => {
    setSearch((prev) => {
      query: text;
    });
    debouncedSearch(text);
  };

  return (
    <View className="flex flex-row justify-between items-center w-full px-4 rounded-lg bg-accent-100 border border-primary-100 mt-5 py-2">
      <View className="flex-1 flex flex-row items-center justify-center z-50">
        <Image source={icons.search} className="size-5" />

        <TextInput
          placeholder="Search for something"
          value={search}
          onChangeText={handleSearch}
          className="text-sm font-rubik text-black-300 ml-2 flex-1 mt-2"
        />
      </View>
      <TouchableOpacity>
        <Image source={icons.filter} className="size-5" />
      </TouchableOpacity>
    </View>
  );
};

export default Search;
