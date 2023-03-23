import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface DotState {
    base: number,
    mouseDown: boolean,
    mouseupLocation: number,
    mouseDownSource: number,
    InnerCirclesList: number[],
    ColumnCollection: number[],
}

const initialState: DotState = {
    base: 2,
    mouseDown: false,
    mouseupLocation: -1,
    mouseDownSource: -1,
    InnerCirclesList: [0, 0, 0],
    ColumnCollection: [0, 1, 2]
}

export const DotSlice = createSlice({
    name: 'allState',
    initialState,
    reducers: {
        mouseDownOnTheToken: (state, action: PayloadAction<number>) => {
            state.mouseDown = true;
            state.mouseDownSource = action.payload;
        },
        mouseUpOnColumn: (state, action: PayloadAction<number>) => {
            state.mouseDown = false;
            state.mouseupLocation = action.payload;
            let goingToLower = false;
            //somthingsss
            let decider = state.mouseupLocation - state.mouseDownSource;
            if (decider < 0) {
                decider *= -1
                goingToLower = true;
            }
            const numberOfTokenRequired = state.base ** (decider)


            if (!goingToLower) {
                if (state.InnerCirclesList[state.mouseDownSource] >= numberOfTokenRequired) {
                    state.InnerCirclesList[state.mouseDownSource] -= numberOfTokenRequired;
                    state.InnerCirclesList[state.mouseupLocation] += 1;
                }
            } else {
                state.InnerCirclesList[state.mouseDownSource] -= 1;
                state.InnerCirclesList[state.mouseupLocation] += numberOfTokenRequired;
            }

            state.mouseupLocation = -1;
            state.mouseDownSource = -1;

        },
        addTokenInColumn: (state, action: PayloadAction<number>) => {
            state.mouseDown = true;
            state.InnerCirclesList[action.payload] += 1;
        },
        removeTokenInColumn: (state, action: PayloadAction<number>) => {
            state.mouseDown = true;
            if (state.InnerCirclesList[action.payload] == 0) {
                return;
            }
            state.InnerCirclesList[action.payload] -= 1;
        },

    },
})

// Action creators are generated for each case reducer function
export const { mouseDownOnTheToken, mouseUpOnColumn, addTokenInColumn, removeTokenInColumn } = DotSlice.actions

export default DotSlice.reducer;