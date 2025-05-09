import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { useRouter } from "expo-router";
import { colors } from "../constants/theme";
import { formatPublishedAt } from "../utils/dateFormatter";
import { useNewsStore } from "../store/useNewsStore"; // Import Zustand store

const NewsCard = ({ article, isSavedScreen = false, onRemoveFromSaved }) => { // Added onRemoveFromSaved prop
  const router = useRouter();

  // Zustand store integration
  const storeSaveArticle = useNewsStore((state) => state.saveArticle);
  const storeRemoveArticle = useNewsStore((state) => state.removeArticle);
  // Correctly select isSaved for the specific article URL
  const isArticleCurrentlySaved = useNewsStore((state) => 
    article && article.url ? state.savedArticles.some(a => a.url === article.url) : false
  );

  const [saved, setSaved] = React.useState(isArticleCurrentlySaved);

  React.useEffect(() => {
    setSaved(isArticleCurrentlySaved);
  }, [isArticleCurrentlySaved]);

  const handleSaveToggle = async () => {
    if (!article || !article.url) return;
    if (saved) {
      storeRemoveArticle(article.url);
      setSaved(false);
      if (isSavedScreen && typeof onRemoveFromSaved === 'function') {
        onRemoveFromSaved(article.url); // Call this to update the list on SavedScreen
      }
    } else {
      storeSaveArticle(article);
      setSaved(true);
    }
  };

  const handlePress = () => {
    if (article && article.url) {
      router.push({
        pathname: "/articleDetail",
        params: { url: encodeURIComponent(article.url), title: article.title || 'Article' },
      });
    }
  };

  if (!article || !article.url) {
    return null;
  }

  return (
    <Animatable.View
      animation="fadeInUp"
      duration={800}
      className="bg-white rounded-xl shadow-sm overflow-hidden mb-4"
    >
      <TouchableOpacity activeOpacity={0.8} onPress={handlePress}>
        {article.urlToImage ? (
          <Image
            source={{ uri: article.urlToImage }}
            className="w-full h-48"
            resizeMode="cover"
          />
        ) : (
          <View className="w-full h-48 bg-gray-200 items-center justify-center">
            <Ionicons name="image-outline" size={50} color={colors.gray} />
          </View>
        )}
        <View className="p-4">
          <Text className="font-lsemibold text-lg text-gray-800 mb-1 leading-tight">
            {article.title}
          </Text>
          {article.source && article.source.name && (
            <Text className="font-lregular text-xs text-primary mb-2">
              {article.source.name}
            </Text>
          )}
          <Text
            className="font-lregular text-sm text-gray-600 mb-2 leading-snug"
            numberOfLines={3}
          >
            {article.description || "No description available."}
          </Text>
          <View className="flex-row justify-between items-center mt-1">
            <Text className="font-llight text-xs text-gray-500">
              {formatPublishedAt(article.publishedAt)}
            </Text>
            <TouchableOpacity onPress={handleSaveToggle} className="p-1">
              <Ionicons
                name={saved ? "bookmark" : "bookmark-outline"}
                size={24}
                color={saved ? colors.primary : colors.gray}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Animatable.View>
  );
};

export default NewsCard;