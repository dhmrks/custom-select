import { FC, useCallback, useEffect, useReducer, useRef } from 'react'

import clsx from 'clsx'

import './sass/select.scss'
import selectReducer from './selectReducer'
import { actionTypes, SelectProps, SelectOption } from './SelectTypes'

const initialState = {
    isOpen: false,
    highlightedIndex: 0
}

const Select: FC<SelectProps> = ({ multiple, options, value, onChange }) => {
    const [state, dispatch] = useReducer(selectReducer, initialState)
    const { isOpen, highlightedIndex } = state

    const containerRef = useRef<HTMLDivElement>(null)

    const selectedOptions = () => {
        if (multiple) {
            const selectedOptions = value.map(v => (
                <button 
                    key={v.value} 
                    className="badge"
                    onClick={(e) => { 
                        e.stopPropagation()
                        handleSelectedOption(v) 
                    }} 
                >
                    {v.label}
                    <span className="remove">&times;</span>
                </button>
            ))

            return selectedOptions
        }

        return value?.label
    }

    const isOptionSelected = (option: SelectOption) => multiple ? value.includes(option) : option.value === value?.value

    const handleSelectedOption = useCallback((option: SelectOption) => {
        if (multiple) {
            const updatedValue = value.includes(option)
                ? value.filter((v) => v.value !== option.value)
                : [...value, option]

            onChange(updatedValue)
            return
        }
        
        option !== value && onChange(option)
    }, [multiple, value, onChange])

    const onClearOptions = () => multiple ? onChange([]) : onChange(undefined)

    useEffect(() => {
        if (isOpen) dispatch({ type: actionTypes.HIGHLIGHT_OPTION, payload: 0 })
    }, [isOpen])

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.target != containerRef.current) return

            switch (e.code) {
                case "Enter":
                case "Space":
                    dispatch({ type: actionTypes.TOGGLE_MENU })
                    if (isOpen) handleSelectedOption(options[highlightedIndex])
                    break
                case "ArrowUp":
                case "ArrowDown": {
                    if (!isOpen) {
                        dispatch({ type: actionTypes.OPEN_MENU })
                        break
                    }

                    const newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1)
                    if (newValue >= 0 && newValue < options.length) {
                        dispatch({ type: actionTypes.HIGHLIGHT_OPTION, payload: newValue })
                    }
                    break
                }
                case "Escape":
                    dispatch({ type: actionTypes.CLOSE_MENU })
                    break
            }
        }

        containerRef.current?.addEventListener("keydown", handler)
    
        return () => containerRef.current?.removeEventListener("keydown", handler)

    }, [isOpen, highlightedIndex, options, handleSelectedOption])

    return (
        <div 
            tabIndex={0}
            ref={containerRef}
            className="container"
            onBlur={() => dispatch({ type: actionTypes.CLOSE_MENU }) }
            onClick={() => dispatch({ type: actionTypes.TOGGLE_MENU }) }
        >
            
            <span className="value">{selectedOptions()}</span>

            <button 
                className="clear" 
                onClick={(e) => {
                    e.stopPropagation()
                    onClearOptions()
                }}
            >
                &times;
            </button>
            <div className="divider" />
            <div className="caret" />    

            {options.length > 0 && <ul className={clsx('options', { 'show': isOpen })}>
                {options.map((o, i) => 
                    <li 
                        key={o.value} 
                        value={o.value}
                        className={clsx(
                            "option", 
                            { "selected": isOptionSelected(o) },
                            { "highlighted": highlightedIndex === i }
                        )}
                        onMouseEnter={() => dispatch({ type: actionTypes.HIGHLIGHT_OPTION, payload: i }) }
                        onClick={(e) => { 
                            e.stopPropagation()
                            handleSelectedOption(o)
                            dispatch({ type: actionTypes.CLOSE_MENU })
                        }}>
                        {o.label}
                    </li>
                )}
            </ul>}

        </div>
    )
}

export default Select