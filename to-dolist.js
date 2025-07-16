document.addEventListener("DOMContentLoaded", function () {
  const lst = document.getElementById("tasks");
  const addbtn = document.getElementById("task-btn");
  const inputbar = document.getElementById("newtask");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


  addbtn.addEventListener("click", () => {
    if (!inputbar.value) return;
    const newitem = {
      id: Date.now(),
      val: inputbar.value,
      done: false
    };
    tasks.push(newitem);
    savetasks();
    rendertasks(newitem);
    inputbar.value = "";
  });

  function rendertasks(newitem) {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${newitem.val}</span>
      <button class="delete-btn" style="background-color: #702963; padding:0 1px; border-radius: 1px; position:absolute; right: 4px;">Delete</button>
    `;

    li.setAttribute("style","margin-bottom:3px;");
    lst.appendChild(li);

    li.querySelector(".delete-btn").addEventListener("click", () => {
      tasks = tasks.filter(p => p.id !== newitem.id);
      savetasks();
      li.remove();
    });
  }

  function savetasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  document.getElementById("clear_all").addEventListener("click",()=>{
    let n=tasks.length;
    for (let i=0;i<n;i++) lst.lastChild.remove();
    while (tasks.length>0){
      tasks.pop();
    }
  savetasks();
  });
  tasks.forEach(rendertasks);
});
 /*
  Page just loaded? → show all previously saved tasks using tasks.forEach(rendertasks)
  User adds a new task? → show that one using rendertasks(newitem)
  */