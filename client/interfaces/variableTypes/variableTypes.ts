import DateTimeInput from "@/components/inputs/datetime/datetime";
import Editor from "@/components/inputs/editor/editor";
import TextInput from "@/components/inputs/text/textInput";

export enum VariableTypes {
    STRING = 'STRING',
    DATETIME = 'DATETIME',
    EDITOR = 'EDITOR',
    FILE = 'FILE',
}
export const VariableTypesToComponent = {
    STRING: TextInput,
    DATETIME: DateTimeInput,
    EDITOR: Editor,
    FILE: '',
}