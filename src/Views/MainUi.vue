<script setup lang="ts">
import { ref } from 'vue'
import { NewColorSchemeSelected } from "../EventsFromUi/NewColorSchemeSelected.ts";
import { speed } from "../UiModelData/MainUiModelData.ts";
import SelectFromOptionsTray from "../VueComponents/SelectFromOptionsTray.vue";
import { NewGradientSelected } from "../EventsFromUi/NewBlackWhiteGradientSelected.ts";

const colorGradientUrl = ref("../../public/assets/ColorPallette 1.png");
const blackWhiteGradientUrl = ref("../../public/assets/GradientMap1.jpg");
const colorGradientSize = ref(4);

const selectableImages: Array<{ url: string; key: string }> = [
  { url: "../../public/assets/GradientMap1.jpg", key: "GradientMap1" },
  { url: "../../public/assets/GradientMap2.jpg", key: "GradientMap2" },
  { url: "../../public/assets/GradientMap3.jpg", key: "GradientMap3" },
  { url: "../../public/assets/GradientMap4.jpg", key: "GradientMap4" },
  { url: "../../public/assets/GradientMap5.jpg", key: "GradientMap5" },
  { url: "../../public/assets/GradientMap7.png", key: "GradientMap7" },
  { url: "../../public/assets/GradientMap8.png", key: "GradientMap8" },
  { url: "../../public/assets/GradientMap9.png", key: "GradientMap9" },
  { url: "../../public/assets/GradientMap10.png", key: "GradientMap10" },
  { url: "../../public/assets/GradientMap6.png", key: "GradientMap6" },
  { url: "../../public/assets/GradientMap11.png", key: "GradientMap11" },
  { url: "../../public/assets/GradientMap12.png", key: "GradientMap12" },
];

const selectableColorSchemes: Array<{ url: string; key: string }> = [
  { url: "../../public/assets/ColorPallette 1.png", key: "4" },
  { url: "../../public/assets/ColorPallette 2.png", key: "4" },
  { url: "../../public/assets/ColorPallette 3.png", key: "8" },
  { url: "../../public/assets/ColorPallette 4.png", key: "5" },
  { url: "../../public/assets/ColorPallette 5.png", key: "4" },
  { url: "../../public/assets/ColorPallette 6.png", key: "6" },
  { url: "../../public/assets/ColorPallette 7.png", key: "6" }
];

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
      />
    </div>

    <div id="blackWhiteImageTrayContainer">
      <select-from-options-tray
          :selectable-images="selectableImages"
          :active="blackWhiteGradientTrayActive"
          @selected="BlackWhiteGradientSelected"
          img-fit-mode="cover"
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
</style>
