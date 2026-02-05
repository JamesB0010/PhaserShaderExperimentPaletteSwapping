import {BlackWhiteGradientTrayData, ColorGradientData, SharedTrayData, SpeedData} from "../UiDataStore.ts";

export default function Init(){
    
    const dataStores =  GetRequiredDataStores();
    if(matchMedia('(pointer:fine)').matches) {
        ListenToMouseMove(dataStores.sharedTrayDataStore);
    }
    else{
        dataStores.sharedTrayDataStore.mouseX = 0;
    }
    
    return dataStores;
}



function GetRequiredDataStores() {
    const sharedTrayDataStore = SharedTrayData();
    const colorGradientDataStore = ColorGradientData();
    const blackWhiteGradientTrayDataStore = BlackWhiteGradientTrayData();
    const speedDataStore = SpeedData();

    return {sharedTrayDataStore, colorGradientDataStore, blackWhiteGradientTrayDataStore, speedDataStore};
}


function ListenToMouseMove(sharedTrayDataStore : any){
    window.addEventListener("mousemove", (event: MouseEvent) => {
        sharedTrayDataStore.mouseX = event.clientX;
        if (sharedTrayDataStore.lockUiCardOpen) return;
        sharedTrayDataStore.TryExpandCloseUiCard();
    });
}

