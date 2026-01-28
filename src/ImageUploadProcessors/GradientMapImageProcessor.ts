import ImageUploadProcessor from "./ImageUploadProcessor.ts";
import {fetchURL, Image, writeCanvas} from "image-js"
import {FileWithHandle} from "browser-fs-access"

export default class GradientMapImageProcessor extends ImageUploadProcessor{
    private onImageProcessedCallback : (imageBlobUrl : string)=>void;
    public async ProcessImage(): Promise<void>{
        const blob : FileWithHandle = await super.RetrieveImageFromUser();

        const newImageUrl : string = URL.createObjectURL(blob);

        const greyscaleBlobURL = await this.ConvertImageUrlToGreyscaleUrl(newImageUrl);

        //cleanup uneeded object urls
        URL.revokeObjectURL(newImageUrl);
        
        this.onImageProcessedCallback(greyscaleBlobURL);
    }

    private async ConvertImageUrlToGreyscaleUrl(inUrl : string) : Promise<string>{
        let uploadedImage : Image = await fetchURL(inUrl);
        const imageGreyscale = uploadedImage.grey();

        const greyscaleBlob = await this.WriteImageToBlob(imageGreyscale);

        return URL.createObjectURL(greyscaleBlob);
    }


    private async WriteImageToBlob(image : Image): Promise<Blob>{
        const canvas = document.createElement('canvas');
        writeCanvas(image, canvas);

        return new Promise((resolve) =>
            canvas.toBlob(
                (b) => resolve(b!),
                'image/png' // or image/jpeg, image/webp
            )
        );
    }
    
    public AddImageProcessedCallback(callback : (imgUrl : string) =>void){
        this.onImageProcessedCallback = callback;
    }
}