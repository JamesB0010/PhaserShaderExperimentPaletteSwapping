import { defineStore } from "pinia"
import {ref} from "vue";


export const ColorGradientData = defineStore('ColorGradientData', () => {
    const colorGradientUrl = ref("/assets/ColorPallette 1.png");
    const colorSchemeTrayActive = ref(false);
    const colorGradientSize = ref(4);
    
    return {colorGradientUrl, colorSchemeTrayActive, colorGradientSize};
})

export const BlackWhiteGradientTrayData = defineStore('BlackWhiteGradientTrayData', () => {
    const blackWhiteGradientTrayActive = ref(false);
    const blackWhiteGradientUrl = ref("/assets/GradientMap1.jpg");
    
    return {blackWhiteGradientTrayActive, blackWhiteGradientUrl};
})

export const SharedTrayData = defineStore('SharedTrayData', () => {
    let lockUiCardOpen = false;
    const trayHangTime = 1000;
    const uiCardClass = ref<string>();
    const mouseX= ref(window.innerWidth * 0.5);

    function TryExpandCloseUiCard() {
        uiCardClass.value =
            mouseX.value < window.innerWidth * 0.4 ? "uiCardActive" : "uiCardInactive";
        
        if(uiCardClass.value == "uiCardActive") {
            console.log("active");
        }
    }
    
    return {lockUiCardOpen, trayHangTime, uiCardClass, mouseX, TryExpandCloseUiCard};
})