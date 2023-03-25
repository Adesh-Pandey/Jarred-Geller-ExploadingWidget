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
    InnerCirclesList: [0, 0, 0],
    ColumnCollection: [0, 1, 2],
    CircleListObject: []
}

export const DotSlice = createSlice({
    name: 'allState',
    initialState,
    reducers: {
        resetCircles: (state, action: PayloadAction<number>) => {
            state.InnerCirclesList[action.payload] = 0;

        },
        removeColumn: (state) => {
            if (state.ColumnCollection.length == 1) {
                return;
            }
            state.ColumnCollection.splice(state.ColumnCollection.length - 1, 1);
            state.InnerCirclesList.splice(state.InnerCirclesList.length - 1, 1);
        },
        changeBase: (state, action: PayloadAction<number>) => {
            state.base = action.payload
        },
        addColumn: (state) => {
            state.ColumnCollection.push(state.ColumnCollection.length);
            state.InnerCirclesList.push(0);
        }
        ,
        mouseDownOnTheToken: (state, action: PayloadAction<number[]>) => {
            state.mouseDown = true;
            state.mouseDownSource = action.payload[0];
            state.mouseDownCircle = action.payload[1]
        },
        mouseUpOnColumn: (state, action: PayloadAction<number>) => {
            // console.log(action.payload)
            state.mouseDown = false;
            state.mouseupLocation = action.payload;

            if (state.mouseDownSource == action.payload) {
                state.mouseDownSource = -1;
                state.mouseupLocation = -1;
                return;
            }

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

                    // state.CircleListObject.reverse()
                    // for (let i = 0; i < numberOfTokenRequired; i++) {
                    //     const idx = state.CircleListObject.indexOf({ parentId: state.mouseDownSource })
                    //     state.CircleListObject.splice(idx, 1)
                    // }
                    state.InnerCirclesList[state.mouseDownSource] -= numberOfTokenRequired;
                    state.InnerCirclesList[state.mouseupLocation] += 1;
                    // state.CircleListObject.reverse()
                    // state.CircleListObject.push({ parentId: state.mouseupLocation })
                }
            } else {

                // state.CircleListObject.reverse()
                // for (let i = 0; i < numberOfTokenRequired; i++) {
                //     // const idx = state.CircleListObject.indexOf({ parentId: state.mouseupLocation })
                //     state.CircleListObject.push({ parentId: state.mouseupLocation })
                // }

                // const idx = state.CircleListObject.indexOf({ parentId: state.mouseDownSource })
                // state.CircleListObject.splice(idx, 1)
                // state.CircleListObject.reverse()
                state.InnerCirclesList[state.mouseDownSource] -= 1;
                state.InnerCirclesList[state.mouseupLocation] += numberOfTokenRequired;
            }

            state.mouseupLocation = -1;
            state.mouseDownSource = -1;

        },
        addTokenInColumn: (state, action: PayloadAction<number>) => {
            state.mouseDown = false;
            state.InnerCirclesList[action.payload] += 1;
            // state.CircleListObject.push({ parentId: action.payload })
        },
        removeTokenInColumn: (state, action: PayloadAction<number>) => {
            state.mouseDown = false;
            if (state.InnerCirclesList[action.payload] == 0) {
                return;
            }
            state.InnerCirclesList[action.payload] -= 1;
            // state.CircleListObject.reverse()
            // state.CircleListObject.splice(state.CircleListObject.indexOf({ parentId: action.payload }), 1)
            // state.CircleListObject.reverse()
        },

    },
})

// Action creators are generated for each case reducer function
export const { resetCircles, removeColumn, addColumn, changeBase, mouseDownOnTheToken, mouseUpOnColumn, addTokenInColumn, removeTokenInColumn } = DotSlice.actions

export default DotSlice.reducer;