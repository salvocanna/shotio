// ------------------------------------
// Constants
// ------------------------------------
const MAKE_SCREENSHOT = 'MAKE_SCREENSHOT'
const MAKE_SCREENSHOT_RESULT = 'MAKE_SCREENSHOT_RESULT'

// ------------------------------------
// Actions
// ------------------------------------
export function makeScreenshot(url) {
    return {
        type: MAKE_SCREENSHOT,
        url
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
const initialState = {
    events: [],
    screenshot: null,
};

export default function mainReducer(state = initialState, action) {
    switch (action.type) {
        case actions.MAKE_SCREENSHOT_RESULT:
            const newState = {...state};

            if (action.eventType === 'Event') {
                newState.events.push(action.data);
            } else if (action.eventType === 'Screenshot') {
                newState.screenshot = action.data;
            }

            return newState;
        default:
            return state;
    }
}
