
        const title = document.querySelector(".title");
        const cells = document.querySelectorAll(".cell");   



        const onePerson = document.querySelector('.onePerson');
        const twoPerson = document.querySelector('.twoPerson');
        
        let flag = true;
        onePerson.addEventListener('click', ()=>{
            flag = false;
            twoPerson.style.display = 'block';
            onePerson.style.display = 'none';
            console.log("twoPerson", flag);
        });
        
        twoPerson.addEventListener('click', ()=>{
            flag = true;
            onePerson.style.display = 'block';
            twoPerson.style.display = 'none';
            console.log("onePerson", flag);
        });



        let level = "Easy";
        function changeLevel() {
            const getLevel = document.getElementById("level").value;
            level = getLevel;
            console.log("Selected level", level);            
        }

        let turn = "x";
        function game(id) {
            const cell = document.getElementById(id); 

            if(!flag){
                if(turn==="x" && cell.innerHTML===""){
                    cell.innerHTML = '<i class="fa-solid fa-x"></i>';
                    turn = "o";
                    checkWinner();
                }

                else if(turn==="o" && cell.innerHTML===""){
                    cell.innerHTML = '<i class="fa-solid fa-o"></i>';
                    turn = "x";
                    checkWinner();
                }
            }

            else if(flag && cell.innerHTML===""){
                cell.innerHTML = '<i class="fa-solid fa-o"></i>';
                if(!checkWinner()) {
                   bestMove();
                }
            }
        }


        function bestMove() {
            let move;

            console.log("bestMove", level);
            console.log("null", null);
            const arrayOfCells = [];
            for (let i = 0; i < cells.length; i++) {
                if (cells[i].innerHTML === "") {
                    arrayOfCells.push(i);
                }
            }

            if (level === "Easy") {
                const randomIndex = Math.floor(Math.random() * arrayOfCells.length);
                move = arrayOfCells[randomIndex];               
            }
            else if (level === "Medium") {
                let random = Math.random() < 0.5;
                move = random ? getRandomMove(arrayOfCells) : getBestMinimaxMove(arrayOfCells);
            } 
            else if (level === "Hard") {
                let random = Math.random() < 0.8;
                move = random ? getRandomMove(arrayOfCells) : getBestMinimaxMove(arrayOfCells);
            }
            else{
                move = getBestMinimaxMove(arrayOfCells);
            }
           
            if (move !== undefined) {
                cells[move].innerHTML = '<i class="fa-solid fa-x"></i>';
                checkWinner();
            }

        }
        
        
        function getRandomMove(emptyCells) {
            const randomIndex = Math.floor(Math.random() * emptyCells.length);
            return emptyCells[randomIndex];
        }

        function getBestMinimaxMove(emptyCells) {
            let bestScore = -Infinity;
            let bestMove;
            for (let i of emptyCells) {
                cells[i].innerHTML = '<i class="fa-solid fa-x"></i>';
                let score = minimax(false);
                cells[i].innerHTML = "";
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
            }
            return bestMove;
        }

        function minimax(isMaximizing) {
            const result = checkWinnerState();
            if (result !== null) {
                return result;
            }

            if (isMaximizing) {
                let bestScore = -Infinity;
                for (let i = 0; i < cells.length; i++) {
                    if (cells[i].innerHTML === "") {
                        cells[i].innerHTML = '<i class="fa-solid fa-x"></i>';
                        let score = minimax(false);
                        cells[i].innerHTML = "";
                        bestScore = Math.max(score, bestScore);
                    }
                }
                return bestScore;
            } else {
                let bestScore = Infinity;
                for (let i = 0; i < cells.length; i++) {
                    if (cells[i].innerHTML === "") {
                        cells[i].innerHTML = '<i class="fa-solid fa-o"></i>';
                        let score = minimax(true);
                        cells[i].innerHTML = "";
                        bestScore = Math.min(score, bestScore);
                    }
                }
                return bestScore;
            }
        }


        function checkWinnerState() {
            const winningCombinations = [
              [1, 2, 3],
              [4, 5, 6],
              [7, 8, 9],
              [1, 4, 7],
              [2, 5, 8],
              [3, 6, 9],
              [1, 5, 9],
              [3, 5, 7],
            ];
          
            for (const combination of winningCombinations) {
              const [a, b, c] = combination;
              if (
                cells[a - 1].innerHTML !== "" &&
                cells[a - 1].innerHTML === cells[b - 1].innerHTML &&
                cells[a - 1].innerHTML === cells[c - 1].innerHTML
              ) 
              {
                return cells[a - 1].innerHTML.includes("x") ? +1 : -1;
              }
            }
          
            // If all cells filled => tie
            if ([...cells].every((cell) => cell.innerHTML !== "")) {
              return 0;
            }
          
            // Game not finished yet
            return null;
          }

        
        function checkWinner() {
            console.log("level", level);
            const winningCombinations = [
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9],
                [1, 4, 7],
                [2, 5, 8],
                [3, 6, 9],
                [1, 5, 9],
                [3, 5, 7]
            ];

            for (const combination of winningCombinations) {
                const [a, b, c] = combination;
                if (cells[a - 1].innerHTML !== "" && 
                cells[a - 1].innerHTML === cells[b - 1].innerHTML && 
                cells[a - 1].innerHTML === cells[c - 1].innerHTML) {
                    Winner(a, b, c);
                    return true;
                }
            }

            return false;
        }
        

        function Winner(a,b,c){

            title.innerHTML = cells[a - 1].innerHTML + " wins!";
            document.getElementById(a).style.backgroundColor = "green";
            document.getElementById(b).style.backgroundColor = "green"; 
            document.getElementById(c).style.backgroundColor = "green";
        }


        function resetGame() {
            cells.forEach(cell => {
                cell.innerHTML = "";
                cell.style.backgroundColor = "#1f1f1f";
            });
            turn = "x";
            title.innerHTML = "x vs o";
            onePerson.style.display = 'block';
            twoPerson.style.display = 'none';
            flag = true;
        
        }


