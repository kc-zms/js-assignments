//Q1. Write a program to demonstrate how a function can be passed as a parameter to another function.


function func2(functionParameter){
    console.log("Func2 is executing by taking func1 as a parameter");
    functionParameter();    
}

function func1(){
    console.log("This is func1 function");
}

func2(func1);