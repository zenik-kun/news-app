import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import TabBar from "../components/TabBar";

const SavedNewsScreen = () => {
  return (
    <SafeAreaView 
      className="bg-[#F9F9F9] flex-1" 
      edges={['top', 'right', 'left']}
    >
      <StatusBar style="auto" backgroundColor="#FFFFFF" />
      
      <View className="bg-white pt-4 pb-2 px-4 shadow-sm">
        <Text className="font-lbold text-2xl text-primary text-center">Saved News</Text>
      </View>
      
      <View className="flex-1 items-center justify-center p-4">
        <Text className="font-lmedium text-gray-600 text-lg text-center">
          This feature will be available in a future update!
        </Text>
        <Text className="font-lregular text-gray-500 mt-2 text-center">
          You'll be able to save your favorite articles to read later.
        </Text>
      </View>
      
      {/* Tab Bar */}
      <TabBar />
    </SafeAreaView>
  );
};

export default SavedNewsScreen;