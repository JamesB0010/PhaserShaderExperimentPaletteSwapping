<script setup lang="ts">
import {ref} from 'vue'
import {NewColorSchemeSelected} from "../EventsFromUi/NewColorSchemeSelected.ts";
import {NewGradientSelected} from "../EventsFromUi/NewBlackWhiteGradientSelected.ts";
import {speed} from "../UiModelData/MainUiModelData.ts";

const colorGradientUrl = ref("../../public/assets/ColorPallette 1.png");

const colorGradientSize = ref(4);


function NewColorGradientSelected(event : Event & { target: HTMLSelectElement }){
  const selectionValue : string = event.target.value;
  const optionSelectedInfo : {url : string, size: number} = JSON.parse(selectionValue);
  colorGradientUrl.value = optionSelectedInfo.url;
  colorGradientSize.value = optionSelectedInfo.size;
  NewColorSchemeSelected({colorSchemeImageUrl:colorGradientUrl.value, size: optionSelectedInfo.size});
}

function NewBlackWhiteGradientSelected(event : Event & { target: HTMLSelectElement }){
  NewGradientSelected(event.target.value);
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
      <p>Chose a Black and white gradient: </p>
      <select @change = "NewBlackWhiteGradientSelected">
        <option value = "GradientMap1">Option 1</option>
        <option value = "GradientMap2">Option 2</option>
        <option value = "GradientMap3">Option 3</option>
        <option value = "GradientMap4">Option 4</option>
        <option value = "GradientMap5">Option 5</option>
      </select>
    </div>
    <div id = "chooseSpeed">
      <p>Speed: </p>
      <input type = "range" min="-2.5" max="2.5" step = "0.01" value = "0.8" v-model.v.number="speed"/>
      <input type = "text" v-model.number="speed" id = "chooseSpeedTextInput">
    </div>
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
  width : 100%;
  align-items: center;
  justify-content: center;
}
</style>