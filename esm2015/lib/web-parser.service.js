/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class WebParserService {
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
/** @nocollapse */ WebParserService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function WebParserService_Factory() { return new WebParserService(i0.ɵɵinject(i1.TextService), i0.ɵɵinject(i1.FormatService), i0.ɵɵinject(i1.SymbolService), i0.ɵɵinject(i1.ImageService), i0.ɵɵinject(i1.LayerService), i0.ɵɵinject(i2.CssCodeGenService), i0.ɵɵinject(i3.SvgCodeGenService), i0.ɵɵinject(i4.WebContextService)); }, token: WebParserService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViLXBhcnNlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHhsYXllcnMvd2ViLWNvZGVnZW4vIiwic291cmNlcyI6WyJsaWIvd2ViLXBhcnNlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3pELE9BQU8sRUFDTCxhQUFhLEVBQ2IsWUFBWSxFQUNaLFlBQVksRUFDWixhQUFhLEVBQ2QsTUFBTSxxQkFBcUIsQ0FBQztBQUM3QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFHekQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7Ozs7OztBQUsxRCxNQUFNLE9BQU8sZ0JBQWdCOzs7Ozs7Ozs7OztJQUMzQixZQUNtQixXQUF3QixFQUN4QixhQUE0QixFQUM1QixhQUE0QixFQUM1QixZQUEwQixFQUMxQixZQUEwQixFQUMxQixVQUE2QixFQUM3QixVQUE2QixFQUM3QixVQUE2QjtRQVA3QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixlQUFVLEdBQVYsVUFBVSxDQUFtQjtRQUM3QixlQUFVLEdBQVYsVUFBVSxDQUFtQjtRQUM3QixlQUFVLEdBQVYsVUFBVSxDQUFtQjtJQUM3QyxDQUFDOzs7Ozs7O0lBRUosT0FBTyxDQUNMLE9BQXNCLEVBQ3RCLElBQWtCLEVBQ2xCLE9BQTBCO1FBRTFCLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLE9B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SUFDTCxDQUFDOzs7Ozs7SUFFTyxVQUFVLENBQUMsT0FBc0I7UUFDdkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFO1lBQzNCLFVBQVUsRUFBRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsT0FBTyxDQUFDO1NBQ2pELENBQUMsQ0FBQztJQUNMLENBQUM7Ozs7OztJQUVPLHNCQUFzQixDQUFDLE9BQXNCO1FBQ25ELElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7O2tCQUMvQixTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUztZQUM1RCxJQUFJLFNBQVMsRUFBRTtnQkFDYixPQUFPLENBQUMsVUFBVSxTQUFTLEdBQUcsQ0FBQyxDQUFDO2FBQ2pDO1NBQ0Y7UUFDRCxPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7OztZQW5JRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7WUFSUSxXQUFXO1lBTGxCLGFBQWE7WUFHYixhQUFhO1lBRmIsWUFBWTtZQUNaLFlBQVk7WUFKTCxpQkFBaUI7WUFRakIsaUJBQWlCO1lBR2pCLGlCQUFpQjs7Ozs7Ozs7SUFPdEIsdUNBQXlDOzs7OztJQUN6Qyx5Q0FBNkM7Ozs7O0lBQzdDLHlDQUE2Qzs7Ozs7SUFDN0Msd0NBQTJDOzs7OztJQUMzQyx3Q0FBMkM7Ozs7O0lBQzNDLHNDQUE4Qzs7Ozs7SUFDOUMsc0NBQThDOzs7OztJQUM5QyxzQ0FBOEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENzc0NvZGVHZW5TZXJ2aWNlIH0gZnJvbSAnQHhsYXllcnMvY3NzLWNvZGVnZW4nO1xyXG5pbXBvcnQge1xyXG4gIEZvcm1hdFNlcnZpY2UsXHJcbiAgSW1hZ2VTZXJ2aWNlLFxyXG4gIExheWVyU2VydmljZSxcclxuICBTeW1ib2xTZXJ2aWNlXHJcbn0gZnJvbSAnQHhsYXllcnMvc2tldGNoLWxpYic7XHJcbmltcG9ydCB7IFRleHRTZXJ2aWNlIH0gZnJvbSAnQHhsYXllcnMvc2tldGNoLWxpYic7XHJcbmltcG9ydCB7IFN2Z0NvZGVHZW5TZXJ2aWNlIH0gZnJvbSAnQHhsYXllcnMvc3ZnLWNvZGVnZW4nO1xyXG5cclxuaW1wb3J0IHsgV2ViQ29kZUdlbk9wdGlvbnMgfSBmcm9tICcuL3dlYi1jb2RlZ2VuLmQnO1xyXG5pbXBvcnQgeyBXZWJDb250ZXh0U2VydmljZSB9IGZyb20gJy4vd2ViLWNvbnRleHQuc2VydmljZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBXZWJQYXJzZXJTZXJ2aWNlIHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgdGV4dFNlcnZpY2U6IFRleHRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBmb3JtYXRTZXJ2aWNlOiBGb3JtYXRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBzeW1ib2xTZXJ2aWNlOiBTeW1ib2xTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBpbWFnZVNlcnZpY2U6IEltYWdlU2VydmljZSxcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgbGF5ZXJTZXJ2aWNlOiBMYXllclNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNzc0NvZGVHZW46IENzc0NvZGVHZW5TZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBzdmdDb2RlR2VuOiBTdmdDb2RlR2VuU2VydmljZSxcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgd2ViQ29udGV4dDogV2ViQ29udGV4dFNlcnZpY2VcclxuICApIHt9XHJcblxyXG4gIGNvbXB1dGUoXHJcbiAgICBjdXJyZW50OiBTa2V0Y2hNU0xheWVyLFxyXG4gICAgZGF0YTogU2tldGNoTVNEYXRhLFxyXG4gICAgb3B0aW9uczogV2ViQ29kZUdlbk9wdGlvbnNcclxuICApIHtcclxuICAgIHRoaXMuc3ZnQ29kZUdlbi5jb21wdXRlKGN1cnJlbnQsIGRhdGEsIG9wdGlvbnMpO1xyXG4gICAgdGhpcy5jc3NDb2RlR2VuLmNvbXB1dGUoY3VycmVudCwgZGF0YSwgb3B0aW9ucyk7XHJcbiAgICBpZiAoY3VycmVudC5fY2xhc3MgPT09ICdwYWdlJykge1xyXG4gICAgICB0aGlzLndhbGsoY3VycmVudCwgZGF0YSwgb3B0aW9ucyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnZpc2l0KGN1cnJlbnQsIGRhdGEsIG9wdGlvbnMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB3YWxrKFxyXG4gICAgY3VycmVudDogU2tldGNoTVNMYXllcixcclxuICAgIGRhdGE6IFNrZXRjaE1TRGF0YSxcclxuICAgIG9wdGlvbnM6IFdlYkNvZGVHZW5PcHRpb25zXHJcbiAgKSB7XHJcbiAgICBpZiAodGhpcy5sYXllclNlcnZpY2UuaWRlbnRpZnkoY3VycmVudCkpIHtcclxuICAgICAgY3VycmVudC5sYXllcnMuZm9yRWFjaChsYXllciA9PiB7XHJcbiAgICAgICAgdGhpcy52aXNpdChsYXllciwgZGF0YSwgb3B0aW9ucyk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLnN5bWJvbFNlcnZpY2UuaWRlbnRpZnkoY3VycmVudCkpIHtcclxuICAgICAgdGhpcy52aXNpdFN5bWJvbChjdXJyZW50LCBkYXRhLCBvcHRpb25zKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgdmlzaXQoXHJcbiAgICBjdXJyZW50OiBTa2V0Y2hNU0xheWVyLFxyXG4gICAgZGF0YTogU2tldGNoTVNEYXRhLFxyXG4gICAgb3B0aW9uczogV2ViQ29kZUdlbk9wdGlvbnNcclxuICApIHtcclxuICAgIGlmIChvcHRpb25zLmZvcmNlKSB7XHJcbiAgICAgIHRoaXMud2ViQ29udGV4dC5jbGVhcihjdXJyZW50KTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLndlYkNvbnRleHQuaWRlbnRpZnkoY3VycmVudCkpIHtcclxuICAgICAgaWYgKCF0aGlzLndlYkNvbnRleHQub2YoY3VycmVudCkpIHtcclxuICAgICAgICB0aGlzLnZpc2l0Q29udGVudChjdXJyZW50LCBvcHRpb25zKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy53YWxrKGN1cnJlbnQsIGRhdGEsIG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB2aXNpdENvbnRlbnQoY3VycmVudDogU2tldGNoTVNMYXllciwgb3B0aW9uczogV2ViQ29kZUdlbk9wdGlvbnMpIHtcclxuICAgIGlmICh0aGlzLmltYWdlU2VydmljZS5pZGVudGlmeShjdXJyZW50KSkge1xyXG4gICAgICB0aGlzLnZpc2l0Qml0bWFwKGN1cnJlbnQsIG9wdGlvbnMpO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLnRleHRTZXJ2aWNlLmlkZW50aWZ5KGN1cnJlbnQpKSB7XHJcbiAgICAgIHRoaXMudmlzaXRUZXh0KGN1cnJlbnQpO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLnN2Z0NvZGVHZW4uaWRlbnRpZnkoY3VycmVudCkpIHtcclxuICAgICAgdGhpcy52aXNpdFNoYXBlKGN1cnJlbnQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy52aXNpdExheWVyKGN1cnJlbnQsIG9wdGlvbnMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB2aXNpdExheWVyKGN1cnJlbnQ6IFNrZXRjaE1TTGF5ZXIsIG9wdGlvbnM6IFdlYkNvZGVHZW5PcHRpb25zKSB7XHJcbiAgICB0aGlzLndlYkNvbnRleHQucHV0KGN1cnJlbnQsIHtcclxuICAgICAgYXR0cmlidXRlczogW1xyXG4gICAgICAgIC4uLnRoaXMuZ2VuZXJhdGVDbGFzc0F0dHJpYnV0ZShjdXJyZW50KSxcclxuICAgICAgICBgcm9sZT1cIiR7Y3VycmVudC5fY2xhc3N9XCJgLFxyXG4gICAgICAgIGBhcmlhLWxhYmVsPVwiJHtjdXJyZW50Lm5hbWV9XCJgXHJcbiAgICAgIF1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB2aXNpdFN5bWJvbChcclxuICAgIGN1cnJlbnQ6IFNrZXRjaE1TTGF5ZXIsXHJcbiAgICBkYXRhOiBTa2V0Y2hNU0RhdGEsXHJcbiAgICBvcHRpb25zOiBXZWJDb2RlR2VuT3B0aW9uc1xyXG4gICkge1xyXG4gICAgY29uc3Qgc3ltYm9sTWFzdGVyID0gdGhpcy5zeW1ib2xTZXJ2aWNlLmxvb2t1cChjdXJyZW50LCBkYXRhKTtcclxuICAgIGlmIChzeW1ib2xNYXN0ZXIpIHtcclxuICAgICAgdGhpcy5jb21wdXRlKHN5bWJvbE1hc3RlciwgZGF0YSwgb3B0aW9ucyk7XHJcbiAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLndlYkNvbnRleHQub2YoY3VycmVudCk7XHJcbiAgICAgIHRoaXMud2ViQ29udGV4dC5wdXQoY3VycmVudCwge1xyXG4gICAgICAgIGNvbXBvbmVudHM6XHJcbiAgICAgICAgICBjb250ZXh0ICYmIGNvbnRleHQuY29tcG9uZW50c1xyXG4gICAgICAgICAgICA/IFsuLi5jb250ZXh0LmNvbXBvbmVudHMsIGN1cnJlbnQubmFtZV1cclxuICAgICAgICAgICAgOiBbY3VycmVudC5uYW1lXVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgdmlzaXRCaXRtYXAoY3VycmVudDogU2tldGNoTVNMYXllciwgb3B0aW9uczogV2ViQ29kZUdlbk9wdGlvbnMpIHtcclxuICAgIGNvbnN0IGZpbGVOYW1lID0gdGhpcy5mb3JtYXRTZXJ2aWNlLm5vcm1hbGl6ZU5hbWUoY3VycmVudC5uYW1lKTtcclxuICAgIHRoaXMud2ViQ29udGV4dC5wdXQoY3VycmVudCwge1xyXG4gICAgICBhdHRyaWJ1dGVzOiBbXHJcbiAgICAgICAgLi4udGhpcy5nZW5lcmF0ZUNsYXNzQXR0cmlidXRlKGN1cnJlbnQpLFxyXG4gICAgICAgIGByb2xlPVwiJHtjdXJyZW50Ll9jbGFzc31cImAsXHJcbiAgICAgICAgYGFyaWEtbGFiZWw9XCIke2N1cnJlbnQubmFtZX1cImAsXHJcbiAgICAgICAgYHNyYz1cIi8ke29wdGlvbnMuYXNzZXREaXJ9LyR7ZmlsZU5hbWV9LnBuZ1wiYFxyXG4gICAgICBdXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdmlzaXRUZXh0KGN1cnJlbnQ6IFNrZXRjaE1TTGF5ZXIpIHtcclxuICAgIHRoaXMud2ViQ29udGV4dC5wdXQoY3VycmVudCwge1xyXG4gICAgICBhdHRyaWJ1dGVzOiB0aGlzLmdlbmVyYXRlQ2xhc3NBdHRyaWJ1dGUoY3VycmVudClcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB2aXNpdFNoYXBlKGN1cnJlbnQ6IFNrZXRjaE1TTGF5ZXIpIHtcclxuICAgIHRoaXMud2ViQ29udGV4dC5wdXQoY3VycmVudCwge1xyXG4gICAgICBhdHRyaWJ1dGVzOiB0aGlzLmdlbmVyYXRlQ2xhc3NBdHRyaWJ1dGUoY3VycmVudClcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZW5lcmF0ZUNsYXNzQXR0cmlidXRlKGN1cnJlbnQ6IFNrZXRjaE1TTGF5ZXIpIHtcclxuICAgIGlmICh0aGlzLmNzc0NvZGVHZW4uaWRlbnRpZnkoY3VycmVudCkpIHtcclxuICAgICAgY29uc3QgY2xhc3NOYW1lID0gdGhpcy5jc3NDb2RlR2VuLmNvbnRleHQoY3VycmVudCkuY2xhc3NOYW1lO1xyXG4gICAgICBpZiAoY2xhc3NOYW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIFtgY2xhc3M9XCIke2NsYXNzTmFtZX1cImBdO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gW107XHJcbiAgfVxyXG59XHJcbiJdfQ==