/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { FormatService, SymbolService, LayerService, ImageService, TextService } from '@xlayers/sketch-lib';
import { WebContextService } from './web-context.service';
import { CssCodeGenService } from '@xlayers/css-codegen';
import { SvgCodeGenService } from '@xlayers/svg-codegen';
import * as i0 from "@angular/core";
import * as i1 from "@xlayers/sketch-lib";
import * as i2 from "./web-context.service";
import * as i3 from "@xlayers/css-codegen";
import * as i4 from "@xlayers/svg-codegen";
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
        return tslib_1.__spread([
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
        function (file) { return (tslib_1.__assign({}, file, { kind: 'web' })); })));
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
        template.push(this.formatService.indent(indent, tslib_1.__spread(["<" + options.bitmapTagName], attributes).join(' ') + ' />'));
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
        return tslib_1.__spread(["<" + tagName], attributes).join(' ') + '>';
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
    /** @nocollapse */ WebAggregatorService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function WebAggregatorService_Factory() { return new WebAggregatorService(i0.ɵɵinject(i1.TextService), i0.ɵɵinject(i1.SymbolService), i0.ɵɵinject(i1.ImageService), i0.ɵɵinject(i1.FormatService), i0.ɵɵinject(i1.LayerService), i0.ɵɵinject(i2.WebContextService), i0.ɵɵinject(i3.CssCodeGenService), i0.ɵɵinject(i4.SvgCodeGenService)); }, token: WebAggregatorService, providedIn: "root" });
    return WebAggregatorService;
}());
export { WebAggregatorService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViLWFnZ3JlZ2F0b3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B4bGF5ZXJzL3dlYi1jb2RlZ2VuLyIsInNvdXJjZXMiOlsibGliL3dlYi1hZ2dyZWdhdG9yLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFDTCxhQUFhLEVBQ2IsYUFBYSxFQUNiLFlBQVksRUFDWixZQUFZLEVBQ1osV0FBVyxFQUNaLE1BQU0scUJBQXFCLENBQUM7QUFDN0IsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFMUQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDekQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7Ozs7OztBQUV6RDtJQUlFLDhCQUNtQixXQUF3QixFQUN4QixhQUE0QixFQUM1QixZQUEwQixFQUMxQixhQUE0QixFQUM1QixZQUEwQixFQUMxQixVQUE2QixFQUM3QixVQUE2QixFQUM3QixVQUE2QjtRQVA3QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixlQUFVLEdBQVYsVUFBVSxDQUFtQjtRQUM3QixlQUFVLEdBQVYsVUFBVSxDQUFtQjtRQUM3QixlQUFVLEdBQVYsVUFBVSxDQUFtQjtJQUM1QyxDQUFDOzs7Ozs7SUFFTCx3Q0FBUzs7Ozs7SUFBVCxVQUFVLE9BQXNCLEVBQUUsT0FBMEI7O1lBQ3BELFFBQVEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQy9EO1lBQ0U7Z0JBQ0UsSUFBSSxFQUFF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QUMsR0FBRyxHQUFHLENBQUM7SUFDeEQsQ0FBQzs7Z0JBL0xGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBVEMsV0FBVztnQkFIWCxhQUFhO2dCQUViLFlBQVk7Z0JBSFosYUFBYTtnQkFFYixZQUFZO2dCQUlMLGlCQUFpQjtnQkFFakIsaUJBQWlCO2dCQUNqQixpQkFBaUI7OzsrQkFYMUI7Q0E2TUMsQUFoTUQsSUFnTUM7U0E3TFksb0JBQW9COzs7Ozs7SUFFN0IsMkNBQXlDOzs7OztJQUN6Qyw2Q0FBNkM7Ozs7O0lBQzdDLDRDQUEyQzs7Ozs7SUFDM0MsNkNBQTZDOzs7OztJQUM3Qyw0Q0FBMkM7Ozs7O0lBQzNDLDBDQUE4Qzs7Ozs7SUFDOUMsMENBQThDOzs7OztJQUM5QywwQ0FBOEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgRm9ybWF0U2VydmljZSxcclxuICBTeW1ib2xTZXJ2aWNlLFxyXG4gIExheWVyU2VydmljZSxcclxuICBJbWFnZVNlcnZpY2UsXHJcbiAgVGV4dFNlcnZpY2VcclxufSBmcm9tICdAeGxheWVycy9za2V0Y2gtbGliJztcclxuaW1wb3J0IHsgV2ViQ29udGV4dFNlcnZpY2UgfSBmcm9tICcuL3dlYi1jb250ZXh0LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBXZWJDb2RlR2VuT3B0aW9ucyB9IGZyb20gJy4vd2ViLWNvZGVnZW4nO1xyXG5pbXBvcnQgeyBDc3NDb2RlR2VuU2VydmljZSB9IGZyb20gJ0B4bGF5ZXJzL2Nzcy1jb2RlZ2VuJztcclxuaW1wb3J0IHsgU3ZnQ29kZUdlblNlcnZpY2UgfSBmcm9tICdAeGxheWVycy9zdmctY29kZWdlbic7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBXZWJBZ2dyZWdhdG9yU2VydmljZSB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHRleHRTZXJ2aWNlOiBUZXh0U2VydmljZSxcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgc3ltYm9sU2VydmljZTogU3ltYm9sU2VydmljZSxcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgaW1hZ2VTZXJ2aWNlOiBJbWFnZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGZvcm1hdFNlcnZpY2U6IEZvcm1hdFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGxheWVyU2VydmljZTogTGF5ZXJTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSByZWFkb25seSB3ZWJDb250ZXh0OiBXZWJDb250ZXh0U2VydmljZSxcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgY3NzQ29kZUdlbjogQ3NzQ29kZUdlblNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHN2Z0NvZGVHZW46IFN2Z0NvZGVHZW5TZXJ2aWNlXHJcbiAgKSB7IH1cclxuXHJcbiAgYWdncmVnYXRlKGN1cnJlbnQ6IFNrZXRjaE1TTGF5ZXIsIG9wdGlvbnM6IFdlYkNvZGVHZW5PcHRpb25zKSB7XHJcbiAgICBjb25zdCBmaWxlTmFtZSA9IHRoaXMuZm9ybWF0U2VydmljZS5ub3JtYWxpemVOYW1lKGN1cnJlbnQubmFtZSk7XHJcbiAgICByZXR1cm4gW1xyXG4gICAgICB7XHJcbiAgICAgICAga2luZDogJ3dlYicsXHJcbiAgICAgICAgdmFsdWU6IHRoaXMucmVuZGVyQ29tcG9uZW50KGN1cnJlbnQsIG9wdGlvbnMpLFxyXG4gICAgICAgIGxhbmd1YWdlOiAnaHRtbCcsXHJcbiAgICAgICAgdXJpOiBgJHtvcHRpb25zLmNvbXBvbmVudERpcn0vJHtmaWxlTmFtZX0uaHRtbGBcclxuICAgICAgfSxcclxuICAgICAgLi4udGhpcy5jc3NDb2RlR2VuLmFnZ3JlZ2F0ZShjdXJyZW50LCBvcHRpb25zKS5tYXAoZmlsZSA9PiAoe1xyXG4gICAgICAgIC4uLmZpbGUsXHJcbiAgICAgICAga2luZDogJ3dlYidcclxuICAgICAgfSkpXHJcbiAgICBdO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSByZW5kZXJDb21wb25lbnQoY3VycmVudDogU2tldGNoTVNMYXllciwgb3B0aW9uczogV2ViQ29kZUdlbk9wdGlvbnMpIHtcclxuICAgIGNvbnN0IHRlbXBsYXRlID0gW107XHJcblxyXG4gICAgaWYgKGN1cnJlbnQuX2NsYXNzID09PSAncGFnZScpIHtcclxuICAgICAgdGhpcy53YWxrKGN1cnJlbnQsIHRlbXBsYXRlLCAwLCBvcHRpb25zKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMudmlzaXQoY3VycmVudCwgdGVtcGxhdGUsIDAsIG9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0ZW1wbGF0ZS5qb2luKCdcXG4nKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgd2FsayhcclxuICAgIGN1cnJlbnQ6IFNrZXRjaE1TTGF5ZXIsXHJcbiAgICB0ZW1wbGF0ZTogc3RyaW5nW10sXHJcbiAgICBpbmRlbnQ6IG51bWJlcixcclxuICAgIG9wdGlvbnM6IFdlYkNvZGVHZW5PcHRpb25zXHJcbiAgKSB7XHJcbiAgICBpZiAodGhpcy5sYXllclNlcnZpY2UuaWRlbnRpZnkoY3VycmVudCkpIHtcclxuICAgICAgY3VycmVudC5sYXllcnMuZm9yRWFjaChsYXllciA9PiB7XHJcbiAgICAgICAgdGhpcy52aXNpdChsYXllciwgdGVtcGxhdGUsIGluZGVudCwgb3B0aW9ucyk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB2aXNpdChcclxuICAgIGN1cnJlbnQ6IFNrZXRjaE1TTGF5ZXIsXHJcbiAgICB0ZW1wbGF0ZTogc3RyaW5nW10sXHJcbiAgICBpbmRlbnQ6IG51bWJlcixcclxuICAgIG9wdGlvbnM6IFdlYkNvZGVHZW5PcHRpb25zXHJcbiAgKSB7XHJcbiAgICBpZiAodGhpcy5zeW1ib2xTZXJ2aWNlLmlkZW50aWZ5KGN1cnJlbnQpKSB7XHJcbiAgICAgIHRoaXMudmlzaXRTeW1ib2woY3VycmVudCwgdGVtcGxhdGUsIGluZGVudCwgb3B0aW9ucyk7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuaW1hZ2VTZXJ2aWNlLmlkZW50aWZ5KGN1cnJlbnQpKSB7XHJcbiAgICAgIHRoaXMudmlzaXRCaXRtYXAoY3VycmVudCwgdGVtcGxhdGUsIGluZGVudCwgb3B0aW9ucyk7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMudGV4dFNlcnZpY2UuaWRlbnRpZnkoY3VycmVudCkpIHtcclxuICAgICAgdGhpcy52aXNpdFRleHQoY3VycmVudCwgdGVtcGxhdGUsIGluZGVudCwgb3B0aW9ucyk7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuc3ZnQ29kZUdlbi5pZGVudGlmeShjdXJyZW50KSkge1xyXG4gICAgICB0aGlzLnZpc2l0U2hhcGUoY3VycmVudCwgdGVtcGxhdGUsIGluZGVudCwgb3B0aW9ucyk7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMud2ViQ29udGV4dC5pZGVudGlmeShjdXJyZW50KSkge1xyXG4gICAgICB0aGlzLnZpc2l0TGF5ZXIoY3VycmVudCwgdGVtcGxhdGUsIGluZGVudCwgb3B0aW9ucyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHZpc2l0TGF5ZXIoXHJcbiAgICBjdXJyZW50OiBTa2V0Y2hNU0xheWVyLFxyXG4gICAgdGVtcGxhdGU6IHN0cmluZ1tdLFxyXG4gICAgaW5kZW50OiBudW1iZXIsXHJcbiAgICBvcHRpb25zOiBXZWJDb2RlR2VuT3B0aW9uc1xyXG4gICkge1xyXG4gICAgY29uc3Qgb3BlblRhZyA9IHRoaXMucmVuZGVyQXR0cmlidXRlVGFnKFxyXG4gICAgICBjdXJyZW50LFxyXG4gICAgICBvcHRpb25zLmJsb2NrVGFnTmFtZSxcclxuICAgICAgb3B0aW9uc1xyXG4gICAgKTtcclxuICAgIGNvbnN0IGNsb3NlVGFnID0gYDwvJHtvcHRpb25zLmJsb2NrVGFnTmFtZX0+YDtcclxuXHJcbiAgICB0ZW1wbGF0ZS5wdXNoKHRoaXMuZm9ybWF0U2VydmljZS5pbmRlbnQoaW5kZW50LCBvcGVuVGFnKSk7XHJcbiAgICB0aGlzLndhbGsoY3VycmVudCwgdGVtcGxhdGUsIGluZGVudCArIDEsIG9wdGlvbnMpO1xyXG4gICAgdGVtcGxhdGUucHVzaCh0aGlzLmZvcm1hdFNlcnZpY2UuaW5kZW50KGluZGVudCwgY2xvc2VUYWcpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdmlzaXRTeW1ib2woXHJcbiAgICBjdXJyZW50OiBTa2V0Y2hNU0xheWVyLFxyXG4gICAgdGVtcGxhdGU6IHN0cmluZ1tdLFxyXG4gICAgaW5kZW50OiBudW1iZXIsXHJcbiAgICBvcHRpb25zOiBXZWJDb2RlR2VuT3B0aW9uc1xyXG4gICkge1xyXG4gICAgY29uc3QgY29udGV4dCA9IHRoaXMud2ViQ29udGV4dC5vZihjdXJyZW50KTtcclxuICAgIGlmIChjb250ZXh0ICYmIGNvbnRleHQuY29tcG9uZW50cyAmJiBjb250ZXh0LmNvbXBvbmVudHMubGVuZ2h0ID4gMSkge1xyXG4gICAgICBjb25zdCB0YWdOYW1lID0gb3B0aW9ucy5qc3hcclxuICAgICAgICA/IHRoaXMuZm9ybWF0U2VydmljZS5jbGFzc05hbWUoY3VycmVudC5uYW1lKVxyXG4gICAgICAgIDogYCR7b3B0aW9ucy54bWxQcmVmaXh9JHt0aGlzLmZvcm1hdFNlcnZpY2Uubm9ybWFsaXplTmFtZShcclxuICAgICAgICAgIGN1cnJlbnQubmFtZVxyXG4gICAgICAgICl9YDtcclxuICAgICAgdGVtcGxhdGUucHVzaChcclxuICAgICAgICB0aGlzLmZvcm1hdFNlcnZpY2UuaW5kZW50KGluZGVudCwgYDwke3RhZ05hbWV9PjwvJHt0YWdOYW1lfT5gKVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB2aXNpdEJpdG1hcChcclxuICAgIGN1cnJlbnQ6IFNrZXRjaE1TTGF5ZXIsXHJcbiAgICB0ZW1wbGF0ZTogc3RyaW5nW10sXHJcbiAgICBpbmRlbnQ6IG51bWJlcixcclxuICAgIG9wdGlvbnM6IFdlYkNvZGVHZW5PcHRpb25zXHJcbiAgKSB7XHJcbiAgICBjb25zdCBhdHRyaWJ1dGVzID0gdGhpcy53ZWJDb250ZXh0Lm9mKGN1cnJlbnQpLmF0dHJpYnV0ZXM7XHJcbiAgICB0ZW1wbGF0ZS5wdXNoKFxyXG4gICAgICB0aGlzLmZvcm1hdFNlcnZpY2UuaW5kZW50KFxyXG4gICAgICAgIGluZGVudCxcclxuICAgICAgICBbYDwke29wdGlvbnMuYml0bWFwVGFnTmFtZX1gLCAuLi5hdHRyaWJ1dGVzXS5qb2luKCcgJykgKyAnIC8+J1xyXG4gICAgICApXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB2aXNpdFRleHQoXHJcbiAgICBjdXJyZW50OiBTa2V0Y2hNU0xheWVyLFxyXG4gICAgdGVtcGxhdGU6IHN0cmluZ1tdLFxyXG4gICAgaW5kZW50OiBudW1iZXIsXHJcbiAgICBvcHRpb25zOiBXZWJDb2RlR2VuT3B0aW9uc1xyXG4gICkge1xyXG4gICAgdGVtcGxhdGUucHVzaChcclxuICAgICAgdGhpcy5mb3JtYXRTZXJ2aWNlLmluZGVudChcclxuICAgICAgICBpbmRlbnQsXHJcbiAgICAgICAgW1xyXG4gICAgICAgICAgdGhpcy5yZW5kZXJBdHRyaWJ1dGVUYWcoY3VycmVudCwgb3B0aW9ucy50ZXh0VGFnTmFtZSwgb3B0aW9ucyksXHJcbiAgICAgICAgICB0aGlzLnRleHRTZXJ2aWNlLmxvb2t1cChjdXJyZW50KSxcclxuICAgICAgICAgIGA8LyR7b3B0aW9ucy50ZXh0VGFnTmFtZX0+YFxyXG4gICAgICAgIF0uam9pbignJylcclxuICAgICAgKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdmlzaXRTaGFwZShcclxuICAgIGN1cnJlbnQ6IFNrZXRjaE1TTGF5ZXIsXHJcbiAgICB0ZW1wbGF0ZTogc3RyaW5nW10sXHJcbiAgICBpbmRlbnQ6IG51bWJlcixcclxuICAgIG9wdGlvbnM6IFdlYkNvZGVHZW5PcHRpb25zXHJcbiAgKSB7XHJcbiAgICB0ZW1wbGF0ZS5wdXNoKFxyXG4gICAgICB0aGlzLmZvcm1hdFNlcnZpY2UuaW5kZW50KFxyXG4gICAgICAgIGluZGVudCxcclxuICAgICAgICB0aGlzLnJlbmRlckF0dHJpYnV0ZVRhZyhjdXJyZW50LCBvcHRpb25zLmJsb2NrVGFnTmFtZSwgb3B0aW9ucylcclxuICAgICAgKVxyXG4gICAgKTtcclxuICAgIHRlbXBsYXRlLnB1c2goXHJcbiAgICAgIHRoaXMuc3ZnQ29kZUdlblxyXG4gICAgICAgIC5hZ2dyZWdhdGUoY3VycmVudCwgeyB4bWxOYW1lc3BhY2U6IGZhbHNlIH0pXHJcbiAgICAgICAgLm1hcChmaWxlID0+XHJcbiAgICAgICAgICBmaWxlLnZhbHVlXHJcbiAgICAgICAgICAgIC5zcGxpdCgnXFxuJylcclxuICAgICAgICAgICAgLm1hcChsaW5lID0+IHRoaXMuZm9ybWF0U2VydmljZS5pbmRlbnQoaW5kZW50ICsgMSwgbGluZSkpXHJcbiAgICAgICAgICAgIC5qb2luKCdcXG4nKVxyXG4gICAgICAgIClcclxuICAgICAgICAuam9pbignXFxuJylcclxuICAgICk7XHJcbiAgICB0ZW1wbGF0ZS5wdXNoKFxyXG4gICAgICB0aGlzLmZvcm1hdFNlcnZpY2UuaW5kZW50KGluZGVudCwgYDwvJHtvcHRpb25zLmJsb2NrVGFnTmFtZX0+YClcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlbmRlckF0dHJpYnV0ZVRhZyhcclxuICAgIGN1cnJlbnQ6IFNrZXRjaE1TTGF5ZXIsXHJcbiAgICB0YWdOYW1lOiBzdHJpbmcsXHJcbiAgICBvcHRpb25zOiBXZWJDb2RlR2VuT3B0aW9uc1xyXG4gICkge1xyXG4gICAgY29uc3QgYXR0cmlidXRlcyA9IHRoaXMud2ViQ29udGV4dC5vZihjdXJyZW50KS5hdHRyaWJ1dGVzO1xyXG4gICAgaWYgKG9wdGlvbnMuanN4KSB7XHJcbiAgICAgIGNvbnN0IGF0dHJpYnV0SW5kZXggPSBhdHRyaWJ1dGVzLmZpbmRJbmRleChhdHRyaWJ1dGUgPT5cclxuICAgICAgICBhdHRyaWJ1dGUuc3RhcnRzV2l0aCgnY2xhc3M9JylcclxuICAgICAgKTtcclxuICAgICAgaWYgKGF0dHJpYnV0SW5kZXggPiAwKSB7XHJcbiAgICAgICAgYXR0cmlidXRlc1thdHRyaWJ1dEluZGV4XSA9IGF0dHJpYnV0ZXNbYXR0cmlidXRJbmRleF0ucmVwbGFjZShcclxuICAgICAgICAgICdjbGFzcz0nLFxyXG4gICAgICAgICAgJ2NsYXNzTmFtZT0nXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIFtgPCR7dGFnTmFtZX1gLCAuLi5hdHRyaWJ1dGVzXS5qb2luKCcgJykgKyAnPic7XHJcbiAgfVxyXG59XHJcbiJdfQ==