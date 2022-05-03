/*
Rewrite the following code using template literals
const printBill = (name, bill) => {
                     return “Hi “ + name + “, please pay: “ + bill;
           }

*/

const printBill = (name,bill) =>{
    return `Hi ${name}, please pay: ${bill}`;
}

console.log(printBill('Tim',20));