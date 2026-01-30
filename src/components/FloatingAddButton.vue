<template>
  <!-- Adjusted bottom spacing to avoid native TabBar (approx 50px) + gap -->
  <view class="fixed bottom-[75px] left-1/2 -translate-x-1/2 z-[9999] flex justify-center items-center pointer-events-none">
    <view 
      class="pointer-events-auto group relative w-[64px] h-[64px] flex items-center justify-center transition-transform duration-300 active:scale-95"
      @tap="goToCreate"
    >
      <!-- Diffusion Shadow (Glow) -->
      <view class="absolute inset-4 bg-[#C17F59] rounded-full blur-lg opacity-30 group-active:opacity-50 transition-opacity duration-300"></view>
      
      <!-- Main Button Body -->
      <view class="relative w-full h-full rounded-full overflow-hidden shadow-lg shadow-[#C17F59]/20 border-4 border-[#FDF8F3] bg-[#C17F59]">
        <!-- Top Highlight (Subtle Shine) -->
        <view class="absolute top-0 inset-x-0 h-1/3 bg-white/10 rounded-t-full"></view>
        
        <!-- Inner Ring/Border -->
        <view class="absolute inset-0 border-[2px] border-white/10 rounded-full"></view>
        
        <!-- Center Icon -->
        <view class="relative z-10 w-full h-full flex items-center justify-center">
          <Plus :size="28" class="text-white drop-shadow-sm" stroke-width="3" />
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { Plus } from 'lucide-vue-next';

const goToCreate = () => {
  uni.navigateTo({
    url: '/pages/habit/create'
  });
};
</script>
