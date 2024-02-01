import { PersistOptions, devtools, persist } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import { StateCreator } from 'zustand/vanilla';
import { GlobalState, initialState } from './initialState';
import { CommonAction, createCommonAction } from './slices/common/action';
import { SettingsAction, createSettingsAction } from './slices/settings/action';

export type GlobalStore = GlobalState & CommonAction & SettingsAction;

const createStore: StateCreator<GlobalStore, [['zustand/devtools', never]]> = (...parameters) => ({
  ...initialState,
  ...createCommonAction(...parameters),
  ...createSettingsAction(...parameters),
});

type GlobalPersist = Pick<GlobalStore, 'mainPageActiveTab'>;

// local-storage Options
const persistOptions: PersistOptions<GlobalStore, GlobalPersist> = {
  name: 'Chat2DB_Global',
  partialize: (state) => ({
    mainPageActiveTab: state.mainPageActiveTab,
  }),
};

export const useGlobalStore = createWithEqualityFn<GlobalStore>()(
  persist(
    devtools(createStore, {
      name: 'Chat2DB_Global',
    }),
    persistOptions,
  ),
  shallow,
);