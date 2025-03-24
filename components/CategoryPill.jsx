import React from "react";
import { TouchableOpacity, Text } from "react-native";

const CategoryPill = ({ category, isActive, onPress }) => {
  return (
    <TouchableOpacity
      className={`px-4 py-2 rounded-full mr-2 ${isActive ? 'bg-primary' : 'bg-gray-200'}`}
      onPress={() => onPress(category.toLowerCase())}
    >
      <Text className={`font-lmedium ${isActive ? 'text-white' : 'text-gray-700'}`}>
        {category}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryPill;