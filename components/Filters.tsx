import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";

import { categories } from "@/constants/data";
import { router, useLocalSearchParams } from "expo-router";

interface Props {
  flexWrap?: boolean;
  lastIndex?: number;
}

const Filters = ({ flexWrap, lastIndex }: Props) => {
  const params = useLocalSearchParams<{ filter?: string }>();
  const [selectedCategory, setSelectedCategory] = React.useState(
    params.filter || "All"
  );

  const handleCategoryPress = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory("All");
      router.setParams({ filter: "All" });
      return;
    }

    setSelectedCategory(category);
    router.setParams({ filter: category });
  };

  // Make the options conditioned
  const content = (lastIndex?: number) => {
    const cat = lastIndex ? categories.slice(0, lastIndex + 1) : categories;
    return cat.map((category, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => handleCategoryPress(category.title)}
        className={`flex flex-row gap-3 justify-start mr-4 px-4 py-2 rounded-full ${
          category.title === selectedCategory
            ? "bg-primary-300"
            : "bg-primary-100 border border-primary-200"
        }`}
      >
        <Text
          className={`text-sm ${
            selectedCategory === category.title
              ? "text-white font-rubik-bold mt-0.5"
              : "text-black-300 font-rubik"
          }`}
        >
          {category.title}
        </Text>
      </TouchableOpacity>
    ));
  };

  return flexWrap ? (
    <View className="mt-3 mb-2 flex flex-row flex-wrap gap-1.5">
      {content(lastIndex)}
    </View>
  ) : (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mt-3 mb-2"
    >
      {content(lastIndex)}
    </ScrollView>
  );
};

export default Filters;
