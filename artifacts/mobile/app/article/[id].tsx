import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  useColorScheme,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import * as Haptics from "expo-haptics";
import { Colors } from "@/constants/colors";
import { useAppContext, Insight } from "@/context/AppContext";
import { DEMO_ARTICLES } from "@/data/demoArticles";

const TABS = ["Summary", "Insights", "Full Text"] as const;
type Tab = (typeof TABS)[number];

export default function ArticleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colorScheme = useColorScheme();
  const isDark = colorScheme !== "light";
  const theme = isDark ? Colors.dark : Colors.light;
  const insets = useSafeAreaInsets();
  const { articles, saveInsight, savedInsights } = useAppContext();
  const [activeTab, setActiveTab] = useState<Tab>("Summary");
  const [savedInsightIds, setSavedInsightIds] = useState<Set<string>>(new Set());

  const allArticles = [...articles, ...DEMO_ARTICLES];
  const article = allArticles.find((a) => a.id === id);

  const topInset = Platform.OS === "web" ? 67 : insets.top;
  const bottomInset = Platform.OS === "web" ? 34 : insets.bottom;

  if (!article) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.center}>
          <Text style={[styles.notFound, { color: theme.text }]}>Article not found</Text>
        </View>
      </View>
    );
  }

  const handleSaveInsight = (insightText: string, index: number) => {
    const key = `${article.id}-${index}`;
    if (savedInsightIds.has(key)) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const insight: Insight = {
      id: `insight-${Date.now()}-${index}`,
      title: article.title,
      text: insightText,
      source: article.source,
      savedAt: Date.now(),
      articleId: article.id,
    };
    saveInsight(insight);
    setSavedInsightIds((prev) => new Set([...prev, key]));
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingTop: topInset, paddingBottom: bottomInset + 100 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Back Header */}
        <View style={styles.topBar}>
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [
              styles.backBtn,
              {
                backgroundColor: theme.surfaceElevated,
                borderColor: theme.border,
                opacity: pressed ? 0.7 : 1,
              },
            ]}
          >
            <Feather name="arrow-left" size={20} color={theme.text} />
          </Pressable>
          <View style={styles.topActions}>
            <Pressable
              onPress={() => router.push(`/rsvp/${article.id}`)}
              style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
            >
              <LinearGradient
                colors={["#4F8EF7", "#6C3EF7"]}
                style={styles.rsvpBtn}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Feather name="zap" size={14} color="#fff" />
                <Text style={styles.rsvpBtnText}>Speed Read</Text>
              </LinearGradient>
            </Pressable>
          </View>
        </View>

        {/* Article Meta */}
        <View style={styles.meta}>
          <View style={[styles.sourceBadge, { backgroundColor: theme.primary + "20" }]}>
            <Feather name="book-open" size={11} color={theme.primary} />
            <Text style={[styles.sourceText, { color: theme.primary }]}>
              {article.source}
            </Text>
          </View>
          <Text style={[styles.articleTitle, { color: theme.text }]}>
            {article.title}
          </Text>
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Feather name="clock" size={12} color={theme.textTertiary} />
              <Text style={[styles.metaText, { color: theme.textTertiary }]}>
                {article.readingTime} min read
              </Text>
            </View>
            <View style={styles.metaItem}>
              <Feather name="align-left" size={12} color={theme.textTertiary} />
              <Text style={[styles.metaText, { color: theme.textTertiary }]}>
                {article.wordCount.toLocaleString()} words
              </Text>
            </View>
          </View>
        </View>

        {/* One-sentence summary highlight */}
        <View
          style={[
            styles.highlightBox,
            { backgroundColor: theme.primary + "12", borderColor: theme.primary + "30" },
          ]}
        >
          <Ionicons name="sparkles" size={14} color={theme.primary} />
          <Text style={[styles.highlightText, { color: theme.text }]}>
            {article.summaryOneSentence}
          </Text>
        </View>

        {/* Tabs */}
        <View
          style={[
            styles.tabBar,
            { backgroundColor: theme.surfaceElevated, borderColor: theme.border },
          ]}
        >
          {TABS.map((tab) => (
            <Pressable
              key={tab}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setActiveTab(tab);
              }}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
            >
              {activeTab === tab && (
                <LinearGradient
                  colors={["#4F8EF7", "#6C3EF7"]}
                  style={StyleSheet.absoluteFill}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                />
              )}
              <Text
                style={[
                  styles.tabText,
                  {
                    color: activeTab === tab ? "#fff" : theme.textSecondary,
                    fontFamily:
                      activeTab === tab ? "Inter_600SemiBold" : "Inter_400Regular",
                  },
                ]}
              >
                {tab}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Tab Content */}
        {activeTab === "Summary" && (
          <View style={styles.tabContent}>
            <SummarySection
              title="30-Second Summary"
              icon="zap"
              color="#4F8EF7"
              text={article.summary30s}
              theme={theme}
            />
            <SummarySection
              title="2-Minute Deep Dive"
              icon="book-open"
              color="#B06EFF"
              text={article.summary2min}
              theme={theme}
            />
            <View
              style={[
                styles.whyCard,
                { backgroundColor: theme.surfaceElevated, borderColor: theme.border },
              ]}
            >
              <View style={styles.cardHeader}>
                <View style={[styles.iconDot, { backgroundColor: "#FFB347" + "30" }]}>
                  <Feather name="alert-circle" size={14} color="#FFB347" />
                </View>
                <Text style={[styles.cardTitle, { color: theme.text }]}>
                  Why This Matters
                </Text>
              </View>
              <Text style={[styles.cardText, { color: theme.textSecondary }]}>
                {article.whyMatters}
              </Text>
            </View>
          </View>
        )}

        {activeTab === "Insights" && (
          <View style={styles.tabContent}>
            <Text style={[styles.insightsSectionTitle, { color: theme.text }]}>
              5 Key Insights
            </Text>
            <Text style={[styles.insightsSub, { color: theme.textSecondary }]}>
              Tap any insight to save to your vault
            </Text>
            {article.insights.map((insight, i) => {
              const key = `${article.id}-${i}`;
              const isSaved = savedInsightIds.has(key);
              return (
                <Pressable
                  key={i}
                  onPress={() => handleSaveInsight(insight, i)}
                  style={({ pressed }) => [
                    styles.insightRow,
                    {
                      backgroundColor: isSaved
                        ? theme.primary + "15"
                        : theme.surfaceElevated,
                      borderColor: isSaved ? theme.primary : theme.border,
                      opacity: pressed ? 0.7 : 1,
                    },
                  ]}
                >
                  <LinearGradient
                    colors={["#4F8EF7", "#6C3EF7"]}
                    style={styles.insightNum}
                  >
                    <Text style={styles.insightNumText}>{i + 1}</Text>
                  </LinearGradient>
                  <Text style={[styles.insightText, { color: theme.text }]} numberOfLines={4}>
                    {insight}
                  </Text>
                  {isSaved ? (
                    <Feather name="check-circle" size={18} color={theme.primary} />
                  ) : (
                    <Feather name="plus-circle" size={18} color={theme.textTertiary} />
                  )}
                </Pressable>
              );
            })}
          </View>
        )}

        {activeTab === "Full Text" && (
          <View style={styles.tabContent}>
            <Text style={[styles.fullText, { color: theme.textSecondary }]}>
              {article.content}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

function SummarySection({
  title,
  icon,
  color,
  text,
  theme,
}: {
  title: string;
  icon: any;
  color: string;
  text: string;
  theme: typeof Colors.dark;
}) {
  return (
    <View
      style={[
        styles.summaryCard,
        { backgroundColor: theme.surfaceElevated, borderColor: theme.border },
      ]}
    >
      <View style={styles.cardHeader}>
        <View style={[styles.iconDot, { backgroundColor: color + "25" }]}>
          <Feather name={icon} size={14} color={color} />
        </View>
        <Text style={[styles.cardTitle, { color: theme.text }]}>{title}</Text>
      </View>
      <Text style={[styles.cardText, { color: theme.textSecondary }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: 20 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  notFound: { fontSize: 16, fontFamily: "Inter_400Regular" },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  topActions: { flexDirection: "row", gap: 8 },
  rsvpBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  rsvpBtnText: {
    color: "#fff",
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
  },
  meta: { gap: 8, marginBottom: 16 },
  sourceBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: "flex-start",
  },
  sourceText: { fontSize: 11, fontFamily: "Inter_500Medium" },
  articleTitle: {
    fontSize: 22,
    fontFamily: "Inter_700Bold",
    lineHeight: 30,
    letterSpacing: -0.3,
  },
  metaRow: { flexDirection: "row", gap: 16 },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 5 },
  metaText: { fontSize: 12, fontFamily: "Inter_400Regular" },
  highlightBox: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
    alignItems: "flex-start",
  },
  highlightText: {
    fontSize: 14,
    lineHeight: 21,
    fontFamily: "Inter_500Medium",
    flex: 1,
  },
  tabBar: {
    flexDirection: "row",
    borderRadius: 14,
    borderWidth: 1,
    padding: 4,
    marginBottom: 16,
    gap: 2,
  },
  tab: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  activeTab: {},
  tabText: { fontSize: 13 },
  tabContent: { gap: 12 },
  summaryCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    gap: 10,
  },
  whyCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    gap: 10,
    marginBottom: 16,
  },
  cardHeader: { flexDirection: "row", alignItems: "center", gap: 10 },
  iconDot: {
    width: 30,
    height: 30,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: { fontSize: 14, fontFamily: "Inter_600SemiBold" },
  cardText: { fontSize: 14, lineHeight: 22, fontFamily: "Inter_400Regular" },
  insightsSectionTitle: { fontSize: 18, fontFamily: "Inter_700Bold" },
  insightsSub: { fontSize: 13, fontFamily: "Inter_400Regular", marginBottom: 4 },
  insightRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    gap: 12,
  },
  insightNum: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  insightNumText: {
    color: "#fff",
    fontSize: 11,
    fontFamily: "Inter_700Bold",
  },
  insightText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    fontFamily: "Inter_400Regular",
  },
  fullText: {
    fontSize: 15,
    lineHeight: 26,
    fontFamily: "Inter_400Regular",
    marginBottom: 20,
  },
});
