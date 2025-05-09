import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import Loader from '../components/Loader'; // Assuming you have a Loader component

const ArticleDetailScreen = () => {
  const { url, title } = useLocalSearchParams();
  const router = useRouter();

  if (!url) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white">
        <Text className="font-lmedium text-red-500">Article URL not provided.</Text>
        <TouchableOpacity onPress={() => router.back()} className="mt-4 p-2 bg-primary rounded">
          <Text className="text-white font-lsemibold">Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'right', 'left']}>
      <StatusBar style="auto" backgroundColor="#FFFFFF" />
      <View className="flex-row items-center justify-between bg-white p-3 shadow-sm border-b border-gray-200">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text className="font-lsemibold text-base text-primary flex-1 mx-2" numberOfLines={1} ellipsizeMode="tail">
          {title || 'Article'}
        </Text>
        <View className="w-10" /> 
      </View>
      <WebView
        source={{ uri: decodeURIComponent(url) }}
        startInLoadingState={true}
        renderLoading={() => <Loader />}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn('WebView error: ', nativeEvent);
          // You could show an error message here
        }}
        className="flex-1"
      />
    </SafeAreaView>
  );
};

export default ArticleDetailScreen;