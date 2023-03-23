import { useState, useEffect } from 'react'
import ColumnComponent from './ColumnComponent';
import "./column.css"
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useSelector, useDispatch } from 'react-redux'

import { mouseDownOnTheToken, mouseUpOnColumn } from './redux/mouseSlice'
import type { RootState } from './redux/store'

function Columns() {
    const Base = useSelector((state: RootState) => state.allState.base)
    const [MouseDown, setMouseDown] = useState(false);
    const [Visibility, setVisibility] = useState(true)

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
                    <select className='choose-conversion-list-option' name="convert-to" id="to">
                        <option value="1">1</option>
                        <option value="1">2</option>
                        <option value="1">3</option>
                        <option value="1">4</option>
                        <option value="1">5</option>
                    </select>
                    <ArrowRightAltIcon className='reverse-arrow' />
                    <select className='choose-conversion-list-option' name="convert-from" id="from">
                        <option value="2">2</option>
                        <option value="1">3</option>
                        <option value="1">4</option>
                        <option value="1">5</option>
                    </select>
                </div>
            </div></div>
        <div className="column-collection-container">



            {/* <button onClick={addColumn}>Plus icon</button> */}
            {Visibility &&
                ColumnCollection.map((elem, idx) => {
                    return <ColumnComponent order={idx} base={Base} key={idx}
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