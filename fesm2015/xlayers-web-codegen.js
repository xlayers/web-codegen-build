import { Injectable, ɵɵdefineInjectable, ɵɵinject, NgModule } from '@angular/core';
import { LayerService, TextService, ImageService, FormatService, SymbolService, SketchLibModule } from '@xlayers/sketch-lib';
import { SvgCodeGenService, SvgCodeGenModule } from '@xlayers/svg-codegen';
import { CssCodeGenService, CssCodeGenModule } from '@xlayers/css-codegen';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class WebContextService {
    /**
     * @param {?} layerService
     * @param {?} textService
     * @param {?} imageService
     * @param {?} svgCodeGen
     */
    constructor(layerService, textService, imageService, svgCodeGen) {
        this.layerService = layerService;
        this.textService = textService;
        this.imageService = imageService;
        this.svgCodeGen = svgCodeGen;
    }
    /**
     * @param {?} current
     * @return {?}
     */
    identify(current) {
        return (this.imageService.identify(current) ||
            this.textService.identify(current) ||
            this.layerService.identify(current) ||
            this.svgCodeGen.identify(current) ||
            [
                'oval',
                'rect',
                'rectangle',
                'group',
                'symbolMaster',
                'shapeGroup'
            ].includes((/** @type {?} */ (current._class))));
    }
    /**
     * @param {?} current
     * @return {?}
     */
    of(current) {
        return ((/** @type {?} */ (current))).web;
    }
    /**
     * @param {?} current
     * @param {?} nextContext
     * @return {?}
     */
    put(current, nextContext) {
        ((/** @type {?} */ (current))).web = Object.assign({}, this.of(current), nextContext);
    }
    /**
     * @param {?} current
     * @return {?}
     */
    clear(current) {
        delete ((/** @type {?} */ (current))).web;
    }
}
WebContextService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
WebContextService.ctorParameters = () => [
    { type: LayerService },
    { type: TextService },
    { type: ImageService },
    { type: SvgCodeGenService }
];
/** @nocollapse */ WebContextService.ngInjectableDef = ɵɵdefineInjectable({ factory: function WebContextService_Factory() { return new WebContextService(ɵɵinject(LayerService), ɵɵinject(TextService), ɵɵinject(ImageService), ɵɵinject(SvgCodeGenService)); }, token: WebContextService, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    WebContextService.prototype.layerService;
    /**
     * @type {?}
     * @private
     */
    WebContextService.prototype.textService;
    /**
     * @type {?}
     * @private
     */
    WebContextService.prototype.imageService;
    /**
     * @type {?}
     * @private
     */
    WebContextService.prototype.svgCodeGen;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class WebParserService {
    /**
     * @param {?} textService
     * @param {?} formatService
     * @param {?} symbolService
     * @param {?} imageService
     * @param {?} layerService
     * @param {?} cssCodeGen
     * @param {?} svgCodeGen
     * @param {?} webContext
     */
    constructor(textService, formatService, symbolService, imageService, layerService, cssCodeGen, svgCodeGen, webContext) {
        this.textService = textService;
        this.formatService = formatService;
        this.symbolService = symbolService;
        this.imageService = imageService;
        this.layerService = layerService;
        this.cssCodeGen = cssCodeGen;
        this.svgCodeGen = svgCodeGen;
        this.webContext = webContext;
    }
    /**
     * @param {?} current
     * @param {?} data
     * @param {?} options
     * @return {?}
     */
    compute(current, data, options) {
        this.svgCodeGen.compute(current, data, options);
        this.cssCodeGen.compute(current, data, options);
        if (current._class === 'page') {
            this.walk(current, data, options);
        }
        else {
            this.visit(current, data, options);
        }
    }
    /**
     * @private
     * @param {?} current
     * @param {?} data
     * @param {?} options
     * @return {?}
     */
    walk(current, data, options) {
        if (this.layerService.identify(current)) {
            current.layers.forEach((/**
             * @param {?} layer
             * @return {?}
             */
            layer => {
                this.visit(layer, data, options);
            }));
        }
        else if (this.symbolService.identify(current)) {
            this.visitSymbol(current, data, options);
        }
    }
    /**
     * @private
     * @param {?} current
     * @param {?} data
     * @param {?} options
     * @return {?}
     */
    visit(current, data, options) {
        if (options.force) {
            this.webContext.clear(current);
        }
        if (this.webContext.identify(current)) {
            if (!this.webContext.of(current)) {
                this.visitContent(current, options);
            }
        }
        this.walk(current, data, options);
    }
    /**
     * @private
     * @param {?} current
     * @param {?} options
     * @return {?}
     */
    visitContent(current, options) {
        if (this.imageService.identify(current)) {
            this.visitBitmap(current, options);
        }
        else if (this.textService.identify(current)) {
            this.visitText(current);
        }
        else if (this.svgCodeGen.identify(current)) {
            this.visitShape(current);
        }
        else {
            this.visitLayer(current, options);
        }
    }
    /**
     * @private
     * @param {?} current
     * @param {?} options
     * @return {?}
     */
    visitLayer(current, options) {
        this.webContext.put(current, {
            attributes: [
                ...this.generateClassAttribute(current),
                `role="${current._class}"`,
                `aria-label="${current.name}"`
            ]
        });
    }
    /**
     * @private
     * @param {?} current
     * @param {?} data
     * @param {?} options
     * @return {?}
     */
    visitSymbol(current, data, options) {
        /** @type {?} */
        const symbolMaster = this.symbolService.lookup(current, data);
        if (symbolMaster) {
            this.compute(symbolMaster, data, options);
            /** @type {?} */
            const context = this.webContext.of(current);
            this.webContext.put(current, {
                components: context && context.components
                    ? [...context.components, current.name]
                    : [current.name]
            });
        }
    }
    /**
     * @private
     * @param {?} current
     * @param {?} options
     * @return {?}
     */
    visitBitmap(current, options) {
        /** @type {?} */
        const fileName = this.formatService.normalizeName(current.name);
        this.webContext.put(current, {
            attributes: [
                ...this.generateClassAttribute(current),
                `role="${current._class}"`,
                `aria-label="${current.name}"`,
                `src="/${options.assetDir}/${fileName}.png"`
            ]
        });
    }
    /**
     * @private
     * @param {?} current
     * @return {?}
     */
    visitText(current) {
        this.webContext.put(current, {
            attributes: this.generateClassAttribute(current)
        });
    }
    /**
     * @private
     * @param {?} current
     * @return {?}
     */
    visitShape(current) {
        this.webContext.put(current, {
            attributes: this.generateClassAttribute(current)
        });
    }
    /**
     * @private
     * @param {?} current
     * @return {?}
     */
    generateClassAttribute(current) {
        if (this.cssCodeGen.identify(current)) {
            /** @type {?} */
            const className = this.cssCodeGen.context(current).className;
            if (className) {
                return [`class="${className}"`];
            }
        }
        return [];
    }
}
WebParserService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
WebParserService.ctorParameters = () => [
    { type: TextService },
    { type: FormatService },
    { type: SymbolService },
    { type: ImageService },
    { type: LayerService },
    { type: CssCodeGenService },
    { type: SvgCodeGenService },
    { type: WebContextService }
];
/** @nocollapse */ WebParserService.ngInjectableDef = ɵɵdefineInjectable({ factory: function WebParserService_Factory() { return new WebParserService(ɵɵinject(TextService), ɵɵinject(FormatService), ɵɵinject(SymbolService), ɵɵinject(ImageService), ɵɵinject(LayerService), ɵɵinject(CssCodeGenService), ɵɵinject(SvgCodeGenService), ɵɵinject(WebContextService)); }, token: WebParserService, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    WebParserService.prototype.textService;
    /**
     * @type {?}
     * @private
     */
    WebParserService.prototype.formatService;
    /**
     * @type {?}
     * @private
     */
    WebParserService.prototype.symbolService;
    /**
     * @type {?}
     * @private
     */
    WebParserService.prototype.imageService;
    /**
     * @type {?}
     * @private
     */
    WebParserService.prototype.layerService;
    /**
     * @type {?}
     * @private
     */
    WebParserService.prototype.cssCodeGen;
    /**
     * @type {?}
     * @private
     */
    WebParserService.prototype.svgCodeGen;
    /**
     * @type {?}
     * @private
     */
    WebParserService.prototype.webContext;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class WebAggregatorService {
    /**
     * @param {?} textService
     * @param {?} symbolService
     * @param {?} imageService
     * @param {?} formatService
     * @param {?} layerService
     * @param {?} webContext
     * @param {?} cssCodeGen
     * @param {?} svgCodeGen
     */
    constructor(textService, symbolService, imageService, formatService, layerService, webContext, cssCodeGen, svgCodeGen) {
        this.textService = textService;
        this.symbolService = symbolService;
        this.imageService = imageService;
        this.formatService = formatService;
        this.layerService = layerService;
        this.webContext = webContext;
        this.cssCodeGen = cssCodeGen;
        this.svgCodeGen = svgCodeGen;
    }
    /**
     * @param {?} current
     * @param {?} options
     * @return {?}
     */
    aggregate(current, options) {
        /** @type {?} */
        const fileName = this.formatService.normalizeName(current.name);
        return [
            {
                kind: 'web',
                value: this.renderComponent(current, options),
                language: 'html',
                uri: `${options.componentDir}/${fileName}.html`
            },
            ...this.cssCodeGen.aggregate(current, options).map((/**
             * @param {?} file
             * @return {?}
             */
            file => (Object.assign({}, file, { kind: 'web' }))))
        ];
    }
    /**
     * @private
     * @param {?} current
     * @param {?} options
     * @return {?}
     */
    renderComponent(current, options) {
        /** @type {?} */
        const template = [];
        if (current._class === 'page') {
            this.walk(current, template, 0, options);
        }
        else {
            this.visit(current, template, 0, options);
        }
        return template.join('\n');
    }
    /**
     * @private
     * @param {?} current
     * @param {?} template
     * @param {?} indent
     * @param {?} options
     * @return {?}
     */
    walk(current, template, indent, options) {
        if (this.layerService.identify(current)) {
            current.layers.forEach((/**
             * @param {?} layer
             * @return {?}
             */
            layer => {
                this.visit(layer, template, indent, options);
            }));
        }
    }
    /**
     * @private
     * @param {?} current
     * @param {?} template
     * @param {?} indent
     * @param {?} options
     * @return {?}
     */
    visit(current, template, indent, options) {
        if (this.symbolService.identify(current)) {
            this.visitSymbol(current, template, indent, options);
        }
        else if (this.imageService.identify(current)) {
            this.visitBitmap(current, template, indent, options);
        }
        else if (this.textService.identify(current)) {
            this.visitText(current, template, indent, options);
        }
        else if (this.svgCodeGen.identify(current)) {
            this.visitShape(current, template, indent, options);
        }
        else if (this.webContext.identify(current)) {
            this.visitLayer(current, template, indent, options);
        }
    }
    /**
     * @private
     * @param {?} current
     * @param {?} template
     * @param {?} indent
     * @param {?} options
     * @return {?}
     */
    visitLayer(current, template, indent, options) {
        /** @type {?} */
        const openTag = this.renderAttributeTag(current, options.blockTagName, options);
        /** @type {?} */
        const closeTag = `</${options.blockTagName}>`;
        template.push(this.formatService.indent(indent, openTag));
        this.walk(current, template, indent + 1, options);
        template.push(this.formatService.indent(indent, closeTag));
    }
    /**
     * @private
     * @param {?} current
     * @param {?} template
     * @param {?} indent
     * @param {?} options
     * @return {?}
     */
    visitSymbol(current, template, indent, options) {
        /** @type {?} */
        const context = this.webContext.of(current);
        if (context && context.components && context.components.lenght > 1) {
            /** @type {?} */
            const tagName = options.jsx
                ? this.formatService.className(current.name)
                : `${options.xmlPrefix}${this.formatService.normalizeName(current.name)}`;
            template.push(this.formatService.indent(indent, `<${tagName}></${tagName}>`));
        }
    }
    /**
     * @private
     * @param {?} current
     * @param {?} template
     * @param {?} indent
     * @param {?} options
     * @return {?}
     */
    visitBitmap(current, template, indent, options) {
        /** @type {?} */
        const attributes = this.webContext.of(current).attributes;
        template.push(this.formatService.indent(indent, [`<${options.bitmapTagName}`, ...attributes].join(' ') + ' />'));
    }
    /**
     * @private
     * @param {?} current
     * @param {?} template
     * @param {?} indent
     * @param {?} options
     * @return {?}
     */
    visitText(current, template, indent, options) {
        template.push(this.formatService.indent(indent, [
            this.renderAttributeTag(current, options.textTagName, options),
            this.textService.lookup(current),
            `</${options.textTagName}>`
        ].join('')));
    }
    /**
     * @private
     * @param {?} current
     * @param {?} template
     * @param {?} indent
     * @param {?} options
     * @return {?}
     */
    visitShape(current, template, indent, options) {
        template.push(this.formatService.indent(indent, this.renderAttributeTag(current, options.blockTagName, options)));
        template.push(this.svgCodeGen
            .aggregate(current, { xmlNamespace: false })
            .map((/**
         * @param {?} file
         * @return {?}
         */
        file => file.value
            .split('\n')
            .map((/**
         * @param {?} line
         * @return {?}
         */
        line => this.formatService.indent(indent + 1, line)))
            .join('\n')))
            .join('\n'));
        template.push(this.formatService.indent(indent, `</${options.blockTagName}>`));
    }
    /**
     * @private
     * @param {?} current
     * @param {?} tagName
     * @param {?} options
     * @return {?}
     */
    renderAttributeTag(current, tagName, options) {
        /** @type {?} */
        const attributes = this.webContext.of(current).attributes;
        if (options.jsx) {
            /** @type {?} */
            const attributIndex = attributes.findIndex((/**
             * @param {?} attribute
             * @return {?}
             */
            attribute => attribute.startsWith('class=')));
            if (attributIndex > 0) {
                attributes[attributIndex] = attributes[attributIndex].replace('class=', 'className=');
            }
        }
        return [`<${tagName}`, ...attributes].join(' ') + '>';
    }
}
WebAggregatorService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
WebAggregatorService.ctorParameters = () => [
    { type: TextService },
    { type: SymbolService },
    { type: ImageService },
    { type: FormatService },
    { type: LayerService },
    { type: WebContextService },
    { type: CssCodeGenService },
    { type: SvgCodeGenService }
];
/** @nocollapse */ WebAggregatorService.ngInjectableDef = ɵɵdefineInjectable({ factory: function WebAggregatorService_Factory() { return new WebAggregatorService(ɵɵinject(TextService), ɵɵinject(SymbolService), ɵɵinject(ImageService), ɵɵinject(FormatService), ɵɵinject(LayerService), ɵɵinject(WebContextService), ɵɵinject(CssCodeGenService), ɵɵinject(SvgCodeGenService)); }, token: WebAggregatorService, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    WebAggregatorService.prototype.textService;
    /**
     * @type {?}
     * @private
     */
    WebAggregatorService.prototype.symbolService;
    /**
     * @type {?}
     * @private
     */
    WebAggregatorService.prototype.imageService;
    /**
     * @type {?}
     * @private
     */
    WebAggregatorService.prototype.formatService;
    /**
     * @type {?}
     * @private
     */
    WebAggregatorService.prototype.layerService;
    /**
     * @type {?}
     * @private
     */
    WebAggregatorService.prototype.webContext;
    /**
     * @type {?}
     * @private
     */
    WebAggregatorService.prototype.cssCodeGen;
    /**
     * @type {?}
     * @private
     */
    WebAggregatorService.prototype.svgCodeGen;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class WebCodeGenService {
    /**
     * @param {?} symbolService
     * @param {?} imageService
     * @param {?} webContext
     * @param {?} webParser
     * @param {?} webAggretatorService
     * @param {?} layerService
     */
    constructor(symbolService, imageService, webContext, webParser, webAggretatorService, layerService) {
        this.symbolService = symbolService;
        this.imageService = imageService;
        this.webContext = webContext;
        this.webParser = webParser;
        this.webAggretatorService = webAggretatorService;
        this.layerService = layerService;
    }
    /**
     * @param {?} current
     * @param {?} data
     * @param {?=} options
     * @return {?}
     */
    compute(current, data, options) {
        this.webParser.compute(current, data, this.compileOptions(options));
    }
    /**
     * @param {?} current
     * @param {?} data
     * @param {?=} options
     * @return {?}
     */
    aggregate(current, data, options) {
        return this.visit(current, data, this.compileOptions(options));
    }
    /**
     * @param {?} current
     * @return {?}
     */
    identify(current) {
        return this.webContext.identify(current);
    }
    /**
     * @param {?} current
     * @return {?}
     */
    context(current) {
        return this.webContext.of(current);
    }
    /**
     * @private
     * @param {?} current
     * @param {?} data
     * @param {?=} options
     * @return {?}
     */
    visit(current, data, options) {
        return this.visitContent(current, data, options).concat(this.webAggretatorService.aggregate(current, options));
    }
    /**
     * @private
     * @param {?} current
     * @param {?} data
     * @param {?} options
     * @return {?}
     */
    visitContent(current, data, options) {
        if (this.layerService.identify(current)) {
            return this.visitLayer(current, data, options);
        }
        else if (this.symbolService.identify(current)) {
            return this.visitSymbolMaster(current, data, options);
        }
        else if (this.imageService.identify(current)) {
            return this.imageService.aggregate(current, data, options);
        }
        return [];
    }
    /**
     * @private
     * @param {?} current
     * @param {?} data
     * @param {?} options
     * @return {?}
     */
    visitLayer(current, data, options) {
        return this.layerService
            .lookup(current)
            .flatMap((/**
         * @param {?} layer
         * @return {?}
         */
        layer => this.visitContent(layer, data, options)));
    }
    /**
     * @private
     * @param {?} current
     * @param {?} data
     * @param {?} options
     * @return {?}
     */
    visitSymbolMaster(current, data, options) {
        /** @type {?} */
        const symbolMaster = this.symbolService.lookup(current, data);
        if (symbolMaster) {
            return this.visit(symbolMaster, data, options);
        }
        return [];
    }
    /**
     * @private
     * @param {?} options
     * @return {?}
     */
    compileOptions(options) {
        return Object.assign({ textTagName: 'span', bitmapTagName: 'img', blockTagName: 'div', mode: 'web', jsx: false, xmlPrefix: 'xly-', cssPrefix: 'xly_', componentDir: 'components', assetDir: 'assets' }, options);
    }
}
WebCodeGenService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
WebCodeGenService.ctorParameters = () => [
    { type: SymbolService },
    { type: ImageService },
    { type: WebContextService },
    { type: WebParserService },
    { type: WebAggregatorService },
    { type: LayerService }
];
/** @nocollapse */ WebCodeGenService.ngInjectableDef = ɵɵdefineInjectable({ factory: function WebCodeGenService_Factory() { return new WebCodeGenService(ɵɵinject(SymbolService), ɵɵinject(ImageService), ɵɵinject(WebContextService), ɵɵinject(WebParserService), ɵɵinject(WebAggregatorService), ɵɵinject(LayerService)); }, token: WebCodeGenService, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    WebCodeGenService.prototype.symbolService;
    /**
     * @type {?}
     * @private
     */
    WebCodeGenService.prototype.imageService;
    /**
     * @type {?}
     * @private
     */
    WebCodeGenService.prototype.webContext;
    /**
     * @type {?}
     * @private
     */
    WebCodeGenService.prototype.webParser;
    /**
     * @type {?}
     * @private
     */
    WebCodeGenService.prototype.webAggretatorService;
    /**
     * @type {?}
     * @private
     */
    WebCodeGenService.prototype.layerService;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class WebCodeGenModule {
}
WebCodeGenModule.decorators = [
    { type: NgModule, args: [{
                imports: [CssCodeGenModule, SvgCodeGenModule, SketchLibModule]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { WebCodeGenModule, WebCodeGenService, WebContextService as ɵa, WebParserService as ɵb, WebAggregatorService as ɵc };
//# sourceMappingURL=xlayers-web-codegen.js.map
