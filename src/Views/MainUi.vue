<script setup lang="ts">
import {ref} from 'vue'
import {NewColorSchemeSelected} from "../EventsFromUi/NewColorSchemeSelected.ts";
import {speed} from "../UiModelData/MainUiModelData.ts";
import SelectFromOptionsTray from "../VueComponents/SelectFromOptionsTray.vue";
import {NewGradientSelected} from "../EventsFromUi/NewBlackWhiteGradientSelected.ts";

const colorGradientUrl = ref("../../public/assets/ColorPallette 1.png");

const colorGradientSize = ref(4);

const selectableImages :Array<{ url: string; key: string }> = [
    {url: "../../public/assets/GradientMap1.jpg", key: "GradientMap1"}, 
    {url: "../../public/assets/GradientMap2.jpg", key: "GradientMap2"},
    {url: "../../public/assets/GradientMap3.jpg", key: "GradientMap3"},
    {url: "../../public/assets/GradientMap4.jpg", key: "GradientMap4"},
    {url: "../../public/assets/GradientMap5.jpg", key: "GradientMap5"}
]

const selectableColorSchemes : Array<{url: string, key: string}> = [
  {url: "../../public/assets/ColorPallette 1.png", key: "4"},
  {url: "../../public/assets/ColorPallette 2.png", key: "4"},
  {url: "../../public/assets/ColorPallette 3.png", key: "8"}
]

const blackWhiteGradientTrayActive = ref(false);
function DisplayBlackWhiteGradientTray(){
  blackWhiteGradientTrayActive.value = true;
}
function BlackWhiteGradientSelected(args : {imgUrl: string, imgKey: string}) {
  CloseBlackWhiteGradientTray();
  NewGradientSelected(args.imgKey)
}
function CloseBlackWhiteGradientTray(){
  blackWhiteGradientTrayActive.value = false;
}

const colorSchemeTrayActive = ref(false);
function DispyColorSchemeTray(){
  colorSchemeTrayActive.value = true;
}

function ColorSchemeSelected(args : {imgUrl: string, imgKey: string}) {
  CloseColorSchemeTray();
  
  const selectedColorSchemeInfo : {colorSchemeImageUrl : string, size: number} = {colorSchemeImageUrl: args.imgUrl, size: Number(args.imgKey)}
  
  colorGradientUrl.value = selectedColorSchemeInfo.colorSchemeImageUrl;
  colorGradientSize.value = selectedColorSchemeInfo.size;
  
  NewColorSchemeSelected(selectedColorSchemeInfo);
}
function CloseColorSchemeTray(){
  colorSchemeTrayActive.value = false;
}
</script>

<template>
  <div id = "centerTitle">
    <h1>Shader time!</h1>
    <div id = "chooseColorGradientArea">
      <button @click = "DispyColorSchemeTray">Choose a color gradient</button>
      <div id = "buffer"></div>
    </div>
    <div id = "gradientMapPreview">
      <img :src="colorGradientUrl">
      <div>
        <p>Color Gradient Size: {{colorGradientSize}}</p>
      </div>
    </div>
    <div id = "chooseBlackWhiteGradient">
      <div id = "buffer"></div>
      <button @click = "DisplayBlackWhiteGradientTray">Chose a Black and white gradient</button>
    </div>
    <div style = "height: 1%"></div>
    <div id = "chooseSpeed">
      <p>Speed: </p>
      <input type = "range" min="-2.5" max="2.5" step = "0.01" value = "0.8" v-model.v.number="speed"/>
      <input type = "text" v-model.number="speed" id = "chooseSpeedTextInput">
    </div>
  </div>
  <div id = "blackWhiteImageTrayContainer">
    <select-from-options-tray :selectable-images="selectableImages" :active = "blackWhiteGradientTrayActive" @selected="BlackWhiteGradientSelected" img-fit-mode="cover"/>
  </div>
  <div id = "colorGradientTrayContaier">
    <select-from-options-tray :selectable-images = "selectableColorSchemes":active = "colorSchemeTrayActive" @selected="ColorSchemeSelected"/>
  </div>
</template>


<style scoped>
#centerTitle{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
}

img{
  width: 100%;
  height: 100%;
}

#gradientMapPreview{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 4%;
}

#chooseSpeed{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;

  padding: 0.5rem 1rem;
  border-radius: 14px;

  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(8px);
}
#chooseSpeedTextInput {
  width: 3.5rem;
  text-align: center;

  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.25);

  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(8px);

  color: white;
  font-size: 0.9rem;

  padding: 0.35rem 0.5rem;

  outline: none;
  transition:
      background-color 0.15s ease,
      box-shadow 0.15s ease;
}

#chooseSpeedTextInput:focus {
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 0 0.6rem rgba(237, 221, 83, 0.35);
}

#gradientMapPreview div{
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(6px);
  width: 15%;
  height: 5%;
}

#chooseColorGradientArea{
  display: flex;
  width : 100%;
  height: 10%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

#chooseColorGradientArea #buffer{
  height: 10%;
}

#chooseBlackWhiteGradient{
  display: flex;
  flex-direction: column;
  width : 100%;
  align-items: center;
  justify-content: center;
  height: 8%;
}

#chooseBlackWhiteGradient #buffer{
  height: 40%;
}

button {
  appearance: none;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 12px;

  padding: 0.75rem 1.5rem;
  font-size: 0.95rem;
  font-weight: 500;
  color: white;

  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(8px);

  cursor: pointer;

  transition:
      transform 0.15s ease,
      background-color 0.15s ease,
      box-shadow 0.15s ease;
}

button:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
}

button:active {
  transform: translateY(0);
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
}

#chooseSpeed input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;

  width: 18px;
  height: 18px;
  border-radius: 50%;

  background: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.6);

  box-shadow:
      0 0 0.4rem rgba(237, 221, 83, 0.5);

  transition: transform 0.15s ease;
}

#chooseSpeed input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;

  width: 18px;
  height: 18px;
  border-radius: 50%;

  background: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.6);

  box-shadow:
      0 0 0.4rem rgba(237, 221, 83, 0.5);

  transition: transform 0.15s ease;
}

#chooseSpeed input[type="range"]::-webkit-slider-thumb:hover {
  transform: scale(1.15);
}

#chooseSpeed input[type="range"] {
  -webkit-appearance: none;
  appearance: none;

  width: 180px;
  height: 6px;

  border-radius: 999px;
  background: rgba(255, 255, 255, 0.15);

  cursor: pointer;
}

</style>