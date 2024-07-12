function operate(first, second, operand){
    if(operand=="+"){
        if((first+second).toString().length>8){
            return (first + second).toPrecision(3);
        } else {
            return first + second;
        }
    }
    if(operand=="-"){
        if((first - second).toString().length>8){
            return (first-second).toPrecision(3);
        } else {
            return first - second;
        }
    }
    if(operand=="*"){
        if((first * second).toString().length>8){
            return (first*second).toPrecision(3);
        } else{
            return first * second;
        }
    }
    if(operand=="/"){
        if(second==0){
            return "Nice try";
        } else {
            if((first/second).toString().length>6) {
                return ((first/second).toPrecision(3));
            } else{
                return (first/second);
            }
        }
    }
}

function specialFunction(first,func){
    if(func=="+/-"){
        return first * -1;
    }
    if(func=="%"){
        return first/100;
    }
    if(func=="."){
        if(first == NaN) {
            return "0.";
        } else if(first%1!=0){
            return parseFloat(first);
        } else {
            return first + ".";
        }
    }
}

function checkSize(answer){
    if(answer.toString().length > 7){
        let length = answer.toString().length;
        let extraLength = length-8
        console.log(length-8);
        return answer.toString().substring(0,8) + "e+" + extraLength;
    }
}

const buttons = document.querySelectorAll("button");
const answer = document.querySelector(".answer");
let first = null;
let second = null;
let operand = null;
let complete = false;

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        if(button.classList.contains("number")) {
            //answer.textContent = button.textContent;
            if(first==null && operand==null && complete==false){
                first = parseInt(button.textContent);
                console.log(first);
            } else if(first!=null && operand!=null) {
                if(second==null) {
                    second = parseInt(button.textContent);
                } else {
                    if((second==0)) {
                        if(second.includes(".")){
                            second = second + "" + parseInt(button.textContent);
                            answer.textContent = second;
                        } else {
                            second = parseInt(button.textContent);
                            answer.textContent = second;
                        }
                    } else{
                        if(second.toString().length<8){
                            second = second + "" + parseInt(button.textContent);
                            answer.textContent = second;
                        }
                        //second = second + "" + parseInt(button.textContent);
                        //answer.textContent = second;
                    }
                }
                answer.textContent=second;
                console.log(second);
            } else {
                if(complete == true) {
                    first = parseInt(button.textContent);
                    answer.textContent=first;
                    complete=false;
                }
                else if((first==0) && complete==true) {
                    if(first.includes(".")){
                        first = first + "" + parseInt(button.textContent);
                        answer.textContent = first;
                    } else {
                        first = parseInt(button.textContent);
                        answer.textContent = first;
                        complete=false;
                    }
                    
                } else{
                    if(first.toString().length<8){
                        first = first + "" + parseInt(button.textContent);
                        answer.textContent = first;
                    }
                    
                }
                
                console.log(first);
            }
        }
        if(button.classList.contains("operand")) {
            if(first!=null && operand !=null && second!=null){
                first = operate(parseFloat(first),parseFloat(second),operand);
                answer.textContent=first;
                second=null;
                complete=true;
            }
            operand = button.textContent;
            console.log(operand);
        }
        if(button.textContent == "="){
            console.log("Equals clicked");
            console.log(first);
            console.log(second);
            console.log(operand);
            if(second!=null){
                first = operate(parseFloat(first), parseFloat(second), operand);
            }
            operand = null;
            answer.textContent=first;
            second=null;
            complete = true;
        }
        if(button.textContent == "C"){
            first = null;
            second = null;
            operand = null;
            answer.textContent = "0";
            complete=false;
        }
        if(button.textContent == "+/-" || button.textContent=="%" || button.textContent=="."){
            if(second!=null){
                second=specialFunction(parseFloat(second),button.textContent);
                answer.textContent=second;
            } else {
                if(first==null){
                    first=specialFunction(parseFloat(0),button.textContent);

                } else if(operand!=null){
                    second=specialFunction(parseFloat(0),button.textContent);
                    answer.textContent=second;
                }   
                else {
                    first=specialFunction(parseFloat(first),button.textContent);
                    answer.textContent=first
                }
            }
        }
    });
});