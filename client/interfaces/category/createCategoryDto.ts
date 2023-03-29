import { SeoShopBase, SeoShopBaseDto } from "../seoShopBase";
import { Category } from "./category";

export interface createCategoryDto extends SeoShopBaseDto {
    parent: number | null,
}