import React, { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../constants/theme";

const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    if (searchText.trim()) {
      onSearch(searchText.trim());
    }
  };

  return (
    <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-2 my-4 mx-4">
      <TextInput
        className="flex-1 font-lregular text-base"
        placeholder="Search news (e.g. Science)"
        value={searchText}
        onChangeText={setSearchText}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
      />
      <TouchableOpacity onPress={handleSearch} className="ml-2">
        <Ionicons name="search" size={24} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;