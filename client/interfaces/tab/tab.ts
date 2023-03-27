import { VariableTypes } from "../variableTypes/variableTypes";

export interface Tab<T> {
    title: string,
    items: {
        name: keyof T,
        title: string,
        type: VariableTypes,
    }[]
}