import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  useColorScheme,
  Animated,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import { Colors } from "@/constants/colors";
import { useAppContext } from "@/context/AppContext";
import { DEMO_ARTICLES } from "@/data/demoArticles";
import { ArticleCard } from "@/components/ArticleCard";
import { AnimatedBackground } from "@/components/AnimatedBackground";

const STATS_ITEMS = [
  { label: "Words Today", icon: "book-open" as const, color: "#4F8EF7" },
  { label: "Streak", icon: "zap" as const, color: "#FFB347" },
  { label: "Insights", icon: "star" as const, color: "#B06EFF" },
  { label: "Saved", icon: "clock" as const, color: "#00E5FF" },
];

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme !== "light";
  const theme = isDark ? Colors.dark : Colors.light;
  const insets = useSafeAreaInsets();
  const { articles, addArticle, stats, onboarded, setOnboarded } = useAppContext();
  const [pasteText, setPasteText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    if (!onboarded) {
      const timer = setTimeout(() => {
        router.push("/onboarding");
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [onboarded]);

  const startPulse = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.05, duration: 600, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      ])
    ).start();
  };

  const handleProcess = async () => {
    if (!pasteText.trim()) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsProcessing(true);
    startPulse();

    await new Promise((r) => setTimeout(r, 1800));

    const words = pasteText.trim().split(/\s+/);
    const wordCount = words.length;

    const demoBase = DEMO_ARTICLES[0];
    const newArticle = {
      ...demoBase,
      id: `custom-${Date.now()}`,
      title: words.slice(0, 8).join(" ") + (words.length > 8 ? "..." : ""),
      content: pasteText,
      wordCount,
      readingTime: Math.max(1, Math.round(wordCount / 200)),
      addedAt: Date.now(),
      isRead: false,
      source: "Pasted Content",
      category: "Technology" as const,
    };

    addArticle(newArticle);
    setIsProcessing(false);
    pulseAnim.setValue(1);
    setPasteText("");
    router.push(`/article/${newArticle.id}`);
  };

  const displayArticles = [...articles, ...DEMO_ARTICLES].slice(0, 8);
  const topInset = Platform.OS === "web" ? 67 : insets.top;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <AnimatedBackground />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          { paddingTop: topInset + 16, paddingBottom: 120 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={{ opacity: fadeAnim }}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={[styles.greeting, { color: theme.textSecondary }]}>
                Good {getGreeting()}
              </Text>
              <Text style={[styles.appName, { color: theme.text }]}>
                SwiftRead{" "}
                <Text style={{ color: theme.primary }}>AI</Text>
              </Text>
            </View>
            <Pressable
              onPress={() => router.push("/(tabs)/profile")}
              style={[styles.avatarBtn, { backgroundColor: theme.surfaceElevated, borderColor: theme.border }]}
            >
              <Feather name="user" size={20} color={theme.textSecondary} />
            </Pressable>
          </View>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <StatCard
              label="Words"
              value={stats.totalWordsRead > 0 ? formatNumber(stats.totalWordsRead) : "—"}
              icon="book-open"
              color="#4F8EF7"
              theme={theme}
            />
            <StatCard
              label="Streak"
              value={stats.currentStreak > 0 ? `${stats.currentStreak}d` : "—"}
              icon="zap"
              color="#FFB347"
              theme={theme}
            />
            <StatCard
              label="Insights"
              value={stats.insightsSaved > 0 ? `${stats.insightsSaved}` : "—"}
              icon="star"
              color="#B06EFF"
              theme={theme}
            />
            <StatCard
              label="Min Saved"
              value={stats.totalTimeMinutes > 0
                ? `${Math.round(stats.totalTimeMinutes * 3)}m`
                : "—"
              }
              icon="clock"
              color="#00E5FF"
              theme={theme}
            />
          </View>

          {/* Paste / Add Content */}
          <View
            style={[
              styles.pasteCard,
              { backgroundColor: theme.surfaceElevated, borderColor: theme.border },
            ]}
          >
            <LinearGradient
              colors={["rgba(79,142,247,0.08)", "rgba(108,62,247,0.04)"]}
              style={StyleSheet.absoluteFill}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
            <View style={styles.pasteHeader}>
              <Feather name="link" size={16} color={theme.primary} />
              <Text style={[styles.pasteTitle, { color: theme.text }]}>
                Add Content
              </Text>
            </View>
            <TextInput
              style={[
                styles.pasteInput,
                {
                  color: theme.text,
                  backgroundColor: theme.glass,
                  borderColor: theme.border,
                },
              ]}
              placeholder="Paste article, URL, or text..."
              placeholderTextColor={theme.textTertiary}
              value={pasteText}
              onChangeText={setPasteText}
              multiline
              numberOfLines={3}
              maxLength={50000}
            />
            <Pressable
              onPress={handleProcess}
              disabled={!pasteText.trim() || isProcessing}
              style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
            >
              <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                <LinearGradient
                  colors={["#4F8EF7", "#6C3EF7"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[
                    styles.processBtn,
                    { opacity: !pasteText.trim() ? 0.4 : 1 },
                  ]}
                >
                  {isProcessing ? (
                    <>
                      <Ionicons name="sparkles" size={16} color="#fff" />
                      <Text style={styles.processBtnText}>AI Processing...</Text>
                    </>
                  ) : (
                    <>
                      <Feather name="zap" size={16} color="#fff" />
                      <Text style={styles.processBtnText}>Transform with AI</Text>
                    </>
                  )}
                </LinearGradient>
              </Animated.View>
            </Pressable>
          </View>

          {/* Daily Briefing Banner */}
          <Pressable
            onPress={() => router.push(`/article/demo-1`)}
            style={({ pressed }) => [styles.briefingBtn, { opacity: pressed ? 0.85 : 1 }]}
          >
            <LinearGradient
              colors={["#4F8EF7", "#6C3EF7", "#B06EFF"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.briefingGradient}
            >
              <View style={styles.briefingContent}>
                <View>
                  <Text style={styles.briefingLabel}>Daily Knowledge Briefing</Text>
                  <Text style={styles.briefingTitle}>5 Stories · 3 min read</Text>
                </View>
                <View style={styles.briefingIcon}>
                  <Ionicons name="sparkles" size={24} color="rgba(255,255,255,0.9)" />
                </View>
              </View>
            </LinearGradient>
          </Pressable>

          {/* Trending Articles */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                Trending
              </Text>
              <Pressable onPress={() => router.push("/(tabs)/library")}>
                <Text style={[styles.seeAll, { color: theme.primary }]}>See all</Text>
              </Pressable>
            </View>
            {displayArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onPress={() => router.push(`/article/${article.id}`)}
              />
            ))}
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

function StatCard({
  label,
  value,
  icon,
  color,
  theme,
}: {
  label: string;
  value: string;
  icon: any;
  color: string;
  theme: typeof Colors.dark;
}) {
  return (
    <View
      style={[
        styles.statCard,
        { backgroundColor: theme.surfaceElevated, borderColor: theme.border },
      ]}
    >
      <Feather name={icon} size={14} color={color} />
      <Text style={[styles.statValue, { color: theme.text }]}>{value}</Text>
      <Text style={[styles.statLabel, { color: theme.textTertiary }]}>{label}</Text>
    </View>
  );
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "morning";
  if (h < 18) return "afternoon";
  return "evening";
}

function formatNumber(n: number) {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return `${n}`;
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 20,
  },
  greeting: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    marginBottom: 2,
  },
  appName: {
    fontSize: 28,
    fontFamily: "Inter_700Bold",
    letterSpacing: -0.5,
  },
  avatarBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    padding: 10,
    alignItems: "center",
    gap: 4,
  },
  statValue: {
    fontSize: 16,
    fontFamily: "Inter_700Bold",
    letterSpacing: -0.3,
  },
  statLabel: {
    fontSize: 9,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    letterSpacing: 0.3,
    textTransform: "uppercase",
  },
  pasteCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    gap: 12,
    marginBottom: 16,
    overflow: "hidden",
  },
  pasteHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  pasteTitle: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
  },
  pasteInput: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    minHeight: 80,
    textAlignVertical: "top",
  },
  processBtn: {
    borderRadius: 12,
    paddingVertical: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  processBtnText: {
    color: "#fff",
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
  },
  briefingBtn: {
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 24,
  },
  briefingGradient: {
    padding: 20,
  },
  briefingContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  briefingLabel: {
    fontSize: 11,
    fontFamily: "Inter_500Medium",
    color: "rgba(255,255,255,0.8)",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 4,
  },
  briefingTitle: {
    fontSize: 18,
    fontFamily: "Inter_700Bold",
    color: "#fff",
  },
  briefingIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  section: { gap: 0 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
  },
  seeAll: {
    fontSize: 14,
    fontFamily: "Inter_500Medium",
  },
});
