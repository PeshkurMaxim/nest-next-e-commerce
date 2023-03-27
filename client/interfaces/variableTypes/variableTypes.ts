import DateTimeInput from "@/components/inputs/datetime/datetime";
import Editor from "@/components/inputs/editor/editor";
import ReadonlyDatetime from "@/components/inputs/readonly/datetimeReadonly";
import Readonly from "@/components/inputs/readonly/readonly";
import TextInput from "@/components/inputs/text/textInput";

export enum VariableTypes {
    STRING = 'STRING',
    DATETIME = 'DATETIME',
    EDITOR = 'EDITOR',
    READONLY = 'READONLY',
    READONLYDATETIME = 'READONLYDATETIME',
    FILE = 'FILE',
}
export const VariableTypesToComponent = {
    STRING: TextInput,
    DATETIME: DateTimeInput,
    EDITOR: Editor,
    READONLY: Readonly,
    READONLYDATETIME: ReadonlyDatetime,
    FILE: '',
}