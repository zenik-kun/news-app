import React from "react";
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";

const NewsCard = ({ article }) => {
  const openArticle = () => {
    if (article.url) {
      Linking.openURL(article.url);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      day: "2-digit", 
      month: "2-digit", 
      year: "numeric" 
    });
  };

  return (
    <TouchableOpacity 
      className="bg-white rounded-xl overflow-hidden shadow-md my-2 mx-1 w-full"
      onPress={openArticle}
      activeOpacity={0.8}
    >
      {article.urlToImage ? (
        <Image 
          source={{ uri: article.urlToImage }} 
          className="w-full h-48" 
          resizeMode="cover"
        />
      ) : (
        <View className="w-full h-48 bg-gray-200 items-center justify-center">
          <Text className="font-lmedium text-gray-400">No Image</Text>
        </View>
      )}
      
      <View className="p-4">
        <Text className="font-lsemibold text-lg mb-2">{article.title ? 
          (article.title.length > 60 ? `${article.title.substring(0, 60)}...` : article.title) : 
          "No Title"}
        </Text>
        
        <Text className="font-lregular text-xs text-gray-500 mb-2">
          {article.source?.name || "Unknown"} · {formatDate(article.publishedAt)}
        </Text>
        
        <Text className="font-lregular text-sm text-gray-700">
          {article.description ? 
            (article.description.length > 120 ? `${article.description.substring(0, 120)}...` : article.description) : 
            "No description available"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default NewsCard;