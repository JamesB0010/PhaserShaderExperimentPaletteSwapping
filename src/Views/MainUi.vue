<script setup lang="ts">
import {Ref, ref} from 'vue'
import {AddNewUrlToAssetPackMapItem, NewColorSchemeSelected} from "../EventsFromUi/NewColorSchemeSelected.ts";
import { speed } from "../UiModelData/MainUiModelData.ts";
import SelectFromOptionsTray from "../VueComponents/SelectFromOptionsTray.vue";
import { NewGradientSelected } from "../EventsFromUi/NewBlackWhiteGradientSelected.ts";
import {NewGradientMapUploaded} from "../EventsFromUi/NewGradientMapUploaded.ts";
import GradientMapImageProcessor from "../ImageUploadProcessors/GradientMapImageProcessor.ts";
import ColorPaletteImageProcessor from "../ImageUploadProcessors/ColorPaletteImageProcessor.ts";
import {LoadNewColorPaletteIntoPhaser} from "../EventsFromUi/NewColorPaletteUploaded.ts";

const colorGradientUrl = ref("/assets/ColorPallette 1.png");
const blackWhiteGradientUrl = ref("/assets/GradientMap1.jpg");
const colorGradientSize = ref(4);

const selectableImages: Ref<Array<{ url: string; key: string }>> = ref([
  { url: "/assets/GradientMap1.jpg", key: "GradientMap1" },
  { url: "/assets/GradientMap2.jpg", key: "GradientMap2" },
  { url: "/assets/GradientMap3.jpg", key: "GradientMap3" },
  { url: "/assets/GradientMap4.jpg", key: "GradientMap4" },
  { url: "/assets/GradientMap5.jpg", key: "GradientMap5" },
  { url: "/assets/GradientMap7.png", key: "GradientMap7" },
  { url: "/assets/GradientMap8.png", key: "GradientMap8" },
  { url: "/assets/GradientMap9.png", key: "GradientMap9" },
  { url: "/assets/GradientMap10.png", key: "GradientMap10" },
  { url: "/assets/GradientMap6.png", key: "GradientMap6" },
  { url: "/assets/GradientMap11.png", key: "GradientMap11" },
  { url: "/assets/GradientMap12.png", key: "GradientMap12" },
]);

const selectableColorSchemes: Ref<Array<{ url: string; key: string }>> = ref([
  { url: "/assets/ColorPallette 1.png", key: "4" },
  { url: "/assets/ColorPallette 2.png", key: "4" },
  { url: "/assets/ColorPallette 3.png", key: "8" },
  { url: "/assets/ColorPallette 4.png", key: "5" },
  { url: "/assets/ColorPallette 5.png", key: "4" },
  { url: "/assets/ColorPallette 6.png", key: "6" },
  { url: "/assets/ColorPallette 7.png", key: "6" },
  { url: "/assets/ColorPallette 8.png", key: "5" }
]);

const trayHangTime = 1000;
let lockUiCardOpen = false;

const blackWhiteGradientTrayActive = ref(false);
const colorSchemeTrayActive = ref(false);

function DisplayBlackWhiteGradientTray() {
  blackWhiteGradientTrayActive.value = true;
  lockUiCardOpen = true;
}

function DispyColorSchemeTray() {
  colorSchemeTrayActive.value = true;
  lockUiCardOpen = true;
}

function BlackWhiteGradientSelected(args: { imgUrl: string; imgKey: string }) {
  blackWhiteGradientUrl.value = args.imgUrl;
  CloseBlackWhiteGradientTray();
  NewGradientSelected(args.imgKey);
}

function ColorSchemeSelected(args: { imgUrl: string; imgKey: string }) {
  CloseColorSchemeTray();

  const selectedColorSchemeInfo = {
    colorSchemeImageUrl: args.imgUrl,
    size: Number(args.imgKey)
  };

  colorGradientUrl.value = selectedColorSchemeInfo.colorSchemeImageUrl;
  colorGradientSize.value = selectedColorSchemeInfo.size;

  NewColorSchemeSelected(selectedColorSchemeInfo);
}

function CloseBlackWhiteGradientTray() {
  blackWhiteGradientTrayActive.value = false;
  setTimeout(() => {
    lockUiCardOpen = false;
    TryExpandCloseUiCard();
  }, trayHangTime);
}

function CloseColorSchemeTray() {
  colorSchemeTrayActive.value = false;
  setTimeout(() => {
    lockUiCardOpen = false;
    TryExpandCloseUiCard();
  }, trayHangTime);
}

let mouseX: number = window.innerWidth * 0.5;
window.addEventListener("mousemove", (event: MouseEvent) => {
  mouseX = event.clientX;
  if (lockUiCardOpen) return;
  TryExpandCloseUiCard();
});

const uiCardClass = ref<string>();

function TryExpandCloseUiCard() {
  uiCardClass.value =
      mouseX < window.innerWidth * 0.4 ? "uiCardActive" : "uiCardInactive";
}

async function NewGradientUploaded(url: string){
  let newAssetKey = await NewGradientMapUploaded(url, selectableImages.value.length + 1);
  selectableImages.value.push({
    url: url, key: newAssetKey
  });
  BlackWhiteGradientSelected({imgUrl: url, imgKey: newAssetKey});
}

async function NewColorPaletteUploaded(colorPaletteData : {imageBlobUrl: string; size: number}) {
  let paletteAssetKey = await LoadNewColorPaletteIntoPhaser(colorPaletteData.imageBlobUrl, selectableColorSchemes.value.length + 1);
  const sizeAsString = colorPaletteData.size.toString();
  selectableColorSchemes.value.push({
    url: colorPaletteData.imageBlobUrl,
    key: sizeAsString
  });
  AddNewUrlToAssetPackMapItem(colorPaletteData.imageBlobUrl, paletteAssetKey);
  ColorSchemeSelected({imgUrl: colorPaletteData.imageBlobUrl, imgKey: sizeAsString});
}

const colorPaletteImageProcessor : ColorPaletteImageProcessor = new ColorPaletteImageProcessor();
colorPaletteImageProcessor.AddImageProcessedCallback((paletteData : {imageBlobUrl : string, size: number}) =>{
  NewColorPaletteUploaded(paletteData);
})
const gradientMapImageProcessor : GradientMapImageProcessor = new GradientMapImageProcessor();
gradientMapImageProcessor.AddImageProcessedCallback((imgUrl : string) =>{
  NewGradientUploaded(imgUrl);
})
</script>

<template>
  <div id="centerEverytingVertically">
    <div id="uiCard" :class="uiCardClass">

      <div id="titleSection">
        <h1>Pallette Cycling Demo</h1>
        <p>By James Bland made with Phaser</p>
      </div>

      <!-- Color Gradient -->
      <div class="section">
        <h2>🎨 Color Palette</h2>

        <div
            id="gradientMapPreview"
            class="clickablePreview"
            @click="DispyColorSchemeTray"
        >
          <img :src="colorGradientUrl" />
          <div class="badge">{{ colorGradientSize }} colors</div>
          <div class="hoverOverlay">Click to choose new</div>
        </div>
      </div>

      <!-- Black & White Gradient -->
      <div class="section">
        <h2>⚫ Gradient Map</h2>

        <div
            id="blackWhiteGradientMapPreview"
            class="clickablePreview"
            @click="DisplayBlackWhiteGradientTray"
        >
          <img :src="blackWhiteGradientUrl" />
          <div class="hoverOverlay">Click to choose new</div>
        </div>
      </div>

      <!-- Speed -->
      <div class="section">
        <h2>🚀 Speed</h2>
        <div id="chooseSpeed">
          <input
              type="range"
              min="-2.5"
              max="2.5"
              step="0.01"
              v-model.number="speed"
          />
          <input
              type="text"
              v-model.number="speed"
              id="chooseSpeedTextInput"
          />
        </div>
      </div>

    </div>

    <!-- Trays -->
    <div id="colorGradientTrayContaier">
      <select-from-options-tray
          :selectable-images="selectableColorSchemes"
          :active="colorSchemeTrayActive"
          @selected="ColorSchemeSelected"
          :image-upload-processor = "colorPaletteImageProcessor"
      />
    </div>

    <div id="blackWhiteImageTrayContainer">
      <select-from-options-tray
          :selectable-images="selectableImages"
          :active="blackWhiteGradientTrayActive"
          @selected="BlackWhiteGradientSelected"
          img-fit-mode="cover"
          :image-upload-processor="gradientMapImageProcessor"
      />
    </div>
  </div>
</template>

<style scoped>
@property --UiCardLeftTranslateDefault {
  syntax: "<percentage>";
  inherits: false;
  initial-value: -95%;
}

#centerEverytingVertically {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
}

#titleSection {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#titleSection h1,
#titleSection p {
  margin: 0;
}

.section {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

img {
  width: 100%;
  height: 100%;
}

.clickablePreview {
  position: relative;
  cursor: pointer;
  border-radius: 14px;
  overflow: hidden;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.clickablePreview:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}

#gradientMapPreview,
#blackWhiteGradientMapPreview {
  width: 100%;
  height: 80px;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.15);
}

#gradientMapPreview img,
#blackWhiteGradientMapPreview img {
  object-fit: cover;
}

/* Hover text overlay */
.hoverOverlay {
  position: absolute;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.04em;

  color: white;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(4px);

  opacity: 0;
  transition: opacity 0.15s ease;
  pointer-events: none;
  border-radius: 14px;
}

.clickablePreview:hover .hoverOverlay {
  opacity: 1;
}

.badge {
  position: absolute;
  right: 8px;
  bottom: 8px;

  padding: 0.25rem 0.6rem;
  font-size: 0.75rem;

  border-radius: 999px;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);
}

#chooseSpeed {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

#uiCard {
  width: 25%;
  height: 90%;
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  border-radius: 24px;
  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(14px);
  overflow-y: scroll;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;
}

@keyframes SlideInFromLeft
{
  0% {
    transform: translateX(var(--UiCardLeftTranslateDefault));
  }
  100%{
    transform: translateX(0);
  }
}

#uiCard.uiCardActive{
  animation: SlideInFromLeft 0.5s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
}

@keyframes SlideOutToLeft
{
  0%{
    transform: translateX(0);
  }
  100%{
    transform: translateX(var(--UiCardLeftTranslateDefault));
  }
}

#uiCard.uiCardInactive{
  animation: SlideOutToLeft 0.5s;
  animation-timing-function:
      ease-out;animation-fill-mode: forwards;
}

#chooseSpeedTextInput {
  width: 4.5rem;
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
</style>
