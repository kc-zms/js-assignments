if(!localStorage.getItem('localCounter'))
    localStorage.setItem('localCounter',0);

if(!sessionStorage.getItem('sessionCounter'))
    sessionStorage.setItem('sessionCounter',0);

document.getElementById("local").innerText=localStorage.getItem('localCounter');
document.getElementById("session").innerText=sessionStorage.getItem('sessionCounter');


function increment(){
    var a = localStorage.getItem('localCounter');
    a++;
    localStorage.setItem('localCounter',a);
    document.getElementById("local").innerText=localStorage.getItem('localCounter');

    a = sessionStorage.getItem('sessionCounter');
    a++;
    sessionStorage.setItem('sessionCounter',a);
    document.getElementById("session").innerText=sessionStorage.getItem('sessionCounter');
}



//Just to clear the storage

function clear(){
    localStorage.clear('localCounter');
    sessionStorage.clear('sessionCounter');
}


