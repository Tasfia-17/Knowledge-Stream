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
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import { Colors } from "@/constants/colors";
import { useAppContext } from "@/context/AppContext";
import { DEMO_ARTICLES } from "@/data/demoArticles";
import { ArticleCard } from "@/components/ArticleCard";

const SPEEDS = [200, 300, 400, 500, 600, 700, 800];
const MODES = [
  { id: "focus", label: "Focus", icon: "target" as const, desc: "Single word, minimal UI" },
  { id: "chunk", label: "Chunk", icon: "layers" as const, desc: "Phrase groups" },
  { id: "study", label: "Study", icon: "book-open" as const, desc: "Slow with explanations" },
];

export default function ReaderScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme !== "light";
  const theme = isDark ? Colors.dark : Colors.light;
  const insets = useSafeAreaInsets();
  const { currentReadingSpeed, setCurrentReadingSpeed, articles } = useAppContext();
  const [selectedMode, setSelectedMode] = useState("focus");
  const topInset = Platform.OS === "web" ? 67 : insets.top;

  const allArticles = [...articles, ...DEMO_ARTICLES];
  const unread = allArticles.filter((a) => !a.isRead).slice(0, 5);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingTop: topInset + 16, paddingBottom: 120 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>
            Speed Reader
          </Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Configure your reading experience
          </Text>
        </View>

        {/* Speed Selector */}
        <View
          style={[
            styles.card,
            { backgroundColor: theme.surfaceElevated, borderColor: theme.border },
          ]}
        >
          <View style={styles.cardHeader}>
            <Feather name="zap" size={16} color={theme.primary} />
            <Text style={[styles.cardTitle, { color: theme.text }]}>
              Reading Speed
            </Text>
            <View style={[styles.wpmBadge, { backgroundColor: theme.primary + "20" }]}>
              <Text style={[styles.wpmText, { color: theme.primary }]}>
                {currentReadingSpeed} WPM
              </Text>
            </View>
          </View>
          <View style={styles.speedGrid}>
            {SPEEDS.map((speed) => (
              <Pressable
                key={speed}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setCurrentReadingSpeed(speed);
                }}
                style={({ pressed }) => [
                  styles.speedBtn,
                  {
                    borderColor:
                      currentReadingSpeed === speed
                        ? theme.primary
                        : theme.border,
                    opacity: pressed ? 0.7 : 1,
                  },
                ]}
              >
                {currentReadingSpeed === speed ? (
                  <LinearGradient
                    colors={["#4F8EF7", "#6C3EF7"]}
                    style={StyleSheet.absoluteFill}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  />
                ) : null}
                <Text
                  style={[
                    styles.speedText,
                    {
                      color:
                        currentReadingSpeed === speed ? "#fff" : theme.textSecondary,
                      fontFamily:
                        currentReadingSpeed === speed
                          ? "Inter_700Bold"
                          : "Inter_400Regular",
                    },
                  ]}
                >
                  {speed}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Reading Modes */}
        <View
          style={[
            styles.card,
            { backgroundColor: theme.surfaceElevated, borderColor: theme.border },
          ]}
        >
          <View style={styles.cardHeader}>
            <Feather name="sliders" size={16} color={theme.primary} />
            <Text style={[styles.cardTitle, { color: theme.text }]}>
              Reading Mode
            </Text>
          </View>
          <View style={styles.modesRow}>
            {MODES.map((mode) => (
              <Pressable
                key={mode.id}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setSelectedMode(mode.id);
                }}
                style={({ pressed }) => [
                  styles.modeBtn,
                  {
                    backgroundColor:
                      selectedMode === mode.id
                        ? theme.primary + "20"
                        : theme.glass,
                    borderColor:
                      selectedMode === mode.id ? theme.primary : theme.border,
                    opacity: pressed ? 0.7 : 1,
                  },
                ]}
              >
                <Feather
                  name={mode.icon}
                  size={18}
                  color={selectedMode === mode.id ? theme.primary : theme.textSecondary}
                />
                <Text
                  style={[
                    styles.modeLabel,
                    {
                      color:
                        selectedMode === mode.id ? theme.primary : theme.text,
                      fontFamily:
                        selectedMode === mode.id
                          ? "Inter_600SemiBold"
                          : "Inter_400Regular",
                    },
                  ]}
                >
                  {mode.label}
                </Text>
                <Text
                  style={[styles.modeDesc, { color: theme.textTertiary }]}
                  numberOfLines={2}
                >
                  {mode.desc}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Quick Start */}
        {unread.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Continue Reading
            </Text>
            <Text style={[styles.sectionSub, { color: theme.textSecondary }]}>
              {unread.length} articles waiting
            </Text>
            {unread.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                  router.push(`/rsvp/${article.id}`);
                }}
                compact
              />
            ))}
          </View>
        )}

        {/* Start Demo Button */}
        <Pressable
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            router.push(`/rsvp/demo-1`);
          }}
          style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }]}
        >
          <LinearGradient
            colors={["#4F8EF7", "#6C3EF7"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.startBtn}
          >
            <Feather name="play" size={20} color="#fff" />
            <Text style={styles.startBtnText}>Start Speed Reading</Text>
          </LinearGradient>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: 20 },
  header: { marginBottom: 20 },
  title: { fontSize: 28, fontFamily: "Inter_700Bold", letterSpacing: -0.5 },
  subtitle: { fontSize: 14, fontFamily: "Inter_400Regular", marginTop: 4 },
  card: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
    gap: 14,
    overflow: "hidden",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  cardTitle: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
    flex: 1,
  },
  wpmBadge: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  wpmText: {
    fontSize: 13,
    fontFamily: "Inter_700Bold",
  },
  speedGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  speedBtn: {
    width: "13%",
    aspectRatio: 1.5,
    borderRadius: 10,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    minWidth: 44,
  },
  speedText: {
    fontSize: 12,
  },
  modesRow: {
    flexDirection: "row",
    gap: 10,
  },
  modeBtn: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1.5,
    padding: 12,
    gap: 6,
    alignItems: "center",
  },
  modeLabel: {
    fontSize: 13,
    textAlign: "center",
  },
  modeDesc: {
    fontSize: 10,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    lineHeight: 14,
  },
  section: { marginBottom: 16 },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Inter_700Bold",
    marginBottom: 2,
  },
  sectionSub: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    marginBottom: 12,
  },
  startBtn: {
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 24,
  },
  startBtnText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Inter_700Bold",
  },
});
