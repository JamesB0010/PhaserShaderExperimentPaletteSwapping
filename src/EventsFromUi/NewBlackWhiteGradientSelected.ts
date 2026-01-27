type GradientUpdatedHandler = {ctx: any, callback: (gradientAssetKey : string) =>void};

const newGradientSelectedHandlers = new Array<GradientUpdatedHandler>();

function NewGradientSelected(gradientAssetKey : string){
    for(const handler of newGradientSelectedHandlers){
        handler.callback.call(handler.ctx, gradientAssetKey );
    }
}

function AddNewBlackWhiteSelectedCallback(ctx: any, callback: (gradientAssetKey : string) =>void){
    let handler : GradientUpdatedHandler = {ctx, callback};
    newGradientSelectedHandlers.push(handler);
}

export {NewGradientSelected, AddNewBlackWhiteSelectedCallback};