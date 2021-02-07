import React, { useEffect, useState } from 'react';
import styles from './styles.module.css'
import { perFormMathCalculation } from './utilities';

export const CalculatorUI = () => {

    const [result,setResult] = useState(0);
    const [operandA,setOperandA] = useState('');
    const [operandB,setOperandB] = useState('');
    const [currentOperation,setOperation] = useState(null);
    const [isSciFicButtonsOpen,setScientific] = useState(false);
    const [theme ,setAppTheme] = useState('light');


    const updateOperand = (value) => {
        /* based one value updated internal operand and display variable*/
        if(operandA === '' && currentOperation === null){
            setOperandA(value);
            setResult(value)
        }else if(operandA !== '' && currentOperation === null) {
            setOperandA(operandA+value);
            setResult(operandA+value)
        }else if(operandB === '' && currentOperation !== null) {
            setOperandB(value);
            setResult(value)
        }else if(operandB !== '' && currentOperation !== null) {
            setOperandB(operandB+value);
            setResult(operandB+value);
        }
    }

    const keydownListener = keydownEvent => {
        /* Listener to key press event */
            const validNumberInputs = "0123456789";
            const validMathOperation ='+-/*';
            const { key } = keydownEvent;
            (key === '=') && equalPressed();
            (key === 'Backspace') && clearInputs();
            (validMathOperation.indexOf(key) >= 0) &&  updateOperation(key);
            (validNumberInputs.indexOf(key) >= 0) && updateOperand(key);
        };

    useEffect(() => {
        window.addEventListener("keydown", keydownListener, true);
        return () => window.removeEventListener("keydown", keydownListener, true);}, [keydownListener]);


    const handleOperation = (op) => {
        /*Initiate math opreation if A and B present */
        if(operandA&&operandB){
            const mathOutPut =  perFormMathCalculation(currentOperation, operandA, operandB);
            setResult(mathOutPut);
            setOperandA(mathOutPut.toString());
            setOperandB('');
            setOperation(op);
        }

    }

    const scientificOperation = (op) => {
        /* responsible for scientific mode operations based on the entered number */
        switch (op){
            case 'flip':
                setResult(-(result));
                break;
            case 'sqr':
                setResult(Math.pow(result, 2) );
                break;
            case 'sqrt':
                setResult(Math.sqrt(result));
                break;
            default:
                break;
        }
    }

    const updateOperation = (op) => {
        /* responsible for setting current operation(+,-,*,/etc) .If already we have already operation then start calculation */
        if(currentOperation !== null){
            handleOperation(op);
        }else {
            setOperation(op);
        }
    }

    const handleReset = (result) => {
        setOperandA('');
        setOperandB('');
        setOperation(null);
        result? setResult(result) : setResult(0);
    }

    const equalPressed = () =>{
        /* at any time = pressed calculated final value for the sign or set the A value and reset remaining variabled */
        let result;
        if(operandB !== ''){
            result = (operandA&&operandB) && perFormMathCalculation(currentOperation, operandA, operandB);
        }else if(operandA) {
            result = parseFloat(operandA);
        }
        handleReset(result)
    }

    const clearInputs = () => {
        handleReset('')
    }

    const toggleMode = () => {
        setScientific(!isSciFicButtonsOpen);
    }

    const handleTheme = (theme) => {
        setAppTheme(theme);
    }

    return (
        <div className= { theme === 'light' ? styles.parent +' '+ styles.lightbg :styles.parent + ' '+styles.darkbg}>
        <div className={theme ? [styles.calcContainer ]: ''}>
            <div className={styles.themeButtonContainer}>
                <button onClick={() => handleTheme('dark')} className={styles.darkBtn}>Dark</button>
                <button onClick={() => handleTheme('light')} className={styles.lightBtn}> Light</button>
            </div>
                <input disabled className={styles.outputScreen} type={'text'} value={result}/>
           <section>
               <div className={styles.row}>
                   <button onClick={() => updateOperand('1')}>1</button>
                   <button onClick={() => updateOperand('2')}>2</button>
                   <button onClick={() => updateOperand('3')}>3</button>
                   <button onClick={() => updateOperation('+')}>Add</button>
               </div>
               <div className={styles.row}>
                   <button onClick={() => updateOperand('4')}>4</button>
                   <button onClick={() => updateOperand('5')}>5</button>
                   <button onClick={() => updateOperand('6')}>6</button>
                   <button onClick={() => updateOperation('-')}>subtract</button>
               </div>
               <div className={styles.row}>
                   <button onClick={() => updateOperand('7')}>7</button>
                   <button onClick={() => updateOperand('8')}>8</button>
                   <button onClick={() => updateOperand('9')}>9</button>
                   <button onClick={() => updateOperation('*')}>multiply</button>
               </div>
               <div className={styles.row}>
                   <button onClick={clearInputs}>clear</button>
                   <button onClick={() => updateOperand('0')}>0</button>
                   <button onClick={equalPressed}>=</button>
                   <button onClick={() => updateOperation('/')}>divide</button>
               </div>
               {
                   isSciFicButtonsOpen ? <div className={styles.row}>

                       <button onClick={() => scientificOperation('flip')}>Sign</button>
                       <button onClick={() => scientificOperation('sqr')}>Square</button>
                       <button onClick={() => scientificOperation('sqrt')}>Square Root</button>
                   </div> : null
               }
               <div className={styles.row}>
                   <button onClick={toggleMode}>{isSciFicButtonsOpen ? 'Hide Scientific Mode':'Scientific Mode'}</button>
               </div>
           </section>
        </div>
        </div>
    )
}