<template>
  <PageLayout>
    <view class="min-h-screen relative overflow-hidden">
      <!-- Background Decor (Organic Blobs) -->
      <view class="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] rounded-full bg-[#E8A598]/10 blur-3xl pointer-events-none"></view>
      <view class="absolute bottom-[-10%] left-[-10%] w-[250px] h-[250px] rounded-full bg-[#7A8B6E]/10 blur-3xl pointer-events-none"></view>

      <!-- Header -->
      <view class="relative z-10 flex items-center px-6 pt-8 pb-4">
        <view 
          class="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-[#F0E6DC] flex items-center justify-center mr-3 active:scale-95 transition-all shadow-sm"
          @tap="goBack"
        >
          <ArrowLeft :size="20" class="text-[#5C4A3D]" />
        </view>
        <view>
          <view class="text-[22px] font-bold text-[#5C4A3D]">创建新习惯</view>
          <view class="text-xs text-[#8B7355] mt-0.5">种下改变的第一颗种子</view>
        </view>
      </view>
      
      <!-- Content -->
      <view class="relative z-10">
        <HabitForm @submit="handleSubmit" />
      </view>
    </view>
  </PageLayout>
</template>

<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next';
import PageLayout from '@/components/Layout/PageLayout.vue';
import HabitForm from '@/components/HabitForm.vue';
import { useHabitStore } from '@/stores/habit';

const habitStore = useHabitStore();
const { addHabit } = habitStore;

const handleSubmit = (data: { name: string; icon: string; color: string; targetCount: number }) => {
  addHabit(data);
  uni.showToast({
    title: '创建成功',
    icon: 'success',
    duration: 1000
  });
  // 缩短延迟，提升响应速度
  setTimeout(() => {
    uni.navigateBack();
  }, 500);
};

const goBack = () => {
  uni.navigateBack();
};
</script>
