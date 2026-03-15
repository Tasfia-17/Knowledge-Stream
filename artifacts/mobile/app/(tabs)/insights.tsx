import React from "react";
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
import { Colors } from "@/constants/colors";
import { useAppContext } from "@/context/AppContext";
import { InsightCard } from "@/components/InsightCard";
import * as Haptics from "expo-haptics";

export default function InsightsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme !== "light";
  const theme = isDark ? Colors.dark : Colors.light;
  const insets = useSafeAreaInsets();
  const { savedInsights, removeInsight } = useAppContext();
  const topInset = Platform.OS === "web" ? 67 : insets.top;

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
            Knowledge Vault
          </Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            {savedInsights.length} insight{savedInsights.length !== 1 ? "s" : ""} saved
          </Text>
        </View>

        {/* Stats Banner */}
        {savedInsights.length > 0 && (
          <LinearGradient
            colors={["rgba(176,110,255,0.2)", "rgba(108,62,247,0.1)"]}
            style={[styles.statsBanner, { borderColor: theme.border }]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.statsIcon}>
              <Ionicons name="sparkles" size={20} color="#B06EFF" />
            </View>
            <View>
              <Text style={[styles.statsValue, { color: theme.text }]}>
                {savedInsights.length} key insights
              </Text>
              <Text style={[styles.statsLabel, { color: theme.textSecondary }]}>
                from {new Set(savedInsights.map((i) => i.source)).size} sources
              </Text>
            </View>
          </LinearGradient>
        )}

        {/* Insights List */}
        {savedInsights.length === 0 ? (
          <View style={styles.empty}>
            <View
              style={[
                styles.emptyIcon,
                { backgroundColor: theme.surfaceElevated, borderColor: theme.border },
              ]}
            >
              <Feather name="star" size={32} color={theme.textTertiary} />
            </View>
            <Text style={[styles.emptyTitle, { color: theme.text }]}>
              No insights yet
            </Text>
            <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
              Tap any insight while reading an article to save it to your vault
            </Text>
          </View>
        ) : (
          <View style={styles.list}>
            {savedInsights.map((insight) => (
              <InsightCard
                key={insight.id}
                insight={insight}
                onDelete={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                  removeInsight(insight.id);
                }}
              />
            ))}
          </View>
        )}
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
  statsBanner: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },
  statsIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(176,110,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  statsValue: {
    fontSize: 16,
    fontFamily: "Inter_700Bold",
  },
  statsLabel: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    marginTop: 2,
  },
  list: { gap: 0 },
  empty: {
    alignItems: "center",
    paddingTop: 60,
    gap: 16,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
  },
  emptyText: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    lineHeight: 21,
    paddingHorizontal: 20,
  },
});
