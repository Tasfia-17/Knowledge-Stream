import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  useColorScheme,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/colors";
import { Article } from "@/context/AppContext";
import * as Haptics from "expo-haptics";

const CATEGORY_COLORS: Record<string, [string, string]> = {
  AI: ["#4F8EF7", "#6C3EF7"],
  Startups: ["#FF6B6B", "#FF8E53"],
  Technology: ["#00E5FF", "#4F8EF7"],
  Finance: ["#00D68F", "#00B377"],
  Science: ["#B06EFF", "#6C3EF7"],
  Geopolitics: ["#FF8E53", "#FF6B6B"],
  Productivity: ["#FFB347", "#FF8E53"],
  Business: ["#4F8EF7", "#00D68F"],
};

type Props = {
  article: Article;
  onPress: () => void;
  onSaveInsight?: () => void;
  compact?: boolean;
};

export function ArticleCard({ article, onPress, compact }: Props) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme !== "light";
  const theme = isDark ? Colors.dark : Colors.light;
  const catColors = CATEGORY_COLORS[article.category] ?? ["#4F8EF7", "#6C3EF7"];

  const normalReadTime = Math.round((article.wordCount / 200) * 10) / 10;
  const savedMinutes = Math.round(normalReadTime - article.readingTime);

  return (
    <Pressable
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress();
      }}
      style={({ pressed }) => [
        styles.container,
        { opacity: pressed ? 0.85 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] },
      ]}
    >
      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.surfaceElevated,
            borderColor: theme.border,
          },
        ]}
      >
        <View style={styles.header}>
          <LinearGradient
            colors={catColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.categoryBadge}
          >
            <Text style={styles.categoryText}>{article.category}</Text>
          </LinearGradient>
          {article.isRead && (
            <View style={[styles.readBadge, { backgroundColor: theme.success + "20" }]}>
              <Ionicons name="checkmark-circle" size={12} color={theme.success} />
              <Text style={[styles.readText, { color: theme.success }]}>Read</Text>
            </View>
          )}
        </View>

        <Text
          style={[styles.title, { color: theme.text }]}
          numberOfLines={compact ? 2 : 3}
        >
          {article.title}
        </Text>

        {!compact && (
          <Text
            style={[styles.summary, { color: theme.textSecondary }]}
            numberOfLines={2}
          >
            {article.summaryOneSentence}
          </Text>
        )}

        <View style={styles.footer}>
          <View style={styles.meta}>
            <Feather name="book-open" size={12} color={theme.textTertiary} />
            <Text style={[styles.metaText, { color: theme.textTertiary }]}>
              {article.source}
            </Text>
          </View>
          <View style={styles.meta}>
            <Feather name="clock" size={12} color={theme.textTertiary} />
            <Text style={[styles.metaText, { color: theme.textTertiary }]}>
              {article.readingTime} min
            </Text>
          </View>
          {savedMinutes > 0 && (
            <View style={[styles.savedBadge, { backgroundColor: theme.primary + "20" }]}>
              <Feather name="zap" size={10} color={theme.primary} />
              <Text style={[styles.savedText, { color: theme.primary }]}>
                Save {savedMinutes}m
              </Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  card: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    gap: 10,
  },
  header: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  categoryBadge: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: "700" as const,
    color: "#fff",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    fontFamily: "Inter_700Bold",
  },
  readBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  readText: {
    fontSize: 10,
    fontWeight: "600" as const,
    fontFamily: "Inter_600SemiBold",
  },
  title: {
    fontSize: 16,
    fontWeight: "700" as const,
    lineHeight: 22,
    fontFamily: "Inter_700Bold",
  },
  summary: {
    fontSize: 13,
    lineHeight: 19,
    fontFamily: "Inter_400Regular",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flexWrap: "wrap",
  },
  meta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    fontSize: 11,
    fontFamily: "Inter_400Regular",
  },
  savedBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: "auto",
  },
  savedText: {
    fontSize: 10,
    fontWeight: "600" as const,
    fontFamily: "Inter_600SemiBold",
  },
});
