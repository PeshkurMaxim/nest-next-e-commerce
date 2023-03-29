export interface ShopBase {
    id: number,
    name: string,
    active: boolean
    created_at: string,
    updated_at: string,
}

export interface ShopBaseDto {
    name: string,
    active: boolean
}