export default function ReadonlyDatetime({ value }: { value: string }) {
    return (
        <span>{new Date(value).toLocaleString()}</span>
    );
}