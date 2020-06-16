/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
        return tslib_1.__assign({ textTagName: 'span', bitmapTagName: 'img', blockTagName: 'div', mode: 'web', jsx: false, xmlPrefix: 'xly-', cssPrefix: 'xly_', componentDir: 'components', assetDir: 'assets' }, options);
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
    /** @nocollapse */ WebCodeGenService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function WebCodeGenService_Factory() { return new WebCodeGenService(i0.ɵɵinject(i1.SymbolService), i0.ɵɵinject(i1.ImageService), i0.ɵɵinject(i2.WebContextService), i0.ɵɵinject(i3.WebParserService), i0.ɵɵinject(i4.WebAggregatorService), i0.ɵɵinject(i1.LayerService)); }, token: WebCodeGenService, providedIn: "root" });
    return WebCodeGenService;
}());
export { WebCodeGenService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViLWNvZGVnZW4uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B4bGF5ZXJzL3dlYi1jb2RlZ2VuLyIsInNvdXJjZXMiOlsibGliL3dlYi1jb2RlZ2VuLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2hGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzFELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7Ozs7QUFHaEU7SUFJRSwyQkFDbUIsYUFBNEIsRUFDNUIsWUFBMEIsRUFDMUIsVUFBNkIsRUFDN0IsU0FBMkIsRUFDM0Isb0JBQTBDLEVBQzFDLFlBQTBCO1FBTDFCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLGVBQVUsR0FBVixVQUFVLENBQW1CO1FBQzdCLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBQzNCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDMUMsaUJBQVksR0FBWixZQUFZLENBQWM7SUFDMUMsQ0FBQzs7Ozs7OztJQUVKLG1DQUFPOzs7Ozs7SUFBUCxVQUNFLE9BQXNCLEVBQ3RCLElBQWtCLEVBQ2xCLE9BQTJCO1FBRTNCLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7Ozs7Ozs7SUFFRCxxQ0FBUzs7Ozs7O0lBQVQsVUFDRSxPQUFzQixFQUN0QixJQUFrQixFQUNsQixPQUEyQjtRQUUzQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDakUsQ0FBQzs7Ozs7SUFFRCxvQ0FBUTs7OztJQUFSLFVBQVMsT0FBc0I7UUFDN0IsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMzQyxDQUFDOzs7OztJQUVELG1DQUFPOzs7O0lBQVAsVUFBUSxPQUFzQjtRQUM1QixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3JDLENBQUM7Ozs7Ozs7O0lBRU8saUNBQUs7Ozs7Ozs7SUFBYixVQUNFLE9BQXNCLEVBQ3RCLElBQWtCLEVBQ2xCLE9BQTJCO1FBRTNCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FDckQsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQ3RELENBQUM7SUFDSixDQUFDOzs7Ozs7OztJQUVPLHdDQUFZOzs7Ozs7O0lBQXBCLFVBQ0UsT0FBc0IsRUFDdEIsSUFBa0IsRUFDbEIsT0FBMEI7UUFFMUIsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUN2QyxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztTQUNoRDthQUFNLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDL0MsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztTQUN2RDthQUFNLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDOUMsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQzVEO1FBQ0QsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDOzs7Ozs7OztJQUVPLHNDQUFVOzs7Ozs7O0lBQWxCLFVBQ0UsT0FBc0IsRUFDdEIsSUFBa0IsRUFDbEIsT0FBMEI7UUFINUIsaUJBUUM7UUFIQyxPQUFPLElBQUksQ0FBQyxZQUFZO2FBQ3JCLE1BQU0sQ0FBQyxPQUFPLENBQUM7YUFDZixPQUFPOzs7O1FBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLEVBQXZDLENBQXVDLEVBQUMsQ0FBQztJQUMvRCxDQUFDOzs7Ozs7OztJQUVPLDZDQUFpQjs7Ozs7OztJQUF6QixVQUNFLE9BQXNCLEVBQ3RCLElBQWtCLEVBQ2xCLE9BQTBCOztZQUVwQixZQUFZLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQztRQUM3RCxJQUFJLFlBQVksRUFBRTtZQUNoQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztTQUNoRDtRQUNELE9BQU8sRUFBRSxDQUFDO0lBQ1osQ0FBQzs7Ozs7O0lBRU8sMENBQWM7Ozs7O0lBQXRCLFVBQXVCLE9BQTBCO1FBQy9DLDBCQUNFLFdBQVcsRUFBRSxNQUFNLEVBQ25CLGFBQWEsRUFBRSxLQUFLLEVBQ3BCLFlBQVksRUFBRSxLQUFLLEVBQ25CLElBQUksRUFBRSxLQUFLLEVBQ1gsR0FBRyxFQUFFLEtBQUssRUFDVixTQUFTLEVBQUUsTUFBTSxFQUNqQixTQUFTLEVBQUUsTUFBTSxFQUNqQixZQUFZLEVBQUUsWUFBWSxFQUMxQixRQUFRLEVBQUUsUUFBUSxJQUNmLE9BQU8sRUFDVjtJQUNKLENBQUM7O2dCQWpHRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQVJzQixhQUFhO2dCQUEzQixZQUFZO2dCQUNaLGlCQUFpQjtnQkFDakIsZ0JBQWdCO2dCQUNoQixvQkFBb0I7Z0JBSFMsWUFBWTs7OzRCQURsRDtDQXlHQyxBQWxHRCxJQWtHQztTQS9GWSxpQkFBaUI7Ozs7OztJQUUxQiwwQ0FBNkM7Ozs7O0lBQzdDLHlDQUEyQzs7Ozs7SUFDM0MsdUNBQThDOzs7OztJQUM5QyxzQ0FBNEM7Ozs7O0lBQzVDLGlEQUEyRDs7Ozs7SUFDM0QseUNBQTJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBJbWFnZVNlcnZpY2UsIFN5bWJvbFNlcnZpY2UsIExheWVyU2VydmljZSB9IGZyb20gJ0B4bGF5ZXJzL3NrZXRjaC1saWInO1xyXG5pbXBvcnQgeyBXZWJDb250ZXh0U2VydmljZSB9IGZyb20gJy4vd2ViLWNvbnRleHQuc2VydmljZSc7XHJcbmltcG9ydCB7IFdlYlBhcnNlclNlcnZpY2UgfSBmcm9tICcuL3dlYi1wYXJzZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IFdlYkFnZ3JlZ2F0b3JTZXJ2aWNlIH0gZnJvbSAnLi93ZWItYWdncmVnYXRvci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgV2ViQ29kZUdlbk9wdGlvbnMgfSBmcm9tICcuL3dlYi1jb2RlZ2VuLmQnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgV2ViQ29kZUdlblNlcnZpY2Uge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBzeW1ib2xTZXJ2aWNlOiBTeW1ib2xTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBpbWFnZVNlcnZpY2U6IEltYWdlU2VydmljZSxcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgd2ViQ29udGV4dDogV2ViQ29udGV4dFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHdlYlBhcnNlcjogV2ViUGFyc2VyU2VydmljZSxcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgd2ViQWdncmV0YXRvclNlcnZpY2U6IFdlYkFnZ3JlZ2F0b3JTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBsYXllclNlcnZpY2U6IExheWVyU2VydmljZVxyXG4gICkge31cclxuXHJcbiAgY29tcHV0ZShcclxuICAgIGN1cnJlbnQ6IFNrZXRjaE1TTGF5ZXIsXHJcbiAgICBkYXRhOiBTa2V0Y2hNU0RhdGEsXHJcbiAgICBvcHRpb25zPzogV2ViQ29kZUdlbk9wdGlvbnNcclxuICApIHtcclxuICAgIHRoaXMud2ViUGFyc2VyLmNvbXB1dGUoY3VycmVudCwgZGF0YSwgdGhpcy5jb21waWxlT3B0aW9ucyhvcHRpb25zKSk7XHJcbiAgfVxyXG5cclxuICBhZ2dyZWdhdGUoXHJcbiAgICBjdXJyZW50OiBTa2V0Y2hNU0xheWVyLFxyXG4gICAgZGF0YTogU2tldGNoTVNEYXRhLFxyXG4gICAgb3B0aW9ucz86IFdlYkNvZGVHZW5PcHRpb25zXHJcbiAgKSB7XHJcbiAgICByZXR1cm4gdGhpcy52aXNpdChjdXJyZW50LCBkYXRhLCB0aGlzLmNvbXBpbGVPcHRpb25zKG9wdGlvbnMpKTtcclxuICB9XHJcblxyXG4gIGlkZW50aWZ5KGN1cnJlbnQ6IFNrZXRjaE1TTGF5ZXIpIHtcclxuICAgIHJldHVybiB0aGlzLndlYkNvbnRleHQuaWRlbnRpZnkoY3VycmVudCk7XHJcbiAgfVxyXG5cclxuICBjb250ZXh0KGN1cnJlbnQ6IFNrZXRjaE1TTGF5ZXIpIHtcclxuICAgIHJldHVybiB0aGlzLndlYkNvbnRleHQub2YoY3VycmVudCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHZpc2l0KFxyXG4gICAgY3VycmVudDogU2tldGNoTVNMYXllcixcclxuICAgIGRhdGE6IFNrZXRjaE1TRGF0YSxcclxuICAgIG9wdGlvbnM/OiBXZWJDb2RlR2VuT3B0aW9uc1xyXG4gICkge1xyXG4gICAgcmV0dXJuIHRoaXMudmlzaXRDb250ZW50KGN1cnJlbnQsIGRhdGEsIG9wdGlvbnMpLmNvbmNhdChcclxuICAgICAgdGhpcy53ZWJBZ2dyZXRhdG9yU2VydmljZS5hZ2dyZWdhdGUoY3VycmVudCwgb3B0aW9ucylcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHZpc2l0Q29udGVudChcclxuICAgIGN1cnJlbnQ6IFNrZXRjaE1TTGF5ZXIsXHJcbiAgICBkYXRhOiBTa2V0Y2hNU0RhdGEsXHJcbiAgICBvcHRpb25zOiBXZWJDb2RlR2VuT3B0aW9uc1xyXG4gICkge1xyXG4gICAgaWYgKHRoaXMubGF5ZXJTZXJ2aWNlLmlkZW50aWZ5KGN1cnJlbnQpKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnZpc2l0TGF5ZXIoY3VycmVudCwgZGF0YSwgb3B0aW9ucyk7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuc3ltYm9sU2VydmljZS5pZGVudGlmeShjdXJyZW50KSkge1xyXG4gICAgICByZXR1cm4gdGhpcy52aXNpdFN5bWJvbE1hc3RlcihjdXJyZW50LCBkYXRhLCBvcHRpb25zKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5pbWFnZVNlcnZpY2UuaWRlbnRpZnkoY3VycmVudCkpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuaW1hZ2VTZXJ2aWNlLmFnZ3JlZ2F0ZShjdXJyZW50LCBkYXRhLCBvcHRpb25zKTtcclxuICAgIH1cclxuICAgIHJldHVybiBbXTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdmlzaXRMYXllcihcclxuICAgIGN1cnJlbnQ6IFNrZXRjaE1TTGF5ZXIsXHJcbiAgICBkYXRhOiBTa2V0Y2hNU0RhdGEsXHJcbiAgICBvcHRpb25zOiBXZWJDb2RlR2VuT3B0aW9uc1xyXG4gICkge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5ZXJTZXJ2aWNlXHJcbiAgICAgIC5sb29rdXAoY3VycmVudClcclxuICAgICAgLmZsYXRNYXAobGF5ZXIgPT4gdGhpcy52aXNpdENvbnRlbnQobGF5ZXIsIGRhdGEsIG9wdGlvbnMpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdmlzaXRTeW1ib2xNYXN0ZXIoXHJcbiAgICBjdXJyZW50OiBTa2V0Y2hNU0xheWVyLFxyXG4gICAgZGF0YTogU2tldGNoTVNEYXRhLFxyXG4gICAgb3B0aW9uczogV2ViQ29kZUdlbk9wdGlvbnNcclxuICApIHtcclxuICAgIGNvbnN0IHN5bWJvbE1hc3RlciA9IHRoaXMuc3ltYm9sU2VydmljZS5sb29rdXAoY3VycmVudCwgZGF0YSk7XHJcbiAgICBpZiAoc3ltYm9sTWFzdGVyKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnZpc2l0KHN5bWJvbE1hc3RlciwgZGF0YSwgb3B0aW9ucyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gW107XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNvbXBpbGVPcHRpb25zKG9wdGlvbnM6IFdlYkNvZGVHZW5PcHRpb25zKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0ZXh0VGFnTmFtZTogJ3NwYW4nLFxyXG4gICAgICBiaXRtYXBUYWdOYW1lOiAnaW1nJyxcclxuICAgICAgYmxvY2tUYWdOYW1lOiAnZGl2JyxcclxuICAgICAgbW9kZTogJ3dlYicsXHJcbiAgICAgIGpzeDogZmFsc2UsXHJcbiAgICAgIHhtbFByZWZpeDogJ3hseS0nLFxyXG4gICAgICBjc3NQcmVmaXg6ICd4bHlfJyxcclxuICAgICAgY29tcG9uZW50RGlyOiAnY29tcG9uZW50cycsXHJcbiAgICAgIGFzc2V0RGlyOiAnYXNzZXRzJyxcclxuICAgICAgLi4ub3B0aW9uc1xyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19