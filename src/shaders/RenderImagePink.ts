import WebGLTextureWrapper = Phaser.Renderer.WebGL.Wrappers.WebGLTextureWrapper;
import Phaser from "phaser";
import {AddNewColorSchemeSelectedCallback} from "../EventsFromUi/NewColorSchemeSelected.ts";
import {SpeedData} from "../UiDataStore.ts";

const fragmentShader = `
#define SHADER_NAME Pink

#ifdef GL_ES
precision mediump float;
#endif

varying vec2 outTexCoord;
uniform sampler2D colorPalette;
uniform sampler2D uMainSampler[1];

uniform float uPaletteWidth;
uniform float uCycleSpeed;
uniform float uTime;

void main(){
    float index = texture2D(uMainSampler[0], outTexCoord).r;
    gl_FragColor = vec4(index, index, index, 1);
    float animatedIndex = (index * uPaletteWidth) + (uTime * uCycleSpeed);
    float wrappedIndex = mod(animatedIndex, uPaletteWidth);
    float paletteCoordinate = wrappedIndex / uPaletteWidth;
    vec4 finalColor = texture2D(colorPalette, vec2(paletteCoordinate, 0.5));
    gl_FragColor = vec4(finalColor.rgb, 1.0);
}
`
let speedDataStore : any = null;

export default class RenderImagePinkShader extends Phaser.Renderer.WebGL.Pipelines.MultiPipeline{
    private colorPallette : WebGLTextureWrapper;
    private paletteWidth: number = 4;
    constructor(game : Phaser.Game) {
        super({
            game,
            fragShader: fragmentShader
        });
        if(speedDataStore == null)
            speedDataStore = SpeedData();
        
        this.UpdateColorPalette({imageKey: "ColorPallette 1", size: 4});
        AddNewColorSchemeSelectedCallback(this, this.UpdateColorPalette);
    }
    
    private UpdateColorPalette (newImageInfo : {imageKey: string, size: number}) : void {
        this.colorPallette = this.game.textures.getFrame(newImageInfo.imageKey).glTexture;
        this.paletteWidth = newImageInfo.size;
    }
    onPreRender() {
        const gl = this.gl;

        // Pick a texture unit that is NOT used by uMainSampler[]
        // MultiPipeline usually starts at TEXTURE0
        const textureUnit = 1;

        // Activate texture unit
        gl.activeTexture(gl.TEXTURE0 + textureUnit);

        // Bind the palette texture
        gl.bindTexture(gl.TEXTURE_2D, this.colorPallette.webGLTexture);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        // Tell the shader that "colorPalette" uses this texture unit
        this.set1i('colorPalette', textureUnit);
        
        this.set1f("uTime", this.game.loop.time / 1000);
        this.set1f("uCycleSpeed", speedDataStore.speed);
        this.set1f("uPaletteWidth", this.paletteWidth);
    }
}