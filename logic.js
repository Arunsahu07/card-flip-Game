window.onload = () => {
  function suffle(arr) {
    let len = arr.length;
    for (let currentIndex = 0; currentIndex < len; currentIndex++) {
      let randomIndex = Math.floor(Math.random() * len);
      temp = arr[currentIndex];
      arr[currentIndex] = arr[randomIndex];
      arr[randomIndex] = temp;
    }
  }
 
  let easy = document.querySelector(".easy");
  let medium = document.querySelector(".medium");
  let hard = document.querySelector(".hard");
  easy.addEventListener("click", () => {
    let arr=[]
    for (let i = 0; i < 12; i++) {
      arr[i]=(Math.floor(i / 2));
    }
    suffle(arr)
    callback(arr);
  });
  medium.addEventListener("click", () => {
    let arr = []
    for (let i = 0; i < 16; i++) {
      
      arr[i]=(Math.floor(i / 2));
    }
    suffle(arr);
    callback(arr);
  });
  hard.addEventListener("click", () => {
    arr = []
    for (let i = 0; i < 20; i++) {
      arr[i]=(Math.floor(i / 2));
    }
    suffle(arr)
    callback(arr);
    

  });
  
  
  
};


const callback = (arr)=>{
  let container = document.querySelector(".container");
  while(container.lastChild)
  {
    container.removeChild(container.lastChild);
  }
  let msg = document.querySelector(".msg");
  let score = document.querySelector(".score");
  score.innerHTML = "Your score: 0"
  let points = 0;
  if(arr.length===20)
  {
    container.style.gridTemplateColumns = "repeat(5,1fr)";
  }
  else
  {
    container.style.gridTemplateColumns = "repeat(4,1fr)";
  }
  function makeBlock(id) {
    let block = document.createElement("div");
    block.style.width = "15vh";
    block.style.height = "15vh";
    block.style.background = "linear-gradient(145deg, #ff7a7a, #e46767)";
    block.setAttribute("id", "" + id);
    block.className = "block";
    block.style.display = "inline-block";
    block.innerHTML = "";
    return block;
  }
  let ind = 0;
  while (ind < arr.length) {
    container.appendChild(makeBlock(ind, arr[ind]));
    ind++;
  }

  blocks = document.querySelectorAll(".block");
  console.log(blocks);
  blocks.forEach((e) => {
    e.addEventListener("click", action);
  });
  let clickedBoxes = [];
  function action() {
    this.style.transform = "rotateY(360deg)";
    setTimeout(() => {
      if (this.classList.contains("alreadyClicked") === false) {
        this.classList.add("alreadyClicked");
        clickedBoxes.push(this);
        console.log(clickedBoxes.length);
        this.innerHTML = arr[parseInt(this.id)];
      }
      if (clickedBoxes.length == 2) {
        if (clickedBoxes[0].innerHTML === clickedBoxes[1].innerHTML) {
          points++;
          msg.style.visibility = "visible";
          setTimeout(() => (msg.style.visibility = "hidden"), 1000);

          score.innerHTML = `Your score : ${points}`;
          if (points === arr.length/2) {
            setTimeout(() => {
              location.reload();
            }, 3000);
            setTimeout(() => {
              score.innerHTML = `Congrates! You have won the game. `;
            });
          }
          match();
        } else {
          unmatch();
        }
      }
      function match() {
        setTimeout(() => {
          clickedBoxes[0].classList.add("matched");
          clickedBoxes[1].classList.add("matched");
          clickedBoxes = [];
        }, 200);
      }
      function unmatch() {
        // alert('calling');
        setTimeout(() => {
          clickedBoxes[0].innerHTML = "";
          clickedBoxes[1].innerHTML = "";
          clickedBoxes[0].classList.remove("alreadyClicked");
          clickedBoxes[1].classList.remove("alreadyClicked");
          clickedBoxes[0].style.transform = "rotateY(0deg)";
          clickedBoxes[1].style.transform = "rotateY(0deg)";

          console.log(clickedBoxes[1]);
          clickedBoxes = [];
        }, 200);
      }
    }, 500);
  }
}
