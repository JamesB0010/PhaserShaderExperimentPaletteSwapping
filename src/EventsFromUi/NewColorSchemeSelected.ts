type ColorSchemeUpdatedHandler = {ctx: any, callback: (newImageInfo : {imageKey: string, size: number}) =>void};

const newColorSchemeSelectedHandlers = new Array<ColorSchemeUpdatedHandler>();

const colorSchemeURLsToAssetPackKey = new Map<string, string>([
    ["/assets/ColorPallette 1.png", "ColorPallette 1"],
    ["/assets/ColorPallette 2.png", "ColorPallette 2"],
    ["/assets/ColorPallette 3.png", "ColorPallette 3"],
    ["/assets/ColorPallette 4.png", "ColorPallette 4"],
    ["/assets/ColorPallette 5.png", "ColorPallette 5"],
    ["/assets/ColorPallette 6.png", "ColorPallette 6"],
    ["/assets/ColorPallette 7.png", "ColorPallette 7"],
    ["/assets/ColorPallette 8.png", "ColorPallette 8"],
]);

function NewColorSchemeSelected(newImageInfo : {colorSchemeImageUrl : string, size: number}) {
    for(const handler of newColorSchemeSelectedHandlers){
        let assetKeyString = colorSchemeURLsToAssetPackKey.get(newImageInfo.colorSchemeImageUrl);
        assetKeyString = assetKeyString? assetKeyString: "ColorPallette 1";
     
        const callbackInfo : {imageKey: string, size: number} = {imageKey: assetKeyString, size: newImageInfo.size};
        handler.callback.call(handler.ctx, callbackInfo);
    }
}

function AddNewColorSchemeSelectedCallback(ctx: any, callback: (newImageInfo : {imageKey: string, size : number}) => void) {
    let handler : ColorSchemeUpdatedHandler = {ctx, callback};
    newColorSchemeSelectedHandlers.push(handler);
}

function AddNewUrlToAssetPackMapItem(imageUrl: string, assetKey:string){
    colorSchemeURLsToAssetPackKey.set(imageUrl, assetKey);
}

export {AddNewColorSchemeSelectedCallback, NewColorSchemeSelected, AddNewUrlToAssetPackMapItem};