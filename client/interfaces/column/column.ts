import { VariableTypes } from "../variableTypes/variableTypes";

export interface Column<T> {
    key: keyof T,
    title: string,
    type: VariableTypes
}