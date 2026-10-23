import { Image, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { setFetchSimulationMode } from '@/data/specialists';
import { ConsultationSheet } from '@/features/consultation/components/ConsultationSheet';
import { useSpecialists } from '@/features/consultation/hooks/useSpecialists';
import { useSpecialistsInfinite } from '@/features/consultation/hooks/useSpecialistsInfinite';
import { useFeatureFlags } from '@/features/feature-flag/FeatureFlagContext';
import { colors } from '@/theme/colors';

const heroImage = require('../../assets/hero-specialists.png');

/**
 * Banner height as a fraction of width. Tall enough that the circle's upper arc
 * stays fully inside the viewport (cover on a short band was cropping it).
 */
const HERO_HEIGHT_RATIO = 0.78;

export default function ConsultationScreen() {
  const insets = useSafeAreaInsets();
  const { width: windowWidth } = useWindowDimensions();
  const { listMode } = useFeatureFlags();

  const isInfinite = listMode === 'infinite';
  const plain = useSpecialists({ enabled: !isInfinite });
  const infinite = useSpecialistsInfinite({ enabled: isInfinite });

  const specialists = isInfinite
    ? (infinite.data?.pages.flatMap((page) => page.items) ?? [])
    : (plain.data ?? []);
  const isLoading = isInfinite ? infinite.isPending : plain.isPending;
  const isError = isInfinite ? infinite.isError : plain.isError;
  const onRetry = () => {
    setFetchSimulationMode('success');
    if (isInfinite) {
      void infinite.refetch();
    } else {
      void plain.refetch();
    }
  };

  const heroHeight = windowWidth * HERO_HEIGHT_RATIO + insets.top;

  return (
    <View style={styles.screen}>
      <View style={[styles.hero, { height: heroHeight }]}>
        {/*
          1:1 asset drawn at full width so the circle isn't cropped by cover.
          Top-aligned under the status bar so the upper arc stays visible;
          overflow clips only the lower part (sheet covers that anyway).
        */}
        <Image
          source={heroImage}
          style={[
            styles.heroImage,
            {
              top: insets.top * 0.25,
              width: windowWidth,
              height: windowWidth,
            },
          ]}
          resizeMode="contain"
        />
        <View style={styles.heroWash} pointerEvents="none" />

        {/* PRD: back is visible but a no-op */}
        <Pressable
          style={[styles.backHit, { top: insets.top + 4 }]}
          onPress={() => undefined}
          hitSlop={12}
          accessibilityRole="button"
        >
          <Text style={styles.back}>{'‹'}</Text>
        </Pressable>
      </View>

      <ConsultationSheet
        specialists={specialists}
        isLoading={isLoading}
        isError={isError}
        onRetry={onRetry}
        isInfinite={isInfinite}
        isFetchingNextPage={isInfinite ? infinite.isFetchingNextPage : undefined}
        hasNextPage={isInfinite ? Boolean(infinite.hasNextPage) : undefined}
        bottomInset={insets.bottom}
        onEndReached={
          isInfinite
            ? () => {
                if (infinite.hasNextPage && !infinite.isFetchingNextPage) {
                  void infinite.fetchNextPage();
                }
              }
            : undefined
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.heroGold,
  },
  hero: {
    width: '100%',
    overflow: 'hidden',
    backgroundColor: colors.heroGoldDeep,
  },
  heroImage: {
    position: 'absolute',
    left: 0,
  },
  heroWash: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  backHit: {
    position: 'absolute',
    left: 12,
    zIndex: 2,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  back: {
    color: colors.surface,
    fontSize: 34,
    fontWeight: '300',
    lineHeight: 38,
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
