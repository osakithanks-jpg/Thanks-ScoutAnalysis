// サンクスパートナーズ グローバルアプリケーションコンテキスト
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Staff } from '../types';
import {
  fetchStaffList,
  getStoredStaffId,
  setStoredStaffId,
  getStoredAdminSession,
  setStoredAdminSession,
  subscribeDataChanges,
  seedInitialMediaIfNeeded,
} from '../services/storageService';
import { getTodayJST } from '../utils/dateUtils';

interface AppContextType {
  currentStaff: Staff | null;
  setCurrentStaffId: (staffId: string) => void;
  staffList: Staff[];
  isAdminMode: boolean;
  setIsAdminMode: (admin: boolean) => void;
  inputDate: string;
  setInputDate: (date: string) => void;
  isStaffModalOpen: boolean;
  setIsStaffModalOpen: (open: boolean) => void;
  isAdminAuthModalOpen: boolean;
  setIsAdminAuthModalOpen: (open: boolean) => void;
  isUsageGuideOpen: boolean;
  setIsUsageGuideOpen: (open: boolean) => void;
  refreshData: () => Promise<void>;
  currentView: string;
  setCurrentView: (view: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [currentStaff, setCurrentStaff] = useState<Staff | null>(null);
  const [isAdminMode, setIsAdminModeState] = useState<boolean>(getStoredAdminSession());
  const [inputDate, setInputDate] = useState<string>(getTodayJST());
  const [currentView, setCurrentView] = useState<string>('daily_input');

  const [isStaffModalOpen, setIsStaffModalOpen] = useState<boolean>(false);
  const [isAdminAuthModalOpen, setIsAdminAuthModalOpen] = useState<boolean>(false);
  const [isUsageGuideOpen, setIsUsageGuideOpen] = useState<boolean>(false);

  const loadStaffData = async () => {
    await seedInitialMediaIfNeeded();
    const list = await fetchStaffList();
    setStaffList(list);

    const storedId = getStoredStaffId();
    if (storedId) {
      const found = list.find((s) => s.staffId === storedId && s.status === 'active');
      if (found) {
        setCurrentStaff(found);
      } else {
        setIsStaffModalOpen(true);
      }
    } else {
      setIsStaffModalOpen(true);
    }
  };

  useEffect(() => {
    loadStaffData();
    const unsubscribe = subscribeDataChanges(() => {
      loadStaffData();
    });
    return () => unsubscribe();
  }, []);

  const handleSetCurrentStaffId = (staffId: string) => {
    setStoredStaffId(staffId);
    const found = staffList.find((s) => s.staffId === staffId);
    if (found) {
      setCurrentStaff(found);
    }
    setIsStaffModalOpen(false);
  };

  const setIsAdminMode = (active: boolean) => {
    setIsAdminModeState(active);
    setStoredAdminSession(active);
  };

  const refreshData = async () => {
    await loadStaffData();
  };

  return (
    <AppContext.Provider
      value={{
        currentStaff,
        setCurrentStaffId: handleSetCurrentStaffId,
        staffList,
        isAdminMode,
        setIsAdminMode,
        inputDate,
        setInputDate,
        isStaffModalOpen,
        setIsStaffModalOpen,
        isAdminAuthModalOpen,
        setIsAdminAuthModalOpen,
        isUsageGuideOpen,
        setIsUsageGuideOpen,
        refreshData,
        currentView,
        setCurrentView,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useApp(): AppContextType {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
