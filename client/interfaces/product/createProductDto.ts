import { SeoShopBaseDto } from "../seoShopBase";

export interface createProductDto extends SeoShopBaseDto {
    categoriesIds: number[] | null
}