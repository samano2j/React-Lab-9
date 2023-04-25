//action type
export const UPDATE_MOOD = "UPDATE_MOOD";

//action creator
export const updateMood = (payload) => {
    return {
        type: UPDATE_MOOD,
        payload,
    };
}

export const MOODS = {
    SAD: "sad",
    HAPPY: "happy",
    SHOCKED: "shocked",
    BLISSFULL: "blissfull",
    EXCITED: "excited",
    KO: "ko",
    LOVESTRUCK: "lovestruck",
}

//initial state
const INITIAL_STATE = { mood: MOODS.SAD };

//reducer
export const moodReducer = (state = INITIAL_STATE, action) => {
    console.log(action)
    switch (action.type) {
        case UPDATE_MOOD:
            return { ...state, mood: action.payload }
        default:
            return state;
    }
}