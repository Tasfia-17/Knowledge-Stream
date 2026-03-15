import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { useColorScheme } from "react-native";
import { Colors } from "@/constants/colors";

type Props = {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  intensity?: "light" | "medium" | "heavy";
  noPadding?: boolean;
};

export function GlassCard({ children, style, intensity = "medium", noPadding }: Props) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme !== "light";
  const theme = isDark ? Colors.dark : Colors.light;

  const bgColor =
    intensity === "light"
      ? theme.glass
      : intensity === "heavy"
        ? theme.glassHeavy
        : theme.glassHeavy;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: bgColor,
          borderColor: theme.border,
        },
        !noPadding && styles.padding,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    borderWidth: 1,
    overflow: "hidden",
  },
  padding: {
    padding: 16,
  },
});
