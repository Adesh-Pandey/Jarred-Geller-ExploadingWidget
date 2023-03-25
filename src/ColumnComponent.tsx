import React, { RefObject, useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from './redux/store'
import { mouseDownOnTheToken, mouseUpOnColumn, addTokenInColumn, removeTokenInColumn, resetCircles, temporaryDisable } from './redux/mouseSlice'
import { motion } from "framer-motion"
import PopAudio from './audios/addedPopSound.mp3'
import RemoveIcon from '@mui/icons-material/Remove';

function ColumnComponent({ alterVisibility, visibility, ShowTokenLabel, constrainsRef, order, base }: { alterVisibility: Function, visibility: boolean, ShowTokenLabel: boolean, constrainsRef: RefObject<HTMLDivElement>, order: number, base: number }) {

    const MouseDownSource = useSelector((state: RootState) => state.allState.mouseDownSource)
    const dispatch = useDispatch()
    const InnerCircles = useSelector((state: RootState) => state.allState.InnerCirclesList[order])
    const audio = useRef<HTMLAudioElement>(null);
    const [visible, setVisible] = useState(true);
    const [stacking, setstacking] = useState(false)

    const TemporaryDisabledList = useSelector((state: RootState) => state.allState.TemporaryDiableList)


    const [InnerCircleList, setInnerCircleList] = useState([...Array(InnerCircles > 15 ? 15 : InnerCircles)])
    const [Shakeable, setShakeable] = useState(false);


    const addInnerCircle = () => {
        audio?.current?.play();
        dispatch(addTokenInColumn(order))
    }
    const removeInnerCircle = () => {
        if (InnerCircles == 0) { return }
        dispatch(removeTokenInColumn(order))
    }

    const [oldCOunt, setoldCOunt] = useState(InnerCircleList.length);
    useEffect(() => {
        let Audi: any[] = [new Audio(PopAudio)]
        if (oldCOunt !== InnerCircles) {
            let change = oldCOunt - InnerCircles;
            if (change < 0) {
                change = change * -1;
            }
            if (change > 10) {
                change = 10;
            }

            for (let index = 0; index < change; index++) {

                setTimeout(() => {
                    Audi[index].play()
                }, index * 70);


                Audi.push(new Audio(PopAudio));

            }

            // Audi.play()
            setoldCOunt(InnerCircles)

        }

        setTimeout(() => {
            setShakeable((base <= InnerCircles));
            setInnerCircleList([...Array(InnerCircles > 15 ? 15 : InnerCircles)])
        }, 70);

    }, [InnerCircles,])
    const initiateDragOnDiv = (e: any) => {
        e.preventDefault()
        // console.log(e)
        if (InnerCircles > 0) {
            dispatch(mouseDownOnTheToken([order, -1]));
        }


    }

    const variant = {

        open: { opacity: 1 },
        closed: { opacity: 0 },

    }
    const getPxFromTop = (index: number) => {
        const gapPx = 40;
        const nthLine = Math.floor(index / 3);


        return (index * 5 - gapPx * nthLine) + (2);
    }
    const extraRight = (index: number) => {
        if (index < 3) {
            return 7 * ((index + 1) % 3);
        }
        return 2 * (index % 3) + 7 * ((index + 1) % 3);

    }
    const resetCirclesInthisColumn = () => {
        dispatch(resetCircles(order));
    }

    const whatToDisplayInsidetoken = (idx: number) => {
        if (idx != InnerCircleList.length - 1) {
            return ShowTokenLabel ? base ** order || 1 : ""
        }
        let count = 1;

        count += InnerCircles - InnerCircleList.length;
        if (count == 1) {
            return ShowTokenLabel ? base ** order || 1 : "";
        }
        let sendValue = ShowTokenLabel ? `x${count}` : "";
        return sendValue;
    }
    return (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
        <div className='column-individual' id={`${order}`}>
            <div className="count-tokens">
                <div className='total-token-count'>{visible ? InnerCircles : "0"}</div><div><label className="switch">
                    <input defaultChecked onChange={() => {
                        console.log(visible); setVisible(!visible)
                        dispatch(temporaryDisable(order));
                    }} type="checkbox" />
                    <span className="slider round"></span>
                </label></div></div>
            <motion.div variants={variant} animate={visible ? "open" : "closed"} id={`${order}`} className='column-individual-inner-circle-collection'>
                {/* <audio ref={audio} className="addedCircle" src='./audios/addedPopSound.mp3'>
                </audio> */}
                <motion.div
                    id={`${order}`}
                    drag
                    dragConstraints={constrainsRef}
                    dragElastic={0}
                    dragSnapToOrigin={true}
                    whileDrag={{ position: "absolute" }}
                    dragPropagation
                    style={{
                        //  "backgroundColor": "black", 
                        height: "200px", "overflow": "hidden"
                    }}
                    onDragEnd={
                        (event, info) => {
                            let callChanges = -1;
                            // ReactDOM.findDOMNode()
                            // console.log(info.point.x, info.point.y)
                            const elementsHere = document.elementsFromPoint(info.point.x, info.point.y);
                            for (let i = 0; i < elementsHere.length; i++) {
                                if (elementsHere[i].classList.contains("column-individual-inner-circle-collection")) {
                                    if (TemporaryDisabledList[Number(elementsHere[i]?.id)] == -1 || TemporaryDisabledList[order] == -1) {
                                        dispatch(mouseUpOnColumn(MouseDownSource))
                                        break;
                                    }
                                    callChanges = i;
                                    break;
                                    // console.log(document.elementsFromPoint(info.point.x, info.point.y)[i])
                                }
                            }
                            if (callChanges != -1) {
                                if (elementsHere[callChanges].id) {
                                    let or = Number(elementsHere[callChanges].id)

                                    if (or >= 0)
                                        dispatch(mouseUpOnColumn(or))
                                }
                            }

                            setInnerCircleList([...Array(InnerCircles > 15 ? 15 : InnerCircles)])

                            setstacking(false);
                        }

                    }

                    onDragStart={

                        (e) => { initiateDragOnDiv(e); setstacking(true) }
                    }

                    className='column-individual-inner-circle-collection-inner-div'>

                    {/* {base ** order || 1} */}
                    {InnerCircleList.map((count, idx) => {

                        return <motion.div

                            animate={stacking ? "stack" : "normal"}

                            variants={{
                                stack: {
                                    scale: Shakeable && (base <= InnerCircles) ? [0.7, 2, 1] : [0, 1],
                                    position: "relative", top: `${getPxFromTop(idx)}px`, left: `${((idx % 3) * -35 + extraRight(idx))}px`,
                                    zIndex: idx,
                                    display: idx > 17 ? "none" : "flex"
                                },
                                normal: { scale: Shakeable && (base <= InnerCircles) ? [0.7, 2, 1] : [0, 1], }
                            }}
                            transition={{
                                type: 'spring', bounce: "0.5"
                                , repeat: base <= InnerCircles && !stacking ? Infinity : 0, duration: 1
                            }}
                            key={idx}
                            className="inner-circle">
                            {idx < 14 ? (ShowTokenLabel ? base ** order || 1 : "") : whatToDisplayInsidetoken(idx)}


                        </motion.div>

                    })}</motion.div>
            </motion.div>
        </div>
        <div className="token-control">
            <button className='end-button-left' onClick={addInnerCircle}>+</button>
            <button onClick={resetCirclesInthisColumn}>0</button>
            <button className='end-button-right' onClick={removeInnerCircle}><RemoveIcon /></button></div>

        <div className="net-value-column"><div className="axtual-total-value">{visible ? (base ** order) * InnerCircles : "0"}</div> <div className="plus">{order == 0 ? "" : "+"}</div></div>
    </motion.div >

    )
}

export default ColumnComponent;