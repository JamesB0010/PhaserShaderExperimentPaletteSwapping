import {fileOpen, FileWithHandle} from "browser-fs-access"
export default abstract class ImageUploadProcessor {
   public abstract ProcessImage():Promise<void>;
   
   protected RetrieveImageFromUser(): Promise<FileWithHandle>{
      return fileOpen({
            description: 'Image files',
            mimeTypes: ['image/jpg', 'image/png', 'image/gif', 'image/webp'],
            extensions: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
            multiple: false
        });
   }
}