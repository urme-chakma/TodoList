//Define UI element
let form = document.querySelector('#task_form');
let taskList = document.querySelector('#tasks');
let clearBtn = document.querySelector('#clear_task_btn');
let filter = document.querySelector('#task_filter');
let taskInput = document.querySelector('#new_task');


//Define eventListener

form.addEventListener('submit',addTask) ;
taskList.addEventListener('click',removeTask) ;
clearBtn.addEventListener('click',clearTask);
filter.addEventListener('keyup',filterTask);
document.addEventListener('DOMContentLoaded',getTasks);

//Define function
    //addTask
function addTask(e){
    e.preventDefault();
    if(taskInput.value === ''){
        alert('Add a task!');
    }else{
        //create li element
        let li = document.createElement("li");
        let t = document.createTextNode(taskInput.value + " ");
        let link = document.createElement('a');
        link.setAttribute('href','#');
        link.innerHTML = 'x';
        li.appendChild(t);
        li.appendChild(link) ;
        taskList.appendChild(li) ; 

        storeTaskInLocalStorage(taskInput.value) ;

        taskInput.value = '';
    }
}

//remove task
function removeTask(e){
   // console.log(e.target);

   if(e.target.hasAttribute("href")){
       if(confirm("Are you sure?")){
           let ele = e.target.parentElement ;
           // console.log(ele) ;
           ele.remove() ; 

           removeFromLS(ele)    //calling removeFromLS function and passing ele/list item
       }
       
   }
}


//clear Task
function clearTask(e){
   // taskList.innerHTML = "";

   //faster way
   while(taskList.firstChild){
       taskList.removeChild(taskList.firstChild);
   }

   localStorage.clear() ;
}


//Filter Task
function filterTask(e){
    let text = e.target.value.toLowerCase() ; 
   // console.log(text) ;
    document.querySelectorAll('li').forEach(task =>{
        let item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block' ;
        }
        else{
            task.style.display = 'none';
        }
    });
}


//store in local storage
function storeTaskInLocalStorage(task){
    let tasks ;
    if(localStorage.getItem('tasks') === null){
        tasks = [] ;
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task) ;

    localStorage.setItem('tasks',JSON.stringify(tasks));
}


//getTasks function defining
function getTasks(){
    let tasks ;
    if(localStorage.getItem('tasks') === null){
        tasks = [] ;
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(task => {

        let li = document.createElement("li");
        let t = document.createTextNode(task + " ");
        let link = document.createElement('a');
        link.setAttribute('href','#');
        link.innerHTML = 'x';
        li.appendChild(t);
        li.appendChild(link) ;
        taskList.appendChild(li) ; 
 
    });
}



//defining removeFromLS function
function removeFromLS(taskItem){

    let tasks ;
    if(localStorage.getItem('tasks') === null){
        tasks = [] ;
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    let li = taskItem ;
    li.removeChild(li.lastChild);  //remove ankor tag <a>x</a>
    //let str = taskItem.textContent.trim ; 

    tasks.forEach((task , index) => {
        if(li.textContent.trim() === task){
            tasks.splice(index,1) ;
        }
    }) ;

    localStorage.setItem('tasks',JSON.stringify(tasks)) ;
}