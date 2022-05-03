/*Q2. An arrow function takes two arguments firstName and 
lastName and returns a 2 letter string that represents the first letter 
of both the arguments. For the arguments Roger and Waters, 
the function returns ‘RW’. Write this function.
Submit the github link to the code*/


const arrowFunction = (s1,s2) => {
    return s1[0]+s2[0];
};

console.log(arrowFunction("Roger","Waters"));