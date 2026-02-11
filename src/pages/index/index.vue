<template>
  <PageLayout>
    <view class="min-h-screen bg-[#FDF8F3]">
      <!-- 装饰性背景元素 -->
      <view class="fixed top-0 right-0 w-64 h-64 bg-[#E8D5C4] rounded-full blur-3xl opacity-40 -translate-y-1/2 translate-x-1/2 pointer-events-none"></view>
      <view class="fixed bottom-20 left-0 w-48 h-48 bg-[#D4E4D1] rounded-full blur-3xl opacity-30 -translate-x-1/2 pointer-events-none"></view>
      
      <!-- Header -->
      <view class="px-6 pt-8 pb-6">
        <view class="flex justify-between items-start">
          <view class="flex items-center space-x-3">
            <!-- Logo Icon -->
            <view class="w-12 h-12 bg-gradient-to-br from-[#C17F59] to-[#8B5E3C] rounded-2xl flex items-center justify-center shadow-lg shadow-[#C17F59]/20 -rotate-3">
              <Sprout :size="26" class="text-white" stroke-width="2.5" />
            </view>
            
            <view class="flex flex-col">
              <!-- Title -->
              <view class="flex items-baseline leading-none">
                <text class="text-[26px] font-bold text-[#5C4A3D] tracking-tight mr-1">随心</text>
                <text class="text-[26px] font-medium text-[#C17F59] font-serif">Check</text>
              </view>
              
              <!-- Date -->
              <view class="flex items-center mt-1">
                <Calendar :size="12" class="text-[#8B7355] mr-1 opacity-80" />
                <text class="text-xs text-[#8B7355] font-medium tracking-wide opacity-80">{{ todayDate }}</text>
              </view>
            </view>
          </view>
          <!-- Placeholder removed -->
          <view class="w-12 h-12"></view>
        </view>
      </view>

      <!-- 欢迎语 -->
      <view v-if="habits.length > 0" class="px-6 mb-5">
        <view class="text-lg text-[#5C4A3D] font-medium">
          {{ greetingText }}
        </view>
        <view class="text-sm text-[#8B7355] mt-1">
          {{ subGreetingText }}
        </view>
      </view>

      <!-- Progress Card - 有机卡片风格 -->
      <view v-if="habits.length > 0" class="px-6 mb-6">
        <view class="relative bg-white rounded-[32px] p-6 shadow-sm border border-[#F0E6DC]">
          <!-- 装饰圆点 -->
          <view class="absolute top-4 right-4 flex space-x-1">
            <view class="w-2 h-2 rounded-full bg-[#E8A598]/60"></view>
            <view class="w-2 h-2 rounded-full bg-[#7A8B6E]/60"></view>
            <view class="w-2 h-2 rounded-full bg-[#C17F59]/60"></view>
          </view>
          
          <view class="flex items-center justify-between">
            <view class="flex-1">
              <view class="flex items-center mb-2">
                <view class="w-8 h-8 rounded-full bg-[#F5EDE4] flex items-center justify-center mr-2">
                  <Sprout :size="16" class="text-[#7A8B6E]" />
                </view>
                <view class="text-xs text-[#8B7355] font-medium tracking-wide">今日成长</view>
              </view>
              <view class="text-3xl font-bold text-[#5C4A3D]">
                {{ completedCount }}<span class="text-[#C17F59] text-xl">/{{ habits.length }}</span>
              </view>
              <view class="flex items-center mt-2 space-x-2">
                <view class="flex-1 h-2 bg-[#F5EDE4] rounded-full overflow-hidden">
                  <view
                    class="h-full bg-gradient-to-r from-[#C17F59] to-[#E8A598] rounded-full transition-all duration-700 ease-out"
                    :style="{ width: `${progressPercentage}%` }"
                  />
                </view>
                <view class="text-xs font-bold text-[#C17F59] bg-[#F5EDE4] px-2 py-0.5 rounded-full">{{ progressPercentage }}%</view>
              </view>
            </view>
            
            <!-- 圆形进度指示器 -->
            <view class="relative w-20 h-20 ml-4">
              <svg class="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  class="text-[#F5EDE4]"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="3"
                />
                <path
                  class="text-[#7A8B6E] transition-all duration-1000 ease-out"
                  :stroke-dasharray="`${progressPercentage}, 100`"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="3"
                  stroke-linecap="round"
                />
              </svg>
              <view class="absolute inset-0 flex items-center justify-center">
                <Leaf :size="20" class="text-[#7A8B6E]" />
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- Filter Tabs - 药丸形状 -->
      <view v-if="habits.length > 0" class="px-6 mb-5">
        <view class="flex space-x-2">
          <view
            class="flex-1 py-3 px-4 rounded-full text-sm font-medium text-center transition-all duration-300"
            :class="activeFilter === 'all' ? 'bg-[#5C4A3D] text-[#FDF8F3] shadow-md' : 'bg-white text-[#8B7355] border border-[#F0E6DC]'"
            @tap="activeFilter = 'all'"
          >
            全部 {{ habits.length }}
          </view>
          <view
            class="flex-1 py-3 px-4 rounded-full text-sm font-medium text-center transition-all duration-300 flex items-center justify-center"
            :class="activeFilter === 'pending' ? 'bg-[#FFDBC8] text-[#8A4A36] shadow-md font-bold' : 'bg-white text-[#8B7355] border border-[#F0E6DC]'"
            @tap="activeFilter = 'pending'"
          >
            <Clock :size="14" class="mr-1.5" />
            待完成 {{ pendingCount }}
          </view>
          <view
            class="flex-1 py-3 px-4 rounded-full text-sm font-medium text-center transition-all duration-300 flex items-center justify-center"
            :class="activeFilter === 'completed' ? 'bg-[#D8E6C8] text-[#4A5D38] shadow-md font-bold' : 'bg-white text-[#8B7355] border border-[#F0E6DC]'"
            @tap="activeFilter = 'completed'"
          >
            <CheckCircle2 :size="14" class="mr-1.5" />
            已完成 {{ completedCount }}
          </view>
        </view>
      </view>

      <!-- Habit List -->
      <view v-if="filteredHabits.length > 0 && !isLoading" class="px-6 space-y-4 pb-24">
        <HabitCard
          v-for="(habit, index) in filteredHabits"
          :key="habit.id"
          :habit="habit"
          :current-count="getHabitStatus(habit.id, todayDateFull)"
          :index="index"
          @check-in="handleCheckIn"
          @edit="goToEdit(habit.id)"
        />
      </view>

      <!-- No Results -->
      <view v-if="filteredHabits.length === 0 && habits.length > 0 && !isLoading" class="flex flex-col items-center justify-center py-16 px-6">
        <view class="w-20 h-20 rounded-full bg-[#F5EDE4] flex items-center justify-center mb-4">
          <Search :size="28" class="text-[#C17F59]" />
        </view>
        <view class="text-base font-medium text-[#5C4A3D]">暂无相关习惯</view>
        <view class="text-sm text-[#8B7355] mt-1">试试其他筛选条件</view>
      </view>

      <!-- Loading State -->
      <view v-if="isLoading" class="flex flex-col items-center justify-center py-20">
        <view class="relative w-14 h-14">
          <view class="absolute inset-0 border-4 border-[#F5EDE4] rounded-full"></view>
          <view class="absolute inset-0 border-4 border-[#C17F59] border-t-transparent rounded-full animate-spin"></view>
          <view class="absolute inset-0 flex items-center justify-center">
            <Flower2 :size="20" class="text-[#7A8B6E]" />
          </view>
        </view>
        <view class="text-sm text-[#8B7355] mt-4 font-medium">加载中...</view>
      </view>

      <!-- Error State -->
      <view v-if="error" class="mx-6 bg-[#FEE2E2] border border-[#FECACA] rounded-2xl p-4 mb-4">
        <view class="flex items-center">
          <AlertCircle :size="18" class="text-[#DC2626] mr-2" />
          <view class="text-[#991B1B] text-sm font-medium">{{ error }}</view>
        </view>
      </view>

      <!-- Empty State -->
      <view v-if="habits.length === 0 && !isLoading" class="flex flex-col items-center justify-center py-16 px-6">
        <view class="relative mb-8">
          <view class="absolute inset-0 bg-[#E8D5C4] rounded-full blur-2xl opacity-40 scale-150"></view>
          <view class="relative w-32 h-32 rounded-full bg-gradient-to-br from-[#F5EDE4] to-[#E8D5C4] flex items-center justify-center shadow-inner">
            <Flower2 :size="56" class="text-[#C17F59]" />
          </view>
        </view>
        <view class="text-xl font-bold text-[#5C4A3D] mb-2">种下一颗习惯的种子</view>
        <view class="text-sm text-[#8B7355] text-center max-w-[260px] mb-8 leading-relaxed">每一个好习惯都是一朵盛开的花，从今天开始培育属于你的花园。</view>
        <view
          class="px-8 py-4 bg-[#C17F59] text-white rounded-full font-medium text-base shadow-lg shadow-[#C17F59]/30 active:scale-95 transition-all flex items-center"
          @tap="goToCreate"
        >
          <Plus :size="20" class="mr-2" />
          创建第一个习惯
        </view>
      </view>

      <!-- Custom TabBar -->
      <CustomTabBar />

      <!-- Floating Add Button -->
      <FloatingAddButton />

    </view>
  </PageLayout>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { onShow } from '@dcloudio/uni-app';
import { storeToRefs } from 'pinia';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { 
  AlertCircle, Plus, Calendar, 
  CheckCircle2, Clock, Search, 
  Sprout, Leaf, Flower2
} from 'lucide-vue-next';
import PageLayout from '@/components/Layout/PageLayout.vue';
import HabitCard from '@/components/HabitCard.vue';
import CustomTabBar from '@/components/CustomTabBar.vue';
import FloatingAddButton from '@/components/FloatingAddButton.vue';
import { useHabitStore } from '@/stores/habit';

dayjs.locale('zh-cn');

const habitStore = useHabitStore();
const { habits, isLoading, error } = storeToRefs(habitStore);
const { checkIn, getHabitStatus, init } = habitStore;

const todayDate = ref(dayjs().format('MM月DD日 dddd'));
const todayDateFull = ref(dayjs().format('YYYY-MM-DD'));
const activeFilter = ref<'all' | 'pending' | 'completed'>('all');

onShow(() => {
  uni.hideTabBar();
});

onMounted(() => {
  init();
});

const completedCount = computed(() => {
  return habits.value.filter(h => getHabitStatus(h.id, todayDateFull.value) >= h.targetCount).length;
});

const pendingCount = computed(() => {
  return habits.value.length - completedCount.value;
});

const progressPercentage = computed(() => {
  if (habits.value.length === 0) return 0;
  return Math.round((completedCount.value / habits.value.length) * 100);
});

// 问候语
const greetingText = computed(() => {
  const hour = dayjs().hour();
  if (hour < 12) return '早安，开启美好的一天 🌅';
  if (hour < 18) return '午安，保持今天的节奏 🌤️';
  return '晚安，回顾今天的收获 🌙';
});

const subGreetingText = computed(() => {
  if (completedCount.value === 0) return '新的一天，从第一个习惯开始';
  if (completedCount.value === habits.value.length) return '太棒了！今日目标全部完成 ✨';
  return `已完成 ${completedCount.value} 个习惯，继续加油`;
});

// 按优先级排序：未完成的放上面
const sortedHabits = computed(() => {
  return [...habits.value].sort((a, b) => {
    const aCompleted = getHabitStatus(a.id, todayDateFull.value) >= a.targetCount;
    const bCompleted = getHabitStatus(b.id, todayDateFull.value) >= b.targetCount;
    if (aCompleted === bCompleted) return 0;
    return aCompleted ? 1 : -1;
  });
});

// 根据筛选条件过滤习惯
const filteredHabits = computed(() => {
  if (activeFilter.value === 'all') return sortedHabits.value;
  if (activeFilter.value === 'pending') {
    return sortedHabits.value.filter(h => getHabitStatus(h.id, todayDateFull.value) < h.targetCount);
  }
  if (activeFilter.value === 'completed') {
    return sortedHabits.value.filter(h => getHabitStatus(h.id, todayDateFull.value) >= h.targetCount);
  }
  return sortedHabits.value;
});

const handleCheckIn = async (id: string) => {
  try {
    await checkIn(id);
    uni.vibrateShort({
      success: () => console.log('vibrate success'),
      fail: () => console.log('vibrate fail')
    });
    uni.showToast({
      title: '打卡成功 🌱',
      icon: 'success',
      duration: 1500
    });
  } catch (e) {
    console.error('打卡失败', e);
  }
};

const goToCreate = () => {
  uni.navigateTo({ url: '/pages/habit/create' });
};

const goToEdit = (id: string) => {
  uni.navigateTo({ url: `/pages/habit/edit?id=${id}` });
};
</script>
