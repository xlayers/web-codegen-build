/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { ImageService, SymbolService, LayerService } from '@xlayers/sketch-lib';
import { WebContextService } from './web-context.service';
import { WebParserService } from './web-parser.service';
import { WebAggregatorService } from './web-aggregator.service';
import * as i0 from "@angular/core";
import * as i1 from "@xlayers/sketch-lib";
import * as i2 from "./web-context.service";
import * as i3 from "./web-parser.service";
import * as i4 from "./web-aggregator.service";
export class WebCodeGenService {
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
/** @nocollapse */ WebCodeGenService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function WebCodeGenService_Factory() { return new WebCodeGenService(i0.ɵɵinject(i1.SymbolService), i0.ɵɵinject(i1.ImageService), i0.ɵɵinject(i2.WebContextService), i0.ɵɵinject(i3.WebParserService), i0.ɵɵinject(i4.WebAggregatorService), i0.ɵɵinject(i1.LayerService)); }, token: WebCodeGenService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViLWNvZGVnZW4uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B4bGF5ZXJzL3dlYi1jb2RlZ2VuLyIsInNvdXJjZXMiOlsibGliL3dlYi1jb2RlZ2VuLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7Ozs7OztBQU1oRSxNQUFNLE9BQU8saUJBQWlCOzs7Ozs7Ozs7SUFDNUIsWUFDbUIsYUFBNEIsRUFDNUIsWUFBMEIsRUFDMUIsVUFBNkIsRUFDN0IsU0FBMkIsRUFDM0Isb0JBQTBDLEVBQzFDLFlBQTBCO1FBTDFCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLGVBQVUsR0FBVixVQUFVLENBQW1CO1FBQzdCLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBQzNCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDMUMsaUJBQVksR0FBWixZQUFZLENBQWM7SUFDMUMsQ0FBQzs7Ozs7OztJQUVKLE9BQU8sQ0FDTCxPQUFzQixFQUN0QixJQUFrQixFQUNsQixPQUEyQjtRQUUzQixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUN0RSxDQUFDOzs7Ozs7O0lBRUQsU0FBUyxDQUNQLE9BQXNCLEVBQ3RCLElBQWtCLEVBQ2xCLE9BQTJCO1FBRTNC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Ozs7OztJQUM3Qyx5Q0FBMkM7Ozs7O0lBQzNDLHVDQUE4Qzs7Ozs7SUFDOUMsc0NBQTRDOzs7OztJQUM1QyxpREFBMkQ7Ozs7O0lBQzNELHlDQUEyQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSW1hZ2VTZXJ2aWNlLCBTeW1ib2xTZXJ2aWNlLCBMYXllclNlcnZpY2UgfSBmcm9tICdAeGxheWVycy9za2V0Y2gtbGliJztcclxuaW1wb3J0IHsgV2ViQ29udGV4dFNlcnZpY2UgfSBmcm9tICcuL3dlYi1jb250ZXh0LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBXZWJQYXJzZXJTZXJ2aWNlIH0gZnJvbSAnLi93ZWItcGFyc2VyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBXZWJBZ2dyZWdhdG9yU2VydmljZSB9IGZyb20gJy4vd2ViLWFnZ3JlZ2F0b3Iuc2VydmljZSc7XHJcbmltcG9ydCB7IFdlYkNvZGVHZW5PcHRpb25zIH0gZnJvbSAnLi93ZWItY29kZWdlbi5kJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFdlYkNvZGVHZW5TZXJ2aWNlIHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgc3ltYm9sU2VydmljZTogU3ltYm9sU2VydmljZSxcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgaW1hZ2VTZXJ2aWNlOiBJbWFnZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHdlYkNvbnRleHQ6IFdlYkNvbnRleHRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSByZWFkb25seSB3ZWJQYXJzZXI6IFdlYlBhcnNlclNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHdlYkFnZ3JldGF0b3JTZXJ2aWNlOiBXZWJBZ2dyZWdhdG9yU2VydmljZSxcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgbGF5ZXJTZXJ2aWNlOiBMYXllclNlcnZpY2VcclxuICApIHt9XHJcblxyXG4gIGNvbXB1dGUoXHJcbiAgICBjdXJyZW50OiBTa2V0Y2hNU0xheWVyLFxyXG4gICAgZGF0YTogU2tldGNoTVNEYXRhLFxyXG4gICAgb3B0aW9ucz86IFdlYkNvZGVHZW5PcHRpb25zXHJcbiAgKSB7XHJcbiAgICB0aGlzLndlYlBhcnNlci5jb21wdXRlKGN1cnJlbnQsIGRhdGEsIHRoaXMuY29tcGlsZU9wdGlvbnMob3B0aW9ucykpO1xyXG4gIH1cclxuXHJcbiAgYWdncmVnYXRlKFxyXG4gICAgY3VycmVudDogU2tldGNoTVNMYXllcixcclxuICAgIGRhdGE6IFNrZXRjaE1TRGF0YSxcclxuICAgIG9wdGlvbnM/OiBXZWJDb2RlR2VuT3B0aW9uc1xyXG4gICkge1xyXG4gICAgcmV0dXJuIHRoaXMudmlzaXQoY3VycmVudCwgZGF0YSwgdGhpcy5jb21waWxlT3B0aW9ucyhvcHRpb25zKSk7XHJcbiAgfVxyXG5cclxuICBpZGVudGlmeShjdXJyZW50OiBTa2V0Y2hNU0xheWVyKSB7XHJcbiAgICByZXR1cm4gdGhpcy53ZWJDb250ZXh0LmlkZW50aWZ5KGN1cnJlbnQpO1xyXG4gIH1cclxuXHJcbiAgY29udGV4dChjdXJyZW50OiBTa2V0Y2hNU0xheWVyKSB7XHJcbiAgICByZXR1cm4gdGhpcy53ZWJDb250ZXh0Lm9mKGN1cnJlbnQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB2aXNpdChcclxuICAgIGN1cnJlbnQ6IFNrZXRjaE1TTGF5ZXIsXHJcbiAgICBkYXRhOiBTa2V0Y2hNU0RhdGEsXHJcbiAgICBvcHRpb25zPzogV2ViQ29kZUdlbk9wdGlvbnNcclxuICApIHtcclxuICAgIHJldHVybiB0aGlzLnZpc2l0Q29udGVudChjdXJyZW50LCBkYXRhLCBvcHRpb25zKS5jb25jYXQoXHJcbiAgICAgIHRoaXMud2ViQWdncmV0YXRvclNlcnZpY2UuYWdncmVnYXRlKGN1cnJlbnQsIG9wdGlvbnMpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB2aXNpdENvbnRlbnQoXHJcbiAgICBjdXJyZW50OiBTa2V0Y2hNU0xheWVyLFxyXG4gICAgZGF0YTogU2tldGNoTVNEYXRhLFxyXG4gICAgb3B0aW9uczogV2ViQ29kZUdlbk9wdGlvbnNcclxuICApIHtcclxuICAgIGlmICh0aGlzLmxheWVyU2VydmljZS5pZGVudGlmeShjdXJyZW50KSkge1xyXG4gICAgICByZXR1cm4gdGhpcy52aXNpdExheWVyKGN1cnJlbnQsIGRhdGEsIG9wdGlvbnMpO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLnN5bWJvbFNlcnZpY2UuaWRlbnRpZnkoY3VycmVudCkpIHtcclxuICAgICAgcmV0dXJuIHRoaXMudmlzaXRTeW1ib2xNYXN0ZXIoY3VycmVudCwgZGF0YSwgb3B0aW9ucyk7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuaW1hZ2VTZXJ2aWNlLmlkZW50aWZ5KGN1cnJlbnQpKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmltYWdlU2VydmljZS5hZ2dyZWdhdGUoY3VycmVudCwgZGF0YSwgb3B0aW9ucyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gW107XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHZpc2l0TGF5ZXIoXHJcbiAgICBjdXJyZW50OiBTa2V0Y2hNU0xheWVyLFxyXG4gICAgZGF0YTogU2tldGNoTVNEYXRhLFxyXG4gICAgb3B0aW9uczogV2ViQ29kZUdlbk9wdGlvbnNcclxuICApIHtcclxuICAgIHJldHVybiB0aGlzLmxheWVyU2VydmljZVxyXG4gICAgICAubG9va3VwKGN1cnJlbnQpXHJcbiAgICAgIC5mbGF0TWFwKGxheWVyID0+IHRoaXMudmlzaXRDb250ZW50KGxheWVyLCBkYXRhLCBvcHRpb25zKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHZpc2l0U3ltYm9sTWFzdGVyKFxyXG4gICAgY3VycmVudDogU2tldGNoTVNMYXllcixcclxuICAgIGRhdGE6IFNrZXRjaE1TRGF0YSxcclxuICAgIG9wdGlvbnM6IFdlYkNvZGVHZW5PcHRpb25zXHJcbiAgKSB7XHJcbiAgICBjb25zdCBzeW1ib2xNYXN0ZXIgPSB0aGlzLnN5bWJvbFNlcnZpY2UubG9va3VwKGN1cnJlbnQsIGRhdGEpO1xyXG4gICAgaWYgKHN5bWJvbE1hc3Rlcikge1xyXG4gICAgICByZXR1cm4gdGhpcy52aXNpdChzeW1ib2xNYXN0ZXIsIGRhdGEsIG9wdGlvbnMpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFtdO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjb21waWxlT3B0aW9ucyhvcHRpb25zOiBXZWJDb2RlR2VuT3B0aW9ucykge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdGV4dFRhZ05hbWU6ICdzcGFuJyxcclxuICAgICAgYml0bWFwVGFnTmFtZTogJ2ltZycsXHJcbiAgICAgIGJsb2NrVGFnTmFtZTogJ2RpdicsXHJcbiAgICAgIG1vZGU6ICd3ZWInLFxyXG4gICAgICBqc3g6IGZhbHNlLFxyXG4gICAgICB4bWxQcmVmaXg6ICd4bHktJyxcclxuICAgICAgY3NzUHJlZml4OiAneGx5XycsXHJcbiAgICAgIGNvbXBvbmVudERpcjogJ2NvbXBvbmVudHMnLFxyXG4gICAgICBhc3NldERpcjogJ2Fzc2V0cycsXHJcbiAgICAgIC4uLm9wdGlvbnNcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==