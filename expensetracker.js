document.addEventListener("DOMContentLoaded",()=>{
const expenseform=document.getElementById("expense-form");
const expensename=document.getElementById("expense-name");
const amount=document.getElementById("expense-amt");
const addbtn=document.getElementById("add-expense");
const entrylist=document.getElementById("entries");
const totalamt=document.getElementById("total");

let expenses=JSON.parse(localStorage.getItem("entries")) || [];
render();
expenseform.addEventListener("submit",(event)=>{
  event.preventDefault();
  let amt=parseFloat(amount.value.trim());
  let entry=expensename.value.trim();
  if (isNaN(amt)||amt<0||!(entry)) return;
  addnewitem(amt,entry); //adds to array and saves locally
  render();
  amount.value="";
  expensename.value="";
});

function addnewitem(amt,entry){

  const obj={
    id:Date.now(),
    name: entry,
    amt:amt
  };
  expenses.push(obj);
  savelocally();
}
function calculatetotal(expenses){
  // calculates total but where is that value going??
  let tot=0;
  expenses.forEach(element => {
    tot+=parseFloat(element.amt);
  });
  return tot;
}

function savelocally(){
  localStorage.setItem("entries",JSON.stringify(expenses));
}

function render(){
  entrylist.innerHTML="";
  let arra=JSON.parse(localStorage.getItem("entries")) ;
  arra.forEach(obj=>{
    const newen=document.createElement('li');
    newen.style.marginBottom="7px";
    newen.innerHTML=`
    <span>${obj.name}-Rs${obj.amt}</span>
    <button id="remove-item" class="std-button end-ka-btn hover-std bg-[#B660CD]">Remove</button>
    `;


    entrylist.appendChild(newen);
    const delbtn=document.getElementById("remove-item");

    newen.addEventListener("click",(event)=>{
      if(event.target.tagName === 'BUTTON')
      expenses= expenses.filter(p => p.id !== obj.id);
      savelocally();
      render();
    });
    
  });
  totalamt.textContent=`${calculatetotal(expenses)}`;
}

//render();
});
