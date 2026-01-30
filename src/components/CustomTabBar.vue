<template>
  <view class="fixed bottom-0 left-0 right-0 z-[9999] bg-[#FDF8F3] border-t border-[#F0E6DC] pb-[env(safe-area-inset-bottom)]">
    <view class="flex items-center justify-around h-[64px] px-2">
      <!-- Home Tab -->
      <view 
        class="flex-1 flex flex-col items-center justify-center h-full active:bg-[#F5EDE4] transition-colors rounded-xl mx-1 gap-[3px]"
        @tap="switchTab('/pages/index/index')"
      >
        <LayoutGrid 
          :size="24" 
          :class="currentPath === 'pages/index/index' ? 'text-[#C17F59]' : 'text-[#8B7355]'" 
          :stroke-width="currentPath === 'pages/index/index' ? 2.5 : 2"
        />
        <text 
          class="text-[11px] font-medium transition-colors leading-none"
          :class="currentPath === 'pages/index/index' ? 'text-[#C17F59]' : 'text-[#8B7355]'"
        >打卡</text>
      </view>

      <!-- Spacer for Floating Button (No actual button here, just space) -->
      <view class="flex-1 flex items-center justify-center h-full pointer-events-none">
        <!-- Empty placeholder to maintain layout balance -->
        <view class="w-[44px] h-[44px]"></view>
      </view>

      <!-- Stats Tab -->
      <view 
        class="flex-1 flex flex-col items-center justify-center h-full active:bg-[#F5EDE4] transition-colors rounded-xl mx-1 gap-[3px]"
        @tap="switchTab('/pages/record/index')"
      >
        <PieChart 
          :size="24" 
          :class="currentPath === 'pages/record/index' ? 'text-[#C17F59]' : 'text-[#8B7355]'"
          :stroke-width="currentPath === 'pages/record/index' ? 2.5 : 2"
        />
        <text 
          class="text-[11px] font-medium transition-colors leading-none"
          :class="currentPath === 'pages/record/index' ? 'text-[#C17F59]' : 'text-[#8B7355]'"
        >统计</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { LayoutGrid, PieChart } from 'lucide-vue-next';

const pages = getCurrentPages();
const page = pages[pages.length - 1];
const currentPath = computed(() => page?.route || '');

const switchTab = (url: string) => {
  uni.switchTab({ url });
};
</script>
