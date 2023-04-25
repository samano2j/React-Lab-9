import { createAction, createReducer } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

//action type
export const UPDATE_MOOD = "UPDATE_MOOD";
export const UPDATE_SIZE = "UPDATE_SIZE"
export const UPDATE_COLOR = "UPDATE_COLOR"

const URL = "https://gist.githubusercontent.com/andasan/4f4976c373654f73b0a465a2441c2c91/raw/1b3c99936426b59ba4a92c7afe12fc109e4dbdcd/moods.json"

export const getMoods = createAsyncThunk(
    "getMoods",
    async () => {
        const response = await axios.get(URL)
        return response.data.moods
    }
)

//action creator
export const updateMood = (payload) => {
    return {
        type: UPDATE_MOOD,
        payload,
    };
}

const updateCatMood = createAction(UPDATE_MOOD);
const updateCatSize = createAction(UPDATE_SIZE);
const updateCatColor = createAction(UPDATE_COLOR);

export const MOODS = {
    SAD: "sad",
    HAPPY: "happy",
    SHOCKED: "shocked",
    BLISSFUL: "blissful",
    EXCITED: "excited",
    KO: "ko",
    LOVESTRUCK: "lovestruck",
}

//initial state
const INITIAL_STATE = { mood: MOODS.EXCITED, size: 320, color: '#596881' };

export const moodReducer = createReducer(INITIAL_STATE, {
    [updateCatMood]: (state, action) =>
        ({ ...state, mood: action.payload }),
    [updateCatSize]: (state, action) => 
        {
            if(action.payload === '+') {
                return {...state, size: state.size + 10}
            }
            else {
                return {...state, size: state.size - 10}
            }
        },
    [updateCatColor]: (state, action) => 
        ({ ...state, color: action.payload }),
})

export const setColor = (color) => {
    return async (dispatch) => {
        batch(dispatch(updateCatColor(color)))
    }
}

export {
    updateCatMood,
    updateCatSize,
    updateCatColor
}