var add = (function () {
    var counter = 0;
    return function () {return counter += 1;
    };
})();

function myFunction(){
    document.getElementById("counter").innerHTML = add();
}
