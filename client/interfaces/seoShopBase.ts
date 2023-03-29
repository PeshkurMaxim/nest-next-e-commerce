import { ShopBase, ShopBaseDto } from "./shopBase";

export interface SeoShopBase extends ShopBase {
    path: string,
    h1: string,
    title: string,
    description: string,
    keywords: string,
}

export interface SeoShopBaseDto extends ShopBaseDto {
    path: string,
    h1: string,
    title: string,
    description: string,
    keywords: string,
}