<script setup lang="ts">
import {ref} from 'vue'
import {NewColorSchemeSelected} from "../EventsFromUi/NewColorSchemeSelected.ts";
import {speed} from "../UiModelData/MainUiModelData.ts";
import SelectFromOptionsTray from "../VueComponents/SelectFromOptionsTray.vue";

const colorGradientUrl = ref("../../public/assets/ColorPallette 1.png");

const colorGradientSize = ref(4);

const selectableImages :Array<{ url: string; key: string }> = [
    {url: "../../public/assets/GradientMap1.jpg", key: "GradientMap1"}, 
    {url: "../../public/assets/GradientMap2.jpg", key: "GradientMap2"},
    {url: "../../public/assets/GradientMap3.jpg", key: "GradientMap3"},
    {url: "../../public/assets/GradientMap4.jpg", key: "GradientMap4"},
    {url: "../../public/assets/GradientMap5.jpg", key: "GradientMap5"}
]


function NewColorGradientSelected(event : Event & { target: HTMLSelectElement }){
  const selectionValue : string = event.target.value;
  const optionSelectedInfo : {url : string, size: number} = JSON.parse(selectionValue);
  colorGradientUrl.value = optionSelectedInfo.url;
  colorGradientSize.value = optionSelectedInfo.size;
  NewColorSchemeSelected({colorSchemeImageUrl:colorGradientUrl.value, size: optionSelectedInfo.size});
}

const blackWhiteGradientTrayActive = ref(false);
function DisplayBlackWhiteGradientTray(){
  blackWhiteGradientTrayActive.value = true;
}
function CloseBlackWhiteGradientTray(){
  blackWhiteGradientTrayActive.value = false;
}
</script>

<template>
  <div id = "centerTitle">
    <h1>Shader time!</h1>
    <div id = "chooseColorGradientArea">
      <p>Choose a color gradient: </p>
      <select @change="NewColorGradientSelected" name = "color gradient">
        <option value = '{"url" : "../../public/assets/ColorPallette 1.png", "size" : 4}'>option 1</option>
        <option value= '{"url" : "../../public/assets/ColorPallette 2.png", "size" : 4}'>option 2</option>
        <option value= '{"url" : "../../public/assets/ColorPallette 3.png", "size" : 8}'>option 3</option>
      </select>
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
    <div id = "chooseSpeed">
      <p>Speed: </p>
      <input type = "range" min="-2.5" max="2.5" step = "0.01" value = "0.8" v-model.v.number="speed"/>
      <input type = "text" v-model.number="speed" id = "chooseSpeedTextInput">
    </div>
  </div>
  <div id = "blackWhiteImageTrayContainer">
    <select-from-options-tray :selectable-images="selectableImages" :active = "blackWhiteGradientTrayActive" @selected="CloseBlackWhiteGradientTray"/>
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
}
#chooseSpeedTextInput{
  width: 10%;
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
  align-items: center;
  justify-content: center;
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

#chooseBlackWhiteGradient button {
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

#chooseBlackWhiteGradient button:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
}

#chooseBlackWhiteGradient button:active {
  transform: translateY(0);
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
}
</style>