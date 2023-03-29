import { Category } from "@/interfaces/category/category";
import axios from "axios";

interface CategoryTree extends Category {
    children?: CategoryTree[]
}

export const getCategoriesCount = async () => {
    try {
        const res = await axios.get(`/api/categories/count`, { withCredentials: true });
        return res.data;
    } catch (err) {
        return console.log(err);
    }
}

export const getCategories = async (page: number, pageSize: number, sort: string = 'id', order: string = 'ASC', query: any = {}) => {
    
    try {
        const offset = (page - 1) * pageSize;
        const res = await axios.get("/api/categories", { params: {...query, limit: pageSize, offset, sort, order}, withCredentials: true});
        
        if (res.status >= 200 && res.status < 300)
            return res.data;   
    } catch (error) {
        console.log(error);
    }

    return [];
}

export const deleteCategory = async (id: number) => {
    try {
        await axios.delete(`/api/categories/${id}`, { withCredentials: true });
        return alert('Элемент удален');
    } catch {
        return alert('Ошибка удаления');
    }
}


export const createTreeData = (
    categories: CategoryTree[], 
    string = '', 
    resultArray: {
        value: number;
        label: string;
    }[] = []
) => {
    const localString = string;
    categories.map( category => {
        if (category.children) {
            string += category.name;
            resultArray.push({ value: category.id, label: string});
            string += ' > ';
            createTreeData(category.children, string, resultArray)
        } else {
            string += category.name;
            resultArray.push({ value: category.id, label: string});
        }
        string = localString;
    });

    return resultArray;
};

export const makeTree = (arr: Category[]) => {
    const hashTable = Object.create(null);
    arr.forEach(obj => hashTable[obj.id] = {...obj, children: []});
  
    const tree:CategoryTree[] = [];
    arr.forEach(obj => {
      if (obj.parent) {
        hashTable[obj.parent].children.push(hashTable[obj.id]);
      } else {
        tree.push(hashTable[obj.id]);
      }
    });
  
    return tree;
}

export const createOptionsFromArray = (categories: Category[]) => {
    const categoriesTree = makeTree(categories);    
    const categoriesForSelect = createTreeData(categoriesTree);
    return categoriesForSelect;
} 