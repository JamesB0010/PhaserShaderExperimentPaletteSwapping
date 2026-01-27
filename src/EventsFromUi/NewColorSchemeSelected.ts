type ColorSchemeUpdatedHandler = {ctx: any, callback: (newImageInfo : {imageKey: string, size: number}) =>void};

const newColorSchemeSelectedHandlers = new Array<ColorSchemeUpdatedHandler>();

const colorSchemeURLsToAssetPackKey = new Map<string, string>([
    ["../../public/assets/ColorPallette 1.png", "ColorPallette 1"],
    ["../../public/assets/ColorPallette 2.png", "ColorPallette 2"],
    ["../../public/assets/ColorPallette 3.png", "ColorPallette 3"]
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

export {AddNewColorSchemeSelectedCallback, NewColorSchemeSelected};