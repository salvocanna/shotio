// ------------------------------------
// Constants
// ------------------------------------
export const BUTTON_CLICKED = 'BUTTON_CLICKED'

// ------------------------------------
// Actions
// ------------------------------------
export function buttonClicked() {
  return {
    type    : BUTTON_CLICKED
  }
}

// // ------------------------------------
// // Specialized Action Creator
// // ------------------------------------
// export const updateLocation = ({ dispatch }) => {
//   return (nextLocation) => dispatch(locationChange(nextLocation))
//}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {clicked: false}
export default function mainReducer(state = initialState, action) {
    switch (action.type) {
        case BUTTON_CLICKED:
            return Object.assign({}, state, {
                clicked: !state.clicked
            });
        default:
            return state;
    }
}
