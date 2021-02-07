

export const perFormMathCalculation = (currentOperation,operandA,operandB) => {
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