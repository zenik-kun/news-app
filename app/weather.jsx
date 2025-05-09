import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as Animatable from "react-native-animatable";
import { Ionicons } from "@expo/vector-icons";

import TabBar from "../components/TabBar";
import Loader from "../components/Loader";
import { useWeather } from "../hooks/useWeather";
import { colors } from "../constants/theme";

const WeatherScreen = () => {
  const [location, setLocation] = useState("");
  const { weatherData, loading, error, getWeather } = useWeather();

  const handleSearch = () => {
    if (location.trim()) {
      getWeather(location.trim());
    }
  };

  return (
    <SafeAreaView
      className="bg-[#F9F9F9] flex-1"
      edges={['top', 'right', 'left']}
    >
      <StatusBar style="auto" backgroundColor="#FFFFFF" />

      <View className="bg-white pt-4 pb-2 px-4 shadow-sm">
        <Text className="font-lbold text-2xl text-primary text-center">Weather Forecast</Text>
      </View>

      <ScrollView className="flex-1 p-4">
        <Animatable.View animation="fadeIn" duration={1000} className="bg-white rounded-xl shadow-sm p-5 mb-4">
          <Text className="font-lsemibold text-lg mb-3 text-center">Check Current Weather</Text>
          <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-2 my-2">
            <TextInput
              className="flex-1 font-lregular text-base"
              placeholder="Enter city name (e.g. London)"
              value={location}
              onChangeText={setLocation}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
            />
            <TouchableOpacity onPress={handleSearch} className="ml-2">
              <Ionicons name="search" size={24} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </Animatable.View>

        {loading && <Loader />}

        {error && !loading && (
          <Animatable.View animation="fadeIn" duration={500} className="bg-red-100 p-4 rounded-lg items-center my-4">
            <Text className="font-lmedium text-red-600 text-center">{error}</Text>
          </Animatable.View>
        )}

        {weatherData && !loading && !error && (
          <Animatable.View animation="fadeInUp" duration={800} className="bg-white rounded-xl shadow-sm p-5 my-4 items-center">
            <Text className="font-lbold text-xl text-primary mb-1">
              {weatherData.location?.name}, {weatherData.location?.country}
            </Text>
            <Text className="font-lregular text-sm text-gray-500 mb-3">
              {weatherData.location?.localtime}
            </Text>
            
            <View className="flex-row items-center mb-3">
              {weatherData.current?.condition?.icon && (
                <Image 
                  source={{ uri: `https:${weatherData.current.condition.icon}` }} 
                  className="w-16 h-16 mr-2"
                />
              )}
              <Text className="font-lbold text-5xl">{weatherData.current?.temp_c}°C</Text>
            </View>
            
            <Text className="font-lmedium text-lg mb-3">{weatherData.current?.condition?.text}</Text>

            <View className="w-full border-t border-gray-200 pt-3 mt-3">
              <View className="flex-row justify-between mb-1">
                <Text className="font-lregular text-gray-700">Feels like:</Text>
                <Text className="font-lmedium">{weatherData.current?.feelslike_c}°C</Text>
              </View>
              <View className="flex-row justify-between mb-1">
                <Text className="font-lregular text-gray-700">Humidity:</Text>
                <Text className="font-lmedium">{weatherData.current?.humidity}%</Text>
              </View>
              <View className="flex-row justify-between mb-1">
                <Text className="font-lregular text-gray-700">Wind:</Text>
                <Text className="font-lmedium">{weatherData.current?.wind_kph} kph</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="font-lregular text-gray-700">UV Index:</Text>
                <Text className="font-lmedium">{weatherData.current?.uv}</Text>
              </View>
            </View>
          </Animatable.View>
        )}
         <View className="h-20" /> 
      </ScrollView>
      
      <TabBar />
    </SafeAreaView>
  );
};

export default WeatherScreen;