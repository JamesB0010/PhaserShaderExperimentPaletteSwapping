<script setup lang="ts">
import SelectableImage from "./SelectableImage.vue";

const props = defineProps({
  selectableImages: Array<{url: string, key: string}>,
  active: Boolean,
  imgFitMode : {
    type: String,
    default: "contain"
  }
})

const emit = defineEmits(["selected"]);

function OnTrayImageClicked(args : {imgUrl: string, imgKey: string}) {
  emit("selected", args);
}
</script>

<template>
  <div id = "fullScreenCover" :class="{activeBackground: props.active}">
    <div id = "mainTray" :class = "{popIn: props.active}">
      <div id = "darken"></div>
      <div v-for="selectableItem in props.selectableImages">
        <SelectableImage :img-url = selectableItem.url :img-key = selectableItem.key class = "selectableItem" @selected = "OnTrayImageClicked" :img-fit-mode="props.imgFitMode"></SelectableImage>
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
}

#darken{
  position: absolute;
  left: 0%;
  top:0%;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  border-radius: 5%;
  pointer-events: none;
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

</style>