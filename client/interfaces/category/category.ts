import { SeoShopBase } from "../seoShopBase";

export interface Category extends SeoShopBase {
    parent: number | null
}