import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  useColorScheme,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Colors } from "@/constants/colors";
import { useAppContext, Interest } from "@/context/AppContext";
import { DEMO_ARTICLES } from "@/data/demoArticles";
import { ArticleCard } from "@/components/ArticleCard";
import * as Haptics from "expo-haptics";

const CATEGORIES: (Interest | "All")[] = [
  "All",
  "AI",
  "Startups",
  "Technology",
  "Finance",
  "Science",
  "Productivity",
];

export default function LibraryScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme !== "light";
  const theme = isDark ? Colors.dark : Colors.light;
  const insets = useSafeAreaInsets();
  const { articles, removeArticle } = useAppContext();
  const [filter, setFilter] = useState<Interest | "All">("All");
  const [showReadOnly, setShowReadOnly] = useState(false);
  const topInset = Platform.OS === "web" ? 67 : insets.top;

  const allArticles = [...articles, ...DEMO_ARTICLES];
  const filtered = allArticles.filter((a) => {
    if (filter !== "All" && a.category !== filter) return false;
    if (showReadOnly && !a.isRead) return false;
    return true;
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          styles.content,
          { paddingTop: topInset + 16, paddingBottom: 120 },
        ]}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <>
            <View style={styles.header}>
              <Text style={[styles.title, { color: theme.text }]}>Library</Text>
              <Pressable
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setShowReadOnly(!showReadOnly);
                }}
                style={[
                  styles.filterToggle,
                  {
                    backgroundColor: showReadOnly
                      ? theme.primary + "20"
                      : theme.surfaceElevated,
                    borderColor: showReadOnly ? theme.primary : theme.border,
                  },
                ]}
              >
                <Feather
                  name="check-circle"
                  size={14}
                  color={showReadOnly ? theme.primary : theme.textSecondary}
                />
                <Text
                  style={[
                    styles.filterText,
                    { color: showReadOnly ? theme.primary : theme.textSecondary },
                  ]}
                >
                  Read
                </Text>
              </Pressable>
            </View>

            {/* Category Filter */}
            <View style={styles.categories}>
              {CATEGORIES.map((cat) => (
                <Pressable
                  key={cat}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    setFilter(cat);
                  }}
                  style={[
                    styles.catBtn,
                    {
                      backgroundColor:
                        filter === cat ? theme.primary : theme.surfaceElevated,
                      borderColor: filter === cat ? theme.primary : theme.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.catText,
                      {
                        color: filter === cat ? "#fff" : theme.textSecondary,
                        fontFamily:
                          filter === cat ? "Inter_600SemiBold" : "Inter_400Regular",
                      },
                    ]}
                  >
                    {cat}
                  </Text>
                </Pressable>
              ))}
            </View>

            <Text style={[styles.count, { color: theme.textSecondary }]}>
              {filtered.length} article{filtered.length !== 1 ? "s" : ""}
            </Text>
          </>
        )}
        renderItem={({ item }) => (
          <ArticleCard
            article={item}
            onPress={() => router.push(`/article/${item.id}`)}
          />
        )}
        ListEmptyComponent={() => (
          <View style={styles.empty}>
            <Feather name="book-open" size={32} color={theme.textTertiary} />
            <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
              No articles in this category
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: { fontSize: 28, fontFamily: "Inter_700Bold", letterSpacing: -0.5 },
  filterToggle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  filterText: { fontSize: 13, fontFamily: "Inter_500Medium" },
  categories: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  catBtn: {
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  catText: { fontSize: 13 },
  count: { fontSize: 13, fontFamily: "Inter_400Regular", marginBottom: 12 },
  empty: {
    alignItems: "center",
    paddingTop: 60,
    gap: 12,
  },
  emptyText: {
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
  },
});
