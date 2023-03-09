const addInput = document.querySelector(".toDo-Add input");
const addBtn = document.querySelector(".toDo-Add button");
const toDos = document.querySelector(".toDoList");
const toDoList = JSON.parse(localStorage.getItem("toDoList")) || [];

let editingElement = null;

window.addEventListener("load",()=>{
  renderItems();
  addInputBlur();
});

function renderItems() {
  toDoList.forEach((item) => {
    const toDoItem = createToDoElement(item);
    toDos.appendChild(toDoItem);
  });
}

function createToDoElement(item) {
  const toDoItem = document.createElement("p");
  toDoItem.classList.add("toDoItem");
  toDoItem.textContent = item;


  const deleteBtn = createDeleteButton(item);

  const editBtn = createEditButton(toDoItem);

  toDoItem.append(deleteBtn, editBtn);

  return toDoItem;
}


function createDeleteButton(item) {
  const deleteBtn = document.createElement("i");
  deleteBtn.classList.add("fa-solid", "fa-trash", "delete");
  deleteBtn.addEventListener("click", () => {
    const index = toDoList.indexOf(item);
    if (index > -1) {
      toDoList.splice(index, 1);
      localStorage.setItem("toDoList", JSON.stringify(toDoList));
      deleteToDoElement(item);
    }
  });
  return deleteBtn;
}



function deleteToDoElement(item) {
  const toDoElements = document.querySelectorAll('.toDoItem');
  toDoElements.forEach((toDoItem) => {
    if (toDoItem.textContent === item) {
      toDoItem.remove();
    }
  });
const index=toDoElements.indexOf(item);
if(index > -1){
  toDoElements.splice(index,1);
  localStorage.setItem("toDoElements",JSON.stringify(toDoElements));
}
}

function createEditButton(toDoItem) {
  const editBtn = document.createElement("i");
  editBtn.classList.add("fa-solid", "fa-pen-to-square", "edit");
  editBtn.addEventListener("click", () => {
    editingElement = toDoItem;
    addInput.value = toDoItem.textContent;
    addBtn.textContent = "Edit";
    addInput.focus();
  });
  return editBtn;
}

function addInputBlur() {
  addInput.addEventListener("blur", () => {
    addBtn.onclick = () => {
      const inputValue = addInput.value;
      if (inputValue === "") {
        alert("Please enter an item!");
        return;
      }

      let toDoItem = null;
      if (editingElement) {
        toDoItem = editingElement;
        addBtn.textContent = "Add";
        editingElement = null;

        // Remove existing icons
        const deleteBtn = toDoItem.querySelector(".delete");
        const editBtn = toDoItem.querySelector(".edit");
        deleteBtn.remove();
        editBtn.remove();

        const index = toDoList.indexOf(toDoItem.textContent);
        if (index > -1) {
          toDoList[index] = inputValue;
          localStorage.setItem("toDoList", JSON.stringify(toDoList));
        }
      } else {
        toDoItem = document.createElement("p");
        toDoItem.classList.add("toDoItem");
        toDos.appendChild(toDoItem);

        toDoList.push(inputValue);
        localStorage.setItem("toDoList", JSON.stringify(toDoList));
      }

      // Add icons back in
      const deleteBtn = document.createElement("i");
      const editBtn = document.createElement("i");
      editBtn.classList.add("fa-solid", "fa-pen-to-square", "edit");
      deleteBtn.classList.add("fa-solid", "fa-trash", "delete");
      toDoItem.textContent = inputValue;
      toDoItem.append(deleteBtn, editBtn);
    
      editBtn.addEventListener("click", () => {
        editingElement = toDoItem;
        addInput.value = toDoItem.textContent;
        addBtn.textContent = "Edit";
        addInput.focus();
      });
    
      deleteBtn.addEventListener("click", () => {
        toDoItem.remove();
        const index = toDoList.indexOf(inputValue);
        if (index > -1) {
          toDoList.splice(index, 1);
          localStorage.setItem("toDoList", JSON.stringify(toDoList));
        }
      });
    
      addInput.value = "";
    };
  });
} 
