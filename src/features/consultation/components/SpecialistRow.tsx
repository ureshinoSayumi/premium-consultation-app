import { Image, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import type { Specialist } from '@/data/specialists';
import { colors } from '@/theme/colors';

type Props = {
  specialist: Specialist;
};

/** Figma: square photo placeholder + name in a light card. Static — no press. */
export function SpecialistRow({ specialist }: Props) {
  const { i18n } = useTranslation();
  const isZh = i18n.language.startsWith('zh');
  const name = isZh ? specialist.nameZh : specialist.nameEn;
  const hasPhoto = Boolean(specialist.photoUrl);

  return (
    <View style={styles.card}>
      {hasPhoto ? (
        <Image source={{ uri: specialist.photoUrl }} style={styles.photo} />
      ) : (
        <View style={[styles.photo, styles.photoPlaceholder]} />
      )}
      <Text style={styles.name}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    // Soft card elevation (Figma)
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  photo: {
    width: 56,
    height: 56,
    borderRadius: 6,
    backgroundColor: colors.photoPlaceholder,
  },
  photoPlaceholder: {
    backgroundColor: colors.photoPlaceholder,
  },
  name: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: colors.ink,
  },
});
