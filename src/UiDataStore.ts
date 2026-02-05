import { defineStore } from "pinia"
import {ref} from "vue";


export const ColorGradientData = defineStore('ColorGradientData', () => {
    const url = ref("/assets/ColorPallette 1.png");
    const active = ref(false);
    const size = ref(4);
    
    return {url, active, size};
})

export const BlackWhiteGradientTrayData = defineStore('BlackWhiteGradientTrayData', () => {
    const url = ref("/assets/GradientMap1.jpg");
    const active = ref(false);
    
    return {active, url};
})

export const SharedTrayData = defineStore('SharedTrayData', () => {
    let lockUiCardOpen = false;
    const trayHangTime = 1000;
    const uiCardClass = ref<string>();
    const mouseX= ref(window.innerWidth * 0.5);

    function TryExpandCloseUiCard() {
        if(!matchMedia('(pointer:fine)').matches)
            return;
        
        uiCardClass.value =
            mouseX.value < window.innerWidth * 0.4 ? "uiCardActive" : "uiCardInactive";
    }
    
    return {lockUiCardOpen, trayHangTime, uiCardClass, mouseX, TryExpandCloseUiCard};
})

export const SpeedData = defineStore('SpeedData', () => {
    const speed = ref(0.8);
    
    return {speed};
})