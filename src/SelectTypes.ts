type SelectOption = {
    label: string,
    value: number
}

type SingleSelectProps = {
    multiple?: false
    value?: SelectOption
    onChange: (value: SelectOption | undefined) => void
}

type MultiSelectProps = {
    multiple: true
    value: SelectOption[]
    onChange: (value: SelectOption[]) => void
}

type SelectProps = {
    options: SelectOption[],
    mainColor?: string
} & (SingleSelectProps | MultiSelectProps)

// Reducer state

type SelectReducerState = {
    isOpen: boolean,
    highlightedIndex: number
}

// Supported reducer actions

export enum actionTypes {
    OPEN_MENU,
    CLOSE_MENU,
    TOGGLE_MENU,
    HIGHLIGHT_OPTION
}

type SelectReducerAction =
  | { type: actionTypes.OPEN_MENU }
  | { type: actionTypes.CLOSE_MENU }
  | { type: actionTypes.TOGGLE_MENU }
  | { type: actionTypes.HIGHLIGHT_OPTION, payload: number };


export type {
    SelectProps,
    SelectOption,
    SelectReducerState,
    SelectReducerAction
}