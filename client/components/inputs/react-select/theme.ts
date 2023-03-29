import { Theme } from "react-select";

export const theme = (theme: Theme) => ({
    ...theme,
    borderRadius: 5,
    colors: {
        ...theme.colors,
        primary25: '#ddd',
        primary: 'var(--main-color)',
        primary50: '#ddd',
    },
})