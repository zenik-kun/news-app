import React from "react";
import { View, Text, FlatList, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as Animatable from "react-native-animatable";

import NewsCard from "../components/NewsCard";
import SearchBar from "../components/SearchBar";
import CategoryPill from "../components/CategoryPill";
import Loader from "../components/Loader";
import TabBar from "../components/TabBar";
import { categories } from "../constants/theme";
import { useNews } from "../hooks/useNews";

const Page = () => {
  const { 
    articles, 
    loading, 
    error, 
    selectedCategory,
    searchNews,
    selectCategory
  } = useNews();

  return (
    <SafeAreaView 
      className="bg-[#F9F9F9] flex-1" 
      edges={['top', 'right', 'left']}
    >
      <StatusBar style="auto" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <Animatable.View 
        animation="fadeIn" 
        duration={1000} 
        className="bg-white pb-2 px-4 shadow-sm"
      >
        <Text className="font-lbold text-2xl text-primary text-center">News App</Text>
      </Animatable.View>
      
      {/* Search Bar */}
      <SearchBar onSearch={searchNews} />
      
      {/* Categories */}
      <View className="mx-4 mb-2">
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          className="pt-2"
        >
          {categories.map((category, index) => (
            <CategoryPill
              key={index}
              category={category}
              isActive={selectedCategory === category.toLowerCase()}
              onPress={selectCategory}
            />
          ))}
        </ScrollView>
      </View>

      {/* News Content */}
      <View className="flex-1 px-4">
        {loading ? (
          <Loader />
        ) : error ? (
          <View className="flex-1 justify-center items-center">
            <Text className="font-lmedium text-red-500">{error}</Text>
          </View>
        ) : (
          <FlatList
            data={articles}
            keyExtractor={(item, index) => `news-${index}`}
            renderItem={({ item }) => (
              <Animatable.View animation="fadeInUp" delay={100}>
                <NewsCard article={item} />
              </Animatable.View>
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 10 }}
            ListEmptyComponent={
              <View className="flex-1 justify-center items-center py-20">
                <Text className="font-lmedium text-gray-500">No articles found</Text>
              </View>
            }
          />
        )}
      </View>

      {/* Tab Bar */}
      <TabBar />
    </SafeAreaView>
  );
};

export default Page;
