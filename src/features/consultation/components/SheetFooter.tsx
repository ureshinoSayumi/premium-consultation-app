import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { colors } from '@/theme/colors';
import {
  openBookingExternally,
  openBookingInApp,
  openWhatsApp,
} from '../actions';

type Props = {
  bottomInset?: number;
};

/** Sticky bottom bar — always visible per PRD. */
export function SheetFooter({ bottomInset = 0 }: Props) {
  const { t } = useTranslation();

  return (
    <View style={[styles.footer, { paddingBottom: Math.max(bottomInset, 12) }]}>
      <Text style={styles.hoursTitle}>{t('consultation.serviceHoursTitle')}</Text>
      <Text style={styles.hoursLine}>{t('consultation.serviceHoursWeekday')}</Text>
      <Text style={styles.hoursMuted}>{t('consultation.serviceHoursWeekend')}</Text>

      <Pressable
        style={({ pressed }) => [styles.primary, pressed && styles.pressed]}
        onPress={() => void openBookingInApp()}
        accessibilityRole="button"
      >
        <Text style={styles.primaryLabel}>{t('consultation.bookNow')}</Text>
      </Pressable>

      <Pressable onPress={() => void openBookingExternally()} accessibilityRole="link">
        <Text style={styles.link}>{t('consultation.openExternally')}</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [styles.primary, pressed && styles.pressed]}
        onPress={() => void openWhatsApp(t('whatsapp.prefill'))}
        accessibilityRole="button"
      >
        <Text style={styles.primaryLabel}>{t('consultation.whatsapp')}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    paddingTop: 12,
    paddingHorizontal: 20,
    gap: 2,
    backgroundColor: colors.surface,
  },
  hoursTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.ink,
  },
  hoursLine: {
    fontSize: 13,
    color: colors.inkMuted,
  },
  hoursMuted: {
    fontSize: 13,
    color: colors.inkMuted,
    marginBottom: 10,
  },
  primary: {
    backgroundColor: colors.accent,
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  pressed: {
    opacity: 0.88,
  },
  primaryLabel: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: '700',
  },
  link: {
    alignSelf: 'center',
    color: colors.link,
    fontSize: 13,
    textDecorationLine: 'underline',
    paddingVertical: 8,
  },
});
