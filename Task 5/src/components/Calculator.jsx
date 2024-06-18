import React, { useState } from 'react';
import './Calculator.css';

function Calculator() {
    const [input, setInput] = useState("");

    const handleClick = (e) => {
        const value = e.target.innerHTML;
        if (value === '=') {
            try {
                setInput(eval(input).toString());
            } catch {
                setInput("Error");
            }
        } else if (value === 'AC') {
            setInput("");
        } else if (value === 'DEL') {
            setInput(input.slice(0, -1));
        } else {
            setInput(input + value);
        }
    };

    return (
        <div className="container">
            <div className="calculator">
                <input type="text" value={input} readOnly placeholder="0" />
                <div>
                    <button className="button operator" onClick={handleClick}>AC</button>
                    <button className="button operator" onClick={handleClick}>DEL</button>
                    <button className="button operator" onClick={handleClick}>%</button>
                    <button className="button operator" onClick={handleClick}>/</button>
                </div>
                <div>
                    <button className="button" onClick={handleClick}>7</button>
                    <button className="button" onClick={handleClick}>8</button>
                    <button className="button" onClick={handleClick}>9</button>
                    <button className="button operator" onClick={handleClick}>*</button>
                </div>
                <div>
                    <button className="button" onClick={handleClick}>4</button>
                    <button className="button" onClick={handleClick}>5</button>
                    <button className="button" onClick={handleClick}>6</button>
                    <button className="button operator" onClick={handleClick}>-</button>
                </div>
                <div>
                    <button className="button" onClick={handleClick}>1</button>
                    <button className="button" onClick={handleClick}>2</button>
                    <button className="button" onClick={handleClick}>3</button>
                    <button className="button operator" onClick={handleClick}>+</button>
                </div>
                <div>
                    <button className="button" onClick={handleClick}>00</button>
                    <button className="button" onClick={handleClick}>0</button>
                    <button className="button" onClick={handleClick}>.</button>
                    <button className="button equalBtn" onClick={handleClick}>=</button>
                </div>
            </div>
        </div>
    );
}

export default Calculator;
