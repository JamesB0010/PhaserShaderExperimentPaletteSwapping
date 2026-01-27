import Phaser from "phaser";
import Level from "./scenes/Level";
import Preload from "./scenes/Preload";
import {createApp} from "vue";
import MainUi from "./Views/MainUi.vue";

class Boot extends Phaser.Scene {

    constructor() {
        super("Boot");
    }

    preload() {

        this.load.pack("pack", "assets/preload-asset-pack.json");
    }

    create() {

       this.scene.start("Preload");
    }
}

window.addEventListener('load', function () {
	
	const game = new Phaser.Game({
		width: 1280,
		height: 720,
		transparent: true,
		parent: "game-container",
		scale: {
			mode: Phaser.Scale.ScaleModes.FIT,
			autoCenter: Phaser.Scale.Center.CENTER_BOTH
		},
		scene: [Boot, Preload, Level]
	});

	game.scene.start("Boot");
	
	CreateAndMountVue();
});

function CreateAndMountVue(){
	createApp(MainUi).mount("#uiContainer");
}
