/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { ImageService, LayerService, TextService } from '@xlayers/sketch-lib';
import { SvgCodeGenService } from '@xlayers/svg-codegen';
import * as i0 from "@angular/core";
import * as i1 from "@xlayers/sketch-lib";
import * as i2 from "@xlayers/svg-codegen";
export class WebContextService {
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
/** @nocollapse */ WebContextService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function WebContextService_Factory() { return new WebContextService(i0.ɵɵinject(i1.LayerService), i0.ɵɵinject(i1.TextService), i0.ɵɵinject(i1.ImageService), i0.ɵɵinject(i2.SvgCodeGenService)); }, token: WebContextService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViLWNvbnRleHQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B4bGF5ZXJzL3dlYi1jb2RlZ2VuLyIsInNvdXJjZXMiOlsibGliL3dlYi1jb250ZXh0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDOUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7Ozs7QUFPekQsTUFBTSxPQUFPLGlCQUFpQjs7Ozs7OztJQUM1QixZQUNtQixZQUEwQixFQUMxQixXQUF3QixFQUN4QixZQUEwQixFQUMxQixVQUE2QjtRQUg3QixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixlQUFVLEdBQVYsVUFBVSxDQUFtQjtJQUM3QyxDQUFDOzs7OztJQUVKLFFBQVEsQ0FBQyxPQUFzQjtRQUM3QixPQUFPLENBQ0wsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO1lBQ25DLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztZQUNsQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7WUFDbkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO1lBQ2pDO2dCQUNFLE1BQU07Z0JBQ04sTUFBTTtnQkFDTixXQUFXO2dCQUNYLE9BQU87Z0JBQ1AsY0FBYztnQkFDZCxZQUFZO2FBQ2IsQ0FBQyxRQUFRLENBQUMsbUJBQUEsT0FBTyxDQUFDLE1BQU0sRUFBVSxDQUFDLENBQ3JDLENBQUM7SUFDSixDQUFDOzs7OztJQUVELEVBQUUsQ0FBQyxPQUFzQjtRQUN2QixPQUFPLENBQUMsbUJBQUEsT0FBTyxFQUFPLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDOUIsQ0FBQzs7Ozs7O0lBRUQsR0FBRyxDQUFDLE9BQXNCLEVBQUUsV0FBOEI7UUFDeEQsQ0FBQyxtQkFBQSxPQUFPLEVBQU8sQ0FBQyxDQUFDLEdBQUcscUJBQVEsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBSyxXQUFXLENBQUUsQ0FBQztJQUNqRSxDQUFDOzs7OztJQUVELEtBQUssQ0FBQyxPQUFzQjtRQUMxQixPQUFPLENBQUMsbUJBQUEsT0FBTyxFQUFPLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDOUIsQ0FBQzs7O1lBdENGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQVBzQixZQUFZO1lBQUUsV0FBVztZQUF2QyxZQUFZO1lBQ1osaUJBQWlCOzs7Ozs7OztJQVN0Qix5Q0FBMkM7Ozs7O0lBQzNDLHdDQUF5Qzs7Ozs7SUFDekMseUNBQTJDOzs7OztJQUMzQyx1Q0FBOEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEltYWdlU2VydmljZSwgTGF5ZXJTZXJ2aWNlLCBUZXh0U2VydmljZSB9IGZyb20gJ0B4bGF5ZXJzL3NrZXRjaC1saWInO1xyXG5pbXBvcnQgeyBTdmdDb2RlR2VuU2VydmljZSB9IGZyb20gJ0B4bGF5ZXJzL3N2Zy1jb2RlZ2VuJztcclxuXHJcbmltcG9ydCB7IFdlYkNvZGVHZW5Db250ZXh0IH0gZnJvbSAnLi93ZWItY29kZWdlbi5kJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFdlYkNvbnRleHRTZXJ2aWNlIHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgbGF5ZXJTZXJ2aWNlOiBMYXllclNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHRleHRTZXJ2aWNlOiBUZXh0U2VydmljZSxcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgaW1hZ2VTZXJ2aWNlOiBJbWFnZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHN2Z0NvZGVHZW46IFN2Z0NvZGVHZW5TZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBpZGVudGlmeShjdXJyZW50OiBTa2V0Y2hNU0xheWVyKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICB0aGlzLmltYWdlU2VydmljZS5pZGVudGlmeShjdXJyZW50KSB8fFxyXG4gICAgICB0aGlzLnRleHRTZXJ2aWNlLmlkZW50aWZ5KGN1cnJlbnQpIHx8XHJcbiAgICAgIHRoaXMubGF5ZXJTZXJ2aWNlLmlkZW50aWZ5KGN1cnJlbnQpIHx8XHJcbiAgICAgIHRoaXMuc3ZnQ29kZUdlbi5pZGVudGlmeShjdXJyZW50KSB8fFxyXG4gICAgICBbXHJcbiAgICAgICAgJ292YWwnLFxyXG4gICAgICAgICdyZWN0JyxcclxuICAgICAgICAncmVjdGFuZ2xlJyxcclxuICAgICAgICAnZ3JvdXAnLFxyXG4gICAgICAgICdzeW1ib2xNYXN0ZXInLFxyXG4gICAgICAgICdzaGFwZUdyb3VwJ1xyXG4gICAgICBdLmluY2x1ZGVzKGN1cnJlbnQuX2NsYXNzIGFzIHN0cmluZylcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBvZihjdXJyZW50OiBTa2V0Y2hNU0xheWVyKSB7XHJcbiAgICByZXR1cm4gKGN1cnJlbnQgYXMgYW55KS53ZWI7XHJcbiAgfVxyXG5cclxuICBwdXQoY3VycmVudDogU2tldGNoTVNMYXllciwgbmV4dENvbnRleHQ6IFdlYkNvZGVHZW5Db250ZXh0KSB7XHJcbiAgICAoY3VycmVudCBhcyBhbnkpLndlYiA9IHsgLi4udGhpcy5vZihjdXJyZW50KSwgLi4ubmV4dENvbnRleHQgfTtcclxuICB9XHJcblxyXG4gIGNsZWFyKGN1cnJlbnQ6IFNrZXRjaE1TTGF5ZXIpIHtcclxuICAgIGRlbGV0ZSAoY3VycmVudCBhcyBhbnkpLndlYjtcclxuICB9XHJcbn1cclxuIl19