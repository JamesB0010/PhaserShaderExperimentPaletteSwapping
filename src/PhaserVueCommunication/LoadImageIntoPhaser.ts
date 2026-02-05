class LoadImageIntoPhaser{
    //the id is just a number that will give 
    private loadAssetIntoPhaser: (url: string, assetName : string) => Promise<string>;
    
    public LoadNewAssetIntoPhaser(url: string, assetName : string): Promise<string>{
        return this.loadAssetIntoPhaser(url, assetName);
    }
    
    public SetLoadAssetIntoPhaserCallback(func : (url: string, assetName : string) => Promise<string>) : void {
        this.loadAssetIntoPhaser = func;
    }
}

const PhaserImageLoader = new LoadImageIntoPhaser();

export {PhaserImageLoader}