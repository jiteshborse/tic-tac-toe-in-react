import React, { useRef, useState } from 'react';
import './TicTacToe.css';
import circle_icon from './Assets/circle.png';
import cross_icon from './Assets/cross.png';

let data = ["", "", "", "", "", "", "", "", ""];

const TicTacToe = () => {
    let [count, setCount] = useState(0);
    let [lock, setLock] = useState(false);
    let [draw, setDraw] = useState(false); // New state for draw condition
    let titleRef = useRef(null);

    let box1 = useRef(null);
    let box2 = useRef(null);
    let box3 = useRef(null);
    let box4 = useRef(null);
    let box5 = useRef(null);
    let box6 = useRef(null);
    let box7 = useRef(null);
    let box8 = useRef(null);
    let box9 = useRef(null);

    let box_array = [box1, box2, box3, box4, box5, box6, box7, box8, box9];

    const toggle = (e, num) => {
        if (lock || draw) {
            return;
        }
        if (count % 2 === 0) {
            e.target.innerHTML = `<img src='${cross_icon}'>`;
            data[num] = "x";
            setCount(++count);
        } else {
            e.target.innerHTML = `<img src='${circle_icon}'>`;
            data[num] = "o";
            setCount(++count);
        }
        checkWin();
    };

    const checkWin = () => {
        if (
            (data[0] === data[1] && data[1] === data[2] && data[2] !== "") ||
            (data[3] === data[4] && data[4] === data[5] && data[5] !== "") ||
            (data[6] === data[7] && data[7] === data[8] && data[8] !== "") ||
            (data[0] === data[3] && data[3] === data[6] && data[6] !== "") ||
            (data[1] === data[4] && data[4] === data[7] && data[7] !== "") ||
            (data[2] === data[5] && data[5] === data[8] && data[8] !== "") ||
            (data[0] === data[4] && data[4] === data[8] && data[8] !== "") ||
            (data[2] === data[4] && data[4] === data[6] && data[6] !== "")
        ) {
            won(data[0]); // Pass any symbol for winner check
        } else if (count === 9) {
            setDraw(true); // If all boxes are filled and no winner, set draw state
        }
    };

    const won = (Winner) => {
        setLock(true);
        if (Winner === "x") {
            titleRef.current.innerHTML = `Congratulations : <img src=${cross_icon}> Win`;
        } else {
            titleRef.current.innerHTML = `Congratulations : <img src=${circle_icon}> Win`;
        }
    };

    const reset = () => {
        setLock(false);
        setDraw(false); // Reset draw state
        data = ["", "", "", "", "", "", "", "", ""];
        titleRef.current.innerHTML = 'Tic Tac Toe Game';
        box_array.map((e) => {
            e.current.innerHTML = "";
        });
        setCount(0); // Reset count
    };

    return (
        <div className='container'>
            <h1 className='title' ref={titleRef}>Tic Tac Toe Game</h1>
            <div className='board'>
                <div className='row1'>
                    <div className='boxes' ref={box1} onClick={(e) => { toggle(e, 0) }}></div>
                    <div className='boxes' ref={box2} onClick={(e) => { toggle(e, 1) }}></div>
                    <div className='boxes' ref={box3} onClick={(e) => { toggle(e, 2) }}></div>
                </div>
                <div className='row2'>
                    <div className='boxes' ref={box4} onClick={(e) => { toggle(e, 3) }}></div>
                    <div className='boxes' ref={box5} onClick={(e) => { toggle(e, 4) }}></div>
                    <div className='boxes' ref={box6} onClick={(e) => { toggle(e, 5) }}></div>
                </div>
                <div className='row3'>
                    <div className='boxes' ref={box7} onClick={(e) => { toggle(e, 6) }}></div>
                    <div className='boxes' ref={box8} onClick={(e) => { toggle(e, 7) }}></div>
                    <div className='boxes' ref={box9} onClick={(e) => { toggle(e, 8) }}></div>
                </div>
            </div>
            {draw && <p className='draw'>It's a draw!</p>} {/* Display draw message */}
            <button className='reset' onClick={() => { reset() }}>Reset</button>
        </div>
    );
};

export default TicTacToe;
