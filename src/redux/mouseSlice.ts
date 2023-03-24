import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface MyCircleObj {
    parentId: number
}

export interface DotState {
    base: number,
    mouseDown: boolean,
    mouseupLocation: number,
    mouseDownSource: number,
    mouseDownCircle: number,
    InnerCirclesList: number[],
    ColumnCollection: number[],
    CircleListObject: MyCircleObj[]
}


const initialState: DotState = {
    base: 2,
    mouseDown: false,
    mouseupLocation: -1,
    mouseDownSource: -1,
    mouseDownCircle: -1,
    InnerCirclesList: [0, 0, 0, 0, 0],
    ColumnCollection: [0, 1, 2, 3, 4],
    CircleListObject: []
}

export const DotSlice = createSlice({
    name: 'allState',
    initialState,
    reducers: {
        mouseDownOnTheToken: (state, action: PayloadAction<number[]>) => {
            state.mouseDown = true;
            state.mouseDownSource = action.payload[0];
            state.mouseDownCircle = action.payload[0]
        },
        mouseUpOnColumn: (state, action: PayloadAction<number>) => {
            // console.log(action.payload)
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

                    state.CircleListObject.reverse()
                    for (let i = 0; i < numberOfTokenRequired; i++) {
                        const idx = state.CircleListObject.indexOf({ parentId: state.mouseDownSource })
                        state.CircleListObject.splice(idx, 1)
                    }
                    state.InnerCirclesList[state.mouseDownSource] -= numberOfTokenRequired;
                    state.InnerCirclesList[state.mouseupLocation] += 1;
                    state.CircleListObject.reverse()
                    state.CircleListObject.push({ parentId: state.mouseupLocation })
                }
            } else {

                state.CircleListObject.reverse()
                for (let i = 0; i < numberOfTokenRequired; i++) {
                    // const idx = state.CircleListObject.indexOf({ parentId: state.mouseupLocation })
                    state.CircleListObject.push({ parentId: state.mouseupLocation })
                }
                state.CircleListObject.reverse()
                const idx = state.CircleListObject.indexOf({ parentId: state.mouseDownSource })
                state.CircleListObject.splice(idx, 1)
                state.InnerCirclesList[state.mouseDownSource] -= 1;
                state.InnerCirclesList[state.mouseupLocation] += numberOfTokenRequired;
            }

            state.mouseupLocation = -1;
            state.mouseDownSource = -1;

        },
        addTokenInColumn: (state, action: PayloadAction<number>) => {
            state.mouseDown = true;
            state.InnerCirclesList[action.payload] += 1;
            state.CircleListObject.push({ parentId: action.payload })
        },
        removeTokenInColumn: (state, action: PayloadAction<number>) => {
            state.mouseDown = true;
            if (state.InnerCirclesList[action.payload] == 0) {
                return;
            }
            state.InnerCirclesList[action.payload] -= 1;
            state.CircleListObject.reverse()
            state.CircleListObject.splice(state.CircleListObject.indexOf({ parentId: action.payload }), 1)
            state.CircleListObject.reverse()
        },

    },
})

// Action creators are generated for each case reducer function
export const { mouseDownOnTheToken, mouseUpOnColumn, addTokenInColumn, removeTokenInColumn } = DotSlice.actions

export default DotSlice.reducer;