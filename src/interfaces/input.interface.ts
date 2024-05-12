export interface IInput {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder: string;
    editable: boolean;
}
