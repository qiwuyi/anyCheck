<template>
  <view
    class="relative transition-all duration-300"
    :class="isCompleted ? 'opacity-95' : ''"
  >
    <!-- 卡片主体 - 简洁预览风格 -->
    <view
      class="relative bg-[#F5EDE4] rounded-2xl p-4 border border-[#F0E6DC] transition-all duration-300"
      :class="isCompleted ? 'shadow-sm' : 'shadow-md shadow-[#C17F59]/5'"
    >
      <view class="flex items-center py-1">
        <!-- 左侧：大图标 -->
        <view
          class="w-14 h-14 rounded-xl flex items-center justify-center text-3xl flex-shrink-0 mr-5 transition-all duration-300"
          :class="isCompleted ? 'opacity-60' : ''"
          :style="{ backgroundColor: habit.color + '15', color: habit.color }"
        >
          {{ habit.icon || '📝' }}
        </view>

        <!-- 中间：名称和进度 -->
        <view class="flex-1 min-w-0">
          <view 
            class="font-semibold text-lg text-[#5C4A3D] truncate"
            :class="isCompleted ? 'line-through opacity-60' : ''"
          >
            {{ habit.name }}
          </view>
          <view class="text-base text-[#8B7355] mt-1">
            {{ currentCount }}/{{ habit.targetCount }}
          </view>
        </view>

        <!-- 右侧：操作按钮组 -->
        <view class="ml-3 flex-shrink-0 flex items-center gap-3">
          <!-- 打卡/完成按钮 -->
          <button
            v-if="!isCompleted"
            class="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg transition-all duration-200 active:scale-90 m-0 p-0 border-none after:border-none"
            @tap.stop="handleCheckIn"
          >
            <Plus :size="28" class="text-[#C4B5A5]" stroke-width="2.5" />
          </button>

          <!-- 已完成状态 -->
          <view
            v-else
            class="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl"
            :style="{ backgroundColor: habit.color }"
          >
            <Check :size="28" stroke-width="2.5" />
          </view>

          <!-- 编辑按钮 -->
          <button
            class="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg transition-all duration-200 active:scale-90 m-0 p-0 border-none after:border-none"
            @tap.stop="$emit('edit')"
          >
            <Pencil :size="24" class="text-[#8B7355]" stroke-width="2" />
          </button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Plus, Check, Pencil } from 'lucide-vue-next';
import type { Habit } from '@/types';

const props = defineProps<{
  habit: Habit;
  currentCount: number;
  index?: number;
}>();

const emit = defineEmits(['checkIn', 'edit']);

const isCompleted = computed(() => props.currentCount >= props.habit.targetCount);

const handleCheckIn = () => {
  emit('checkIn', props.habit.id);
};
</script>

<style scoped>
button::after {
  border: none;
}
</style>
