/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class WebAggregatorService {
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
/** @nocollapse */ WebAggregatorService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function WebAggregatorService_Factory() { return new WebAggregatorService(i0.ɵɵinject(i1.TextService), i0.ɵɵinject(i1.SymbolService), i0.ɵɵinject(i1.ImageService), i0.ɵɵinject(i1.FormatService), i0.ɵɵinject(i1.LayerService), i0.ɵɵinject(i2.WebContextService), i0.ɵɵinject(i3.CssCodeGenService), i0.ɵɵinject(i4.SvgCodeGenService)); }, token: WebAggregatorService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViLWFnZ3JlZ2F0b3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B4bGF5ZXJzL3dlYi1jb2RlZ2VuLyIsInNvdXJjZXMiOlsibGliL3dlYi1hZ2dyZWdhdG9yLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUNMLGFBQWEsRUFDYixhQUFhLEVBQ2IsWUFBWSxFQUNaLFlBQVksRUFDWixXQUFXLEVBQ1osTUFBTSxxQkFBcUIsQ0FBQztBQUM3QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUUxRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7Ozs7O0FBS3pELE1BQU0sT0FBTyxvQkFBb0I7Ozs7Ozs7Ozs7O0lBQy9CLFlBQ21CLFdBQXdCLEVBQ3hCLGFBQTRCLEVBQzVCLFlBQTBCLEVBQzFCLGFBQTRCLEVBQzVCLFlBQTBCLEVBQzFCLFVBQTZCLEVBQzdCLFVBQTZCLEVBQzdCLFVBQTZCO1FBUDdCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLGVBQVUsR0FBVixVQUFVLENBQW1CO1FBQzdCLGVBQVUsR0FBVixVQUFVLENBQW1CO1FBQzdCLGVBQVUsR0FBVixVQUFVLENBQW1CO0lBQzVDLENBQUM7Ozs7OztJQUVMLFNBQVMsQ0FBQyxPQUFzQixFQUFFLE9BQTBCOztjQUNwRCxRQUFRLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztRQUMvRCxPQUFP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O1lBRWIsWUFBWTtZQUlMLGlCQUFpQjtZQUVqQixpQkFBaUI7WUFDakIsaUJBQWlCOzs7Ozs7OztJQU90QiwyQ0FBeUM7Ozs7O0lBQ3pDLDZDQUE2Qzs7Ozs7SUFDN0MsNENBQTJDOzs7OztJQUMzQyw2Q0FBNkM7Ozs7O0lBQzdDLDRDQUEyQzs7Ozs7SUFDM0MsMENBQThDOzs7OztJQUM5QywwQ0FBOEM7Ozs7O0lBQzlDLDBDQUE4QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtcclxuICBGb3JtYXRTZXJ2aWNlLFxyXG4gIFN5bWJvbFNlcnZpY2UsXHJcbiAgTGF5ZXJTZXJ2aWNlLFxyXG4gIEltYWdlU2VydmljZSxcclxuICBUZXh0U2VydmljZVxyXG59IGZyb20gJ0B4bGF5ZXJzL3NrZXRjaC1saWInO1xyXG5pbXBvcnQgeyBXZWJDb250ZXh0U2VydmljZSB9IGZyb20gJy4vd2ViLWNvbnRleHQuc2VydmljZSc7XHJcbmltcG9ydCB7IFdlYkNvZGVHZW5PcHRpb25zIH0gZnJvbSAnLi93ZWItY29kZWdlbic7XHJcbmltcG9ydCB7IENzc0NvZGVHZW5TZXJ2aWNlIH0gZnJvbSAnQHhsYXllcnMvY3NzLWNvZGVnZW4nO1xyXG5pbXBvcnQgeyBTdmdDb2RlR2VuU2VydmljZSB9IGZyb20gJ0B4bGF5ZXJzL3N2Zy1jb2RlZ2VuJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFdlYkFnZ3JlZ2F0b3JTZXJ2aWNlIHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgdGV4dFNlcnZpY2U6IFRleHRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBzeW1ib2xTZXJ2aWNlOiBTeW1ib2xTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBpbWFnZVNlcnZpY2U6IEltYWdlU2VydmljZSxcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgZm9ybWF0U2VydmljZTogRm9ybWF0U2VydmljZSxcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgbGF5ZXJTZXJ2aWNlOiBMYXllclNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHdlYkNvbnRleHQ6IFdlYkNvbnRleHRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBjc3NDb2RlR2VuOiBDc3NDb2RlR2VuU2VydmljZSxcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgc3ZnQ29kZUdlbjogU3ZnQ29kZUdlblNlcnZpY2VcclxuICApIHsgfVxyXG5cclxuICBhZ2dyZWdhdGUoY3VycmVudDogU2tldGNoTVNMYXllciwgb3B0aW9uczogV2ViQ29kZUdlbk9wdGlvbnMpIHtcclxuICAgIGNvbnN0IGZpbGVOYW1lID0gdGhpcy5mb3JtYXRTZXJ2aWNlLm5vcm1hbGl6ZU5hbWUoY3VycmVudC5uYW1lKTtcclxuICAgIHJldHVybiBbXHJcbiAgICAgIHtcclxuICAgICAgICBraW5kOiAnd2ViJyxcclxuICAgICAgICB2YWx1ZTogdGhpcy5yZW5kZXJDb21wb25lbnQoY3VycmVudCwgb3B0aW9ucyksXHJcbiAgICAgICAgbGFuZ3VhZ2U6ICdodG1sJyxcclxuICAgICAgICB1cmk6IGAke29wdGlvbnMuY29tcG9uZW50RGlyfS8ke2ZpbGVOYW1lfS5odG1sYFxyXG4gICAgICB9LFxyXG4gICAgICAuLi50aGlzLmNzc0NvZGVHZW4uYWdncmVnYXRlKGN1cnJlbnQsIG9wdGlvbnMpLm1hcChmaWxlID0+ICh7XHJcbiAgICAgICAgLi4uZmlsZSxcclxuICAgICAgICBraW5kOiAnd2ViJ1xyXG4gICAgICB9KSlcclxuICAgIF07XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlbmRlckNvbXBvbmVudChjdXJyZW50OiBTa2V0Y2hNU0xheWVyLCBvcHRpb25zOiBXZWJDb2RlR2VuT3B0aW9ucykge1xyXG4gICAgY29uc3QgdGVtcGxhdGUgPSBbXTtcclxuXHJcbiAgICBpZiAoY3VycmVudC5fY2xhc3MgPT09ICdwYWdlJykge1xyXG4gICAgICB0aGlzLndhbGsoY3VycmVudCwgdGVtcGxhdGUsIDAsIG9wdGlvbnMpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy52aXNpdChjdXJyZW50LCB0ZW1wbGF0ZSwgMCwgb3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRlbXBsYXRlLmpvaW4oJ1xcbicpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB3YWxrKFxyXG4gICAgY3VycmVudDogU2tldGNoTVNMYXllcixcclxuICAgIHRlbXBsYXRlOiBzdHJpbmdbXSxcclxuICAgIGluZGVudDogbnVtYmVyLFxyXG4gICAgb3B0aW9uczogV2ViQ29kZUdlbk9wdGlvbnNcclxuICApIHtcclxuICAgIGlmICh0aGlzLmxheWVyU2VydmljZS5pZGVudGlmeShjdXJyZW50KSkge1xyXG4gICAgICBjdXJyZW50LmxheWVycy5mb3JFYWNoKGxheWVyID0+IHtcclxuICAgICAgICB0aGlzLnZpc2l0KGxheWVyLCB0ZW1wbGF0ZSwgaW5kZW50LCBvcHRpb25zKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHZpc2l0KFxyXG4gICAgY3VycmVudDogU2tldGNoTVNMYXllcixcclxuICAgIHRlbXBsYXRlOiBzdHJpbmdbXSxcclxuICAgIGluZGVudDogbnVtYmVyLFxyXG4gICAgb3B0aW9uczogV2ViQ29kZUdlbk9wdGlvbnNcclxuICApIHtcclxuICAgIGlmICh0aGlzLnN5bWJvbFNlcnZpY2UuaWRlbnRpZnkoY3VycmVudCkpIHtcclxuICAgICAgdGhpcy52aXNpdFN5bWJvbChjdXJyZW50LCB0ZW1wbGF0ZSwgaW5kZW50LCBvcHRpb25zKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5pbWFnZVNlcnZpY2UuaWRlbnRpZnkoY3VycmVudCkpIHtcclxuICAgICAgdGhpcy52aXNpdEJpdG1hcChjdXJyZW50LCB0ZW1wbGF0ZSwgaW5kZW50LCBvcHRpb25zKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy50ZXh0U2VydmljZS5pZGVudGlmeShjdXJyZW50KSkge1xyXG4gICAgICB0aGlzLnZpc2l0VGV4dChjdXJyZW50LCB0ZW1wbGF0ZSwgaW5kZW50LCBvcHRpb25zKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5zdmdDb2RlR2VuLmlkZW50aWZ5KGN1cnJlbnQpKSB7XHJcbiAgICAgIHRoaXMudmlzaXRTaGFwZShjdXJyZW50LCB0ZW1wbGF0ZSwgaW5kZW50LCBvcHRpb25zKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy53ZWJDb250ZXh0LmlkZW50aWZ5KGN1cnJlbnQpKSB7XHJcbiAgICAgIHRoaXMudmlzaXRMYXllcihjdXJyZW50LCB0ZW1wbGF0ZSwgaW5kZW50LCBvcHRpb25zKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgdmlzaXRMYXllcihcclxuICAgIGN1cnJlbnQ6IFNrZXRjaE1TTGF5ZXIsXHJcbiAgICB0ZW1wbGF0ZTogc3RyaW5nW10sXHJcbiAgICBpbmRlbnQ6IG51bWJlcixcclxuICAgIG9wdGlvbnM6IFdlYkNvZGVHZW5PcHRpb25zXHJcbiAgKSB7XHJcbiAgICBjb25zdCBvcGVuVGFnID0gdGhpcy5yZW5kZXJBdHRyaWJ1dGVUYWcoXHJcbiAgICAgIGN1cnJlbnQsXHJcbiAgICAgIG9wdGlvbnMuYmxvY2tUYWdOYW1lLFxyXG4gICAgICBvcHRpb25zXHJcbiAgICApO1xyXG4gICAgY29uc3QgY2xvc2VUYWcgPSBgPC8ke29wdGlvbnMuYmxvY2tUYWdOYW1lfT5gO1xyXG5cclxuICAgIHRlbXBsYXRlLnB1c2godGhpcy5mb3JtYXRTZXJ2aWNlLmluZGVudChpbmRlbnQsIG9wZW5UYWcpKTtcclxuICAgIHRoaXMud2FsayhjdXJyZW50LCB0ZW1wbGF0ZSwgaW5kZW50ICsgMSwgb3B0aW9ucyk7XHJcbiAgICB0ZW1wbGF0ZS5wdXNoKHRoaXMuZm9ybWF0U2VydmljZS5pbmRlbnQoaW5kZW50LCBjbG9zZVRhZykpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB2aXNpdFN5bWJvbChcclxuICAgIGN1cnJlbnQ6IFNrZXRjaE1TTGF5ZXIsXHJcbiAgICB0ZW1wbGF0ZTogc3RyaW5nW10sXHJcbiAgICBpbmRlbnQ6IG51bWJlcixcclxuICAgIG9wdGlvbnM6IFdlYkNvZGVHZW5PcHRpb25zXHJcbiAgKSB7XHJcbiAgICBjb25zdCBjb250ZXh0ID0gdGhpcy53ZWJDb250ZXh0Lm9mKGN1cnJlbnQpO1xyXG4gICAgaWYgKGNvbnRleHQgJiYgY29udGV4dC5jb21wb25lbnRzICYmIGNvbnRleHQuY29tcG9uZW50cy5sZW5naHQgPiAxKSB7XHJcbiAgICAgIGNvbnN0IHRhZ05hbWUgPSBvcHRpb25zLmpzeFxyXG4gICAgICAgID8gdGhpcy5mb3JtYXRTZXJ2aWNlLmNsYXNzTmFtZShjdXJyZW50Lm5hbWUpXHJcbiAgICAgICAgOiBgJHtvcHRpb25zLnhtbFByZWZpeH0ke3RoaXMuZm9ybWF0U2VydmljZS5ub3JtYWxpemVOYW1lKFxyXG4gICAgICAgICAgY3VycmVudC5uYW1lXHJcbiAgICAgICAgKX1gO1xyXG4gICAgICB0ZW1wbGF0ZS5wdXNoKFxyXG4gICAgICAgIHRoaXMuZm9ybWF0U2VydmljZS5pbmRlbnQoaW5kZW50LCBgPCR7dGFnTmFtZX0+PC8ke3RhZ05hbWV9PmApXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHZpc2l0Qml0bWFwKFxyXG4gICAgY3VycmVudDogU2tldGNoTVNMYXllcixcclxuICAgIHRlbXBsYXRlOiBzdHJpbmdbXSxcclxuICAgIGluZGVudDogbnVtYmVyLFxyXG4gICAgb3B0aW9uczogV2ViQ29kZUdlbk9wdGlvbnNcclxuICApIHtcclxuICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSB0aGlzLndlYkNvbnRleHQub2YoY3VycmVudCkuYXR0cmlidXRlcztcclxuICAgIHRlbXBsYXRlLnB1c2goXHJcbiAgICAgIHRoaXMuZm9ybWF0U2VydmljZS5pbmRlbnQoXHJcbiAgICAgICAgaW5kZW50LFxyXG4gICAgICAgIFtgPCR7b3B0aW9ucy5iaXRtYXBUYWdOYW1lfWAsIC4uLmF0dHJpYnV0ZXNdLmpvaW4oJyAnKSArICcgLz4nXHJcbiAgICAgIClcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHZpc2l0VGV4dChcclxuICAgIGN1cnJlbnQ6IFNrZXRjaE1TTGF5ZXIsXHJcbiAgICB0ZW1wbGF0ZTogc3RyaW5nW10sXHJcbiAgICBpbmRlbnQ6IG51bWJlcixcclxuICAgIG9wdGlvbnM6IFdlYkNvZGVHZW5PcHRpb25zXHJcbiAgKSB7XHJcbiAgICB0ZW1wbGF0ZS5wdXNoKFxyXG4gICAgICB0aGlzLmZvcm1hdFNlcnZpY2UuaW5kZW50KFxyXG4gICAgICAgIGluZGVudCxcclxuICAgICAgICBbXHJcbiAgICAgICAgICB0aGlzLnJlbmRlckF0dHJpYnV0ZVRhZyhjdXJyZW50LCBvcHRpb25zLnRleHRUYWdOYW1lLCBvcHRpb25zKSxcclxuICAgICAgICAgIHRoaXMudGV4dFNlcnZpY2UubG9va3VwKGN1cnJlbnQpLFxyXG4gICAgICAgICAgYDwvJHtvcHRpb25zLnRleHRUYWdOYW1lfT5gXHJcbiAgICAgICAgXS5qb2luKCcnKVxyXG4gICAgICApXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB2aXNpdFNoYXBlKFxyXG4gICAgY3VycmVudDogU2tldGNoTVNMYXllcixcclxuICAgIHRlbXBsYXRlOiBzdHJpbmdbXSxcclxuICAgIGluZGVudDogbnVtYmVyLFxyXG4gICAgb3B0aW9uczogV2ViQ29kZUdlbk9wdGlvbnNcclxuICApIHtcclxuICAgIHRlbXBsYXRlLnB1c2goXHJcbiAgICAgIHRoaXMuZm9ybWF0U2VydmljZS5pbmRlbnQoXHJcbiAgICAgICAgaW5kZW50LFxyXG4gICAgICAgIHRoaXMucmVuZGVyQXR0cmlidXRlVGFnKGN1cnJlbnQsIG9wdGlvbnMuYmxvY2tUYWdOYW1lLCBvcHRpb25zKVxyXG4gICAgICApXHJcbiAgICApO1xyXG4gICAgdGVtcGxhdGUucHVzaChcclxuICAgICAgdGhpcy5zdmdDb2RlR2VuXHJcbiAgICAgICAgLmFnZ3JlZ2F0ZShjdXJyZW50LCB7IHhtbE5hbWVzcGFjZTogZmFsc2UgfSlcclxuICAgICAgICAubWFwKGZpbGUgPT5cclxuICAgICAgICAgIGZpbGUudmFsdWVcclxuICAgICAgICAgICAgLnNwbGl0KCdcXG4nKVxyXG4gICAgICAgICAgICAubWFwKGxpbmUgPT4gdGhpcy5mb3JtYXRTZXJ2aWNlLmluZGVudChpbmRlbnQgKyAxLCBsaW5lKSlcclxuICAgICAgICAgICAgLmpvaW4oJ1xcbicpXHJcbiAgICAgICAgKVxyXG4gICAgICAgIC5qb2luKCdcXG4nKVxyXG4gICAgKTtcclxuICAgIHRlbXBsYXRlLnB1c2goXHJcbiAgICAgIHRoaXMuZm9ybWF0U2VydmljZS5pbmRlbnQoaW5kZW50LCBgPC8ke29wdGlvbnMuYmxvY2tUYWdOYW1lfT5gKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmVuZGVyQXR0cmlidXRlVGFnKFxyXG4gICAgY3VycmVudDogU2tldGNoTVNMYXllcixcclxuICAgIHRhZ05hbWU6IHN0cmluZyxcclxuICAgIG9wdGlvbnM6IFdlYkNvZGVHZW5PcHRpb25zXHJcbiAgKSB7XHJcbiAgICBjb25zdCBhdHRyaWJ1dGVzID0gdGhpcy53ZWJDb250ZXh0Lm9mKGN1cnJlbnQpLmF0dHJpYnV0ZXM7XHJcbiAgICBpZiAob3B0aW9ucy5qc3gpIHtcclxuICAgICAgY29uc3QgYXR0cmlidXRJbmRleCA9IGF0dHJpYnV0ZXMuZmluZEluZGV4KGF0dHJpYnV0ZSA9PlxyXG4gICAgICAgIGF0dHJpYnV0ZS5zdGFydHNXaXRoKCdjbGFzcz0nKVxyXG4gICAgICApO1xyXG4gICAgICBpZiAoYXR0cmlidXRJbmRleCA+IDApIHtcclxuICAgICAgICBhdHRyaWJ1dGVzW2F0dHJpYnV0SW5kZXhdID0gYXR0cmlidXRlc1thdHRyaWJ1dEluZGV4XS5yZXBsYWNlKFxyXG4gICAgICAgICAgJ2NsYXNzPScsXHJcbiAgICAgICAgICAnY2xhc3NOYW1lPSdcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gW2A8JHt0YWdOYW1lfWAsIC4uLmF0dHJpYnV0ZXNdLmpvaW4oJyAnKSArICc+JztcclxuICB9XHJcbn1cclxuIl19