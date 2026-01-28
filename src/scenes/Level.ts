
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
import WebGLRenderer = Phaser.Renderer.WebGL.WebGLRenderer;
import RenderImagePinkShader from "../shaders/RenderImagePink.ts";
import {AddNewBlackWhiteSelectedCallback} from "../EventsFromUi/NewBlackWhiteGradientSelected.ts";
/* END-USER-IMPORTS */

export default class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// ShaderOutputImage
		const shaderOutputImage = this.add.image(640, 360, "GradientMap1");
		shaderOutputImage.scaleX = 0.3;
		shaderOutputImage.scaleY = 0.3;

		this.shaderOutputImage = shaderOutputImage;

		this.events.emit("scene-awake");
	}

	private shaderOutputImage!: Phaser.GameObjects.Image;

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();

		(this.renderer as WebGLRenderer).pipelines.add("PinkShader", new RenderImagePinkShader(this.game))
		this.shaderOutputImage.setPipeline("PinkShader");

		this.SetOutputImageDisplaySize();
		AddNewBlackWhiteSelectedCallback(this, this.NewBlackWhiteGradientSelected);
	}

	private NewBlackWhiteGradientSelected(gradientAssetKey : string){
		this.shaderOutputImage.setTexture(gradientAssetKey);
		this.SetOutputImageDisplaySize();
	}
	
	private SetOutputImageDisplaySize(){
		this.shaderOutputImage.setDisplaySize(this.scale.width * 0.8, this.scale.height * 0.8);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
