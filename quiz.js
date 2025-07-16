document.addEventListener("DOMContentLoaded", () => {
  const nxt = document.getElementById("nxt");
  const restart = document.getElementById("restart");
  const start = document.getElementById("start");
  const result = document.getElementById("result-container");
  const ques = document.getElementById("ques-container");
  const quizbox = document.getElementById("quiz-container");
  const questext = document.getElementById("ques-text");
  const choicelist = document.getElementById("choices");
  const scoretotal = document.getElementById("total");

  const questions = [
    {
      ques: "What is capital of Goa?",
      options: ["Ponda", "Panaji", "Mapusa", "Goregaon"],
      ans: "Panaji",
    },
    {
      ques: "What is synonym of mirage?",
      options: ["Desperation", "Mire", "Illusion", "Image"],
      ans: "Illusion",
    },
    {
      ques: "What is unit of resistance?",
      options: ["Ohm", "Mho", "Lightyear", "Ounce"],
      ans: "Ohm",
    },
    {
      ques: "Which is not a planet?",
      options: ["Mars", "Pluto", "Jupiter", "Earth"],
      ans: "Pluto",
    },
  ];

  let score = 0;
  let ind = 0;

  start.addEventListener("click", startquiz);

  function startquiz() {
    start.classList.add("hidden");
    ques.classList.remove("hidden");
    showQues(ind);
  }

  function showQues(index) {
    let userSelected = null;
    choicelist.innerHTML = "";

    let elem = questions[index];
    questext.innerText = elem.ques;
    questext.style.fontWeight = "bold";

    elem.options.forEach((option) => {
      const li = document.createElement("li");
      li.innerText = option;
      li.classList.add("cursor-pointer", "hover:text-white", "my-1", "hover:bg-sky-700");

      li.addEventListener("click", () => {
        // Reset styles
        choicelist.querySelectorAll("li").forEach((child) => {
          child.classList.remove("text-gray-400");
          child.classList.add("text-black");
        });

        li.classList.remove("text-black");
        li.classList.add("text-gray-400");

        // Call separate score calculator
        score = calculateScore(questions[index].ans, userSelected, option, score);
        userSelected = option;
      });

      choicelist.appendChild(li);
    });

    nxt.classList.remove("hidden");
  }
  
  //very important function
  function calculateScore(correctAnswer, prevSelected, newSelected, currentScore) {
    if (prevSelected !== null) {
      if (prevSelected === correctAnswer && newSelected !== correctAnswer) {
        return currentScore - 1;
      } else if (prevSelected !== correctAnswer && newSelected === correctAnswer) {
        return currentScore + 1;
      } else {
        return currentScore;
      }
    } else {
      if (newSelected === correctAnswer) {
        return currentScore + 1;
      } else {
        return currentScore;
      }
    }
  }


  nxt.addEventListener("click", () => {
    ind++;
    if (ind < questions.length) {
      showQues(ind);
    } else {
      showResult();
    }
  });

  function showResult() {
    ques.classList.add("hidden");
    result.classList.remove("hidden");
    scoretotal.innerText = `Your score: ${score} / ${questions.length}`;
  }

  restart.addEventListener("click",()=>{
    ind=0;
    score=0;
    result.classList.add("hidden");
    start.classList.remove("hidden");
    ques.classList.add("hidden");
  })
});
