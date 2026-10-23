import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useCallback, useMemo, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import type { Specialist } from '@/data/specialists';
import { colors } from '@/theme/colors';
import { ContactBlock } from './ContactBlock';
import { LegalCopy } from './LegalCopy';
import { QueryStateView } from './QueryStateView';
import { SheetFooter } from './SheetFooter';
import { SpecialistList } from './SpecialistList';

type Props = {
  specialists: Specialist[];
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
  isInfinite?: boolean;
  isFetchingNextPage?: boolean;
  hasNextPage?: boolean;
  onEndReached?: () => void;
  bottomInset?: number;
};

/**
 * White sheet panel (gorhom Bottom Sheet for scroll) + sticky footer sibling.
 * PRD: service hours & CTAs always visible — footer is outside the scroll view.
 */
export function ConsultationSheet({
  specialists,
  isLoading,
  isError,
  onRetry,
  isInfinite = false,
  isFetchingNextPage,
  hasNextPage,
  onEndReached,
  bottomInset = 0,
}: Props) {
  const { t } = useTranslation();
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['100%'], []);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (!onEndReached || !hasNextPage || isFetchingNextPage) {
        return;
      }
      const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
      const distanceFromEnd =
        contentSize.height - (layoutMeasurement.height + contentOffset.y);
      if (distanceFromEnd < 120) {
        onEndReached();
      }
    },
    [hasNextPage, isFetchingNextPage, onEndReached],
  );

  return (
    <View style={styles.panel}>
      <View style={styles.sheetHost}>
        <BottomSheet
          ref={sheetRef}
          index={0}
          snapPoints={snapPoints}
          enablePanDownToClose={false}
          enableOverDrag={false}
          enableHandlePanningGesture={false}
          handleIndicatorStyle={styles.handle}
          backgroundStyle={styles.sheetBg}
          style={styles.sheet}
        >
          <BottomSheetScrollView
            contentContainerStyle={styles.scrollContent}
            onScroll={handleScroll}
          >
            <Text style={styles.eyebrow}>{t('consultation.eyebrow')}</Text>
            <Text style={styles.headline}>{t('consultation.headline')}</Text>
            <Text style={styles.subheadline}>{t('consultation.subheadline')}</Text>

            {isLoading ? <QueryStateView status="loading" /> : null}
            {isError ? <QueryStateView status="error" onRetry={onRetry} /> : null}
            {!isLoading && !isError ? (
              <>
                <SpecialistList
                  specialists={specialists}
                  isFetchingNextPage={isFetchingNextPage}
                  hasNextPage={hasNextPage}
                  showEndOfList={isInfinite}
                />
                <ContactBlock />
                <LegalCopy />
              </>
            ) : null}
          </BottomSheetScrollView>
        </BottomSheet>
      </View>

      {/* Sticky — not inside ScrollView; visible without expanding the sheet */}
      <SheetFooter bottomInset={bottomInset} />
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    flex: 1,
    backgroundColor: colors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  sheetHost: {
    flex: 1,
  },
  sheet: {
    flex: 1,
  },
  handle: {
    backgroundColor: colors.sheetHandle,
    width: 42,
  },
  sheetBg: {
    backgroundColor: colors.surface,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 20,
    gap: 8,
  },
  eyebrow: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.ink,
  },
  headline: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.ink,
    letterSpacing: -0.3,
    marginTop: 2,
  },
  subheadline: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.inkMuted,
    marginBottom: 12,
  },
});

