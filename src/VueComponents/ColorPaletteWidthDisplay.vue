<script setup lang="ts">
const props = defineProps({
  paletteWidth: {
    type: Number,
    default: -1
  }
})
</script>

<template>
<div id = "topToBottomFlex">
  <div id = "rightToLeftFlex">
    <div class = "badge">Palette Width: {{ props.paletteWidth }}</div>
  </div>
</div>
</template>

<style scoped>
#topToBottomFlex{
  width: 100%;
  height: 100%;
  inset: 0;
  position: absolute;
  display: flex;
  flex-direction: column-reverse;
  pointer-events: none;
}

#rightToLeftFlex{
  display: flex;
  flex-direction: row-reverse;
}
</style>