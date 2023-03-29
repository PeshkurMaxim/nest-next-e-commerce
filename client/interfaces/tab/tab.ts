import { VariableTypes, VariableTypesToComponent } from "../variableTypes/variableTypes";

export interface Tab<T> {
    title: string,
    items: {
        name: keyof T,
        title: string,
        type: VariableTypes,
        component?: JSX.Element,
    }[]
}