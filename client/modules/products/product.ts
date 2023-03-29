import axios from "axios";

export const getProductsCount = async () => {
    try {
        const res = await axios.get(`/api/products/count`, { withCredentials: true });
        return res.data;
    } catch (err) {
        return console.log(err);
    }
}

export const getProducts = async (page: number, pageSize: number, sort: string = 'id', order: string = 'ASC', query: any = {}) => {
    
    try {
        const offset = (page - 1) * pageSize;
        const res = await axios.get("/api/products", { params: {...query, limit: pageSize, offset, sort, order}, withCredentials: true});
        
        if (res.status >= 200 && res.status < 300)
            return res.data;   
    } catch (error) {
        console.log(error);
    }

    return [];
}

export const deleteProduct = async (id: number) => {
    try {
        await axios.delete(`/api/products/${id}`, { withCredentials: true });
        return alert('Элемент удален');
    } catch {
        return alert('Ошибка удаления');
    }
}