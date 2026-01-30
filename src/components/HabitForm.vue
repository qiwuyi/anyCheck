<template>
  <view class="p-6">
    <!-- 习惯名称 -->
    <view class="mb-8">
      <view class="flex items-center mb-3">
        <Type :size="16" class="text-[#C17F59] mr-2" />
        <view class="text-sm text-[#5C4A3D] font-medium">习惯名称</view>
      </view>
      <view class="relative">
        <input 
          v-model="formData.name"
          class="w-full text-base h-14 bg-white border-2 border-[#F0E6DC] rounded-2xl px-5 focus:outline-none focus:border-[#C17F59] transition-all placeholder-[#C4B5A5]"
          placeholder="例如：每天喝水 8 杯"
        />
        <view 
          v-if="formData.name"
          class="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#7A8B6E]/10 flex items-center justify-center"
        >
          <Check :size="14" class="text-[#7A8B6E]" />
        </view>
      </view>
    </view>

    <!-- 图标选择 -->
    <view class="mb-8">
      <view class="flex items-center mb-3">
        <Smile :size="16" class="text-[#C17F59] mr-2" />
        <view class="text-sm text-[#5C4A3D] font-medium">选择图标</view>
      </view>
      <view class="bg-white p-4 rounded-2xl border border-[#F0E6DC]">
        <view class="grid grid-cols-6 gap-3">
          <view
            v-for="icon in icons"
            :key="icon"
            class="h-12 w-12 flex items-center justify-center rounded-xl text-2xl transition-all duration-200 active:scale-90"
            :class="formData.icon === icon 
              ? 'bg-[#C17F59] text-white shadow-md' 
              : 'bg-[#F5EDE4] hover:bg-[#E8D5C4]'"
            @tap="formData.icon = icon"
          >
            {{ icon }}
          </view>
        </view>
      </view>
    </view>

    <!-- 颜色选择 -->
    <view class="mb-8">
      <view class="flex items-center mb-3">
        <Palette :size="16" class="text-[#C17F59] mr-2" />
        <view class="text-sm text-[#5C4A3D] font-medium">主题颜色</view>
      </view>
      <view class="bg-white p-4 rounded-2xl border border-[#F0E6DC]">
        <view class="flex space-x-3 overflow-x-auto pb-1">
          <view
            v-for="color in colors"
            :key="color"
            class="w-12 h-12 rounded-full transition-all duration-200 flex-shrink-0 active:scale-90 flex items-center justify-center"
            :style="{ backgroundColor: color }"
            :class="formData.color === color 
              ? 'ring-3 ring-[#5C4A3D] ring-offset-2 scale-110 shadow-md' 
              : 'opacity-90 hover:opacity-100'"
            @tap="formData.color = color"
          >
            <Check v-if="formData.color === color" :size="20" class="text-white" stroke-width="3" />
          </view>
        </view>
      </view>
    </view>

    <!-- 目标次数 -->
    <view class="mb-10">
      <view class="flex items-center justify-between mb-4">
        <view class="flex items-center">
          <Target :size="16" class="text-[#C17F59] mr-2" />
          <view class="text-sm text-[#5C4A3D] font-medium">每日目标</view>
        </view>
        <view class="flex items-center bg-[#5C4A3D] text-white px-4 py-1.5 rounded-full">
          <Trophy :size="14" class="mr-1.5 text-[#E8A598]" />
          <view class="text-sm font-medium">{{ formData.targetCount }} 次</view>
        </view>
      </view>
      <view class="bg-white p-5 rounded-2xl border border-[#F0E6DC]">
        <slider
          :value="formData.targetCount"
          @change="handleSliderChange"
          min="1"
          max="10"
          :activeColor="formData.color"
          backgroundColor="#F5EDE4"
          block-size="28"
          block-color="#5C4A3D"
        />
        <view class="flex justify-between mt-3 text-xs text-[#8B7355] font-medium">
          <span>1 次</span>
          <span>5 次</span>
          <span>10 次</span>
        </view>
      </view>
    </view>

    <!-- 保存按钮 -->
    <button
      class="w-full py-4 rounded-full bg-[#C17F59] text-white font-medium text-base shadow-lg shadow-[#C17F59]/30 active:scale-95 transition-all border-none leading-normal flex items-center justify-center"
      @tap="handleSubmit"
    >
      <Save :size="18" class="mr-2" />
      保存习惯
    </button>

    <!-- 删除按钮 -->
    <button
      v-if="isEdit"
      class="w-full py-4 mt-4 rounded-full bg-white text-[#DC2626] font-medium text-base border-2 border-[#FEE2E2] active:bg-[#FEE2E2] transition-all border-none leading-normal flex items-center justify-center"
      @tap="handleDelete"
    >
      <Trash2 :size="18" class="mr-2" />
      删除习惯
    </button>

    <!-- 预览卡片 -->
    <view class="mt-8 pt-6 border-t border-[#F0E6DC]">
      <view class="text-xs text-[#8B7355] font-medium mb-3 text-center">预览效果</view>
      <view class="bg-[#F5EDE4] rounded-2xl p-4 border border-[#F0E6DC]">
        <view class="flex items-center">
          <view
            class="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 mr-3"
            :style="{ backgroundColor: formData.color + '15', color: formData.color }"
          >
            {{ formData.icon }}
          </view>
          <view class="flex-1">
            <view class="font-semibold text-base text-[#5C4A3D]">{{ formData.name || '习惯名称' }}</view>
            <view class="text-xs text-[#8B7355] mt-0.5">0/{{ formData.targetCount }}</view>
          </view>
          <view class="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
            <Plus :size="18" class="text-[#C4B5A5]" />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive, defineProps, defineEmits, watch } from 'vue';
import { Type, Smile, Palette, Target, Trophy, Check, Save, Trash2, Plus } from 'lucide-vue-next';
import type { Habit } from '@/types';

const props = defineProps<{
  initialData?: Habit;
  isEdit?: boolean;
}>();

const emit = defineEmits(['submit', 'delete']);

const icons = ['💧', '🏃', '📚', '🧘', '🥗', '💤', '🎸', '✍️', '🎨', '🌱', '☀️', '🎯'];
const colors = ['#C17F59', '#7A8B6E', '#E8A598', '#6B8E9F', '#D4A574', '#9B8AA5', '#7B9E87', '#C9A86C'];

const formData = reactive({
  name: '',
  icon: icons[0],
  color: colors[0],
  targetCount: 1,
});

// 如果是编辑模式，填充数据
watch(() => props.initialData, (newVal) => {
  if (newVal) {
    formData.name = newVal.name;
    formData.icon = newVal.icon;
    formData.color = newVal.color;
    formData.targetCount = newVal.targetCount;
  }
}, { immediate: true });

const handleSliderChange = (e: any) => {
  formData.targetCount = e.detail.value;
};

const handleSubmit = () => {
  if (!formData.name.trim()) {
    uni.showToast({
      title: '请输入习惯名称',
      icon: 'none'
    });
    return;
  }
  emit('submit', { ...formData });
};

const handleDelete = () => {
  uni.showModal({
    title: '确认删除',
    content: '删除后无法恢复，是否继续？',
    success: (res) => {
      if (res.confirm) {
        emit('delete');
      }
    }
  });
};
</script>

<style scoped>
button::after {
  border: none;
}
</style>
