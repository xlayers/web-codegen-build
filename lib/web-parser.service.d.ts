/// <reference types="sketchapp" />
import { CssCodeGenService } from '@xlayers/css-codegen';
import { FormatService, ImageService, LayerService, SymbolService } from '@xlayers/sketch-lib';
import { TextService } from '@xlayers/sketch-lib';
import { SvgCodeGenService } from '@xlayers/svg-codegen';
import { WebCodeGenOptions } from './web-codegen.d';
import { WebContextService } from './web-context.service';
export declare class WebParserService {
    private readonly textService;
    private readonly formatService;
    private readonly symbolService;
    private readonly imageService;
    private readonly layerService;
    private readonly cssCodeGen;
    private readonly svgCodeGen;
    private readonly webContext;
    constructor(textService: TextService, formatService: FormatService, symbolService: SymbolService, imageService: ImageService, layerService: LayerService, cssCodeGen: CssCodeGenService, svgCodeGen: SvgCodeGenService, webContext: WebContextService);
    compute(current: SketchMSLayer, data: SketchMSData, options: WebCodeGenOptions): void;
    private walk;
    private visit;
    private visitContent;
    private visitLayer;
    private visitSymbol;
    private visitBitmap;
    private visitText;
    private visitShape;
    private generateClassAttribute;
}
