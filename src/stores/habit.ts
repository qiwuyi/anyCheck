import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Habit, CheckIn } from '../types';
import { storageService } from '../services/storage';
import dayjs from 'dayjs';

export const useHabitStore = defineStore('habit', () => {
  const habits = ref<Habit[]>([]);
  // Store checkins by month: { "2024_01": { "2024-01-26": [CheckIn, ...] } }
  const checkIns = ref<Record<string, Record<string, CheckIn[]>>>({});
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // 初始化
  const init = () => {
    try {
      habits.value = storageService.getHabits();
      // Load current month checkins
      const currentMonth = dayjs().format('YYYY_MM');
      loadMonthCheckIns(currentMonth);
    } catch (e) {
      console.error('初始化失败', e);
      error.value = '加载数据失败，请刷新重试';
    }
  };

  const loadMonthCheckIns = (month: string) => {
    if (!checkIns.value[month]) {
      checkIns.value[month] = storageService.getCheckIns(month);
    }
  };

  // 添加习惯
  const addHabit = async (habit: Omit<Habit, 'id' | 'createdAt' | 'updatedAt'>) => {
    isLoading.value = true;
    error.value = null;
    try {
      const newHabit: Habit = {
        ...habit,
        id: Date.now().toString(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      habits.value.push(newHabit);
      storageService.saveHabits(habits.value);
      return newHabit;
    } catch (e) {
      console.error('添加习惯失败', e);
      error.value = '添加习惯失败，请重试';
      throw e;
    } finally {
      isLoading.value = false;
    }
  };

  // 更新习惯
  const updateHabit = async (id: string, updates: Partial<Omit<Habit, 'id' | 'createdAt' | 'updatedAt'>>) => {
    isLoading.value = true;
    error.value = null;
    try {
      const index = habits.value.findIndex(h => h.id === id);
      if (index !== -1) {
        habits.value[index] = { ...habits.value[index], ...updates, updatedAt: Date.now() };
        storageService.saveHabits(habits.value);
      }
    } catch (e) {
      console.error('更新习惯失败', e);
      error.value = '更新习惯失败，请重试';
      throw e;
    } finally {
      isLoading.value = false;
    }
  };

  // 删除习惯
  const deleteHabit = async (id: string) => {
    isLoading.value = true;
    error.value = null;
    try {
      habits.value = habits.value.filter(h => h.id !== id);
      storageService.saveHabits(habits.value);
    } catch (e) {
      console.error('删除习惯失败', e);
      error.value = '删除习惯失败，请重试';
      throw e;
    } finally {
      isLoading.value = false;
    }
  };

  // 打卡
  const checkIn = async (habitId: string) => {
    isLoading.value = true;
    error.value = null;
    try {
      const now = dayjs();
      const dateStr = now.format('YYYY-MM-DD');
      const monthStr = now.format('YYYY_MM');

      if (!checkIns.value[monthStr]) {
        checkIns.value[monthStr] = storageService.getCheckIns(monthStr);
      }

      // Ensure the date array exists
      if (!checkIns.value[monthStr][dateStr]) {
        checkIns.value[monthStr][dateStr] = [];
      }

      const dailyCheckIns = checkIns.value[monthStr][dateStr];

      let record = dailyCheckIns.find(c => c.habitId === habitId);

      if (record) {
        record.count++;
        record.timestamp = Date.now();
      } else {
        record = {
          id: Date.now().toString(),
          habitId,
          date: dateStr,
          count: 1,
          timestamp: Date.now()
        };
        dailyCheckIns.push(record);
      }

      // Save to storage
      storageService.saveCheckIns(monthStr, checkIns.value[monthStr]);
    } catch (e) {
      console.error('打卡失败', e);
      error.value = '打卡失败，请重试';
      throw e;
    } finally {
      isLoading.value = false;
    }
  };

  // 获取某日习惯的完成次数
  const getHabitStatus = (habitId: string, date: string) => {
    const monthStr = dayjs(date).format('YYYY_MM');
    // We might need to load the month if not loaded, but for synchronous usage in template, 
    // it's better to ensure data is loaded beforehand or handle undefined.
    const dailyCheckIns = checkIns.value[monthStr]?.[date] || [];
    const record = dailyCheckIns.find(c => c.habitId === habitId);
    return record ? record.count : 0;
  };

  // 获取某日所有打卡记录
  const getDailyCheckIns = (date: string) => {
    const monthStr = dayjs(date).format('YYYY_MM');
    return checkIns.value[monthStr]?.[date] || [];
  }

  // 根据ID获取习惯
  const getHabitById = (id: string) => {
    return habits.value.find(h => h.id === id);
  }

  return {
    habits,
    checkIns,
    isLoading,
    error,
    init,
    loadMonthCheckIns,
    addHabit,
    updateHabit,
    deleteHabit,
    checkIn,
    getHabitStatus,
    getDailyCheckIns,
    getHabitById
  };
});
