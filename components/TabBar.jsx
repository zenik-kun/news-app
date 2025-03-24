import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../constants/theme";

const TabBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    {
      name: "Home",
      icon: "home",
      route: "/"
    },
    {
      name: "Saved",
      icon: "bookmark",
      route: "/saved"
    },
    {
      name: "About",
      icon: "information-circle",
      route: "/about"
    }
  ];

  return (
    <View className="flex-row justify-around items-center bg-white pt-2 pb-4 border-t border-gray-200">
      {tabs.map((tab) => {
        const isActive = pathname === tab.route;
        return (
          <TouchableOpacity
            key={tab.name}
            className="items-center"
            onPress={() => router.push(tab.route)}
          >
            <Ionicons
              name={isActive ? `${tab.icon}` : `${tab.icon}-outline`}
              size={24}
              color={isActive ? colors.primary : "#777"}
            />
            <Text
              className={`text-xs mt-1 ${
                isActive ? "font-lsemibold text-primary" : "font-lregular text-gray-600"
              }`}
            >
              {tab.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;