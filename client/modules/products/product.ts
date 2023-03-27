import axios from "axios";
import { useRouter } from "next/router";

export const getProductsCount = () => {
    return axios.get(`/api/products/count`, {withCredentials: true})
        .then(res => res.data)
        .catch((err) => console.log(err));
}

export const getProducts = async (page: number, pageSize: number, sort: string = 'id', order: string = 'ASC', query: any = {}) => {
    
    try {
        const offset = (page - 1) * pageSize;
    console.log(query);
        const res = await axios.get("/api/products", { params: {...query, limit: pageSize, offset, sort, order}, withCredentials: true});
        
        if (res.status >= 200 && res.status < 300)
            return res.data;   
    } catch (error) {
        console.log(error);
    }

    return [];
}

export const deleteProduct = (id: number) => {
    return axios.delete(`/api/products/${id}`, {withCredentials: true})
        .then(() => alert('Элемент удален'))
        .catch(() => alert('Ошибка удаления'))
}