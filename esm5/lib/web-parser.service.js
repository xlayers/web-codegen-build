/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { CssCodeGenService } from '@xlayers/css-codegen';
import { FormatService, ImageService, LayerService, SymbolService } from '@xlayers/sketch-lib';
import { TextService } from '@xlayers/sketch-lib';
import { SvgCodeGenService } from '@xlayers/svg-codegen';
import { WebContextService } from './web-context.service';
import * as i0 from "@angular/core";
import * as i1 from "@xlayers/sketch-lib";
import * as i2 from "@xlayers/css-codegen";
import * as i3 from "@xlayers/svg-codegen";
import * as i4 from "./web-context.service";
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
            attributes: tslib_1.__spread(this.generateClassAttribute(current), [
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
                    ? tslib_1.__spread(context.components, [current.name]) : [current.name]
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
            attributes: tslib_1.__spread(this.generateClassAttribute(current), [
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
    /** @nocollapse */ WebParserService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function WebParserService_Factory() { return new WebParserService(i0.ɵɵinject(i1.TextService), i0.ɵɵinject(i1.FormatService), i0.ɵɵinject(i1.SymbolService), i0.ɵɵinject(i1.ImageService), i0.ɵɵinject(i1.LayerService), i0.ɵɵinject(i2.CssCodeGenService), i0.ɵɵinject(i3.SvgCodeGenService), i0.ɵɵinject(i4.WebContextService)); }, token: WebParserService, providedIn: "root" });
    return WebParserService;
}());
export { WebParserService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViLXBhcnNlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHhsYXllcnMvd2ViLWNvZGVnZW4vIiwic291cmNlcyI6WyJsaWIvd2ViLXBhcnNlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN6RCxPQUFPLEVBQ0wsYUFBYSxFQUNiLFlBQVksRUFDWixZQUFZLEVBQ1osYUFBYSxFQUNkLE1BQU0scUJBQXFCLENBQUM7QUFDN0IsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBR3pELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDOzs7Ozs7QUFFMUQ7SUFJRSwwQkFDbUIsV0FBd0IsRUFDeEIsYUFBNEIsRUFDNUIsYUFBNEIsRUFDNUIsWUFBMEIsRUFDMUIsWUFBMEIsRUFDMUIsVUFBNkIsRUFDN0IsVUFBNkIsRUFDN0IsVUFBNkI7UUFQN0IsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsZUFBVSxHQUFWLFVBQVUsQ0FBbUI7UUFDN0IsZUFBVSxHQUFWLFVBQVUsQ0FBbUI7UUFDN0IsZUFBVSxHQUFWLFVBQVUsQ0FBbUI7SUFDN0MsQ0FBQzs7Ozs7OztJQUVKLGtDQUFPOzs7Ozs7SUFBUCxVQUNFLE9BQXNCLEVBQ3RCLElBQWtCLEVBQ2xCLE9BQTBCO1FBRTFCLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVB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SSxDQUFDLHNCQUFzQixDQUFDLE9BQU8sQ0FBQztTQUNqRCxDQUFDLENBQUM7SUFDTCxDQUFDOzs7Ozs7SUFFTyxxQ0FBVTs7Ozs7SUFBbEIsVUFBbUIsT0FBc0I7UUFDdkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFO1lBQzNCLFVBQVUsRUFBRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsT0FBTyxDQUFDO1NBQ2pELENBQUMsQ0FBQztJQUNMLENBQUM7Ozs7OztJQUVPLGlEQUFzQjs7Ozs7SUFBOUIsVUFBK0IsT0FBc0I7UUFDbkQsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTs7Z0JBQy9CLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTO1lBQzVELElBQUksU0FBUyxFQUFFO2dCQUNiLE9BQU8sQ0FBQyxhQUFVLFNBQVMsT0FBRyxDQUFDLENBQUM7YUFDakM7U0FDRjtRQUNELE9BQU8sRUFBRSxDQUFDO0lBQ1osQ0FBQzs7Z0JBbklGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBUlEsV0FBVztnQkFMbEIsYUFBYTtnQkFHYixhQUFhO2dCQUZiLFlBQVk7Z0JBQ1osWUFBWTtnQkFKTCxpQkFBaUI7Z0JBUWpCLGlCQUFpQjtnQkFHakIsaUJBQWlCOzs7MkJBWjFCO0NBa0pDLEFBcElELElBb0lDO1NBaklZLGdCQUFnQjs7Ozs7O0lBRXpCLHVDQUF5Qzs7Ozs7SUFDekMseUNBQTZDOzs7OztJQUM3Qyx5Q0FBNkM7Ozs7O0lBQzdDLHdDQUEyQzs7Ozs7SUFDM0Msd0NBQTJDOzs7OztJQUMzQyxzQ0FBOEM7Ozs7O0lBQzlDLHNDQUE4Qzs7Ozs7SUFDOUMsc0NBQThDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDc3NDb2RlR2VuU2VydmljZSB9IGZyb20gJ0B4bGF5ZXJzL2Nzcy1jb2RlZ2VuJztcclxuaW1wb3J0IHtcclxuICBGb3JtYXRTZXJ2aWNlLFxyXG4gIEltYWdlU2VydmljZSxcclxuICBMYXllclNlcnZpY2UsXHJcbiAgU3ltYm9sU2VydmljZVxyXG59IGZyb20gJ0B4bGF5ZXJzL3NrZXRjaC1saWInO1xyXG5pbXBvcnQgeyBUZXh0U2VydmljZSB9IGZyb20gJ0B4bGF5ZXJzL3NrZXRjaC1saWInO1xyXG5pbXBvcnQgeyBTdmdDb2RlR2VuU2VydmljZSB9IGZyb20gJ0B4bGF5ZXJzL3N2Zy1jb2RlZ2VuJztcclxuXHJcbmltcG9ydCB7IFdlYkNvZGVHZW5PcHRpb25zIH0gZnJvbSAnLi93ZWItY29kZWdlbi5kJztcclxuaW1wb3J0IHsgV2ViQ29udGV4dFNlcnZpY2UgfSBmcm9tICcuL3dlYi1jb250ZXh0LnNlcnZpY2UnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgV2ViUGFyc2VyU2VydmljZSB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHRleHRTZXJ2aWNlOiBUZXh0U2VydmljZSxcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgZm9ybWF0U2VydmljZTogRm9ybWF0U2VydmljZSxcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgc3ltYm9sU2VydmljZTogU3ltYm9sU2VydmljZSxcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgaW1hZ2VTZXJ2aWNlOiBJbWFnZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGxheWVyU2VydmljZTogTGF5ZXJTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBjc3NDb2RlR2VuOiBDc3NDb2RlR2VuU2VydmljZSxcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgc3ZnQ29kZUdlbjogU3ZnQ29kZUdlblNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHdlYkNvbnRleHQ6IFdlYkNvbnRleHRTZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBjb21wdXRlKFxyXG4gICAgY3VycmVudDogU2tldGNoTVNMYXllcixcclxuICAgIGRhdGE6IFNrZXRjaE1TRGF0YSxcclxuICAgIG9wdGlvbnM6IFdlYkNvZGVHZW5PcHRpb25zXHJcbiAgKSB7XHJcbiAgICB0aGlzLnN2Z0NvZGVHZW4uY29tcHV0ZShjdXJyZW50LCBkYXRhLCBvcHRpb25zKTtcclxuICAgIHRoaXMuY3NzQ29kZUdlbi5jb21wdXRlKGN1cnJlbnQsIGRhdGEsIG9wdGlvbnMpO1xyXG4gICAgaWYgKGN1cnJlbnQuX2NsYXNzID09PSAncGFnZScpIHtcclxuICAgICAgdGhpcy53YWxrKGN1cnJlbnQsIGRhdGEsIG9wdGlvbnMpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy52aXNpdChjdXJyZW50LCBkYXRhLCBvcHRpb25zKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgd2FsayhcclxuICAgIGN1cnJlbnQ6IFNrZXRjaE1TTGF5ZXIsXHJcbiAgICBkYXRhOiBTa2V0Y2hNU0RhdGEsXHJcbiAgICBvcHRpb25zOiBXZWJDb2RlR2VuT3B0aW9uc1xyXG4gICkge1xyXG4gICAgaWYgKHRoaXMubGF5ZXJTZXJ2aWNlLmlkZW50aWZ5KGN1cnJlbnQpKSB7XHJcbiAgICAgIGN1cnJlbnQubGF5ZXJzLmZvckVhY2gobGF5ZXIgPT4ge1xyXG4gICAgICAgIHRoaXMudmlzaXQobGF5ZXIsIGRhdGEsIG9wdGlvbnMpO1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5zeW1ib2xTZXJ2aWNlLmlkZW50aWZ5KGN1cnJlbnQpKSB7XHJcbiAgICAgIHRoaXMudmlzaXRTeW1ib2woY3VycmVudCwgZGF0YSwgb3B0aW9ucyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHZpc2l0KFxyXG4gICAgY3VycmVudDogU2tldGNoTVNMYXllcixcclxuICAgIGRhdGE6IFNrZXRjaE1TRGF0YSxcclxuICAgIG9wdGlvbnM6IFdlYkNvZGVHZW5PcHRpb25zXHJcbiAgKSB7XHJcbiAgICBpZiAob3B0aW9ucy5mb3JjZSkge1xyXG4gICAgICB0aGlzLndlYkNvbnRleHQuY2xlYXIoY3VycmVudCk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy53ZWJDb250ZXh0LmlkZW50aWZ5KGN1cnJlbnQpKSB7XHJcbiAgICAgIGlmICghdGhpcy53ZWJDb250ZXh0Lm9mKGN1cnJlbnQpKSB7XHJcbiAgICAgICAgdGhpcy52aXNpdENvbnRlbnQoY3VycmVudCwgb3B0aW9ucyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMud2FsayhjdXJyZW50LCBkYXRhLCBvcHRpb25zKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdmlzaXRDb250ZW50KGN1cnJlbnQ6IFNrZXRjaE1TTGF5ZXIsIG9wdGlvbnM6IFdlYkNvZGVHZW5PcHRpb25zKSB7XHJcbiAgICBpZiAodGhpcy5pbWFnZVNlcnZpY2UuaWRlbnRpZnkoY3VycmVudCkpIHtcclxuICAgICAgdGhpcy52aXNpdEJpdG1hcChjdXJyZW50LCBvcHRpb25zKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy50ZXh0U2VydmljZS5pZGVudGlmeShjdXJyZW50KSkge1xyXG4gICAgICB0aGlzLnZpc2l0VGV4dChjdXJyZW50KTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5zdmdDb2RlR2VuLmlkZW50aWZ5KGN1cnJlbnQpKSB7XHJcbiAgICAgIHRoaXMudmlzaXRTaGFwZShjdXJyZW50KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMudmlzaXRMYXllcihjdXJyZW50LCBvcHRpb25zKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgdmlzaXRMYXllcihjdXJyZW50OiBTa2V0Y2hNU0xheWVyLCBvcHRpb25zOiBXZWJDb2RlR2VuT3B0aW9ucykge1xyXG4gICAgdGhpcy53ZWJDb250ZXh0LnB1dChjdXJyZW50LCB7XHJcbiAgICAgIGF0dHJpYnV0ZXM6IFtcclxuICAgICAgICAuLi50aGlzLmdlbmVyYXRlQ2xhc3NBdHRyaWJ1dGUoY3VycmVudCksXHJcbiAgICAgICAgYHJvbGU9XCIke2N1cnJlbnQuX2NsYXNzfVwiYCxcclxuICAgICAgICBgYXJpYS1sYWJlbD1cIiR7Y3VycmVudC5uYW1lfVwiYFxyXG4gICAgICBdXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdmlzaXRTeW1ib2woXHJcbiAgICBjdXJyZW50OiBTa2V0Y2hNU0xheWVyLFxyXG4gICAgZGF0YTogU2tldGNoTVNEYXRhLFxyXG4gICAgb3B0aW9uczogV2ViQ29kZUdlbk9wdGlvbnNcclxuICApIHtcclxuICAgIGNvbnN0IHN5bWJvbE1hc3RlciA9IHRoaXMuc3ltYm9sU2VydmljZS5sb29rdXAoY3VycmVudCwgZGF0YSk7XHJcbiAgICBpZiAoc3ltYm9sTWFzdGVyKSB7XHJcbiAgICAgIHRoaXMuY29tcHV0ZShzeW1ib2xNYXN0ZXIsIGRhdGEsIG9wdGlvbnMpO1xyXG4gICAgICBjb25zdCBjb250ZXh0ID0gdGhpcy53ZWJDb250ZXh0Lm9mKGN1cnJlbnQpO1xyXG4gICAgICB0aGlzLndlYkNvbnRleHQucHV0KGN1cnJlbnQsIHtcclxuICAgICAgICBjb21wb25lbnRzOlxyXG4gICAgICAgICAgY29udGV4dCAmJiBjb250ZXh0LmNvbXBvbmVudHNcclxuICAgICAgICAgICAgPyBbLi4uY29udGV4dC5jb21wb25lbnRzLCBjdXJyZW50Lm5hbWVdXHJcbiAgICAgICAgICAgIDogW2N1cnJlbnQubmFtZV1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHZpc2l0Qml0bWFwKGN1cnJlbnQ6IFNrZXRjaE1TTGF5ZXIsIG9wdGlvbnM6IFdlYkNvZGVHZW5PcHRpb25zKSB7XHJcbiAgICBjb25zdCBmaWxlTmFtZSA9IHRoaXMuZm9ybWF0U2VydmljZS5ub3JtYWxpemVOYW1lKGN1cnJlbnQubmFtZSk7XHJcbiAgICB0aGlzLndlYkNvbnRleHQucHV0KGN1cnJlbnQsIHtcclxuICAgICAgYXR0cmlidXRlczogW1xyXG4gICAgICAgIC4uLnRoaXMuZ2VuZXJhdGVDbGFzc0F0dHJpYnV0ZShjdXJyZW50KSxcclxuICAgICAgICBgcm9sZT1cIiR7Y3VycmVudC5fY2xhc3N9XCJgLFxyXG4gICAgICAgIGBhcmlhLWxhYmVsPVwiJHtjdXJyZW50Lm5hbWV9XCJgLFxyXG4gICAgICAgIGBzcmM9XCIvJHtvcHRpb25zLmFzc2V0RGlyfS8ke2ZpbGVOYW1lfS5wbmdcImBcclxuICAgICAgXVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHZpc2l0VGV4dChjdXJyZW50OiBTa2V0Y2hNU0xheWVyKSB7XHJcbiAgICB0aGlzLndlYkNvbnRleHQucHV0KGN1cnJlbnQsIHtcclxuICAgICAgYXR0cmlidXRlczogdGhpcy5nZW5lcmF0ZUNsYXNzQXR0cmlidXRlKGN1cnJlbnQpXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdmlzaXRTaGFwZShjdXJyZW50OiBTa2V0Y2hNU0xheWVyKSB7XHJcbiAgICB0aGlzLndlYkNvbnRleHQucHV0KGN1cnJlbnQsIHtcclxuICAgICAgYXR0cmlidXRlczogdGhpcy5nZW5lcmF0ZUNsYXNzQXR0cmlidXRlKGN1cnJlbnQpXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2VuZXJhdGVDbGFzc0F0dHJpYnV0ZShjdXJyZW50OiBTa2V0Y2hNU0xheWVyKSB7XHJcbiAgICBpZiAodGhpcy5jc3NDb2RlR2VuLmlkZW50aWZ5KGN1cnJlbnQpKSB7XHJcbiAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IHRoaXMuY3NzQ29kZUdlbi5jb250ZXh0KGN1cnJlbnQpLmNsYXNzTmFtZTtcclxuICAgICAgaWYgKGNsYXNzTmFtZSkge1xyXG4gICAgICAgIHJldHVybiBbYGNsYXNzPVwiJHtjbGFzc05hbWV9XCJgXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIFtdO1xyXG4gIH1cclxufVxyXG4iXX0=