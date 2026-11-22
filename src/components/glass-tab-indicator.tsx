import { useEffect } from "react";
import { I18nManager, StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function GlassTabIndicator({ guideSelected }: { guideSelected: boolean }) {
  const insets = useSafeAreaInsets();
  const sideInset = Math.max(insets.left, insets.right);
  const position = useSharedValue(guideSelected ? 100 : 0);

  useEffect(() => {
    position.value = withTiming(guideSelected ? 100 : 0, {
      duration: 140,
      easing: Easing.out(Easing.cubic),
      reduceMotion: ReduceMotion.System,
    });
  }, [guideSelected, position]);

  const movement = useAnimatedStyle(() => ({
    transform: [{ translateX: `${I18nManager.isRTL ? -position.value : position.value}%` }],
  }));

  return (
    <View
      aria-hidden
      style={[
        StyleSheet.absoluteFill,
        { bottom: insets.bottom, left: sideInset, right: sideInset },
      ]}
    >
      <Animated.View style={[styles.track, movement]}>
        <View style={styles.glass}>
          <View style={styles.highlight} />
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  track: { width: "50%", height: "100%", paddingHorizontal: 8, paddingVertical: 4 },
  glass: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(213, 200, 255, 0.62)",
    backgroundColor: "rgba(213, 200, 255, 0.20)",
    overflow: "hidden",
  },
  highlight: {
    height: "45%",
    backgroundColor: "rgba(250, 249, 255, 0.08)",
  },
});
