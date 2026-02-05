<script setup lang="ts">
import SelectFromOptionsTray from "./SelectFromOptionsTray.vue";
import {ref, Ref} from "vue";
import {AddNewUrlToAssetPackMapItem, NewColorSchemeSelected} from "../EventsFromUi/NewColorSchemeSelected.ts";
import ColorPaletteImageProcessor from "../ImageUploadProcessors/ColorPaletteImageProcessor.ts";
import {PhaserImageLoader} from "../PhaserVueCommunication/LoadImageIntoPhaser.ts";
import {ColorGradientData, SharedTrayData} from "../UiDataStore.ts";


const sharedTrayDataStore = SharedTrayData();
const colorGradientDataStore = ColorGradientData();

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



const colorPaletteImageProcessor : ColorPaletteImageProcessor = new ColorPaletteImageProcessor();

colorPaletteImageProcessor.AddImageProcessedCallback((paletteData : {imageBlobUrl : string, size: number}) =>{
  NewColorPaletteUploaded(paletteData);
})

function ColorSchemeSelected(args: { imgUrl: string; imgKey: string }) {
  CloseColorSchemeTray();

  const selectedColorSchemeInfo = {
    colorSchemeImageUrl: args.imgUrl,
    size: Number(args.imgKey)
  };

  colorGradientDataStore.colorGradientUrl= selectedColorSchemeInfo.colorSchemeImageUrl;
  colorGradientDataStore.colorGradientSize = selectedColorSchemeInfo.size;

  NewColorSchemeSelected(selectedColorSchemeInfo);
}

async function NewColorPaletteUploaded(colorPaletteData : {imageBlobUrl: string; size: number}) {
  let paletteAssetKey = await PhaserImageLoader.LoadNewAssetIntoPhaser(colorPaletteData.imageBlobUrl, `ColorPalette${selectableColorSchemes.value.length + 1}`);
  const sizeAsString = colorPaletteData.size.toString();
  selectableColorSchemes.value.push({
    url: colorPaletteData.imageBlobUrl,
    key: sizeAsString
  });
  AddNewUrlToAssetPackMapItem(colorPaletteData.imageBlobUrl, paletteAssetKey);
  ColorSchemeSelected({imgUrl: colorPaletteData.imageBlobUrl, imgKey: sizeAsString});
}


function CloseColorSchemeTray() {
  colorGradientDataStore.colorSchemeTrayActive= false;
  setTimeout(() => {
    sharedTrayDataStore.lockUiCardOpen = false;
    sharedTrayDataStore.TryExpandCloseUiCard();
  }, sharedTrayDataStore.trayHangTime);
}



</script>

<template>
  <div id="colorGradientTrayContaier">
    <select-from-options-tray
        :selectable-images="selectableColorSchemes"
        :active="colorGradientDataStore.colorSchemeTrayActive"
        @selected="ColorSchemeSelected"
        :image-upload-processor = "colorPaletteImageProcessor"
        :display-image-width = "true"
    />
  </div>
</template>