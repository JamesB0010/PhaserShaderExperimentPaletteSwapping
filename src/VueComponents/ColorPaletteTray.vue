<script setup lang="ts">
import SelectFromOptionsTray from "./SelectFromOptionsTray.vue";
import {Ref, ref} from "vue";
import {BlackWhiteGradientTrayData, SharedTrayData} from "../UiDataStore.ts";
import {NewGradientSelected} from "../EventsFromUi/NewBlackWhiteGradientSelected.ts";
import GradientMapImageProcessor from "../ImageUploadProcessors/GradientMapImageProcessor.ts";
import {PhaserImageLoader} from "../PhaserVueCommunication/LoadImageIntoPhaser.ts";


const sharedTrayDataStore = SharedTrayData();
const blackWhiteGradientTrayDataStore = BlackWhiteGradientTrayData();

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


function BlackWhiteGradientSelected(args: { imgUrl: string; imgKey: string }) {
  blackWhiteGradientTrayDataStore.url= args.imgUrl;
  CloseBlackWhiteGradientTray();
  NewGradientSelected(args.imgKey);
}

function CloseBlackWhiteGradientTray() {
  blackWhiteGradientTrayDataStore.active = false;
  setTimeout(() => {
    sharedTrayDataStore.lockUiCardOpen = false;
    sharedTrayDataStore.TryExpandCloseUiCard();
  }, sharedTrayDataStore.trayHangTime);
}


const gradientMapImageProcessor : GradientMapImageProcessor = new GradientMapImageProcessor();
gradientMapImageProcessor.AddImageProcessedCallback((imgUrl : string) =>{
  NewGradientUploaded(imgUrl);
})


async function NewGradientUploaded(url: string){
  let newAssetKey = await PhaserImageLoader.LoadNewAssetIntoPhaser(url, `GradientMap${selectableImages.value.length + 1}`);
  selectableImages.value.push({
    url: url, key: newAssetKey
  });
  BlackWhiteGradientSelected({imgUrl: url, imgKey: newAssetKey});
}
</script>

<template>
  <div id="blackWhiteImageTrayContainer">
    <select-from-options-tray
        :selectable-images="selectableImages"
        :active="blackWhiteGradientTrayDataStore.active"
        @selected="BlackWhiteGradientSelected"
        img-fit-mode="cover"
        :image-upload-processor="gradientMapImageProcessor"
    />
  </div>
</template>