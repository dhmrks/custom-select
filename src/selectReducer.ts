import { actionTypes, SelectReducerAction, SelectReducerState} from './SelectTypes'

const selectReducer = (state: SelectReducerState, action: SelectReducerAction) => {

    switch (action.type) {
        case actionTypes.OPEN_MENU:
            return { ...state, isOpen: true };
        case actionTypes.CLOSE_MENU:
            return { ...state, isOpen: false };
        case actionTypes.TOGGLE_MENU:
            return { ...state, isOpen: !state.isOpen };
        case actionTypes.HIGHLIGHT_OPTION:
            return {...state, highlightedIndex: action.payload };
        default:
            return state;
    }
} 

export default selectReducer