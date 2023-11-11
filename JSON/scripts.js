let originalOrder = [];
let sortCounter = 0;

function getData() {
    let list = "";
    
    fetch('https://dummyjson.com/products')
        .then(response => response.json())
        .then(json => {
              json.products.forEach(product => {
                list += `<li class="filter ${product.category}"><section class="flex-container"><section class="list-element">
                    <h3>${product.title}</h3><br>${product.description}</section>
                    <section class="list-element"><img src=${product.thumbnail}></section></section></li>`;
            });
            originalOrder = list;
            document.querySelector("#product-list").innerHTML = list;
            filterCategories("all");
        });
}

function resetSorting() {
    document.querySelector("#product-list").innerHTML = originalOrder;
    var activeFilter = document.getElementsByClassName("active");
    console.log(activeFilter[0].id);
    filterCategories(activeFilter[0].id);
    filterNames();
}

function changeArrow(direction) {
    var element = document.getElementsByClassName(direction);
    
    if (direction == "down") {
        element[0].className = element[0].className.replace("down", "up");
    } else if (direction == "up") {
        element[0].className = element[0].className.replace("up", "right");
    } else if (direction == "right") {
        element[0].className = element[0].className.replace("right", "down");
    }
}

function sortList() {
    sortCounter++;
    if(sortCounter % 3 == 0) {
        resetSorting();
        changeArrow("up")
        return;
    }

    var list, i, switching, b, shouldSwitch, direction, switchcount = 0;
    list = document.getElementById("product-list");
    switching = true;
    direction = "asc";

    while(switching) {
        switching = false;
        b = list.getElementsByTagName("li");
        for (i = 0; i < (b.length - 1); i++) {
            shouldSwitch = false;
            if (direction == "asc") {
                if (b[i].innerHTML.toLowerCase() > b[i+1].innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (direction == "desc") {
                if (b[i].innerHTML.toLowerCase() < b[i+1].innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (direction == "none") {
                resetSorting();
                break;
            }
        } 
        if (shouldSwitch) {
            b[i].parentNode.insertBefore(b[i+1], b[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount == 0 && direction == "asc") {
                direction = "desc";
                switching = true;
            }
        }
    }
    
    if (direction == "asc") changeArrow("right");
    else if (direction == "desc") changeArrow("down");
}

function filterNames() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("filterInput");
    filter = input.value.toLowerCase();
    ul = document.getElementById("product-list");
    li = ul.getElementsByTagName("li");

    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("h3")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toLowerCase().indexOf(filter) > -1) {
            li[i].style.display  = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

function filterCategories(c) {
    var x, i;
    x = document.getElementsByClassName("filter");
    if (c == "all") c = "";

    for (i = 0; i < x.length; i++) {
        removeClass(x[i], "show");
        if (x[i].className.indexOf(c) > -1) addClass(x[i], "show"); 
    }
}

function addClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) { 
            element.className += " " + arr2[i];
        }
    }
}

function removeClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    element.className = arr1.join(" ");
}

document.addEventListener("DOMContentLoaded", function() {
    var btnContainer = document.getElementById("buttons");
    var btns = btnContainer.getElementsByClassName("btn");
    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function() {
            var current = document.getElementsByClassName("active");
            current[0].className = current[0].className.replace(" active", "");
            this.className += " active";
        });
    }
});
