import React, { useState, useEffect, useRef, useCallback } from "react";
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
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import * as Haptics from "expo-haptics";
import { Colors } from "@/constants/colors";
import { useAppContext } from "@/context/AppContext";
import { DEMO_ARTICLES } from "@/data/demoArticles";

const { width } = Dimensions.get("window");

function computeOrp(word: string): number {
  const len = word.replace(/[^a-zA-Z]/g, "").length;
  if (len <= 1) return 0;
  if (len <= 5) return 1;
  if (len <= 9) return Math.floor(len * 0.4);
  return Math.floor(len * 0.35);
}

function WordDisplay({
  word,
  orpIndex,
  theme,
}: {
  word: string;
  orpIndex: number;
  theme: typeof Colors.dark;
}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.85)).current;

  useEffect(() => {
    fadeAnim.setValue(0);
    scaleAnim.setValue(0.85);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 180,
        friction: 10,
        useNativeDriver: true,
      }),
    ]).start();
  }, [word]);

  const before = word.slice(0, orpIndex);
  const orp = word.slice(orpIndex, orpIndex + 1);
  const after = word.slice(orpIndex + 1);

  return (
    <Animated.View
      style={[
        styles.wordContainer,
        { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
      ]}
    >
      <Text style={styles.wordText}>
        <Text style={[styles.wordRegular, { color: theme.text }]}>{before}</Text>
        <Text style={[styles.wordOrp, { color: theme.orp }]}>{orp}</Text>
        <Text style={[styles.wordRegular, { color: theme.text }]}>{after}</Text>
      </Text>
    </Animated.View>
  );
}

const SPEEDS = [200, 300, 400, 500, 600, 700, 800];

export default function RSVPScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colorScheme = useColorScheme();
  const isDark = colorScheme !== "light";
  const theme = isDark ? Colors.dark : Colors.light;
  const insets = useSafeAreaInsets();
  const { articles, currentReadingSpeed, setCurrentReadingSpeed, markArticleRead } =
    useAppContext();

  const allArticles = [...articles, ...DEMO_ARTICLES];
  const article = allArticles.find((a) => a.id === id);

  const words = article ? article.content.split(/\s+/).filter(Boolean) : [];
  const [wordIndex, setWordIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);
  const topInset = Platform.OS === "web" ? 67 : insets.top;
  const bottomInset = Platform.OS === "web" ? 34 : insets.bottom;

  const progress = words.length > 0 ? wordIndex / words.length : 0;
  const wordsLeft = words.length - wordIndex;
  const minutesLeft = Math.ceil(wordsLeft / currentReadingSpeed);

  const currentWord = words[wordIndex] ?? "";
  const orpIndex = computeOrp(currentWord);

  const tick = useCallback(() => {
    setWordIndex((prev) => {
      if (prev >= words.length - 1) {
        setIsPlaying(false);
        setFinished(true);
        return prev;
      }
      return prev + 1;
    });
  }, [words.length]);

  useEffect(() => {
    if (isPlaying) {
      const ms = Math.round(60000 / currentReadingSpeed);
      intervalRef.current = setInterval(tick, ms);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, currentReadingSpeed, tick]);

  useEffect(() => {
    if (finished && article) {
      const elapsed = (Date.now() - startTimeRef.current) / 60000;
      markArticleRead(article.id, words.length, elapsed);
    }
  }, [finished]);

  const handlePlayPause = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (!started) {
      setStarted(true);
      startTimeRef.current = Date.now();
    }
    setIsPlaying((p) => !p);
  };

  const handleRewind = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setWordIndex((prev) => Math.max(0, prev - 10));
  };

  const handleForward = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setWordIndex((prev) => Math.min(words.length - 1, prev + 10));
  };

  if (!article) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Pressable onPress={() => router.back()} style={[styles.backBtn, { top: topInset + 12 }]}>
          <Feather name="x" size={22} color={theme.text} />
        </Pressable>
        <Text style={[styles.notFound, { color: theme.text }]}>Article not found</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Top Bar */}
      <View style={[styles.topBar, { paddingTop: topInset + 12 }]}>
        <Pressable
          onPress={() => {
            setIsPlaying(false);
            router.back();
          }}
          style={({ pressed }) => [
            styles.topBtn,
            {
              backgroundColor: theme.surfaceElevated,
              borderColor: theme.border,
              opacity: pressed ? 0.7 : 1,
            },
          ]}
        >
          <Feather name="x" size={18} color={theme.text} />
        </Pressable>
        <Text style={[styles.topTitle, { color: theme.textSecondary }]} numberOfLines={1}>
          {article.title}
        </Text>
        <View style={[styles.speedChip, { backgroundColor: theme.primary + "20" }]}>
          <Text style={[styles.speedChipText, { color: theme.primary }]}>
            {currentReadingSpeed} WPM
          </Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={[styles.progressTrack, { backgroundColor: theme.border }]}>
        <LinearGradient
          colors={["#4F8EF7", "#6C3EF7"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.progressFill, { width: `${progress * 100}%` }]}
        />
      </View>

      {/* ORP Guide Lines */}
      <View style={styles.guideLines}>
        <View style={[styles.guideLine, { backgroundColor: theme.border }]} />
        <View style={[styles.guideLineBottom, { backgroundColor: theme.border }]} />
      </View>

      {/* Word Display Area */}
      <View style={styles.wordArea}>
        {!started && !finished && (
          <Text style={[styles.tapHint, { color: theme.textTertiary }]}>
            Tap play to begin
          </Text>
        )}
        {finished ? (
          <View style={styles.finishedArea}>
            <LinearGradient
              colors={["#4F8EF7", "#6C3EF7"]}
              style={styles.finishedIcon}
            >
              <Feather name="check" size={32} color="#fff" />
            </LinearGradient>
            <Text style={[styles.finishedTitle, { color: theme.text }]}>
              Article Complete!
            </Text>
            <Text style={[styles.finishedSub, { color: theme.textSecondary }]}>
              {words.length} words · {article.readingTime} min
            </Text>
          </View>
        ) : (
          <WordDisplay
            word={started ? currentWord : words[0] ?? ""}
            orpIndex={started ? orpIndex : computeOrp(words[0] ?? "")}
            theme={theme}
          />
        )}
      </View>

      {/* Meta info */}
      {!finished && started && (
        <View style={styles.metaRow}>
          <Text style={[styles.metaWord, { color: theme.textTertiary }]}>
            {wordIndex + 1} / {words.length}
          </Text>
          <Text style={[styles.metaTime, { color: theme.textTertiary }]}>
            ~{minutesLeft}m left
          </Text>
        </View>
      )}

      {/* Controls */}
      <View style={[styles.controls, { paddingBottom: bottomInset + 30 }]}>
        {/* Speed Row */}
        <View style={styles.speedRow}>
          {SPEEDS.map((s) => (
            <Pressable
              key={s}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setCurrentReadingSpeed(s);
              }}
              style={[
                styles.speedPill,
                {
                  backgroundColor:
                    currentReadingSpeed === s
                      ? theme.primary
                      : theme.surfaceElevated,
                  borderColor:
                    currentReadingSpeed === s ? theme.primary : theme.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.speedPillText,
                  {
                    color: currentReadingSpeed === s ? "#fff" : theme.textTertiary,
                    fontFamily:
                      currentReadingSpeed === s
                        ? "Inter_600SemiBold"
                        : "Inter_400Regular",
                  },
                ]}
              >
                {s}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Play Controls */}
        <View style={styles.playControls}>
          <Pressable
            onPress={handleRewind}
            style={({ pressed }) => [
              styles.controlBtn,
              {
                backgroundColor: theme.surfaceElevated,
                borderColor: theme.border,
                opacity: pressed ? 0.7 : 1,
              },
            ]}
          >
            <Feather name="rewind" size={20} color={theme.textSecondary} />
          </Pressable>

          <Pressable
            onPress={handlePlayPause}
            style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }]}
          >
            <LinearGradient
              colors={["#4F8EF7", "#6C3EF7"]}
              style={styles.playBtn}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Feather
                name={isPlaying ? "pause" : "play"}
                size={26}
                color="#fff"
              />
            </LinearGradient>
          </Pressable>

          <Pressable
            onPress={handleForward}
            style={({ pressed }) => [
              styles.controlBtn,
              {
                backgroundColor: theme.surfaceElevated,
                borderColor: theme.border,
                opacity: pressed ? 0.7 : 1,
              },
            ]}
          >
            <Feather name="fast-forward" size={20} color={theme.textSecondary} />
          </Pressable>
        </View>

        {/* Done button if finished */}
        {finished && (
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
          >
            <LinearGradient
              colors={["#4F8EF7", "#6C3EF7"]}
              style={styles.doneBtn}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.doneBtnText}>View Article</Text>
            </LinearGradient>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
  },
  backBtn: {
    position: "absolute",
    right: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  notFound: {
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    marginTop: 120,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 10,
  },
  topBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  topTitle: {
    flex: 1,
    fontSize: 13,
    fontFamily: "Inter_400Regular",
  },
  speedChip: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    flexShrink: 0,
  },
  speedChipText: {
    fontSize: 12,
    fontFamily: "Inter_700Bold",
  },
  progressTrack: {
    height: 3,
    marginHorizontal: 16,
    borderRadius: 2,
    marginBottom: 0,
  },
  progressFill: {
    height: 3,
    borderRadius: 2,
  },
  guideLines: {
    position: "absolute",
    left: 0,
    right: 0,
    top: "42%",
    pointerEvents: "none",
  },
  guideLine: {
    height: 1,
    marginHorizontal: 20,
    marginBottom: 58,
  },
  guideLineBottom: {
    height: 1,
    marginHorizontal: 20,
  },
  wordArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  tapHint: {
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
  },
  wordContainer: {
    alignItems: "center",
  },
  wordText: {
    fontSize: Math.min(52, width * 0.13),
    textAlign: "center",
    lineHeight: Math.min(64, width * 0.16),
    letterSpacing: -1,
  },
  wordRegular: {
    fontFamily: "Inter_700Bold",
  },
  wordOrp: {
    fontFamily: "Inter_700Bold",
  },
  finishedArea: {
    alignItems: "center",
    gap: 14,
  },
  finishedIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  finishedTitle: {
    fontSize: 24,
    fontFamily: "Inter_700Bold",
  },
  finishedSub: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  metaWord: { fontSize: 12, fontFamily: "Inter_400Regular" },
  metaTime: { fontSize: 12, fontFamily: "Inter_400Regular" },
  controls: {
    paddingHorizontal: 16,
    gap: 16,
  },
  speedRow: {
    flexDirection: "row",
    gap: 6,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  speedPill: {
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  speedPillText: {
    fontSize: 11,
  },
  playControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
  },
  controlBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  playBtn: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  doneBtn: {
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
  },
  doneBtnText: {
    color: "#fff",
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
  },
});
