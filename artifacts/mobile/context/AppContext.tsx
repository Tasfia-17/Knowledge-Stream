import AsyncStorage from "@react-native-async-storage/async-storage";
import createContextHook from "@nkzw/create-context-hook";
import React, { useState, useEffect, useCallback } from "react";

export type Interest =
  | "AI"
  | "Startups"
  | "Technology"
  | "Finance"
  | "Science"
  | "Geopolitics"
  | "Productivity"
  | "Business";

export type Article = {
  id: string;
  title: string;
  source: string;
  content: string;
  url?: string;
  category: Interest;
  readingTime: number;
  wordCount: number;
  addedAt: number;
  isRead: boolean;
  summaryOneSentence: string;
  summary30s: string;
  summary2min: string;
  insights: string[];
  whyMatters: string;
};

export type Insight = {
  id: string;
  title: string;
  text: string;
  source: string;
  savedAt: number;
  articleId?: string;
};

export type ReadingStats = {
  articlesRead: number;
  totalWordsRead: number;
  totalTimeMinutes: number;
  currentStreak: number;
  lastReadDate: string;
  insightsSaved: number;
  avgReadingSpeed: number;
};

type AppContextValue = {
  onboarded: boolean;
  interests: Interest[];
  articles: Article[];
  savedInsights: Insight[];
  stats: ReadingStats;
  currentReadingSpeed: number;
  darkMode: boolean;
  setOnboarded: (v: boolean) => void;
  setInterests: (interests: Interest[]) => void;
  addArticle: (article: Article) => void;
  markArticleRead: (id: string, wordsRead: number, timeMinutes: number) => void;
  saveInsight: (insight: Insight) => void;
  removeInsight: (id: string) => void;
  setCurrentReadingSpeed: (wpm: number) => void;
  removeArticle: (id: string) => void;
};

const STORAGE_KEYS = {
  ONBOARDED: "@swiftread/onboarded",
  INTERESTS: "@swiftread/interests",
  ARTICLES: "@swiftread/articles",
  INSIGHTS: "@swiftread/insights",
  STATS: "@swiftread/stats",
  READING_SPEED: "@swiftread/reading_speed",
};

const DEFAULT_STATS: ReadingStats = {
  articlesRead: 0,
  totalWordsRead: 0,
  totalTimeMinutes: 0,
  currentStreak: 0,
  lastReadDate: "",
  insightsSaved: 0,
  avgReadingSpeed: 300,
};

const [AppContextProvider, useAppContext] = createContextHook<AppContextValue>(
  () => {
    const [onboarded, setOnboardedState] = useState(false);
    const [interests, setInterestsState] = useState<Interest[]>([]);
    const [articles, setArticles] = useState<Article[]>([]);
    const [savedInsights, setSavedInsights] = useState<Insight[]>([]);
    const [stats, setStats] = useState<ReadingStats>(DEFAULT_STATS);
    const [currentReadingSpeed, setSpeedState] = useState(300);

    useEffect(() => {
      const load = async () => {
        try {
          const [ob, int, art, ins, st, spd] = await Promise.all([
            AsyncStorage.getItem(STORAGE_KEYS.ONBOARDED),
            AsyncStorage.getItem(STORAGE_KEYS.INTERESTS),
            AsyncStorage.getItem(STORAGE_KEYS.ARTICLES),
            AsyncStorage.getItem(STORAGE_KEYS.INSIGHTS),
            AsyncStorage.getItem(STORAGE_KEYS.STATS),
            AsyncStorage.getItem(STORAGE_KEYS.READING_SPEED),
          ]);
          if (ob) setOnboardedState(JSON.parse(ob));
          if (int) setInterestsState(JSON.parse(int));
          if (art) setArticles(JSON.parse(art));
          if (ins) setSavedInsights(JSON.parse(ins));
          if (st) setStats(JSON.parse(st));
          if (spd) setSpeedState(JSON.parse(spd));
        } catch {}
      };
      load();
    }, []);

    const setOnboarded = useCallback(async (v: boolean) => {
      setOnboardedState(v);
      await AsyncStorage.setItem(STORAGE_KEYS.ONBOARDED, JSON.stringify(v));
    }, []);

    const setInterests = useCallback(async (i: Interest[]) => {
      setInterestsState(i);
      await AsyncStorage.setItem(STORAGE_KEYS.INTERESTS, JSON.stringify(i));
    }, []);

    const addArticle = useCallback(async (article: Article) => {
      setArticles((prev) => {
        const updated = [article, ...prev];
        AsyncStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(updated));
        return updated;
      });
    }, []);

    const removeArticle = useCallback(async (id: string) => {
      setArticles((prev) => {
        const updated = prev.filter((a) => a.id !== id);
        AsyncStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(updated));
        return updated;
      });
    }, []);

    const markArticleRead = useCallback(
      async (id: string, wordsRead: number, timeMinutes: number) => {
        setArticles((prev) => {
          const updated = prev.map((a) =>
            a.id === id ? { ...a, isRead: true } : a
          );
          AsyncStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(updated));
          return updated;
        });
        setStats((prev) => {
          const today = new Date().toDateString();
          const streak =
            prev.lastReadDate === today
              ? prev.currentStreak
              : prev.lastReadDate ===
                  new Date(Date.now() - 86400000).toDateString()
                ? prev.currentStreak + 1
                : 1;
          const updated = {
            ...prev,
            articlesRead: prev.articlesRead + 1,
            totalWordsRead: prev.totalWordsRead + wordsRead,
            totalTimeMinutes: prev.totalTimeMinutes + timeMinutes,
            currentStreak: streak,
            lastReadDate: today,
            avgReadingSpeed: wordsRead > 0 && timeMinutes > 0
              ? Math.round(wordsRead / timeMinutes)
              : prev.avgReadingSpeed,
          };
          AsyncStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(updated));
          return updated;
        });
      },
      []
    );

    const saveInsight = useCallback(async (insight: Insight) => {
      setSavedInsights((prev) => {
        const updated = [insight, ...prev];
        AsyncStorage.setItem(STORAGE_KEYS.INSIGHTS, JSON.stringify(updated));
        return updated;
      });
      setStats((prev) => {
        const updated = { ...prev, insightsSaved: prev.insightsSaved + 1 };
        AsyncStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(updated));
        return updated;
      });
    }, []);

    const removeInsight = useCallback(async (id: string) => {
      setSavedInsights((prev) => {
        const updated = prev.filter((i) => i.id !== id);
        AsyncStorage.setItem(STORAGE_KEYS.INSIGHTS, JSON.stringify(updated));
        return updated;
      });
    }, []);

    const setCurrentReadingSpeed = useCallback(async (wpm: number) => {
      setSpeedState(wpm);
      await AsyncStorage.setItem(
        STORAGE_KEYS.READING_SPEED,
        JSON.stringify(wpm)
      );
    }, []);

    return {
      onboarded,
      interests,
      articles,
      savedInsights,
      stats,
      currentReadingSpeed,
      darkMode: true,
      setOnboarded,
      setInterests,
      addArticle,
      markArticleRead,
      saveInsight,
      removeInsight,
      setCurrentReadingSpeed,
      removeArticle,
    };
  }
);

export { AppContextProvider, useAppContext };
