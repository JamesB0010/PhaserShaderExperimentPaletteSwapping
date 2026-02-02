<script setup lang="ts">
import SelectableImage from "./SelectableImage.vue";
import {watch} from "vue";
import GradientMapImageProcessor from "../ImageUploadProcessors/GradientMapImageProcessor.ts";
import ImageUploadProcessor from "../ImageUploadProcessors/ImageUploadProcessor.ts";
import ColorPaletteWidthDisplay from "./ColorPaletteWidthDisplay.vue";

const props = defineProps({
  selectableImages: Array<{url: string, key: string}>,
  active: Boolean,
  imgFitMode : {
    type: String,
    default: "contain"
  },
  imageUploadProcessor:{
    type: Object,
    default: new GradientMapImageProcessor()
  },
  displayImageWidth : {
    type: Boolean,
    default: false
  }
})

const imageUploadProcessor : ImageUploadProcessor = props.imageUploadProcessor as ImageUploadProcessor;

const emit = defineEmits(["selected"]);

function OnTrayImageClicked(args : {imgUrl: string, imgKey: string}) {
  emit("selected", args);
}

let hasBeenOpenedBefore = false;
watch(() => props.active, () =>{
  hasBeenOpenedBefore = true;
})

let userPickingFile = false;

async function UploadUserFile(){
  if(userPickingFile)
    return;
  
  userPickingFile = true;
  
  await imageUploadProcessor.ProcessImage();
  
  userPickingFile = false;
  
  console.log(props.displayImageWidth);
}

</script>

<template>
  <div id = "fullScreenCover" :class="{activeBackground: props.active, inactiveBackground : !props.active && hasBeenOpenedBefore}">
    <div id = "mainTray" :class = "{popIn: props.active, popOut: !props.active && hasBeenOpenedBefore}">
      <div v-for="selectableItem in props.selectableImages">
        <div id = "itemWrapper">
          <SelectableImage :img-url = selectableItem.url :img-key = selectableItem.key class = "selectableItem" @selected = "OnTrayImageClicked" :img-fit-mode="props.imgFitMode">
          <ColorPaletteWidthDisplay v-if = "props.displayImageWidth" :palette-width= "Number(selectableItem.key)"/>
          </SelectableImage>
        </div>
      </div>
      <div id = "UploadImage" @click="UploadUserFile">
        <img src="/assets/UploadIcon.png" height="500" width="500"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
@property --FullscreenCoverBackgroundColorActive {
  syntax: "<color>";
  inherits: false;
  initial-value: rgba(0, 0, 0, 0.4);
}

#fullScreenCover{
 position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  pointer-events: none;
}

#mainTray {
  width: 60%;
  height: 90%;
  border-radius: 5%;
  backdrop-filter: blur(20px);

  display: grid;
  grid-template-columns: repeat(2, 1fr); /* ✅ 2 columns */
  grid-auto-rows: 200px;                 /* ✅ box height */
  gap: 1rem;

  padding: 1rem;
  overflow-y: auto;                      /* ✅ scrolling */
  
  transform: scale(0);
  background-color: rgba(0,0,0,0.5);
  
  /*ide scrollbars*/
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;
}

@keyframes fadeBackgroundFromBlack {
  0%{
    background-color: rgba(0,0,0,0);
  }
  100%{
    background-color: var(--FullscreenCoverBackgroundColorActive);
  }
}

@keyframes popTrayIn {
  0%{
    transform: scale(0);
  }
  
  70%{
    transform: scale(1.1);
  }
  100%{
    transform: scale(1);
  }
}

#mainTray.popIn{
  animation: popTrayIn 0.4s;
  animation-fill-mode: forwards;
  animation-timing-function: ease-out;
}
#fullScreenCover.activeBackground{
  animation: fadeBackgroundFromBlack 0.4s;
  animation-fill-mode: forwards;
  pointer-events: all;
}

@keyframes fadeBackgroundToBlack {
  0%{
    background-color: var(--FullscreenCoverBackgroundColorActive);
  }
  100%{
    background-color: rgba(0,0,0,0);
  }
}

@keyframes popTrayOut {
  0% {
    transform: scale(1);
  }
  30% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(0);
  }
}

#mainTray.popOut{
  animation: popTrayOut 0.4s;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in;
}

#fullScreenCover.inactiveBackground{
  animation: fadeBackgroundToBlack 0.4s;
  animation-fill-mode: forwards;
  pointer-events: none;
}

#UploadImage{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition-property: transform;
  transition-duration: 0.2s;
  transition-timing-function: ease-in;
  border-radius: 5%; 
}
#itemWrapper{
  height: 100%;
  width: 100%;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
#UploadImage:hover{
  transform: scale(1.02);
  outline: 2px solid white;
  filter: drop-shadow(0 0 0.75rem rgba(237, 221, 83, 1)); 
}

#UploadImage img{
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 5%;
  outline: white solid 1px;
  transition-property: filter;
  transition-duration: 0.2s;
  transition-timing-function: ease-in;
}

</style>