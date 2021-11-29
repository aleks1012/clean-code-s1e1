console.log(`
Самооценка +45:

    Каждый из 15 пунктов первого руководства соблюден:
        +2 за каждое ПОЛНОСТЬЮ выполненное правило.
    Итого за выполнение первого руководства: 30 баллов.
    Каждый из 3 пунктов расширенного руководства соблюден:
        +5 за каждое ПОЛНОСТЬЮ выполненное правило.
    Итого за выполнение второго руководства: 15 баллов.

`)
//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

let taskInput=document.querySelector(".todo-list__add-item");//Add a new task.
let addButton=document.querySelector(".todo-list__button-add");//first button
let incompleteTaskHolder=document.querySelector(".todo-list__incomplete-tasks");//ul of #incompleteTasks
let completedTasksHolder=document.querySelector(".todo-list__completed-tasks");//completed-tasks


//New task list item
let createNewTaskElement=function(taskString){

    let listItem=document.createElement("li");
    listItem.classList.add("todo-list__title");
    listItem.classList.add("todo-list__item");

    //input (checkbox)
    let checkBox=document.createElement("input");//checkbox
    checkBox.classList.add("todo-list__input");
    checkBox.classList.add("todo-list__input_checkbox");
    //label
    let label=document.createElement("label");//label
    label.classList.add("todo-list__task");
    label.classList.add("todo-list__label_task");     
    //input (text)
    let editInput=document.createElement("input");//text
    editInput.classList.add("todo-list__input");
    editInput.classList.add("todo-list__input_text");
    editInput.classList.add("todo-list__task");
    //button.edit
    let editButton=document.createElement("button");//edit button
    editButton.classList.add("todo-list__button");
    editButton.classList.add("todo-list__button-edit");

    //button.delete
    let deleteButton=document.createElement("button");//delete button
    deleteButton.classList.add("todo-list__button");
    deleteButton.classList.add("todo-list__button-delete");
    let deleteButtonImg=document.createElement("img");//delete button image
    deleteButtonImg.classList.add("todo-list__image-delete");
    deleteButtonImg.setAttribute("alt", "delete button");

    label.innerText=taskString;
    //label.className='task';

    //Each elements, needs appending
    checkBox.type="checkbox";
    editInput.type="text";

    editButton.innerText="Edit"; //innerText encodes special characters, HTML does not.
    //editButton.className="edit";

    //deleteButton.innerText="Delete";
    //deleteButton.className="delete";
    deleteButtonImg.src='./remove.svg';
    deleteButton.appendChild(deleteButtonImg);


    //and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}



let addTask=function(){
    console.log("Add Task...");
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;
    let listItem=createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value="";

}

//Edit an existing task.

let editTask=function(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");


    let listItem=this.parentNode;

    let editInput=listItem.querySelector(".todo-list__input_text");
    let label=listItem.querySelector(".todo-list__label_task");
    let editBtn=listItem.querySelector(".todo-list__button-edit");
    let containsClass=listItem.classList.contains("todo-list__edit-mode");
    //If class of the parent is .editmode
    if(containsClass){

        //switch to .editmode
        //label becomes the inputs value.
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
    }else{
        editInput.value=label.innerText;
        editBtn.innerText="Save";
    }

    //toggle .editmode on the parent.
    listItem.classList.toggle("todo-list__edit-mode");
};


//Delete task.
let deleteTask=function(){
    console.log("Delete Task...");

    let listItem=this.parentNode;
    let ul=listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


//Mark task completed
let taskCompleted=function(){
    console.log("Complete Task...");

    //Append the task list item to the #completed-tasks
    let listItem=this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


let taskIncomplete=function(){
    console.log("Incomplete Task...");
//Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incompleteTasks.
    let listItem=this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}



let ajaxRequest=function(){
    console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


let bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    console.log("bind list item events");
//select ListItems children
    let checkBox=taskListItem.querySelector(".todo-list__input_checkbox");
    let editButton=taskListItem.querySelector(".todo-list__button-edit");
    let deleteButton=taskListItem.querySelector(".todo-list__button-delete");


    //Bind editTask to edit button.
    editButton.onclick=editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick=deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (let i=0; i<incompleteTaskHolder.children.length;i++){

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (let i=0; i<completedTasksHolder.children.length;i++){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.