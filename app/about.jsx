import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as Animatable from "react-native-animatable";
import TabBar from "../components/TabBar";

const AboutScreen = () => {
  return (
    <SafeAreaView 
      className="bg-[#F9F9F9] flex-1" 
      edges={['top', 'right', 'left']}
    >
      <StatusBar style="auto" backgroundColor="#FFFFFF" />
      
      <View className="bg-white pt-4 pb-2 px-4 shadow-sm">
        <Text className="font-lbold text-2xl text-primary text-center">About Us</Text>
      </View>
      
      <ScrollView className="flex-1 p-4">
        <Animatable.View animation="fadeIn" duration={1000} className="bg-white rounded-xl shadow-sm p-5 mb-4">
          <Text className="font-lsemibold text-lg mb-2">Our Mission</Text>
          <Text className="font-lregular text-gray-700 mb-4">
            A comprehensive news platform bringing you the latest updates from around the world.
            We strive to provide unbiased, timely, and relevant news to keep you informed.
          </Text>
        </Animatable.View>
        
        <Animatable.View animation="fadeIn" delay={300} duration={1000} className="bg-white rounded-xl shadow-sm p-5 mb-4">
          <Text className="font-lsemibold text-lg mb-2">Connect With Us</Text>
          <View className="flex-row justify-around mt-2">
            <TouchableOpacity 
              className="items-center" 
              onPress={() => Linking.openURL('https://www.facebook.com')}
            >
              <View className="bg-blue-600 w-12 h-12 rounded-full items-center justify-center mb-1">
                <Text className="text-white font-lbold">f</Text>
              </View>
              <Text className="font-lregular text-xs">Facebook</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="items-center" 
              onPress={() => Linking.openURL('https://www.instagram.com')}
            >
              <View className="bg-pink-600 w-12 h-12 rounded-full items-center justify-center mb-1">
                <Text className="text-white font-lbold">Ig</Text>
              </View>
              <Text className="font-lregular text-xs">Instagram</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="items-center" 
              onPress={() => Linking.openURL('https://www.linkedin.com')}
            >
              <View className="bg-blue-800 w-12 h-12 rounded-full items-center justify-center mb-1">
                <Text className="text-white font-lbold">in</Text>
              </View>
              <Text className="font-lregular text-xs">LinkedIn</Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
        
        <Animatable.View animation="fadeIn" delay={600} duration={1000} className="bg-white rounded-xl shadow-sm p-5 mb-20">
          <Text className="font-lsemibold text-lg mb-2">Share Your Ideas</Text>
          <Text className="font-lregular text-gray-700 mb-2">
            We value your feedback and suggestions! Let us know how we can improve.
          </Text>
          <Text className="font-lregular text-gray-500 text-xs mt-4">
            &copy; 2024 News App. All Rights Reserved.
          </Text>
        </Animatable.View>
      </ScrollView>
      
      {/* Tab Bar */}
      <TabBar />
    </SafeAreaView>
  );
};

export default AboutScreen;