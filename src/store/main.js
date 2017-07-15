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
const initialState = {benchmark: {}};
export default function mainReducer(state = initialState, action) {
    switch (action.type) {
        case actions.MAKE_SCREENSHOT_RESULT:
            const newState = Object.assign({}, state);
            if (typeof newState.benchmark[action.id] === 'undefined') {
                newState.benchmark[action.id] = {
                    requestId: action.id, // useless
                    events: [],
                    screenshot: null
                };
            }

            if (action.eventType === 'Event') {
                newState.benchmark[action.id].events.push(action.data);
            } else if (action.eventType === 'Screenshot') {
                newState.benchmark[action.id].screenshot = action.data;
            }

            return newState;
            //return {...state, screenshotData: action.data};
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
