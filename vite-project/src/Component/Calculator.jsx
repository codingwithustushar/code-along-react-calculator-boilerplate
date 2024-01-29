import { useReducer } from "react";
import '../App.css'

let initState = {
    inputs: "",
    res: "",
  };
  
  let operators = ["+", "-", "*", "/"];
  
  const reducer = (state = initState, { type, payload }) => {
    switch (type) {
      case "AddINP": {
          // console.log(payload,type)
          let addOps = true
          if(operators.includes(payload) && operators.includes(state.inputs.slice(state.inputs.length-1,state.inputs.length))){
              addOps = false
          }
          else{
              addOps = true
          }
          if(addOps){
              // console.log({...state,inputs:state.inputs+payload})
              return{...state,inputs:state.inputs+payload}
          }
          return{...state}
      }
  
      case "calculate": {
          let inpLen = state.inputs.length
          if(!operators.includes(state.inputs.slice(inpLen-1,inpLen))){
              try {
                  let result = eval(state.inputs)
                  if(!Number.isFinite(result)){
                      throw new Error("Cnnot divide by zero")
                  }
                  let newInp ={...state,res: "", inputs:result.toString()}
                  return newInp
              } catch (error) {
                  console.log("Error")
                  
              }
          }
          else{
              return{
                  ...state,
                  inputs: eval(state.inputs.slice(0,inpLen-1)).toString(),
                  res:""
              }
          }
        break;
      }
  
      case "delete": {
          return {...state, inputs:state.inputs.slice(0,state.inputs.length-1)}
      }
  
      case "clear": {
          return {...state ,inputs:"",res:""}
      }
  
      default: {
        return state;
      }
    }
    ``;
  };

const Calculte = () => {
    let [state, dispatch] = useReducer(reducer, initState);

    let handleclick = (val) => {
      dispatch({ type: "AddINP", payload: val });
    };
    let handleclear = () => {
      dispatch({ type: "clear" });
    };
    let handledel = () => {
      dispatch({ type: "delete" });
    };
    let handlecalc = () => {
      dispatch({ type: "calculate" });
    };
  return (
    <div className="container">
    <div className="cal">
      <div className="display">
          
          <p className="">{state.inputs}</p>
      </div>
      {/* <input type="text" className="display" /> */}
      <button className="ac" onClick={handleclear}>
        AC
      </button>
      <button onClick={handledel}>DEL</button>
      <button onClick={() => handleclick("/")}>/</button>
      <button onClick={() => handleclick("1")}>1</button>
      <button onClick={() => handleclick("2")}>2</button>
      <button onClick={() => handleclick("3")}>3</button>
      <button onClick={() => handleclick("*")}>*</button>
      <button onClick={() => handleclick("4")}>4</button>
      <button onClick={() => handleclick("5")}>5</button>
      <button onClick={() => handleclick("6")}>6</button>
      <button onClick={() => handleclick("-")}>-</button>
      <button onClick={() => handleclick("7")}>7</button>
      <button onClick={() => handleclick("8")}>8</button>
      <button onClick={() => handleclick("9")}>9</button>
      <button onClick={() => handleclick("+")}>+</button>
      <button onClick={() => handleclick(".")}>.</button>
      <button onClick={() => handleclick("+")}>0</button>
      <button className="equal" onClick={handlecalc}>
        =
      </button>
    </div>
  </div>
  )
}

export default Calculte