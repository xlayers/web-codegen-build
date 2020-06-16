(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@xlayers/sketch-lib'), require('@xlayers/svg-codegen'), require('@xlayers/css-codegen')) :
    typeof define === 'function' && define.amd ? define('@xlayers/web-codegen', ['exports', '@angular/core', '@xlayers/sketch-lib', '@xlayers/svg-codegen', '@xlayers/css-codegen'], factory) :
    (global = global || self, factory((global.xlayers = global.xlayers || {}, global.xlayers['web-codegen'] = {}), global.ng.core, global.sketchLib, global.svgCodegen, global.cssCodegen));
}(this, (function (exports, core, sketchLib, svgCodegen, cssCodegen) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __createBinding(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
    }

    function __exportStar(m, exports) {
        for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }

    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

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
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        WebContextService.ctorParameters = function () { return [
            { type: sketchLib.LayerService },
            { type: sketchLib.TextService },
            { type: sketchLib.ImageService },
            { type: svgCodegen.SvgCodeGenService }
        ]; };
        /** @nocollapse */ WebContextService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function WebContextService_Factory() { return new WebContextService(core.ɵɵinject(sketchLib.LayerService), core.ɵɵinject(sketchLib.TextService), core.ɵɵinject(sketchLib.ImageService), core.ɵɵinject(svgCodegen.SvgCodeGenService)); }, token: WebContextService, providedIn: "root" });
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
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        WebParserService.ctorParameters = function () { return [
            { type: sketchLib.TextService },
            { type: sketchLib.FormatService },
            { type: sketchLib.SymbolService },
            { type: sketchLib.ImageService },
            { type: sketchLib.LayerService },
            { type: cssCodegen.CssCodeGenService },
            { type: svgCodegen.SvgCodeGenService },
            { type: WebContextService }
        ]; };
        /** @nocollapse */ WebParserService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function WebParserService_Factory() { return new WebParserService(core.ɵɵinject(sketchLib.TextService), core.ɵɵinject(sketchLib.FormatService), core.ɵɵinject(sketchLib.SymbolService), core.ɵɵinject(sketchLib.ImageService), core.ɵɵinject(sketchLib.LayerService), core.ɵɵinject(cssCodegen.CssCodeGenService), core.ɵɵinject(svgCodegen.SvgCodeGenService), core.ɵɵinject(WebContextService)); }, token: WebParserService, providedIn: "root" });
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
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        WebAggregatorService.ctorParameters = function () { return [
            { type: sketchLib.TextService },
            { type: sketchLib.SymbolService },
            { type: sketchLib.ImageService },
            { type: sketchLib.FormatService },
            { type: sketchLib.LayerService },
            { type: WebContextService },
            { type: cssCodegen.CssCodeGenService },
            { type: svgCodegen.SvgCodeGenService }
        ]; };
        /** @nocollapse */ WebAggregatorService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function WebAggregatorService_Factory() { return new WebAggregatorService(core.ɵɵinject(sketchLib.TextService), core.ɵɵinject(sketchLib.SymbolService), core.ɵɵinject(sketchLib.ImageService), core.ɵɵinject(sketchLib.FormatService), core.ɵɵinject(sketchLib.LayerService), core.ɵɵinject(WebContextService), core.ɵɵinject(cssCodegen.CssCodeGenService), core.ɵɵinject(svgCodegen.SvgCodeGenService)); }, token: WebAggregatorService, providedIn: "root" });
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
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        WebCodeGenService.ctorParameters = function () { return [
            { type: sketchLib.SymbolService },
            { type: sketchLib.ImageService },
            { type: WebContextService },
            { type: WebParserService },
            { type: WebAggregatorService },
            { type: sketchLib.LayerService }
        ]; };
        /** @nocollapse */ WebCodeGenService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function WebCodeGenService_Factory() { return new WebCodeGenService(core.ɵɵinject(sketchLib.SymbolService), core.ɵɵinject(sketchLib.ImageService), core.ɵɵinject(WebContextService), core.ɵɵinject(WebParserService), core.ɵɵinject(WebAggregatorService), core.ɵɵinject(sketchLib.LayerService)); }, token: WebCodeGenService, providedIn: "root" });
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
            { type: core.NgModule, args: [{
                        imports: [cssCodegen.CssCodeGenModule, svgCodegen.SvgCodeGenModule, sketchLib.SketchLibModule]
                    },] }
        ];
        return WebCodeGenModule;
    }());

    exports.WebCodeGenModule = WebCodeGenModule;
    exports.WebCodeGenService = WebCodeGenService;
    exports.ɵa = WebContextService;
    exports.ɵb = WebParserService;
    exports.ɵc = WebAggregatorService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=xlayers-web-codegen.umd.js.map
