import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";

import { categories } from "@/constants/data";
import { router, useLocalSearchParams } from "expo-router";

const Filters = () => {
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
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mt-3 mb-2"
    >
      {categories.map((category, index) => (
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
      ))}
    </ScrollView>
  );
};

export default Filters;
