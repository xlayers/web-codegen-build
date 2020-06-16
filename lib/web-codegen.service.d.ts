/// <reference types="sketchapp" />
import { ImageService, SymbolService, LayerService } from '@xlayers/sketch-lib';
import { WebContextService } from './web-context.service';
import { WebParserService } from './web-parser.service';
import { WebAggregatorService } from './web-aggregator.service';
import { WebCodeGenOptions } from './web-codegen.d';
export declare class WebCodeGenService {
    private readonly symbolService;
    private readonly imageService;
    private readonly webContext;
    private readonly webParser;
    private readonly webAggretatorService;
    private readonly layerService;
    constructor(symbolService: SymbolService, imageService: ImageService, webContext: WebContextService, webParser: WebParserService, webAggretatorService: WebAggregatorService, layerService: LayerService);
    compute(current: SketchMSLayer, data: SketchMSData, options?: WebCodeGenOptions): void;
    aggregate(current: SketchMSLayer, data: SketchMSData, options?: WebCodeGenOptions): any;
    identify(current: SketchMSLayer): boolean;
    context(current: SketchMSLayer): any;
    private visit;
    private visitContent;
    private visitLayer;
    private visitSymbolMaster;
    private compileOptions;
}
