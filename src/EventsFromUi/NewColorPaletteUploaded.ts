let LoadPaletteIntoPhaser: (url: string, colorPaletteCount: number) => Promise<string>;

function LoadNewColorPaletteIntoPhaser(url: string, colorPaletteCount: number) : Promise<string>{
    return LoadPaletteIntoPhaser(url, colorPaletteCount);
}

function SetLoadPaletteIntoPhaserLambda(lambda : (url: string, colorPaletteCount: number) => Promise<string>) : void {
    LoadPaletteIntoPhaser = lambda;
}

export {LoadNewColorPaletteIntoPhaser, SetLoadPaletteIntoPhaserLambda};