import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { colors } from '@/theme/colors';

export function LegalCopy() {
  const { t } = useTranslation();

  return (
    <View style={styles.box}>
      <View style={styles.icon}>
        <Text style={styles.iconMark}>i</Text>
      </View>
      <Text style={styles.text}>{t('consultation.privacy')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: colors.privacyBg,
    borderColor: colors.privacyBorder,
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginTop: 12,
    marginBottom: 8,
  },
  icon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.heroGold,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  iconMark: {
    color: colors.surface,
    fontSize: 12,
    fontWeight: '700',
  },
  text: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    color: colors.inkMuted,
  },
});
