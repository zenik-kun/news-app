import React, { useCallback } from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as Animatable from "react-native-animatable";
import TabBar from "../components/TabBar";
import NewsCard from "../components/NewsCard";
import { useNewsStore } from "../store/useNewsStore";
import { useFocusEffect } from "expo-router";

const SavedNewsScreen = () => {
  const savedArticles = useNewsStore((state) => state.savedArticles);
  const storeRemoveArticle = useNewsStore((state) => state.removeArticle);

  const [refreshKey, setRefreshKey] = React.useState(0);
  useFocusEffect(
    useCallback(() => {
      setRefreshKey(prev => prev + 1);
    }, [])
  );

  const handleRemoveFromSaved = (articleUrl) => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <SafeAreaView 
      className="bg-[#F9F9F9] flex-1" 
      edges={['top', 'right', 'left']}
    >
      <StatusBar style="auto" backgroundColor="#FFFFFF" />
      
      <View className="bg-white pt-4 pb-2 px-4 shadow-sm">
        <Text className="font-lbold text-2xl text-primary text-center">Saved Articles</Text>
      </View>
      
      {savedArticles.length === 0 ? (
        <View className="flex-1 items-center justify-center p-4">
          <Animatable.View animation="fadeInUp" duration={600}>
            <Text className="font-lmedium text-gray-600 text-lg text-center">
              No articles saved yet.
            </Text>
            <Text className="font-lregular text-gray-500 mt-2 text-center">
              Tap the bookmark icon on an article to save it here.
            </Text>
          </Animatable.View>
        </View>
      ) : (
        <FlatList
          data={savedArticles}
          keyExtractor={(item) => item.url + refreshKey}
          renderItem={({ item }) => (
            <View className="px-4">
              <NewsCard 
                article={item} 
                isSavedScreen={true}
                onRemoveFromSaved={handleRemoveFromSaved}
              />
            </View>
          )}
          contentContainerStyle={{ paddingVertical: 10 }}
          showsVerticalScrollIndicator={false}
        />
      )}
      
      <TabBar />
    </SafeAreaView>
  );
};

export default SavedNewsScreen;