import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  useColorScheme,
  Animated,
  Dimensions,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import { Colors } from "@/constants/colors";
import { useAppContext, Interest } from "@/context/AppContext";

const { width } = Dimensions.get("window");

const INTERESTS: { id: Interest; icon: string; color: string }[] = [
  { id: "AI", icon: "cpu", color: "#4F8EF7" },
  { id: "Startups", icon: "trending-up", color: "#FF6B6B" },
  { id: "Technology", icon: "zap", color: "#00E5FF" },
  { id: "Finance", icon: "dollar-sign", color: "#00D68F" },
  { id: "Science", icon: "activity", color: "#B06EFF" },
  { id: "Geopolitics", icon: "globe", color: "#FFB347" },
  { id: "Productivity", icon: "check-circle", color: "#FF8E53" },
  { id: "Business", icon: "briefcase", color: "#4F8EF7" },
];

const SPEEDS = [
  { wpm: 200, label: "Relaxed", icon: "coffee" as const },
  { wpm: 300, label: "Normal", icon: "book-open" as const },
  { wpm: 400, label: "Efficient", icon: "trending-up" as const },
  { wpm: 600, label: "Speed", icon: "zap" as const },
];

export default function OnboardingScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme !== "light";
  const theme = isDark ? Colors.dark : Colors.light;
  const insets = useSafeAreaInsets();
  const { setOnboarded, setInterests, setCurrentReadingSpeed } = useAppContext();
  const [step, setStep] = useState(0);
  const [selectedInterests, setSelectedInterests] = useState<Interest[]>(["AI", "Technology"]);
  const [selectedSpeed, setSelectedSpeed] = useState(300);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const topInset = Platform.OS === "web" ? 67 : insets.top;
  const bottomInset = Platform.OS === "web" ? 34 : insets.bottom;

  const goNext = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (step < 2) {
      Animated.sequence([
        Animated.timing(slideAnim, { toValue: -20, duration: 150, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
      ]).start();
      setStep((s) => s + 1);
    } else {
      handleFinish();
    }
  };

  const handleFinish = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    await Promise.all([
      setInterests(selectedInterests),
      setCurrentReadingSpeed(selectedSpeed),
      setOnboarded(true),
    ]);
    router.replace("/(tabs)");
  };

  const toggleInterest = (id: Interest) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Background glow */}
      <LinearGradient
        colors={["rgba(79,142,247,0.15)", "transparent"]}
        style={styles.bgGlow}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      <View
        style={[
          styles.content,
          { paddingTop: topInset + 20, paddingBottom: bottomInset + 20 },
        ]}
      >
        {/* Step indicators */}
        <View style={styles.stepDots}>
          {[0, 1, 2].map((i) => (
            <View
              key={i}
              style={[
                styles.dot,
                {
                  backgroundColor: i === step ? theme.primary : theme.border,
                  width: i === step ? 24 : 8,
                },
              ]}
            />
          ))}
        </View>

        <Animated.View
          style={[styles.stepContent, { transform: [{ translateX: slideAnim }] }]}
        >
          {step === 0 && <WelcomeStep theme={theme} />}
          {step === 1 && (
            <InterestsStep
              selected={selectedInterests}
              onToggle={toggleInterest}
              theme={theme}
            />
          )}
          {step === 2 && (
            <SpeedStep
              selected={selectedSpeed}
              onSelect={setSelectedSpeed}
              theme={theme}
            />
          )}
        </Animated.View>

        <Pressable
          onPress={goNext}
          disabled={step === 1 && selectedInterests.length === 0}
          style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }]}
        >
          <LinearGradient
            colors={["#4F8EF7", "#6C3EF7"]}
            style={[
              styles.nextBtn,
              { opacity: step === 1 && selectedInterests.length === 0 ? 0.4 : 1 },
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.nextBtnText}>
              {step === 2 ? "Start Reading" : "Continue"}
            </Text>
            <Feather name={step === 2 ? "zap" : "arrow-right"} size={18} color="#fff" />
          </LinearGradient>
        </Pressable>

        {step === 0 && (
          <Pressable onPress={handleFinish} style={styles.skipBtn}>
            <Text style={[styles.skipText, { color: theme.textTertiary }]}>Skip setup</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

function WelcomeStep({ theme }: { theme: typeof Colors.dark }) {
  return (
    <View style={styles.welcomeContainer}>
      <LinearGradient
        colors={["#4F8EF7", "#6C3EF7", "#B06EFF"]}
        style={styles.logoCircle}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Ionicons name="sparkles" size={48} color="#fff" />
      </LinearGradient>
      <Text style={[styles.welcomeTitle, { color: theme.text }]}>
        SwiftRead AI
      </Text>
      <Text style={[styles.welcomeTagline, { color: theme.primary }]}>
        Turn the internet into speed-readable knowledge
      </Text>
      <Text style={[styles.welcomeBody, { color: theme.textSecondary }]}>
        Read 5x faster with our AI-powered speed reader. Get instant summaries, key insights, and audio briefings from any article.
      </Text>
      <View style={styles.features}>
        {[
          { icon: "zap" as const, text: "RSVP Speed Reading up to 800 WPM" },
          { icon: "sparkles" as const, text: "AI Summaries & Key Insights", isIonicon: true },
          { icon: "headphones" as const, text: "Audio Narration & Podcast Mode" },
        ].map(({ icon, text, isIonicon }) => (
          <View key={text} style={styles.featureRow}>
            <View style={[styles.featureIcon, { backgroundColor: theme.primary + "20" }]}>
              {isIonicon ? (
                <Ionicons name={icon as any} size={14} color={theme.primary} />
              ) : (
                <Feather name={icon} size={14} color={theme.primary} />
              )}
            </View>
            <Text style={[styles.featureText, { color: theme.textSecondary }]}>{text}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function InterestsStep({
  selected,
  onToggle,
  theme,
}: {
  selected: Interest[];
  onToggle: (i: Interest) => void;
  theme: typeof Colors.dark;
}) {
  return (
    <View style={styles.stepInner}>
      <Text style={[styles.stepTitle, { color: theme.text }]}>
        Your Interests
      </Text>
      <Text style={[styles.stepSub, { color: theme.textSecondary }]}>
        We'll personalize your daily briefing
      </Text>
      <View style={styles.interestGrid}>
        {INTERESTS.map(({ id, icon, color }) => {
          const active = selected.includes(id);
          return (
            <Pressable
              key={id}
              onPress={() => onToggle(id)}
              style={({ pressed }) => [
                styles.interestBtn,
                {
                  backgroundColor: active ? color + "20" : theme.surfaceElevated,
                  borderColor: active ? color : theme.border,
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              <Feather
                name={icon as any}
                size={20}
                color={active ? color : theme.textSecondary}
              />
              <Text
                style={[
                  styles.interestText,
                  {
                    color: active ? color : theme.text,
                    fontFamily: active ? "Inter_600SemiBold" : "Inter_400Regular",
                  },
                ]}
              >
                {id}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

function SpeedStep({
  selected,
  onSelect,
  theme,
}: {
  selected: number;
  onSelect: (wpm: number) => void;
  theme: typeof Colors.dark;
}) {
  return (
    <View style={styles.stepInner}>
      <Text style={[styles.stepTitle, { color: theme.text }]}>
        Reading Speed
      </Text>
      <Text style={[styles.stepSub, { color: theme.textSecondary }]}>
        Start comfortable — adjust anytime
      </Text>
      <View style={styles.speedOptions}>
        {SPEEDS.map(({ wpm, label, icon }) => {
          const active = selected === wpm;
          return (
            <Pressable
              key={wpm}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                onSelect(wpm);
              }}
              style={[
                styles.speedOption,
                {
                  backgroundColor: active ? theme.primary + "15" : theme.surfaceElevated,
                  borderColor: active ? theme.primary : theme.border,
                },
              ]}
            >
              <View style={styles.speedLeft}>
                <Feather
                  name={icon}
                  size={20}
                  color={active ? theme.primary : theme.textSecondary}
                />
                <View>
                  <Text
                    style={[
                      styles.speedLabel,
                      {
                        color: active ? theme.primary : theme.text,
                        fontFamily: active ? "Inter_700Bold" : "Inter_600SemiBold",
                      },
                    ]}
                  >
                    {label}
                  </Text>
                  <Text style={[styles.speedWpm, { color: theme.textTertiary }]}>
                    {wpm} words/min
                  </Text>
                </View>
              </View>
              {active && (
                <Feather name="check-circle" size={20} color={theme.primary} />
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  bgGlow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 300,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  stepDots: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 32,
    alignItems: "center",
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  stepContent: { flex: 1 },
  welcomeContainer: { flex: 1, alignItems: "center", justifyContent: "center", gap: 16 },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  welcomeTitle: {
    fontSize: 32,
    fontFamily: "Inter_700Bold",
    letterSpacing: -0.5,
  },
  welcomeTagline: {
    fontSize: 14,
    fontFamily: "Inter_500Medium",
    textAlign: "center",
  },
  welcomeBody: {
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    lineHeight: 24,
  },
  features: { gap: 10, width: "100%", marginTop: 8 },
  featureRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  featureIcon: {
    width: 30,
    height: 30,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  featureText: { fontSize: 14, fontFamily: "Inter_400Regular", flex: 1 },
  stepInner: { flex: 1, paddingTop: 8 },
  stepTitle: { fontSize: 26, fontFamily: "Inter_700Bold", marginBottom: 4 },
  stepSub: { fontSize: 14, fontFamily: "Inter_400Regular", marginBottom: 24 },
  interestGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  interestBtn: {
    borderRadius: 14,
    borderWidth: 1.5,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 7,
    alignItems: "center",
    width: "47%",
  },
  interestText: { fontSize: 13 },
  speedOptions: { gap: 12 },
  speedOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 16,
    borderWidth: 1.5,
    padding: 16,
  },
  speedLeft: { flexDirection: "row", alignItems: "center", gap: 14 },
  speedLabel: { fontSize: 16 },
  speedWpm: { fontSize: 12, fontFamily: "Inter_400Regular", marginTop: 2 },
  nextBtn: {
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 12,
  },
  nextBtnText: { color: "#fff", fontSize: 16, fontFamily: "Inter_700Bold" },
  skipBtn: { alignItems: "center", paddingVertical: 8 },
  skipText: { fontSize: 14, fontFamily: "Inter_400Regular" },
});
