// ------------------------------------
// Constants
// ------------------------------------
const MAKE_SCREENSHOT = 'MAKE_SCREENSHOT'
const MAKE_SCREENSHOT_RESULT = 'MAKE_SCREENSHOT_RESULT'

// ------------------------------------
// Actions
// ------------------------------------
export function makeScreenshot() {
    return {
        type: MAKE_SCREENSHOT
    }
}

// // ------------------------------------
// // Specialized Action Creator
// // ------------------------------------
// export const updateLocation = ({ dispatch }) => {
//   return (nextLocation) => dispatch(locationChange(nextLocation))
//}

export const actions = {
    MAKE_SCREENSHOT,
    MAKE_SCREENSHOT_RESULT,
}


// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {};
export default function mainReducer(state = initialState, action) {
    switch (action.type) {
        case actions.MAKE_SCREENSHOT_RESULT:
            return {...state, screenshotData: action.data};
            break;

        //
        // case MAKE_SCREENSHOT:
        //     return Object.assign({}, state, {
        //         screenshotData: null,
        //     });
        default:
            return state;
    }
}
