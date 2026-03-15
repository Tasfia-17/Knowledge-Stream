import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

function FloatingOrb({
  color,
  size,
  initialX,
  initialY,
  duration,
  delay,
}: {
  color: string;
  size: number;
  initialX: number;
  initialY: number;
  duration: number;
  delay: number;
}) {
  const x = useRef(new Animated.Value(initialX)).current;
  const y = useRef(new Animated.Value(initialY)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(delay),
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0.6,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.loop(
          Animated.sequence([
            Animated.parallel([
              Animated.timing(x, {
                toValue: initialX + (Math.random() - 0.5) * 80,
                duration,
                useNativeDriver: true,
              }),
              Animated.timing(y, {
                toValue: initialY + (Math.random() - 0.5) * 80,
                duration,
                useNativeDriver: true,
              }),
            ]),
            Animated.parallel([
              Animated.timing(x, {
                toValue: initialX + (Math.random() - 0.5) * 80,
                duration,
                useNativeDriver: true,
              }),
              Animated.timing(y, {
                toValue: initialY + (Math.random() - 0.5) * 80,
                duration,
                useNativeDriver: true,
              }),
            ]),
          ])
        ),
      ]),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.orb,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          transform: [{ translateX: x }, { translateY: y }],
          opacity,
        },
      ]}
    />
  );
}

export function AnimatedBackground() {
  return (
    <View style={styles.container} pointerEvents="none">
      <FloatingOrb
        color="rgba(79,142,247,0.15)"
        size={300}
        initialX={-50}
        initialY={-50}
        duration={8000}
        delay={0}
      />
      <FloatingOrb
        color="rgba(108,62,247,0.12)"
        size={250}
        initialX={width - 150}
        initialY={height / 3}
        duration={10000}
        delay={1000}
      />
      <FloatingOrb
        color="rgba(0,229,255,0.08)"
        size={200}
        initialX={width / 2 - 100}
        initialY={height - 300}
        duration={7000}
        delay={2000}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
  },
  orb: {
    position: "absolute",
    filter: "blur(60px)",
  },
});
