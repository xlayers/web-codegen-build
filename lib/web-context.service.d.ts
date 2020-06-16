/// <reference types="sketchapp" />
import { ImageService, LayerService, TextService } from '@xlayers/sketch-lib';
import { SvgCodeGenService } from '@xlayers/svg-codegen';
import { WebCodeGenContext } from './web-codegen.d';
export declare class WebContextService {
    private readonly layerService;
    private readonly textService;
    private readonly imageService;
    private readonly svgCodeGen;
    constructor(layerService: LayerService, textService: TextService, imageService: ImageService, svgCodeGen: SvgCodeGenService);
    identify(current: SketchMSLayer): boolean;
    of(current: SketchMSLayer): any;
    put(current: SketchMSLayer, nextContext: WebCodeGenContext): void;
    clear(current: SketchMSLayer): void;
}
