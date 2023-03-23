import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from './redux/store'
import { mouseDownOnTheToken, mouseUpOnColumn, addTokenInColumn, removeTokenInColumn } from './redux/mouseSlice'

function ColumnComponent({ order, base }: { order: number, base: number }) {

    const MouseDown = useSelector((state: RootState) => state.allState.mouseDown)
    const dispatch = useDispatch()

    const InnerCircles = useSelector((state: RootState) => state.allState.InnerCirclesList[order])

    const addInnerCircle = () => {
        if (InnerCircles == 12) { return }
        dispatch(addTokenInColumn(order))
    }
    const removeInnerCircle = () => {
        if (InnerCircles == 0) { return }
        dispatch(removeTokenInColumn(order))
    }



    const initiateDrag = (e: any) => {
        e.preventDefault()

        dispatch(mouseDownOnTheToken(order));
    }

    const stopDrag = () => {
        if (!MouseDown)
            return

        dispatch(mouseUpOnColumn(order));
        // console.log(base ** order || 1)

        // dispatch(addTokenInColumn(order))
    }

    return (<div>
        <div className='column-individual'>
            {/* <div className='base-number-overlay'>{base ** order || 1}</div> */}
            <div className="count-tokens">{InnerCircles}</div>
            <div onMouseUp={stopDrag} className='column-individual-inner-circle-collection'>
                {base ** order || 1}
                {[...Array(InnerCircles)].map((count, idx) => {
                    return <div key={idx} onMouseDown={initiateDrag} className="inner-circle">
                    </div>
                })}
            </div>
        </div>
        <button onClick={addInnerCircle}>+</button>
        <button onClick={removeInnerCircle}>-</button>
        <div className="net-value-column">{(base ** order) * InnerCircles}</div>
    </div>

    )
}

export default ColumnComponent;