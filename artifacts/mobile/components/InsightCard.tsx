import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  useColorScheme,
  Share,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/colors";
import { Insight } from "@/context/AppContext";
import * as Haptics from "expo-haptics";

type Props = {
  insight: Insight;
  onDelete?: () => void;
};

export function InsightCard({ insight, onDelete }: Props) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme !== "light";
  const theme = isDark ? Colors.dark : Colors.light;

  const handleShare = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    try {
      await Share.share({
        message: `"${insight.text}"\n\n— via SwiftRead AI\nSource: ${insight.source}`,
        title: insight.title,
      });
    } catch {}
  };

  const date = new Date(insight.savedAt);
  const dateStr = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: theme.surfaceElevated, borderColor: theme.border },
      ]}
    >
      <LinearGradient
        colors={["rgba(79,142,247,0.15)", "rgba(108,62,247,0.05)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBar}
      />
      <View style={styles.content}>
        <Text style={[styles.insightText, { color: theme.text }]}>
          {insight.text}
        </Text>
        <View style={styles.footer}>
          <View style={styles.sourceMeta}>
            <Feather name="book-open" size={11} color={theme.textTertiary} />
            <Text style={[styles.source, { color: theme.textTertiary }]} numberOfLines={1}>
              {insight.source}
            </Text>
            <Text style={[styles.dot, { color: theme.textTertiary }]}>•</Text>
            <Text style={[styles.date, { color: theme.textTertiary }]}>{dateStr}</Text>
          </View>
          <View style={styles.actions}>
            <Pressable
              onPress={handleShare}
              style={({ pressed }) => [
                styles.iconBtn,
                { opacity: pressed ? 0.6 : 1 },
              ]}
            >
              <Feather name="share-2" size={14} color={theme.textSecondary} />
            </Pressable>
            {onDelete && (
              <Pressable
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                  onDelete();
                }}
                style={({ pressed }) => [
                  styles.iconBtn,
                  { opacity: pressed ? 0.6 : 1 },
                ]}
              >
                <Feather name="trash-2" size={14} color={theme.error} />
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 10,
    overflow: "hidden",
    flexDirection: "row",
  },
  gradientBar: {
    width: 4,
  },
  content: {
    flex: 1,
    padding: 14,
    gap: 10,
  },
  insightText: {
    fontSize: 14,
    lineHeight: 21,
    fontFamily: "Inter_400Regular",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sourceMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    flex: 1,
  },
  source: {
    fontSize: 11,
    fontFamily: "Inter_400Regular",
    flex: 1,
  },
  dot: {
    fontSize: 11,
  },
  date: {
    fontSize: 11,
    fontFamily: "Inter_400Regular",
  },
  actions: {
    flexDirection: "row",
    gap: 4,
  },
  iconBtn: {
    padding: 6,
  },
});
