"use strict";

/* type guards */
export const isNull = (elem: any): elem is null => (null === elem);
export const isElement = (elem: any): elem is HTMLElement => (elem instanceof HTMLElement);
export const isHTMLListElement = (elem: any): elem is HTMLLIElement => (elem instanceof HTMLLIElement);
export const isHTMLAnchorElement = (elem: any): elem is HTMLAnchorElement => (elem instanceof HTMLAnchorElement);
export const isHTMLDivElement = (elem: any): elem is HTMLDivElement => (elem instanceof HTMLDivElement);
export const isHTMLImageElement = (elem: any): elem is HTMLImageElement => (elem instanceof HTMLImageElement);
export const isHTMLSpanElement = (elem: any): elem is HTMLSpanElement => (elem instanceof HTMLSpanElement);
export const isHTMLFrameElement = (elem: any): elem is HTMLFrameElement => (elem instanceof HTMLFrameElement);