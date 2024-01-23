import React, { useReducer } from 'react';
// import './Calculator.css';

const initState = {
    inputs: "",
    res: "" // Change 'result' to 'res'
};

let operators = ["+", "-", "/", "*"];

function reducer(state = initState, { type, payload }) {
    switch (type) {
        case "addint": {
            let addOps = true;
            if (operators.includes(payload) && operators.includes(state.inputs.slice(state.inputs.length - 1, state.inputs.length))) {
                addOps = false;
            } else {
                addOps = true;
            }
            if (addOps) {
                return { ...state, inputs: state.inputs + payload };
            }
            return { ...state };
        }
        case "Clear": {
            return { ...state, inputs: "", res: "" };
        }
        case "CALCULATE": {
            const inpLen = state.inputs.length;
            if (inpLen > 0 && operators.includes(state.inputs.slice(inpLen - 1, inpLen))) {
                try {
                    const result = eval(state.inputs);
                    if (!Number.isFinite(result)) {
                        throw new Error("cannot divide by zero");
                    }
                    return { ...state, res: result.toString(), inputs: result.toString() };
                } catch (error) {
                    console.log(error);
                    return { ...state };
                }
            } else {
                try {
                    const result = eval(state.inputs);
                    if (!Number.isFinite(result)) {
                        throw new Error("cannot divide by zero");
                    }
                    return { ...state, res: "", inputs: result.toString() };
                } catch (error) {
                    console.log(error);
                    return { ...state };
                }
            }
        }
        
        case "DELETE": {
            return {
                ...state,
                inputs: state.inputs.slice(0, state.inputs.length - 1)
            };
        }
        default: {
            return state;
        }
    }
}

const Calculator = () => {
    const [state, dispatch] = useReducer(reducer, initState);

    let handleClick = (val) => {
        dispatch({ type: "addint", payload: val });
    };

    let handleClear = () => {
        dispatch({ type: "Clear" });
    };

    let handleCalc = () => {
        dispatch({ type: "CALCULATE" });
    };

    let handleDel = () => {
        dispatch({ type: "DELETE" });
    };

    return (
        <div className='main'>
                 <div className="display">
                     {state.inputs}
                 </div>
             <div className='button-Container'>
                 <button onClick={handleClear}>AC</button>
                 <button onClick={handleDel}>Del</button>
                 <button onClick={()=>{handleClick("+")}}>+</button>
             </div>
             <div className='buttonContainer'>
                 <button onClick={()=>{handleClick("1")}}>1</button>
                 <button onClick={()=>{handleClick("2")}}>2</button>
                  <button onClick={()=>{handleClick("3")}} >3</button>
                    <button onClick={()=>{handleClick("-")}}>-</button>
             </div>
              <div className='buttonContainer'>
              <button onClick={()=>{handleClick("4")}}>4</button>
                   <button onClick={()=>{handleClick("5")}}>5</button>
                   <button onClick={()=>{handleClick("6")}}>6</button>
                   <button onClick={()=>{handleClick("")}}></button>
               </div>
               <div  className='buttonContainer'>
                    <button onClick={()=>{handleClick("7")}}>7</button>
                    <button onClick={()=>{handleClick("8")}}>8</button>
                 <button onClick={()=>{handleClick("9")}}>9</button>
                    <button onClick={()=>{handleClick("/")}}>/</button>
                </div>
                 <div  className='buttonContainer'>
                     <button onClick={()=>{handleClick(".")}}>.</button>
                  <button onClick={()=>{handleClick("0")}}>0</button>
                   <button onClick={handleCalc}>=</button>
               </div>
           </div>
    );
};

export default Calculator;