/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { ImageService, LayerService, TextService } from '@xlayers/sketch-lib';
import { SvgCodeGenService } from '@xlayers/svg-codegen';
import * as i0 from "@angular/core";
import * as i1 from "@xlayers/sketch-lib";
import * as i2 from "@xlayers/svg-codegen";
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
        ((/** @type {?} */ (current))).web = tslib_1.__assign({}, this.of(current), nextContext);
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
    /** @nocollapse */ WebContextService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function WebContextService_Factory() { return new WebContextService(i0.ɵɵinject(i1.LayerService), i0.ɵɵinject(i1.TextService), i0.ɵɵinject(i1.ImageService), i0.ɵɵinject(i2.SvgCodeGenService)); }, token: WebContextService, providedIn: "root" });
    return WebContextService;
}());
export { WebContextService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViLWNvbnRleHQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B4bGF5ZXJzL3dlYi1jb2RlZ2VuLyIsInNvdXJjZXMiOlsibGliL3dlYi1jb250ZXh0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzlFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7O0FBSXpEO0lBSUUsMkJBQ21CLFlBQTBCLEVBQzFCLFdBQXdCLEVBQ3hCLFlBQTBCLEVBQzFCLFVBQTZCO1FBSDdCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLGVBQVUsR0FBVixVQUFVLENBQW1CO0lBQzdDLENBQUM7Ozs7O0lBRUosb0NBQVE7Ozs7SUFBUixVQUFTLE9BQXNCO1FBQzdCLE9BQU8sQ0FDTCxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7WUFDbkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztZQUNuQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7WUFDakM7Z0JBQ0UsTUFBTTtnQkFDTixNQUFNO2dCQUNOLFdBQVc7Z0JBQ1gsT0FBTztnQkFDUCxjQUFjO2dCQUNkLFlBQVk7YUFDYixDQUFDLFFBQVEsQ0FBQyxtQkFBQSxPQUFPLENBQUMsTUFBTSxFQUFVLENBQUMsQ0FDckMsQ0FBQztJQUNKLENBQUM7Ozs7O0lBRUQsOEJBQUU7Ozs7SUFBRixVQUFHLE9BQXNCO1FBQ3ZCLE9BQU8sQ0FBQyxtQkFBQSxPQUFPLEVBQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUM5QixDQUFDOzs7Ozs7SUFFRCwrQkFBRzs7Ozs7SUFBSCxVQUFJLE9BQXNCLEVBQUUsV0FBOEI7UUFDeEQsQ0FBQyxtQkFBQSxPQUFPLEVBQU8sQ0FBQyxDQUFDLEdBQUcsd0JBQVEsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBSyxXQUFXLENBQUUsQ0FBQztJQUNqRSxDQUFDOzs7OztJQUVELGlDQUFLOzs7O0lBQUwsVUFBTSxPQUFzQjtRQUMxQixPQUFPLENBQUMsbUJBQUEsT0FBTyxFQUFPLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDOUIsQ0FBQzs7Z0JBdENGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBUHNCLFlBQVk7Z0JBQUUsV0FBVztnQkFBdkMsWUFBWTtnQkFDWixpQkFBaUI7Ozs0QkFGMUI7Q0E2Q0MsQUF2Q0QsSUF1Q0M7U0FwQ1ksaUJBQWlCOzs7Ozs7SUFFMUIseUNBQTJDOzs7OztJQUMzQyx3Q0FBeUM7Ozs7O0lBQ3pDLHlDQUEyQzs7Ozs7SUFDM0MsdUNBQThDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBJbWFnZVNlcnZpY2UsIExheWVyU2VydmljZSwgVGV4dFNlcnZpY2UgfSBmcm9tICdAeGxheWVycy9za2V0Y2gtbGliJztcclxuaW1wb3J0IHsgU3ZnQ29kZUdlblNlcnZpY2UgfSBmcm9tICdAeGxheWVycy9zdmctY29kZWdlbic7XHJcblxyXG5pbXBvcnQgeyBXZWJDb2RlR2VuQ29udGV4dCB9IGZyb20gJy4vd2ViLWNvZGVnZW4uZCc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBXZWJDb250ZXh0U2VydmljZSB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGxheWVyU2VydmljZTogTGF5ZXJTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSByZWFkb25seSB0ZXh0U2VydmljZTogVGV4dFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGltYWdlU2VydmljZTogSW1hZ2VTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBzdmdDb2RlR2VuOiBTdmdDb2RlR2VuU2VydmljZVxyXG4gICkge31cclxuXHJcbiAgaWRlbnRpZnkoY3VycmVudDogU2tldGNoTVNMYXllcikge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgdGhpcy5pbWFnZVNlcnZpY2UuaWRlbnRpZnkoY3VycmVudCkgfHxcclxuICAgICAgdGhpcy50ZXh0U2VydmljZS5pZGVudGlmeShjdXJyZW50KSB8fFxyXG4gICAgICB0aGlzLmxheWVyU2VydmljZS5pZGVudGlmeShjdXJyZW50KSB8fFxyXG4gICAgICB0aGlzLnN2Z0NvZGVHZW4uaWRlbnRpZnkoY3VycmVudCkgfHxcclxuICAgICAgW1xyXG4gICAgICAgICdvdmFsJyxcclxuICAgICAgICAncmVjdCcsXHJcbiAgICAgICAgJ3JlY3RhbmdsZScsXHJcbiAgICAgICAgJ2dyb3VwJyxcclxuICAgICAgICAnc3ltYm9sTWFzdGVyJyxcclxuICAgICAgICAnc2hhcGVHcm91cCdcclxuICAgICAgXS5pbmNsdWRlcyhjdXJyZW50Ll9jbGFzcyBhcyBzdHJpbmcpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgb2YoY3VycmVudDogU2tldGNoTVNMYXllcikge1xyXG4gICAgcmV0dXJuIChjdXJyZW50IGFzIGFueSkud2ViO1xyXG4gIH1cclxuXHJcbiAgcHV0KGN1cnJlbnQ6IFNrZXRjaE1TTGF5ZXIsIG5leHRDb250ZXh0OiBXZWJDb2RlR2VuQ29udGV4dCkge1xyXG4gICAgKGN1cnJlbnQgYXMgYW55KS53ZWIgPSB7IC4uLnRoaXMub2YoY3VycmVudCksIC4uLm5leHRDb250ZXh0IH07XHJcbiAgfVxyXG5cclxuICBjbGVhcihjdXJyZW50OiBTa2V0Y2hNU0xheWVyKSB7XHJcbiAgICBkZWxldGUgKGN1cnJlbnQgYXMgYW55KS53ZWI7XHJcbiAgfVxyXG59XHJcbiJdfQ==