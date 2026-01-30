<template>
  <PageLayout>
    <view class="min-h-screen bg-[#FDF8F3] pb-40">
      <!-- 装饰背景 -->
      <view class="fixed top-20 right-0 w-40 h-40 bg-[#D4E4D1] rounded-full blur-3xl opacity-30 translate-x-1/2 pointer-events-none"></view>
      <view class="fixed bottom-0 left-0 w-56 h-56 bg-[#E8D5C4] rounded-full blur-3xl opacity-30 -translate-x-1/3 translate-y-1/3 pointer-events-none"></view>
      
      <!-- Header -->
      <view class="px-6 pt-12 pb-6 relative z-10">
        <view class="flex items-center justify-between">
          <view class="flex items-center">
            <view class="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mr-4 shadow-sm shadow-[#C17F59]/5 border border-[#F5EDE4]">
              <BarChart3 :size="24" class="text-[#C17F59]" />
            </view>
            <view>
              <view class="text-[28px] font-bold text-[#5C4A3D] leading-tight">成长记录</view>
              <view class="text-xs text-[#8B7355] mt-1 font-medium tracking-wide">见证每一天的进步</view>
            </view>
          </view>
        </view>
      </view>

      <!-- 连续打卡卡片 -->
      <view class="px-6 mb-6 relative z-10">
        <view class="relative bg-gradient-to-br from-[#C17F59] to-[#E8A598] rounded-[32px] p-6 shadow-xl shadow-[#C17F59]/20 overflow-hidden group active:scale-[0.98] transition-transform duration-300">
          <!-- 装饰圆 -->
          <view class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-sm"></view>
          <view class="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-sm"></view>
          
          <view class="relative flex items-center justify-between">
            <view>
              <view class="flex items-center text-white/90 text-xs font-bold mb-2 uppercase tracking-wider">
                <Flame :size="14" class="mr-1.5 fill-white/20" />
                当前连续打卡
              </view>
              <view class="flex items-baseline">
                <view class="text-6xl font-black text-white tracking-tight drop-shadow-sm">{{ currentStreak }}</view>
                <view class="text-white/90 text-lg font-bold ml-1.5">天</view>
              </view>
              <view class="text-white/80 text-xs mt-3 font-medium bg-white/10 py-1.5 px-3 rounded-full inline-block backdrop-blur-md">
                {{ streakMessage }}
              </view>
            </view>
            <view class="w-20 h-20 rounded-[24px] bg-white/20 flex items-center justify-center backdrop-blur-md shadow-inner border border-white/30">
              <Award :size="40" class="text-white drop-shadow-md" />
            </view>
          </view>
        </view>
      </view>

      <!-- 日历卡片 -->
      <view class="px-6 mb-6 relative z-10">
        <view class="bg-white/80 backdrop-blur-xl rounded-[32px] p-6 shadow-sm border border-white/60">
          <!-- 日历头部 -->
          <view class="flex justify-between items-center mb-6">
            <view class="flex items-center">
              <view class="bg-[#F5EDE4] p-2 rounded-xl mr-3">
                <Calendar :size="20" class="text-[#C17F59]" />
              </view>
              <view class="text-xl font-bold text-[#5C4A3D]">{{ currentYear }}年{{ currentMonth }}月</view>
            </view>
            <view class="flex space-x-2 bg-[#F9F5F0] p-1 rounded-full">
              <view 
                class="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white active:scale-90 transition-all cursor-pointer shadow-sm text-[#8B7355]" 
                @tap="changeMonth(-1)"
              >
                <ChevronLeft :size="20" />
              </view>
              <view 
                class="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white active:scale-90 transition-all cursor-pointer shadow-sm text-[#8B7355]" 
                @tap="changeMonth(1)"
              >
                <ChevronRight :size="20" />
              </view>
            </view>
          </view>

          <!-- 星期标题 -->
          <view class="grid grid-cols-7 gap-2 text-center mb-3">
            <view 
              v-for="day in weekDays" 
              :key="day" 
              class="text-[11px] font-bold py-1 uppercase tracking-wider"
              :class="day === '日' || day === '六' ? 'text-[#C17F59]/80' : 'text-[#8B7355]/60'"
            >
              {{ day }}
            </view>
          </view>

          <!-- 日历天数 -->
          <view class="grid grid-cols-7 gap-2">
            <view
              v-for="(date, index) in calendarDays"
              :key="index"
              class="aspect-square flex flex-col items-center justify-center rounded-2xl relative transition-all duration-300"
              :class="[
                date.isCurrentMonth ? '' : 'opacity-30 grayscale',
              ]"
            >
              <!-- 打卡背景 (High Contrast) -->
              <view
                v-if="hasCheckIn(date.dateString)"
                class="absolute inset-0 rounded-[18px] transition-all duration-300 shadow-sm"
                :class="getCheckInBgClass(date.dateString)"
              />
              
              <!-- 今天标记 (Better Ring) -->
              <view 
                v-if="isToday(date.dateString) && !hasCheckIn(date.dateString)"
                class="absolute inset-0 rounded-[18px] border-[2.5px] border-[#C17F59] opacity-80"
              />

              <!-- 日期数字 (Adaptive Color) -->
              <view 
                class="text-[13px] z-10 font-bold transition-colors duration-200"
                :class="getDateTextColor(date.dateString, date.isCurrentMonth)"
              >
                {{ date.day }}
              </view>

              <!-- 今天小点 (Only if check-in) -->
              <view 
                v-if="isToday(date.dateString) && hasCheckIn(date.dateString)"
                class="absolute bottom-1.5 w-1 h-1 rounded-full bg-white/80"
              />
            </view>
          </view>

          <!-- 图例 -->
          <view class="flex items-center justify-center mt-6 pt-5 border-t border-[#F5EDE4]/60">
            <view class="flex items-center space-x-5 text-[10px] font-medium text-[#8B7355]">
              <view class="flex items-center">
                <view class="w-2.5 h-2.5 rounded-full border border-[#C17F59] mr-1.5" />
                <span>今天</span>
              </view>
              <view class="flex items-center">
                <view class="w-2.5 h-2.5 rounded-full bg-[#E8D5C4] mr-1.5" />
                <span>1-2次</span>
              </view>
              <view class="flex items-center">
                <view class="w-2.5 h-2.5 rounded-full bg-[#C17F59] mr-1.5" />
                <span>3-5次</span>
              </view>
              <view class="flex items-center">
                <view class="w-2.5 h-2.5 rounded-full bg-[#7A8B6E] mr-1.5" />
                <span>5次+</span>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 统计概览 -->
      <view class="px-6 pb-8 relative z-10">
        <view class="bg-white/80 backdrop-blur-xl rounded-[32px] p-6 shadow-sm border border-white/60">
          <view class="flex items-center mb-5">
            <view class="bg-[#F5EDE4] p-2 rounded-xl mr-3">
              <PieChart :size="20" class="text-[#C17F59]" />
            </view>
            <view class="text-xl font-bold text-[#5C4A3D]">本月概览</view>
          </view>
          <view class="grid grid-cols-2 gap-4">
            <view class="bg-[#FDF8F3] p-5 rounded-[24px] border border-[#F5EDE4]">
              <view class="flex items-center mb-3">
                <view class="w-8 h-8 rounded-full bg-[#C17F59]/10 flex items-center justify-center mr-2.5">
                  <CheckCircle2 :size="16" class="text-[#C17F59]" />
                </view>
                <view class="text-xs text-[#8B7355] font-bold">本月打卡</view>
              </view>
              <view class="flex items-baseline">
                <view class="text-3xl font-bold text-[#5C4A3D]">{{ totalCheckIns }}</view>
                <view class="text-xs text-[#8B7355] ml-1">次</view>
              </view>
            </view>
            <view class="bg-[#F0E8E0]/50 p-5 rounded-[24px] border border-[#F5EDE4]">
              <view class="flex items-center mb-3">
                <view class="w-8 h-8 rounded-full bg-[#7A8B6E]/10 flex items-center justify-center mr-2.5">
                  <Activity :size="16" class="text-[#7A8B6E]" />
                </view>
                <view class="text-xs text-[#8B7355] font-bold">活跃习惯</view>
              </view>
              <view class="flex items-baseline">
                <view class="text-3xl font-bold text-[#5C4A3D]">{{ activeHabitCount }}</view>
                <view class="text-xs text-[#8B7355] ml-1">个</view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <FloatingAddButton />
      <CustomTabBar />
    </view>
  </PageLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { onShow } from '@dcloudio/uni-app';
import { storeToRefs } from 'pinia';
import dayjs from 'dayjs';
import { 
  ChevronLeft, ChevronRight, BarChart3, Calendar, 
  CheckCircle2, Activity, Flame, Award, PieChart, Plus 
} from 'lucide-vue-next';
import PageLayout from '@/components/Layout/PageLayout.vue';
import CustomTabBar from '@/components/CustomTabBar.vue';
import FloatingAddButton from '@/components/FloatingAddButton.vue';
import { useHabitStore } from '@/stores/habit';

const habitStore = useHabitStore();
const { checkIns, habits } = storeToRefs(habitStore);

onShow(() => {
  uni.hideTabBar();
});

const currentDate = ref(dayjs());
const weekDays = ['日', '一', '二', '三', '四', '五', '六'];

const currentYear = computed(() => currentDate.value.year());
const currentMonth = computed(() => currentDate.value.month() + 1);

const calendarDays = computed(() => {
  const startOfMonth = currentDate.value.startOf('month');
  const endOfMonth = currentDate.value.endOf('month');
  const startDayOfWeek = startOfMonth.day();
  
  const days = [];
  
  for (let i = startDayOfWeek; i > 0; i--) {
    const d = startOfMonth.subtract(i, 'day');
    days.push({
      day: d.date(),
      dateString: d.format('YYYY-MM-DD'),
      isCurrentMonth: false
    });
  }
  
  for (let i = 1; i <= endOfMonth.date(); i++) {
    const d = startOfMonth.date(i);
    days.push({
      day: i,
      dateString: d.format('YYYY-MM-DD'),
      isCurrentMonth: true
    });
  }
  
  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) {
    const d = endOfMonth.add(i, 'day');
    days.push({
      day: d.date(),
      dateString: d.format('YYYY-MM-DD'),
      isCurrentMonth: false
    });
  }
  
  return days;
});

const isToday = (dateStr: string) => {
  return dateStr === dayjs().format('YYYY-MM-DD');
};

const getDailyCheckInCount = (dateStr: string): number => {
  const checkInsList = habitStore.getDailyCheckIns(dateStr);
  if (!checkInsList) return 0;
  return checkInsList.reduce((sum, record) => sum + record.count, 0);
};

const hasCheckIn = (dateStr: string) => {
  return getDailyCheckInCount(dateStr) > 0;
};

// Background Color Class
const getCheckInBgClass = (dateStr: string): string => {
  const count = getDailyCheckInCount(dateStr);
  if (count >= 5) return 'bg-[#7A8B6E]'; // Dark Green
  if (count >= 3) return 'bg-[#C17F59]'; // Terracotta
  return 'bg-[#E8D5C4]'; // Light Beige
};

// Text Color Class - High Contrast Logic
const getDateTextColor = (dateStr: string, isCurrentMonth: boolean): string => {
  const count = getDailyCheckInCount(dateStr);
  
  if (count > 0) {
    // If checked in
    if (count >= 3) return 'text-white'; // Dark backgrounds -> White text
    return 'text-[#5C4A3D]'; // Light background -> Dark text
  }
  
  // No check-in
  if (isCurrentMonth) {
    if (isToday(dateStr)) return 'text-[#C17F59]'; // Today highlighted text
    return 'text-[#5C4A3D]'; // Normal dark text
  }
  
  return 'text-[#9B8B7B]'; // Previous/Next month text
};

const changeMonth = (delta: number) => {
  currentDate.value = currentDate.value.add(delta, 'month');
  habitStore.loadMonthCheckIns(currentDate.value.format('YYYY_MM'));
};

const totalCheckIns = computed(() => {
  const monthStr = currentDate.value.format('YYYY_MM');
  const monthData = checkIns.value[monthStr] || {};
  let total = 0;
  Object.values(monthData).forEach(dayList => {
    dayList.forEach(record => {
      total += record.count;
    });
  });
  return total;
});

const activeHabitCount = computed(() => habits.value.length);

const currentStreak = computed(() => {
  let streak = 0;
  let checkDate = dayjs();
  
  while (true) {
    const dateStr = checkDate.format('YYYY-MM-DD');
    if (hasCheckIn(dateStr)) {
      streak++;
      checkDate = checkDate.subtract(1, 'day');
    } else if (dateStr === dayjs().format('YYYY-MM-DD')) {
      checkDate = checkDate.subtract(1, 'day');
    } else {
      break;
    }
  }
  
  return streak;
});

const streakMessage = computed(() => {
  if (currentStreak.value === 0) return '从今天开始连续打卡吧';
  if (currentStreak.value < 7) return '不错的开始，继续保持';
  if (currentStreak.value < 30) return '一周以上的坚持，很棒';
  return '太厉害了，已经形成好习惯';
});
</script>
