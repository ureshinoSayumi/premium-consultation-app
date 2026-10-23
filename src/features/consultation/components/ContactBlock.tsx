import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { colors } from '@/theme/colors';
import { CONTACT } from '../constants';
import { dialHotline, openEmail } from '../actions';

export function ContactBlock() {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language.startsWith('zh');

  if (isZh) {
    // PRD ZH: one paragraph with tappable phone + email inline.
    return (
      <View style={styles.wrap}>
        <Text style={styles.paragraph}>
          {t('consultation.contactBodyBeforePhone')}
          <Text style={styles.link} onPress={() => void dialHotline()}>
            {CONTACT.phoneDisplay.replace(/ /g, '')}
          </Text>
          {t('consultation.contactBodyBetween')}
          <Text style={styles.link} onPress={() => void openEmail()}>
            {CONTACT.email}
          </Text>
          {t('consultation.contactBodyAfterEmail')}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.wrap}>
      <Text style={styles.intro}>{t('consultation.contactIntro')}</Text>
      <View style={styles.row}>
        <Text style={styles.label}>{t('consultation.hotline')}: </Text>
        <Pressable onPress={() => void dialHotline()} accessibilityRole="link">
          <Text style={styles.link}>{CONTACT.phoneDisplay}</Text>
        </Pressable>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>{t('consultation.email')}: </Text>
        <Pressable onPress={() => void openEmail()} accessibilityRole="link">
          <Text style={styles.link}>{CONTACT.email}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 8,
    paddingTop: 12,
  },
  intro: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.inkMuted,
    marginBottom: 4,
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.inkMuted,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.ink,
  },
  link: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.link,
    textDecorationLine: 'underline',
  },
});
