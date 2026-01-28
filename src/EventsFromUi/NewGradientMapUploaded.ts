let LoadNewImageIntoPhaser : (url : string, gradientMapCount: number)=>Promise<string>;

function NewGradientMapUploaded(url : string, gradientMapCount: number): Promise<string> {
    return LoadNewImageIntoPhaser(url, gradientMapCount);
}

function SetLoadIntoPhaserLambda(lambda : (url : string, gradientMapCount: number)=>Promise<string>){
    LoadNewImageIntoPhaser = lambda;
}

export { NewGradientMapUploaded, SetLoadIntoPhaserLambda};