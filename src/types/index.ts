// 习惯实体
export interface Habit {
  id: string;
  name: string;
  icon: string;
  color: string;
  targetCount: number; // 每日目标次数
  createdAt: number;
  updatedAt: number;
}

// 打卡记录实体
export interface CheckIn {
  id: string;
  habitId: string;
  date: string; // YYYY-MM-DD
  count: number; // 当日完成次数
  timestamp: number;
}

// 统计数据
export interface Stats {
  habitId: string;
  currentStreak: number; // 连续打卡天数
  longestStreak: number; // 最长连续天数
  totalDays: number; // 总打卡天数
  completionRate: number; // 完成率
}
