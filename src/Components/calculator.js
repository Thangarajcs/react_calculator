import React,{useState,useEffect} from 'react';
import styles from './styles.module.css'

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


    const mathOperation = () => {
   try{
       let mathOutPut;
       switch (currentOperation) {
           case '+':
               mathOutPut = parseFloat(operandA) + parseFloat(operandB);
               break;
           case '-':
               mathOutPut = parseFloat(operandA) - parseFloat(operandB);
               break;
           case '*':
               mathOutPut = parseFloat(operandA) * parseFloat(operandB);
               break;
           case '/':
               mathOutPut = parseFloat(operandA) / parseFloat(operandB);
               break;
           default:
               break;

       }
       return mathOutPut;
   }catch (e) {
       throw e;
   }
    }


    const performMathOperation = (op) => {
        if(operandA&&operandB){
            const mathOutPut =  mathOperation();
            setResult(mathOutPut);
            setOperandA(mathOutPut.toString());
            setOperandB('');
            setOperation(op);
        }

    }

    const scientificOperation = (op) => {
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
        if(currentOperation !== null){
            performMathOperation(op);
        }else {
            setOperation(op);
        }
    }

    const equalPressed = () =>{
        let result;
        if(operandB !== ''){
            result = (operandA&&operandB) && mathOperation();
        }else if(operandA) {
            result = parseFloat(operandA);
        }
        setOperandA('');
        setOperandB('');
        setOperation(null);
        result? setResult(result) : setResult(0);
    }

    const clearInputs = () => {
        setOperandA('');
        setOperandB('');
        setOperation(null);
         setResult(0);
    }

    const toggleMode = () => {
        setScientific(!isSciFicButtonsOpen);
    }

    const handleTheme = (theme) => {
        setAppTheme(theme);
    }

    return (
        <div className= { theme === 'light' ? styles.parent +' '+ styles.lightbdg :styles.parent + ' '+styles.darkbdg}>
        <div className={theme ? [styles.calcContainer ]: ''}>
            <div className={styles.themeButtonContainer}>
                <button onClick={() => handleTheme('dark')} className={styles.darkBtn}>Dark</button>
                <button onClick={() => handleTheme('light')} className={styles.lightBtn}> Light</button>
            </div>

                <input className={styles.outputScreen} type={'text'} value={result}/>

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


        </div>
        </div>
    )
}