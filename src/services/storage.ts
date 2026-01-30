import type { Habit, CheckIn } from '../types';

const KEYS = {
  HABITS: 'anycheck_habits',
  CHECKINS_PREFIX: 'anycheck_checkins_', // followed by YYYY_MM
};

export const storageService = {
  // 获取所有习惯
  getHabits(): Habit[] {
    try {
      const data = uni.getStorageSync(KEYS.HABITS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Failed to get habits', e);
      return [];
    }
  },

  // 保存所有习惯
  saveHabits(habits: Habit[]): void {
    try {
      uni.setStorageSync(KEYS.HABITS, JSON.stringify(habits));
    } catch (e) {
      console.error('Failed to save habits', e);
    }
  },

  // 获取某个月的打卡记录
  // month format: YYYY_MM
  getCheckIns(month: string): Record<string, CheckIn[]> {
    try {
      const key = `${KEYS.CHECKINS_PREFIX}${month}`;
      const data = uni.getStorageSync(key);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      console.error(`Failed to get checkins for ${month}`, e);
      return {};
    }
  },

  // 保存某个月的打卡记录
  saveCheckIns(month: string, checkIns: Record<string, CheckIn[]>): void {
    try {
      const key = `${KEYS.CHECKINS_PREFIX}${month}`;
      uni.setStorageSync(key, JSON.stringify(checkIns));
    } catch (e) {
      console.error(`Failed to save checkins for ${month}`, e);
    }
  }
};
