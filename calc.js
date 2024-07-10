function operate(first, second, operand){
    if(operand=="+"){
        return first + second;
    }
    if(operand=="-"){
        return first - second;
    }
    if(operand=="*"){
        return first * second;
    }
    if(operand=="/"){
        return first / second;
    }
}

const buttons = document.querySelectorAll("button");
const answer = document.querySelector(".answer");
let first = null;
let second = null;
let operand = null;

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        if(button.classList.contains("number")) {
            answer.textContent = button.textContent;
            if(first==null && operand==null){
                first = parseInt(button.textContent);
                console.log(first);
            } else if(first!=null && operand!=null) {
                if(second==null) {
                    second = parseInt(button.textContent);
                } else {
                    second = second + "" + parseInt(button.textContent);
                }
                answer.textContent=second;
                console.log(second);
            } else {
                first = first + "" + parseInt(button.textContent);
                answer.textContent = first;
                console.log(first);
            }
        }
        if(button.classList.contains("operand")) {
            operand = button.textContent;
            console.log(operand);
        }
        if(button.textContent == "="){
            console.log("Equals clicked");
            console.log(first);
            console.log(second);
            console.log(operand);
            first = operate(parseInt(first), parseInt(second), operand);
            operand = null;
            answer.textContent=first;
        }
        if(button.textContent == "C"){
            first = null;
            second = null;
            operand = null;
            answer.textContent = "0";
        }
    });
});