const input = document.querySelector("input[type='text']");
const btn = document.querySelector("input[type='submit']");
const lists = document.querySelector(".lists");
const data = JSON.parse(localStorage.getItem("TodoList"));
let arr = [];
if (localStorage.getItem("TodoList")) {
  arr = data;
  addElements(arr);
}

// Add click event to submit button
btn.addEventListener("click", (e) => {
  e.preventDefault();
  if (input.value === "") return;
  obj(input.value);
  local(arr);
  input.value = "";
});

// Add value to the object
function obj(text) {
  const obj = {
    id: Date.now(),
    title: text,
    done: false,
  };
  arr.push(obj);
  addElements(arr);
}

// Creat Elements and append it in lists
function addElements(arr) {
  // empty the lists element
  lists.innerHTML = "";
  // Loop Into Array and get value
  for (let i = 0; i < arr.length; i++) {
    // Creat Element
    const div = document.createElement("div");
    const check = document.createElement("input");
    const para = document.createElement("p");
    const del = document.createElement("span");
    const delText = document.createTextNode("Delete");
    const val = document.createTextNode(arr[i].title);
    // Add Attributes to the Elements
    div.classList.add("list");
    div.setAttribute("data-id", arr[i].id);
    check.setAttribute("type", "checkbox");
    check.classList.add("check");
    para.classList.add("task");
    del.classList.add("delete");
    // Appending the Elements
    div.appendChild(check);
    div.appendChild(para);
    para.appendChild(val);
    div.appendChild(del);
    del.appendChild(delText);
    lists.appendChild(div);
    // check if done is true
    if (arr[i].done) {
      para.classList.add("done");
      check.checked = true;
    } else {
      para.classList.remove("done");
      check.checked = false;
    }
  }
}

// add the array to local storage
function local(arr) {
  localStorage.setItem("TodoList", JSON.stringify(arr));
}

lists.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    // Delete From Lists
    e.target.parentElement.remove();
    // Delete From Local storage
    deleteLocal(e.target.parentElement.getAttribute("data-id"));
  }
  if (e.target.classList.contains("check")) {
    // toggle done class to task
    e.target.nextSibling.classList.toggle("done");
    // toggle done boolian on object
    toggelDone(e.target.parentElement.getAttribute("data-id"));
  }
});

function deleteLocal(id) {
  arr = arr.filter((ele) => ele.id != id);
  local(arr);
}

function toggelDone(id) {
  console.log(id);
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id == id) {
      arr[i].done === false ? (arr[i].done = true) : (arr[i].done = false);
    }
  }
  local(arr);
}
