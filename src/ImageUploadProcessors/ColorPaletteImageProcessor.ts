import ImageUploadProcessor from "./ImageUploadProcessor.ts";
import {FileWithHandle} from "browser-fs-access"
import {fetchURL, Image} from "image-js"

export default class ColorPaletteImageProcessor extends ImageUploadProcessor{
    private onImageProcessedCallback : (colorPaletteData : {imageBlobUrl : string, size: number})=>void;
    public async ProcessImage(): Promise<void> {
        const blob : FileWithHandle = await super.RetrieveImageFromUser();
        const imageUrl : string = URL.createObjectURL(blob);
        let imageWidth : number = await this.GetWidthOfImageFromUrl(imageUrl);
        this.onImageProcessedCallback({imageBlobUrl: imageUrl, size: imageWidth});
    }
    
    private async GetWidthOfImageFromUrl(url:string): Promise<number>{
        const image : Image = await fetchURL(url);
        return image.width;
    }
    
    public AddImageProcessedCallback(callback : (colorPaletteData : {imageBlobUrl : string, size: number}) => void){
        this.onImageProcessedCallback = callback;
    }
}