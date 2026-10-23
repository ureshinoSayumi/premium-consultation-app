import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import type { Specialist } from '@/data/specialists';
import { colors } from '@/theme/colors';
import { SpecialistRow } from './SpecialistRow';

type Props = {
  specialists: Specialist[];
  isFetchingNextPage?: boolean;
  /** Only pass when infinite mode — plain list must not show end label. */
  hasNextPage?: boolean;
  showEndOfList?: boolean;
};

export function SpecialistList({
  specialists,
  isFetchingNextPage = false,
  hasNextPage,
  showEndOfList = false,
}: Props) {
  const { t } = useTranslation();

  return (
    <View style={styles.wrap}>
      {specialists.map((item) => (
        <SpecialistRow key={item.id} specialist={item} />
      ))}
      {isFetchingNextPage ? (
        <View style={styles.footer}>
          <ActivityIndicator color={colors.ink} />
          <Text style={styles.footerText}>{t('consultation.loadingMore')}</Text>
        </View>
      ) : null}
      {showEndOfList && hasNextPage === false && specialists.length > 0 && !isFetchingNextPage ? (
        <Text style={styles.end}>{t('consultation.endOfList')}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 10,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
  },
  footerText: {
    color: colors.inkMuted,
    fontSize: 13,
  },
  end: {
    textAlign: 'center',
    color: colors.inkSoft,
    fontSize: 12,
    paddingVertical: 8,
  },
});
