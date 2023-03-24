import { useState, useEffect, useRef } from 'react'
import ColumnComponent from './ColumnComponent';
import "./column.css"
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useSelector, useDispatch } from 'react-redux'

import { changeBase, mouseDownOnTheToken, mouseUpOnColumn } from './redux/mouseSlice'
import type { RootState } from './redux/store'

function Columns() {
    const Base = useSelector((state: RootState) => state.allState.base)
    const [MouseDown, setMouseDown] = useState(false);
    const [Visibility, setVisibility] = useState(true)
    const containerDiv = useRef<HTMLDivElement>(null);
    const selectRef = useRef<HTMLSelectElement>(null);
    const dispatch = useDispatch()
    const ColumnCollection = useSelector((state: RootState) => state.allState.ColumnCollection)
    // const addColumn = () => {
    //     console.log(ColumnCollection);
    //     const newCollection = [...ColumnCollection, ColumnCollection[ColumnCollection.length - 1] + 1]
    //     setColumnCollection(newCollection);
    // }
    // const removeColumn = () => {
    //     console.log(ColumnCollection);
    //     const newCollection = [...ColumnCollection.slice(0, ColumnCollection.length - 1)]
    //     setColumnCollection(newCollection);
    // }


    return (<div>
        <div className='show-label-restart'><div><input className='show-tokens' type="checkbox" /> Show Token Label</div> <button>Restart</button></div>

        <div className="choose-conversion">
            <div className="borderless-div">
                <div className="choose-conversion-list">

                    <select onChange={() => { dispatch(changeBase(Number(selectRef.current?.value))) }} ref={selectRef} className='choose-conversion-list-option' name="convert-from" id="from">
                        <option value="2"> 1 <ArrowRightAltIcon className
                            ='reverse-arrow' /> to 2 </option>
                        <option value="3">1 <ArrowRightAltIcon className='reverse-arrow' /> to 3</option>
                        <option value="4">1 <ArrowRightAltIcon className='reverse-arrow' /> to 4</option>
                        <option value="5">1 <ArrowRightAltIcon className='reverse-arrow' /> to 5</option>
                    </select>
                </div>
            </div></div>
        <div ref={containerDiv} className="column-collection-container">



            {/* <button onClick={addColumn}>Plus icon</button> */}
            {Visibility &&
                ColumnCollection.map((elem, idx) => {
                    return <ColumnComponent constrainsRef={containerDiv} order={idx} base={Base} key={idx}
                    // MouseDown={MouseDown} setMouseDown={setMouseDown}
                    />
                })
            }

            {/* <button onClick={removeColumn}>Minus icon</button> */}
        </div>
    </div>
    )
}

export default Columns; 