import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type SpecialistListMode = 'plain' | 'infinite';

type FeatureFlagState = {
  premiumConsultationEnabled: boolean;
  setPremiumConsultationEnabled: (enabled: boolean) => void;
  listMode: SpecialistListMode;
  setListMode: (mode: SpecialistListMode) => void;
};

const FeatureFlagContext = createContext<FeatureFlagState | null>(null);

export function FeatureFlagProvider({ children }: { children: ReactNode }) {
  const [premiumConsultationEnabled, setPremiumConsultationEnabled] = useState(true);
  const [listMode, setListMode] = useState<SpecialistListMode>('plain');

  const value = useMemo(
    () => ({
      premiumConsultationEnabled,
      setPremiumConsultationEnabled,
      listMode,
      setListMode,
    }),
    [premiumConsultationEnabled, listMode],
  );

  return (
    <FeatureFlagContext.Provider value={value}>{children}</FeatureFlagContext.Provider>
  );
}

export function useFeatureFlags() {
  const ctx = useContext(FeatureFlagContext);
  if (!ctx) {
    throw new Error('useFeatureFlags must be used within FeatureFlagProvider');
  }
  return ctx;
}

/** Convenience for the consultation entry button. */
export function usePremiumConsultationGate() {
  const { premiumConsultationEnabled, setPremiumConsultationEnabled } = useFeatureFlags();
  const toggle = useCallback(() => {
    setPremiumConsultationEnabled(!premiumConsultationEnabled);
  }, [premiumConsultationEnabled, setPremiumConsultationEnabled]);

  return { enabled: premiumConsultationEnabled, setEnabled: setPremiumConsultationEnabled, toggle };
}
