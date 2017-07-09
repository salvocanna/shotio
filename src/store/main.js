// ------------------------------------
// Constants
// ------------------------------------
const MAKE_SCREENSHOT = 'MAKE_SCREENSHOT'

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
    MAKE_SCREENSHOT
}


// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}
export default async function mainReducer(state = initialState, action) {

    // if (typeof action.socket === 'function') {
    //     await action.socket(socket);
    // }

    switch (action.type) {
        case MAKE_SCREENSHOT:
            return Object.assign({}, state, {
                screenshotData: null,
            });
        default:
            return state;
    }
}
