<template>
  <view
    class="relative transition-all duration-300"
    :class="isCompleted ? 'opacity-90' : ''"
  >
    <!-- 卡片主体 - 有机圆润风格 -->
    <view
      class="relative bg-white rounded-[28px] overflow-hidden transition-all duration-300 active:scale-[0.98]"
      :class="isCompleted ? 'shadow-sm' : 'shadow-md shadow-[#C17F59]/5'"
    >
      <!-- 顶部装饰波浪 -->
      <view 
        class="absolute top-0 left-0 right-0 h-3"
        :style="{ backgroundColor: habit.color }"
      />
      
      <!-- 左侧装饰线条 -->
      <view 
        v-if="isCompleted"
        class="absolute left-0 top-3 bottom-0 w-1 rounded-l-full"
        :style="{ backgroundColor: habit.color }"
      />

      <view class="p-5 pt-6">
        <view class="flex items-center">
          <!-- 左侧：图标区域 -->
          <view class="flex-1 flex items-center min-w-0" @tap="$emit('edit')">
            <!-- 有机形状图标容器 -->
            <view
              class="w-14 h-14 rounded-[20px] flex items-center justify-center text-2xl flex-shrink-0 mr-4 transition-all duration-300 relative overflow-hidden"
              :class="isCompleted ? 'opacity-70' : ''"
            >
              <!-- 背景渐变 -->
              <view 
                class="absolute inset-0 opacity-20"
                :style="{ backgroundColor: habit.color }"
              />
              <!-- 图标 -->
              <text class="relative z-10" :style="{ color: habit.color }">
                {{ habit.icon }}
              </text>
            </view>

            <!-- 信息区域 -->
            <view class="flex-1 min-w-0">
              <view class="flex items-center mb-1.5">
                <view 
                  class="font-bold text-[18px] transition-all duration-300 tracking-wide"
                  :class="isCompleted ? 'text-[#6B5A4D] line-through opacity-70' : 'text-[#3D3229]'"
                >
                  {{ habit.name }}
                </view>
                <!-- 完成徽章 -->
                <view
                  v-if="isCompleted"
                  class="ml-2 px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#7A8B6E]/10 text-[#7A8B6E]"
                >
                  已完成
                </view>
              </view>

              <!-- 进度条 - 有机风格 -->
              <view class="flex items-center">
                <view class="flex-1 h-2.5 bg-[#F5EDE4] rounded-full overflow-hidden mr-3">
                  <view
                    class="h-full rounded-full transition-all duration-500 ease-out"
                    :style="{ 
                      backgroundColor: habit.color,
                      width: `${Math.min((currentCount / habit.targetCount) * 100, 100)}%`
                    }"
                  />
                </view>
                <view 
                  class="text-sm font-bold tabular-nums"
                  :class="isCompleted ? 'text-[#7A8B6E]' : 'text-[#3D3229]'"
                >
                  {{ currentCount }}/{{ habit.targetCount }}
                </view>
              </view>
            </view>
          </view>

          <!-- 右侧：打卡按钮 -->
          <view class="ml-4 flex-shrink-0">
            <button
              v-if="!isCompleted"
              class="group relative w-[60px] h-[60px] rounded-full flex flex-col items-center justify-center transition-all duration-300 active:scale-90 m-0 p-0 border-none leading-none after:border-none overflow-hidden"
              :style="{ backgroundColor: habit.color + '15' }"
              @tap.stop="handleCheckIn"
            >
              <!-- 悬停效果 -->
              <view 
                class="absolute inset-0 opacity-0 group-active:opacity-100 transition-opacity duration-200"
                :style="{ backgroundColor: habit.color + '25' }"
              />
              <!-- 加号图标 -->
              <Plus :size="22" :stroke-width="2.5" :style="{ color: habit.color }" />
              <!-- 提示文字 -->
              <view class="text-[10px] font-medium mt-0.5" :style="{ color: habit.color }">
                打卡
              </view>
            </button>

            <!-- 已完成状态 -->
            <view
              v-else
              class="w-[60px] h-[60px] rounded-full flex flex-col items-center justify-center bg-[#7A8B6E] text-white shadow-md shadow-[#7A8B6E]/30"
            >
              <Check :size="22" stroke-width="2.5" />
            </view>
          </view>
        </view>
      </view>

      <!-- 底部状态栏 - 有机曲线 -->
      <view 
        v-if="isCompleted"
        class="px-5 py-2.5 bg-[#7A8B6E]/8 flex items-center"
      >
        <CheckCircle2 :size="14" class="text-[#7A8B6E] mr-1.5" />
        <view class="text-xs font-medium text-[#7A8B6E]">今日已完成，继续保持</view>
      </view>
      <view 
        v-else
        class="px-5 py-2.5 flex items-center"
        :style="{ backgroundColor: habit.color + '08' }"
      >
        <Flower2 :size="14" class="mr-1.5" :style="{ color: habit.color }" />
        <view class="text-xs font-medium" :style="{ color: habit.color }">
          还差 {{ habit.targetCount - currentCount }} 次
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Plus, Check, CheckCircle2, Flower2 } from 'lucide-vue-next';
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
