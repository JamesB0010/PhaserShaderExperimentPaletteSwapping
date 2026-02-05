<script setup lang="ts">
import ColorGradientTray from "../VueComponents/ColorGradientTray.vue";
import {BlackWhiteGradientTrayData, ColorGradientData, SharedTrayData, SpeedData} from "../UiDataStore.ts";
import ColorPaletteTray from "../VueComponents/ColorPaletteTray.vue";

const sharedTrayDataStore = SharedTrayData();
const colorGradientDataStore = ColorGradientData();
const blackWhiteGradientTrayDataStore = BlackWhiteGradientTrayData();
const speedDataStore = SpeedData();

function DisplayBlackWhiteGradientTray() {
  blackWhiteGradientTrayDataStore.blackWhiteGradientTrayActive= true;
  sharedTrayDataStore.lockUiCardOpen = true;
}

window.addEventListener("mousemove", (event: MouseEvent) => {
  sharedTrayDataStore.mouseX = event.clientX;
  if (sharedTrayDataStore.lockUiCardOpen) return;
  sharedTrayDataStore.TryExpandCloseUiCard();
});


function DispyColorSchemeTray() {
  colorGradientDataStore.colorSchemeTrayActive = true;
  sharedTrayDataStore.lockUiCardOpen = true;
}
</script>

<template>
  <div id="centerEverytingVertically">
    <div id="uiCard" :class="sharedTrayDataStore.uiCardClass">

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
          <img :src="colorGradientDataStore.colorGradientUrl" />
          <div class="badge">Palette Width: {{ colorGradientDataStore.colorGradientSize }}</div>
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
          <img :src="blackWhiteGradientTrayDataStore.blackWhiteGradientUrl" />
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
              v-model.number="speedDataStore.speed"
              id = "rangeInput"
          />
          <input
              type="text"
              v-model.number="speedDataStore.speed"
              id="chooseSpeedTextInput"
          />
        </div>
      </div>
    </div>

    <!-- Trays -->
    <ColorGradientTray/>
    <ColorPaletteTray/>
  </div>
</template>

<style scoped>
@property --UiCardLeftTranslateDefault {
  syntax: "<percentage>";
  inherits: false;
  initial-value: -95%;
}

#rangeInput{
  width:70%;
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
  width:100%;
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



#chooseSpeed {
  display: flex;
  align-items: center;
  width: 100%;
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
  
  /*ide scrollbars*/
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
  width: 10%;
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
