export interface IInput {
    label: string;
    value: string;
    placeholder: string;
    editable: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
