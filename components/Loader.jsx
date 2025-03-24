import React from "react";
import { View, ActivityIndicator } from "react-native";
import { colors } from "../constants/theme";

const Loader = () => {
  return (
    <View className="absolute inset-0 bg-black/30 items-center justify-center z-10">
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};

export default Loader;