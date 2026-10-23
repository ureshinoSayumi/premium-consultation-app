import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import { colors } from '@/theme/colors';

type Props = {
  status: 'loading' | 'error';
  onRetry?: () => void;
};

/** Inline loading / error — PRD error: i icon + Oops! + body + Retry (not Close). */
export function QueryStateView({ status, onRetry }: Props) {
  const { t } = useTranslation();

  if (status === 'loading') {
    return (
      <View style={styles.box}>
        <ActivityIndicator color={colors.ink} />
        <Text style={styles.loadingText}>{t('consultation.loading')}</Text>
      </View>
    );
  }

  return (
    <View style={styles.errorBox}>
      <View style={styles.icon}>
        <Text style={styles.iconMark}>i</Text>
      </View>
      <Text style={styles.heading}>{t('consultation.errorHeading')}</Text>
      <Text style={styles.body}>{t('consultation.errorTitle')}</Text>
      <Pressable
        style={({ pressed }) => [styles.retry, pressed && styles.retryPressed]}
        onPress={onRetry}
        accessibilityRole="button"
      >
        <Text style={styles.retryLabel}>{t('consultation.retry')}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    paddingVertical: 28,
    alignItems: 'center',
    gap: 12,
  },
  loadingText: {
    color: colors.inkMuted,
    fontSize: 14,
  },
  errorBox: {
    paddingVertical: 28,
    paddingHorizontal: 16,
    alignItems: 'center',
    gap: 10,
  },
  icon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  iconMark: {
    color: colors.surface,
    fontSize: 18,
    fontWeight: '700',
  },
  heading: {
    color: colors.ink,
    fontSize: 28,
    fontWeight: '800',
  },
  body: {
    color: colors.inkMuted,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 8,
  },
  retry: {
    alignSelf: 'stretch',
    backgroundColor: colors.accent,
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: 'center',
  },
  retryPressed: {
    opacity: 0.85,
  },
  retryLabel: {
    color: colors.surface,
    fontWeight: '700',
    fontSize: 16,
  },
});
