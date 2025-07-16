document.addEventListener("DOMContentLoaded",()=>{
  document.body.style.backgroundColor="black";
  const inputcontainer=document.getElementById("input-container");
const cityinput=document.getElementById("cityinput");
const btn=document.getElementById("get-weather");
const display=document.getElementById("weatherinfo");
const citydisp=document.getElementById("city-name");
const temp=document.getElementById("temp");
const desc=document.getElementById("description");
const err=document.getElementById("error-msg");
let API_KEY="9107e6b05a0a6cc9f671b313846bec7f";

btn.addEventListener("click",async()=>{
  const city=cityinput.value.trim();
  if (!cityinput.value) return;

  localStorage.removeItem("weather");
  const ps = display.getElementsByTagName("p");
  for (let p of ps) {
    p.innerText = "";
  }

  //server can throw errors 
  try {
    const res=await fetchdata(city);
    showdata(res);
  } catch (error) {
    console.log(error);
    showerror();
  }
});

async function fetchdata(city){
  const url=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;
  const data=await fetch(url); //data is a Promise resolved to Response object now
   //wait for json parsing
 
  if (!data.ok){
    throw new Error("Invalid City");
  }
  else{
    const response=await data.json(); //response is a JS object now
    console.log(response);
    return response;
  }
}

function showdata(res){
    const weathercond=res.list; //weathercond is an array of length 40
   // below is super imp

    const nowUTC = Math.floor(Date.now() / 1000); // current time in UTC seconds

    let closest = weathercond[0];
    let minDiff = Math.abs(weathercond[0].dt - nowUTC);

    for (let i = 1; i < res.list.length; i++) {
      const diff = Math.abs(weathercond[i].dt - nowUTC);
      if (diff < minDiff) {
        minDiff = diff;
        closest = weathercond[i];
      }
    }
    
    display.classList.remove("hidden");
    citydisp.innerText=`${res.city.name}`;
    temp.innerText=`Temperature is : ${closest.main.temp} °C`;
    desc.innerText=`Weather is ${closest.weather[0].main}`;
    err.classList.add("hidden");

    const currentweather=closest.weather[0].main.toLowerCase();
    if (currentweather.includes("rain")) document.body.style.backgroundImage="url(./assets/rainy.jpg)";
    else if (currentweather.includes("clear"))
      document.body.style.backgroundImage="url(./assets/mild.jpg)";
    else if (currentweather.includes("cloud"))
      document.body.style.backgroundImage="url(./assets/cloudy.jpg)";
    else if (currentweather.includes("snow"))
      document.body.style.backgroundImage="url(./assets/snowy.jpg)";
    else if (currentweather.includes("storm"))
      document.body.style.backgroundImage="url(./assets/thunder.jpg)";
    else if (currentweather.includes("sun"))
      document.body.style.backgroundImage="url(./assets/sunny.jpg)";

    save();
}

function showerror(){
  display.classList.add("hidden");
  err.classList.remove("hidden");
  
  document.body.style.backgroundColor="black";
}

function save() {
  const weatherData = {
    city: citydisp.innerText,
    temperature: temp.innerText,
    description: desc.innerText,
  };
  localStorage.setItem("weather", JSON.stringify(weatherData));
}

  const saved = JSON.parse(localStorage.getItem("weather"));
  if (saved) {
  display.classList.remove("hidden");
  citydisp.innerText = saved.city;
  temp.innerText = saved.temperature;
  desc.innerText = saved.description;
  err.classList.add("hidden");
}
});