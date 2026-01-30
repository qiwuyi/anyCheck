<template>
  <PageLayout>
    <!-- Header -->
    <view class="flex items-center px-6 pt-8 pb-4">
      <view 
        class="w-10 h-10 rounded-full bg-[#F5EDE4] flex items-center justify-center mr-3 active:bg-[#E8D5C4] transition-all"
        @tap="goBack"
      >
        <ArrowLeft :size="20" class="text-[#5C4A3D]" />
      </view>
      <view>
        <view class="text-[22px] font-bold text-[#5C4A3D]">编辑习惯</view>
        <view class="text-xs text-[#8B7355] mt-0.5">调整你的习惯设置</view>
      </view>
    </view>
    <HabitForm
      v-if="habit"
      :initial-data="habit"
      :is-edit="true"
      @submit="handleSubmit"
      @delete="handleDelete"
    />
    <view v-else class="flex items-center justify-center py-20">
      <view class="text-[#8B7355]">加载中...</view>
    </view>
  </PageLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ArrowLeft } from 'lucide-vue-next';
import PageLayout from '@/components/Layout/PageLayout.vue';
import HabitForm from '@/components/HabitForm.vue';
import { useHabitStore } from '@/stores/habit';
import type { Habit } from '@/types';

const habitStore = useHabitStore();
const { updateHabit, deleteHabit, getHabitById } = habitStore;

const habit = ref<Habit | null>(null);

onMounted(() => {
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1];
  const id = currentPage.options?.id;
  
  if (id) {
    const found = getHabitById(id);
    if (found) {
      habit.value = found;
    } else {
      uni.showToast({
        title: '习惯不存在',
        icon: 'none'
      });
      setTimeout(() => {
        uni.navigateBack();
      }, 1500);
    }
  }
});

const handleSubmit = (data: { name: string; icon: string; color: string; targetCount: number }) => {
  if (habit.value) {
    updateHabit(habit.value.id, data);
    uni.showToast({
      title: '更新成功 🌿',
      icon: 'success',
      duration: 1500
    });
    setTimeout(() => {
      uni.navigateBack();
    }, 1500);
  }
};

const handleDelete = () => {
  if (habit.value) {
    deleteHabit(habit.value.id);
    uni.showToast({
      title: '删除成功',
      icon: 'success',
      duration: 1500
    });
    setTimeout(() => {
      uni.navigateBack();
    }, 1500);
  }
};

const goBack = () => {
  uni.navigateBack();
};
</script>
