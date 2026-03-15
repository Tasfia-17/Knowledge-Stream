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
import { useAppContext, Interest } from "@/context/AppContext";
import * as Haptics from "expo-haptics";

const INTEREST_ICONS: Record<Interest, string> = {
  AI: "cpu",
  Startups: "trending-up",
  Technology: "zap",
  Finance: "dollar-sign",
  Science: "activity",
  Geopolitics: "globe",
  Productivity: "check-circle",
  Business: "briefcase",
};

const ALL_INTERESTS: Interest[] = [
  "AI", "Startups", "Technology", "Finance", "Science", "Geopolitics", "Productivity", "Business"
];

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme !== "light";
  const theme = isDark ? Colors.dark : Colors.light;
  const insets = useSafeAreaInsets();
  const { stats, interests, setInterests, currentReadingSpeed } = useAppContext();
  const topInset = Platform.OS === "web" ? 67 : insets.top;

  const toggleInterest = (interest: Interest) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (interests.includes(interest)) {
      setInterests(interests.filter((i) => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  const avgSpeedMultiplier = currentReadingSpeed / 200;
  const timeSavedPct = Math.round((1 - 1 / avgSpeedMultiplier) * 100);

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
          <LinearGradient
            colors={["#4F8EF7", "#6C3EF7"]}
            style={styles.avatar}
          >
            <Feather name="user" size={28} color="#fff" />
          </LinearGradient>
          <View>
            <Text style={[styles.name, { color: theme.text }]}>My Profile</Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
              SwiftRead AI Member
            </Text>
          </View>
        </View>

        {/* Analytics Dashboard */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Reading Analytics
        </Text>
        <View style={styles.analyticsGrid}>
          <AnalyticCard
            label="Articles Read"
            value={`${stats.articlesRead}`}
            icon="book-open"
            color="#4F8EF7"
            theme={theme}
          />
          <AnalyticCard
            label="Current Streak"
            value={`${stats.currentStreak}d`}
            icon="zap"
            color="#FFB347"
            theme={theme}
          />
          <AnalyticCard
            label="Insights Saved"
            value={`${stats.insightsSaved}`}
            icon="star"
            color="#B06EFF"
            theme={theme}
          />
          <AnalyticCard
            label="Speed"
            value={`${currentReadingSpeed} WPM`}
            icon="trending-up"
            color="#00E5FF"
            theme={theme}
          />
          <AnalyticCard
            label="Words Read"
            value={formatNumber(stats.totalWordsRead)}
            icon="align-left"
            color="#00D68F"
            theme={theme}
          />
          <AnalyticCard
            label="Time Saved"
            value={`${timeSavedPct}%`}
            icon="clock"
            color="#FF6B6B"
            theme={theme}
          />
        </View>

        {/* Premium Banner */}
        <LinearGradient
          colors={["#4F8EF7", "#6C3EF7", "#B06EFF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.premiumCard}
        >
          <View style={styles.premiumContent}>
            <Ionicons name="sparkles" size={24} color="rgba(255,255,255,0.9)" />
            <View style={styles.premiumText}>
              <Text style={styles.premiumTitle}>Upgrade to Premium</Text>
              <Text style={styles.premiumDesc}>
                Unlimited articles · Audio · Advanced AI
              </Text>
            </View>
            <View style={[styles.priceTag]}>
              <Text style={styles.price}>$5/mo</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Free Plan Features */}
        <View
          style={[
            styles.planCard,
            { backgroundColor: theme.surfaceElevated, borderColor: theme.border },
          ]}
        >
          <Text style={[styles.planLabel, { color: theme.textSecondary }]}>
            Free Plan
          </Text>
          {[
            "5 articles per day",
            "Basic AI summaries",
            "Speed reading up to 600 WPM",
            "Insights vault (10 items)",
          ].map((feat) => (
            <View key={feat} style={styles.featureRow}>
              <Feather name="check" size={14} color={theme.success} />
              <Text style={[styles.featureText, { color: theme.textSecondary }]}>
                {feat}
              </Text>
            </View>
          ))}
        </View>

        {/* Interests */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          My Interests
        </Text>
        <Text style={[styles.sectionSub, { color: theme.textSecondary }]}>
          Personalize your feed
        </Text>
        <View style={styles.interestsGrid}>
          {ALL_INTERESTS.map((interest) => {
            const active = interests.includes(interest);
            return (
              <Pressable
                key={interest}
                onPress={() => toggleInterest(interest)}
                style={({ pressed }) => [
                  styles.interestBtn,
                  {
                    backgroundColor: active
                      ? theme.primary + "20"
                      : theme.surfaceElevated,
                    borderColor: active ? theme.primary : theme.border,
                    opacity: pressed ? 0.7 : 1,
                  },
                ]}
              >
                <Feather
                  name={INTEREST_ICONS[interest] as any}
                  size={16}
                  color={active ? theme.primary : theme.textSecondary}
                />
                <Text
                  style={[
                    styles.interestText,
                    {
                      color: active ? theme.primary : theme.text,
                      fontFamily: active ? "Inter_600SemiBold" : "Inter_400Regular",
                    },
                  ]}
                >
                  {interest}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

function AnalyticCard({
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
        styles.analyticCard,
        { backgroundColor: theme.surfaceElevated, borderColor: theme.border },
      ]}
    >
      <View style={[styles.analyticIcon, { backgroundColor: color + "20" }]}>
        <Feather name={icon} size={16} color={color} />
      </View>
      <Text style={[styles.analyticValue, { color: theme.text }]}>{value}</Text>
      <Text style={[styles.analyticLabel, { color: theme.textTertiary }]}>{label}</Text>
    </View>
  );
}

function formatNumber(n: number) {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return `${n}`;
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: 20 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 28,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  name: { fontSize: 22, fontFamily: "Inter_700Bold" },
  subtitle: { fontSize: 13, fontFamily: "Inter_400Regular", marginTop: 2 },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Inter_700Bold",
    marginBottom: 4,
    marginTop: 8,
  },
  sectionSub: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    marginBottom: 14,
  },
  analyticsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },
  analyticCard: {
    width: "30%",
    borderRadius: 16,
    borderWidth: 1,
    padding: 12,
    gap: 6,
    flexGrow: 1,
  },
  analyticIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 2,
  },
  analyticValue: {
    fontSize: 18,
    fontFamily: "Inter_700Bold",
    letterSpacing: -0.3,
  },
  analyticLabel: {
    fontSize: 10,
    fontFamily: "Inter_400Regular",
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  premiumCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
  },
  premiumContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  premiumText: { flex: 1 },
  premiumTitle: {
    fontSize: 16,
    fontFamily: "Inter_700Bold",
    color: "#fff",
  },
  premiumDesc: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    color: "rgba(255,255,255,0.8)",
    marginTop: 2,
  },
  priceTag: {
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  price: {
    fontSize: 14,
    fontFamily: "Inter_700Bold",
    color: "#fff",
  },
  planCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    gap: 10,
    marginBottom: 24,
  },
  planLabel: {
    fontSize: 12,
    fontFamily: "Inter_600SemiBold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  featureText: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
  },
  interestsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 24,
  },
  interestBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    borderRadius: 12,
    borderWidth: 1.5,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  interestText: {
    fontSize: 13,
  },
});
