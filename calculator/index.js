let output = 0;
let curr_num = 0;
let new_dig = 0;
let disp_str = "";
let last_op = "";
let first = true;

// display element
const display = document.getElementById("display");

// number button elements
const button_zero = document.getElementById("0");
const button_one = document.getElementById("1");
const button_two = document.getElementById("2");
const button_three = document.getElementById("3");
const button_four = document.getElementById("4");
const button_five = document.getElementById("5");
const button_six = document.getElementById("6");
const button_seven = document.getElementById("7");
const button_eight = document.getElementById("8");
const button_nine = document.getElementById("9");

// operator button elements
const button_add = document.getElementById("add");
const button_sub = document.getElementById("sub");
const button_mul = document.getElementById("mul");
const button_div = document.getElementById("div")
const button_eq = document.getElementById("eq");

// clear button
const button_clr = document.getElementById("c");

// reset
const reset = () => {
    output = 0;
    new_dig = 0;
    curr_num = 0;
    disp_str = "";
    last_op = "";
    first = true;
}

// hit clear
const press_clr = () => {
    reset();
    display.innerText = "0";
    console.log("cleared")
}

// handle digit press
const press_num = (event) => {
    new_dig = Number(event.target.id);
    curr_num = curr_num * 10 + new_dig;
    disp_str += event.target.id;
    display.innerText = disp_str;
    console.log("pressed " + event.target.id + ", curr num " + curr_num);
}

// operations
const handle_op = (a, b, op) => {
    switch (op) {
        case "add":
            return a + b;
        case "sub":
            return a - b;
        case "mul":
            return a * b;
        case "div":
            return a / b;
    }
}

const handle_disp_op = (op) => {
    switch (op) {
        case "add":
            return "+";
        case "sub":
            return "-";
        case "mul":
            return "x";
        case "div":
            return "/";
    }
}

const handle_trailing = (a, b, op) => {
    console.log("handled trailing");
    if (op === "") {
        return a
    } else {
        return handle_op(a, b, op)
    }
}

// handle operator press
const press_op = (event) => {
    if (first) {
        output = curr_num;
        first = false;
    } else {
        output = handle_op(output, curr_num, last_op);
    }
    disp_str += handle_disp_op(event.target.id);
    curr_num = 0;
    last_op = event.target.id;
    display.innerText = disp_str;
    console.log("current output: " + output + " last op: " + last_op)
}

// update display
const press_eq = () => {
    output = handle_trailing(output, curr_num, last_op)
    display.innerText = output;
    reset();
}

// clear event listener
button_clr.addEventListener("click", press_clr);

// event listener for ops
button_eq.addEventListener("click", press_eq);
button_add.addEventListener("click", press_op);
button_sub.addEventListener("click", press_op);
button_mul.addEventListener("click", press_op);
button_div.addEventListener("click", press_op);

// event listener for nums
button_zero.addEventListener("click", press_num);
button_one.addEventListener("click", press_num);
button_two.addEventListener("click", press_num);
button_three.addEventListener("click", press_num);
button_four.addEventListener("click", press_num);
button_five.addEventListener("click", press_num);
button_six.addEventListener("click", press_num);
button_seven.addEventListener("click", press_num);
button_eight.addEventListener("click", press_num);
button_nine.addEventListener("click", press_num);
