import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

import {
  getFetchSimulationMode,
  setFetchSimulationMode,
} from '@/data/specialists';
import { ComingSoonDialog } from '@/features/dialog/ComingSoonDialog';
import { useSingleDialog } from '@/features/dialog/useSingleDialog';
import {
  useFeatureFlags,
  usePremiumConsultationGate,
} from '@/features/feature-flag/FeatureFlagContext';
import { colors } from '@/theme/colors';

const COMING_SOON_KEY = 'coming-soon';

export default function HomeScreen() {
  const { t, i18n } = useTranslation();
  const insets = useSafeAreaInsets();
  const { enabled, setEnabled } = usePremiumConsultationGate();
  const { listMode, setListMode } = useFeatureFlags();
  const comingSoon = useSingleDialog({ key: COMING_SOON_KEY });
  const [forceError, setForceError] = useState(getFetchSimulationMode() === 'error');

  const openConsultation = () => {
    if (!enabled) {
      comingSoon.open();
      return;
    }
    router.push('/consultation');
  };

  return (
    <View style={[styles.screen, { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 16 }]}>
      <Text style={styles.brand}>GUM</Text>
      <Text style={styles.title}>{t('home.title')}</Text>
      <Text style={styles.subtitle}>{t('home.subtitle')}</Text>

      <Pressable
        style={({ pressed }) => [styles.cta, pressed && styles.pressed]}
        onPress={openConsultation}
        accessibilityRole="button"
        testID="open-consultation"
      >
        <Text style={styles.ctaLabel}>{t('home.openConsultation')}</Text>
      </Pressable>

      <View style={styles.panel}>
        <Row
          label={t('home.featureFlag')}
          hint={t('home.featureFlagHint')}
          value={enabled}
          onValueChange={setEnabled}
        />

        <View style={styles.divider} />

        <Text style={styles.rowLabel}>{t('home.language')}</Text>
        <View style={styles.segment}>
          <Segment
            active={i18n.language === 'en'}
            label="EN"
            onPress={() => void i18n.changeLanguage('en')}
          />
          <Segment
            active={i18n.language.startsWith('zh')}
            label="ZH"
            onPress={() => void i18n.changeLanguage('zh')}
          />
        </View>

        <View style={styles.divider} />

        <Text style={styles.rowLabel}>{t('home.listMode')}</Text>
        <View style={styles.segment}>
          <Segment
            active={listMode === 'plain'}
            label={t('home.listModePlain')}
            onPress={() => setListMode('plain')}
          />
          <Segment
            active={listMode === 'infinite'}
            label={t('home.listModeInfinite')}
            onPress={() => setListMode('infinite')}
          />
        </View>

        <View style={styles.divider} />

        <Row
          label={t('home.forceError')}
          hint={t('home.forceErrorHint')}
          value={forceError}
          onValueChange={(next) => {
            setForceError(next);
            setFetchSimulationMode(next ? 'error' : 'success');
          }}
        />
      </View>

      <ComingSoonDialog visible={comingSoon.visible} onClose={comingSoon.close} />
    </View>
  );
}

function Row({
  label,
  hint,
  value,
  onValueChange,
}: {
  label: string;
  hint: string;
  value: boolean;
  onValueChange: (next: boolean) => void;
}) {
  return (
    <View style={styles.row}>
      <View style={styles.rowText}>
        <Text style={styles.rowLabel}>{label}</Text>
        <Text style={styles.rowHint}>{hint}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: colors.border, true: colors.ink }}
      />
    </View>
  );
}

function Segment({
  active,
  label,
  onPress,
}: {
  active: boolean;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.segmentItem, active && styles.segmentItemActive]}
    >
      <Text style={[styles.segmentLabel, active && styles.segmentLabelActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 24,
  },
  brand: {
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 3,
    color: colors.inkSoft,
    marginBottom: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.ink,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.inkMuted,
    marginBottom: 28,
  },
  cta: {
    backgroundColor: colors.accent,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 28,
  },
  pressed: {
    opacity: 0.88,
  },
  ctaLabel: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: '700',
  },
  panel: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    gap: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rowText: {
    flex: 1,
    gap: 4,
  },
  rowLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.ink,
  },
  rowHint: {
    fontSize: 12,
    color: colors.inkSoft,
    lineHeight: 17,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
  },
  segment: {
    flexDirection: 'row',
    gap: 8,
  },
  segmentItem: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 10,
    alignItems: 'center',
  },
  segmentItemActive: {
    backgroundColor: colors.ink,
    borderColor: colors.ink,
  },
  segmentLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.inkMuted,
  },
  segmentLabelActive: {
    color: colors.surface,
  },
});
