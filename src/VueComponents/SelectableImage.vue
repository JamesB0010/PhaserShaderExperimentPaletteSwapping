<script setup lang="ts">

import {ref} from "vue";

const props = defineProps({
  imgUrl: {
    type: String,
    default: "../../public/assets/GradientMap1.jpg"
  },
  imgKey: {
    type: String,
    default: "GradientMap1"
  },
  imgFitMode : {
    type: String,
    default: "contain"
  }
});

const emit = defineEmits(['selected'])

const fitMode = ref(props.imgFitMode);


function Selected(){
  emit("selected", {imgUrl: props.imgUrl, imgKey: props.imgKey});
}
</script>

<template>
  <div>
    <img :src="props.imgUrl" @click = "Selected" :style="{ '--ImageObjectFitMode': fitMode }">
  </div>
</template>

<style scoped>
@property --ImageObjectFitMode {
  syntax: "*";
  inherits: false;
}

div {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition-property: transform;
  transition-duration: 0.2s;
  transition-timing-function: ease-in;
}

div:hover{
  transform: scale(1.02);
}

img {
  width: 100%;
  height: 100%;
  object-fit: var(--ImageObjectFitMode); /* or contain */
  border-radius: 5%;
  outline: white solid 1px; 
  transition-property: filter;
  transition-duration: 0.2s;
  transition-timing-function: ease-in;
}

img:hover{
  outline: 2px solid white;
  filter: drop-shadow(0 0 0.75rem rgba(237, 221, 83, 1));
}
</style>