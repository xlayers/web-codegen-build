/// <reference types="sketchapp" />
import { FormatService, SymbolService, LayerService, ImageService, TextService } from '@xlayers/sketch-lib';
import { WebContextService } from './web-context.service';
import { WebCodeGenOptions } from './web-codegen';
import { CssCodeGenService } from '@xlayers/css-codegen';
import { SvgCodeGenService } from '@xlayers/svg-codegen';
export declare class WebAggregatorService {
    private readonly textService;
    private readonly symbolService;
    private readonly imageService;
    private readonly formatService;
    private readonly layerService;
    private readonly webContext;
    private readonly cssCodeGen;
    private readonly svgCodeGen;
    constructor(textService: TextService, symbolService: SymbolService, imageService: ImageService, formatService: FormatService, layerService: LayerService, webContext: WebContextService, cssCodeGen: CssCodeGenService, svgCodeGen: SvgCodeGenService);
    aggregate(current: SketchMSLayer, options: WebCodeGenOptions): {
        kind: string;
        value: string;
        language: string;
        uri: string;
    }[];
    private renderComponent;
    private walk;
    private visit;
    private visitLayer;
    private visitSymbol;
    private visitBitmap;
    private visitText;
    private visitShape;
    private renderAttributeTag;
}
