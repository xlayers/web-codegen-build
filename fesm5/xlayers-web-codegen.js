import { __assign, __spread } from 'tslib';
import { Injectable, ɵɵdefineInjectable, ɵɵinject, NgModule } from '@angular/core';
import { LayerService, TextService, ImageService, FormatService, SymbolService, SketchLibModule } from '@xlayers/sketch-lib';
import { SvgCodeGenService, SvgCodeGenModule } from '@xlayers/svg-codegen';
import { CssCodeGenService, CssCodeGenModule } from '@xlayers/css-codegen';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var WebContextService = /** @class */ (function () {
    function WebContextService(layerService, textService, imageService, svgCodeGen) {
        this.layerService = layerService;
        this.textService = textService;
        this.imageService = imageService;
        this.svgCodeGen = svgCodeGen;
    }
    /**
     * @param {?} current
     * @return {?}
     */
    WebContextService.prototype.identify = /**
     * @param {?} current
     * @return {?}
     */
    function (current) {
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
    };
    /**
     * @param {?} current
     * @return {?}
     */
    WebContextService.prototype.of = /**
     * @param {?} current
     * @return {?}
     */
    function (current) {
        return ((/** @type {?} */ (current))).web;
    };
    /**
     * @param {?} current
     * @param {?} nextContext
     * @return {?}
     */
    WebContextService.prototype.put = /**
     * @param {?} current
     * @param {?} nextContext
     * @return {?}
     */
    function (current, nextContext) {
        ((/** @type {?} */ (current))).web = __assign({}, this.of(current), nextContext);
    };
    /**
     * @param {?} current
     * @return {?}
     */
    WebContextService.prototype.clear = /**
     * @param {?} current
     * @return {?}
     */
    function (current) {
        delete ((/** @type {?} */ (current))).web;
    };
    WebContextService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    WebContextService.ctorParameters = function () { return [
        { type: LayerService },
        { type: TextService },
        { type: ImageService },
        { type: SvgCodeGenService }
    ]; };
    /** @nocollapse */ WebContextService.ngInjectableDef = ɵɵdefineInjectable({ factory: function WebContextService_Factory() { return new WebContextService(ɵɵinject(LayerService), ɵɵinject(TextService), ɵɵinject(ImageService), ɵɵinject(SvgCodeGenService)); }, token: WebContextService, providedIn: "root" });
    return WebContextService;
}());
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
var WebParserService = /** @class */ (function () {
    function WebParserService(textService, formatService, symbolService, imageService, layerService, cssCodeGen, svgCodeGen, webContext) {
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
    WebParserService.prototype.compute = /**
     * @param {?} current
     * @param {?} data
     * @param {?} options
     * @return {?}
     */
    function (current, data, options) {
        this.svgCodeGen.compute(current, data, options);
        this.cssCodeGen.compute(current, data, options);
        if (current._class === 'page') {
            this.walk(current, data, options);
        }
        else {
            this.visit(current, data, options);
        }
    };
    /**
     * @private
     * @param {?} current
     * @param {?} data
     * @param {?} options
     * @return {?}
     */
    WebParserService.prototype.walk = /**
     * @private
     * @param {?} current
     * @param {?} data
     * @param {?} options
     * @return {?}
     */
    function (current, data, options) {
        var _this = this;
        if (this.layerService.identify(current)) {
            current.layers.forEach((/**
             * @param {?} layer
             * @return {?}
             */
            function (layer) {
                _this.visit(layer, data, options);
            }));
        }
        else if (this.symbolService.identify(current)) {
            this.visitSymbol(current, data, options);
        }
    };
    /**
     * @private
     * @param {?} current
     * @param {?} data
     * @param {?} options
     * @return {?}
     */
    WebParserService.prototype.visit = /**
     * @private
     * @param {?} current
     * @param {?} data
     * @param {?} options
     * @return {?}
     */
    function (current, data, options) {
        if (options.force) {
            this.webContext.clear(current);
        }
        if (this.webContext.identify(current)) {
            if (!this.webContext.of(current)) {
                this.visitContent(current, options);
            }
        }
        this.walk(current, data, options);
    };
    /**
     * @private
     * @param {?} current
     * @param {?} options
     * @return {?}
     */
    WebParserService.prototype.visitContent = /**
     * @private
     * @param {?} current
     * @param {?} options
     * @return {?}
     */
    function (current, options) {
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
    };
    /**
     * @private
     * @param {?} current
     * @param {?} options
     * @return {?}
     */
    WebParserService.prototype.visitLayer = /**
     * @private
     * @param {?} current
     * @param {?} options
     * @return {?}
     */
    function (current, options) {
        this.webContext.put(current, {
            attributes: __spread(this.generateClassAttribute(current), [
                "role=\"" + current._class + "\"",
                "aria-label=\"" + current.name + "\""
            ])
        });
    };
    /**
     * @private
     * @param {?} current
     * @param {?} data
     * @param {?} options
     * @return {?}
     */
    WebParserService.prototype.visitSymbol = /**
     * @private
     * @param {?} current
     * @param {?} data
     * @param {?} options
     * @return {?}
     */
    function (current, data, options) {
        /** @type {?} */
        var symbolMaster = this.symbolService.lookup(current, data);
        if (symbolMaster) {
            this.compute(symbolMaster, data, options);
            /** @type {?} */
            var context = this.webContext.of(current);
            this.webContext.put(current, {
                components: context && context.components
                    ? __spread(context.components, [current.name]) : [current.name]
            });
        }
    };
    /**
     * @private
     * @param {?} current
     * @param {?} options
     * @return {?}
     */
    WebParserService.prototype.visitBitmap = /**
     * @private
     * @param {?} current
     * @param {?} options
     * @return {?}
     */
    function (current, options) {
        /** @type {?} */
        var fileName = this.formatService.normalizeName(current.name);
        this.webContext.put(current, {
            attributes: __spread(this.generateClassAttribute(current), [
                "role=\"" + current._class + "\"",
                "aria-label=\"" + current.name + "\"",
                "src=\"/" + options.assetDir + "/" + fileName + ".png\""
            ])
        });
    };
    /**
     * @private
     * @param {?} current
     * @return {?}
     */
    WebParserService.prototype.visitText = /**
     * @private
     * @param {?} current
     * @return {?}
     */
    function (current) {
        this.webContext.put(current, {
            attributes: this.generateClassAttribute(current)
        });
    };
    /**
     * @private
     * @param {?} current
     * @return {?}
     */
    WebParserService.prototype.visitShape = /**
     * @private
     * @param {?} current
     * @return {?}
     */
    function (current) {
        this.webContext.put(current, {
            attributes: this.generateClassAttribute(current)
        });
    };
    /**
     * @private
     * @param {?} current
     * @return {?}
     */
    WebParserService.prototype.generateClassAttribute = /**
     * @private
     * @param {?} current
     * @return {?}
     */
    function (current) {
        if (this.cssCodeGen.identify(current)) {
            /** @type {?} */
            var className = this.cssCodeGen.context(current).className;
            if (className) {
                return ["class=\"" + className + "\""];
            }
        }
        return [];
    };
    WebParserService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    WebParserService.ctorParameters = function () { return [
        { type: TextService },
        { type: FormatService },
        { type: SymbolService },
        { type: ImageService },
        { type: LayerService },
        { type: CssCodeGenService },
        { type: SvgCodeGenService },
        { type: WebContextService }
    ]; };
    /** @nocollapse */ WebParserService.ngInjectableDef = ɵɵdefineInjectable({ factory: function WebParserService_Factory() { return new WebParserService(ɵɵinject(TextService), ɵɵinject(FormatService), ɵɵinject(SymbolService), ɵɵinject(ImageService), ɵɵinject(LayerService), ɵɵinject(CssCodeGenService), ɵɵinject(SvgCodeGenService), ɵɵinject(WebContextService)); }, token: WebParserService, providedIn: "root" });
    return WebParserService;
}());
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
var WebAggregatorService = /** @class */ (function () {
    function WebAggregatorService(textService, symbolService, imageService, formatService, layerService, webContext, cssCodeGen, svgCodeGen) {
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
    WebAggregatorService.prototype.aggregate = /**
     * @param {?} current
     * @param {?} options
     * @return {?}
     */
    function (current, options) {
        /** @type {?} */
        var fileName = this.formatService.normalizeName(current.name);
        return __spread([
            {
                kind: 'web',
                value: this.renderComponent(current, options),
                language: 'html',
                uri: options.componentDir + "/" + fileName + ".html"
            }
        ], this.cssCodeGen.aggregate(current, options).map((/**
         * @param {?} file
         * @return {?}
         */
        function (file) { return (__assign({}, file, { kind: 'web' })); })));
    };
    /**
     * @private
     * @param {?} current
     * @param {?} options
     * @return {?}
     */
    WebAggregatorService.prototype.renderComponent = /**
     * @private
     * @param {?} current
     * @param {?} options
     * @return {?}
     */
    function (current, options) {
        /** @type {?} */
        var template = [];
        if (current._class === 'page') {
            this.walk(current, template, 0, options);
        }
        else {
            this.visit(current, template, 0, options);
        }
        return template.join('\n');
    };
    /**
     * @private
     * @param {?} current
     * @param {?} template
     * @param {?} indent
     * @param {?} options
     * @return {?}
     */
    WebAggregatorService.prototype.walk = /**
     * @private
     * @param {?} current
     * @param {?} template
     * @param {?} indent
     * @param {?} options
     * @return {?}
     */
    function (current, template, indent, options) {
        var _this = this;
        if (this.layerService.identify(current)) {
            current.layers.forEach((/**
             * @param {?} layer
             * @return {?}
             */
            function (layer) {
                _this.visit(layer, template, indent, options);
            }));
        }
    };
    /**
     * @private
     * @param {?} current
     * @param {?} template
     * @param {?} indent
     * @param {?} options
     * @return {?}
     */
    WebAggregatorService.prototype.visit = /**
     * @private
     * @param {?} current
     * @param {?} template
     * @param {?} indent
     * @param {?} options
     * @return {?}
     */
    function (current, template, indent, options) {
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
    };
    /**
     * @private
     * @param {?} current
     * @param {?} template
     * @param {?} indent
     * @param {?} options
     * @return {?}
     */
    WebAggregatorService.prototype.visitLayer = /**
     * @private
     * @param {?} current
     * @param {?} template
     * @param {?} indent
     * @param {?} options
     * @return {?}
     */
    function (current, template, indent, options) {
        /** @type {?} */
        var openTag = this.renderAttributeTag(current, options.blockTagName, options);
        /** @type {?} */
        var closeTag = "</" + options.blockTagName + ">";
        template.push(this.formatService.indent(indent, openTag));
        this.walk(current, template, indent + 1, options);
        template.push(this.formatService.indent(indent, closeTag));
    };
    /**
     * @private
     * @param {?} current
     * @param {?} template
     * @param {?} indent
     * @param {?} options
     * @return {?}
     */
    WebAggregatorService.prototype.visitSymbol = /**
     * @private
     * @param {?} current
     * @param {?} template
     * @param {?} indent
     * @param {?} options
     * @return {?}
     */
    function (current, template, indent, options) {
        /** @type {?} */
        var context = this.webContext.of(current);
        if (context && context.components && context.components.lenght > 1) {
            /** @type {?} */
            var tagName = options.jsx
                ? this.formatService.className(current.name)
                : "" + options.xmlPrefix + this.formatService.normalizeName(current.name);
            template.push(this.formatService.indent(indent, "<" + tagName + "></" + tagName + ">"));
        }
    };
    /**
     * @private
     * @param {?} current
     * @param {?} template
     * @param {?} indent
     * @param {?} options
     * @return {?}
     */
    WebAggregatorService.prototype.visitBitmap = /**
     * @private
     * @param {?} current
     * @param {?} template
     * @param {?} indent
     * @param {?} options
     * @return {?}
     */
    function (current, template, indent, options) {
        /** @type {?} */
        var attributes = this.webContext.of(current).attributes;
        template.push(this.formatService.indent(indent, __spread(["<" + options.bitmapTagName], attributes).join(' ') + ' />'));
    };
    /**
     * @private
     * @param {?} current
     * @param {?} template
     * @param {?} indent
     * @param {?} options
     * @return {?}
     */
    WebAggregatorService.prototype.visitText = /**
     * @private
     * @param {?} current
     * @param {?} template
     * @param {?} indent
     * @param {?} options
     * @return {?}
     */
    function (current, template, indent, options) {
        template.push(this.formatService.indent(indent, [
            this.renderAttributeTag(current, options.textTagName, options),
            this.textService.lookup(current),
            "</" + options.textTagName + ">"
        ].join('')));
    };
    /**
     * @private
     * @param {?} current
     * @param {?} template
     * @param {?} indent
     * @param {?} options
     * @return {?}
     */
    WebAggregatorService.prototype.visitShape = /**
     * @private
     * @param {?} current
     * @param {?} template
     * @param {?} indent
     * @param {?} options
     * @return {?}
     */
    function (current, template, indent, options) {
        var _this = this;
        template.push(this.formatService.indent(indent, this.renderAttributeTag(current, options.blockTagName, options)));
        template.push(this.svgCodeGen
            .aggregate(current, { xmlNamespace: false })
            .map((/**
         * @param {?} file
         * @return {?}
         */
        function (file) {
            return file.value
                .split('\n')
                .map((/**
             * @param {?} line
             * @return {?}
             */
            function (line) { return _this.formatService.indent(indent + 1, line); }))
                .join('\n');
        }))
            .join('\n'));
        template.push(this.formatService.indent(indent, "</" + options.blockTagName + ">"));
    };
    /**
     * @private
     * @param {?} current
     * @param {?} tagName
     * @param {?} options
     * @return {?}
     */
    WebAggregatorService.prototype.renderAttributeTag = /**
     * @private
     * @param {?} current
     * @param {?} tagName
     * @param {?} options
     * @return {?}
     */
    function (current, tagName, options) {
        /** @type {?} */
        var attributes = this.webContext.of(current).attributes;
        if (options.jsx) {
            /** @type {?} */
            var attributIndex = attributes.findIndex((/**
             * @param {?} attribute
             * @return {?}
             */
            function (attribute) {
                return attribute.startsWith('class=');
            }));
            if (attributIndex > 0) {
                attributes[attributIndex] = attributes[attributIndex].replace('class=', 'className=');
            }
        }
        return __spread(["<" + tagName], attributes).join(' ') + '>';
    };
    WebAggregatorService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    WebAggregatorService.ctorParameters = function () { return [
        { type: TextService },
        { type: SymbolService },
        { type: ImageService },
        { type: FormatService },
        { type: LayerService },
        { type: WebContextService },
        { type: CssCodeGenService },
        { type: SvgCodeGenService }
    ]; };
    /** @nocollapse */ WebAggregatorService.ngInjectableDef = ɵɵdefineInjectable({ factory: function WebAggregatorService_Factory() { return new WebAggregatorService(ɵɵinject(TextService), ɵɵinject(SymbolService), ɵɵinject(ImageService), ɵɵinject(FormatService), ɵɵinject(LayerService), ɵɵinject(WebContextService), ɵɵinject(CssCodeGenService), ɵɵinject(SvgCodeGenService)); }, token: WebAggregatorService, providedIn: "root" });
    return WebAggregatorService;
}());
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
var WebCodeGenService = /** @class */ (function () {
    function WebCodeGenService(symbolService, imageService, webContext, webParser, webAggretatorService, layerService) {
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
    WebCodeGenService.prototype.compute = /**
     * @param {?} current
     * @param {?} data
     * @param {?=} options
     * @return {?}
     */
    function (current, data, options) {
        this.webParser.compute(current, data, this.compileOptions(options));
    };
    /**
     * @param {?} current
     * @param {?} data
     * @param {?=} options
     * @return {?}
     */
    WebCodeGenService.prototype.aggregate = /**
     * @param {?} current
     * @param {?} data
     * @param {?=} options
     * @return {?}
     */
    function (current, data, options) {
        return this.visit(current, data, this.compileOptions(options));
    };
    /**
     * @param {?} current
     * @return {?}
     */
    WebCodeGenService.prototype.identify = /**
     * @param {?} current
     * @return {?}
     */
    function (current) {
        return this.webContext.identify(current);
    };
    /**
     * @param {?} current
     * @return {?}
     */
    WebCodeGenService.prototype.context = /**
     * @param {?} current
     * @return {?}
     */
    function (current) {
        return this.webContext.of(current);
    };
    /**
     * @private
     * @param {?} current
     * @param {?} data
     * @param {?=} options
     * @return {?}
     */
    WebCodeGenService.prototype.visit = /**
     * @private
     * @param {?} current
     * @param {?} data
     * @param {?=} options
     * @return {?}
     */
    function (current, data, options) {
        return this.visitContent(current, data, options).concat(this.webAggretatorService.aggregate(current, options));
    };
    /**
     * @private
     * @param {?} current
     * @param {?} data
     * @param {?} options
     * @return {?}
     */
    WebCodeGenService.prototype.visitContent = /**
     * @private
     * @param {?} current
     * @param {?} data
     * @param {?} options
     * @return {?}
     */
    function (current, data, options) {
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
    };
    /**
     * @private
     * @param {?} current
     * @param {?} data
     * @param {?} options
     * @return {?}
     */
    WebCodeGenService.prototype.visitLayer = /**
     * @private
     * @param {?} current
     * @param {?} data
     * @param {?} options
     * @return {?}
     */
    function (current, data, options) {
        var _this = this;
        return this.layerService
            .lookup(current)
            .flatMap((/**
         * @param {?} layer
         * @return {?}
         */
        function (layer) { return _this.visitContent(layer, data, options); }));
    };
    /**
     * @private
     * @param {?} current
     * @param {?} data
     * @param {?} options
     * @return {?}
     */
    WebCodeGenService.prototype.visitSymbolMaster = /**
     * @private
     * @param {?} current
     * @param {?} data
     * @param {?} options
     * @return {?}
     */
    function (current, data, options) {
        /** @type {?} */
        var symbolMaster = this.symbolService.lookup(current, data);
        if (symbolMaster) {
            return this.visit(symbolMaster, data, options);
        }
        return [];
    };
    /**
     * @private
     * @param {?} options
     * @return {?}
     */
    WebCodeGenService.prototype.compileOptions = /**
     * @private
     * @param {?} options
     * @return {?}
     */
    function (options) {
        return __assign({ textTagName: 'span', bitmapTagName: 'img', blockTagName: 'div', mode: 'web', jsx: false, xmlPrefix: 'xly-', cssPrefix: 'xly_', componentDir: 'components', assetDir: 'assets' }, options);
    };
    WebCodeGenService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    WebCodeGenService.ctorParameters = function () { return [
        { type: SymbolService },
        { type: ImageService },
        { type: WebContextService },
        { type: WebParserService },
        { type: WebAggregatorService },
        { type: LayerService }
    ]; };
    /** @nocollapse */ WebCodeGenService.ngInjectableDef = ɵɵdefineInjectable({ factory: function WebCodeGenService_Factory() { return new WebCodeGenService(ɵɵinject(SymbolService), ɵɵinject(ImageService), ɵɵinject(WebContextService), ɵɵinject(WebParserService), ɵɵinject(WebAggregatorService), ɵɵinject(LayerService)); }, token: WebCodeGenService, providedIn: "root" });
    return WebCodeGenService;
}());
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
var WebCodeGenModule = /** @class */ (function () {
    function WebCodeGenModule() {
    }
    WebCodeGenModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CssCodeGenModule, SvgCodeGenModule, SketchLibModule]
                },] }
    ];
    return WebCodeGenModule;
}());

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
