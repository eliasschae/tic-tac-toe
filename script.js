let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
];

let currentPlayer = 'circle'; 

function init() {
    render();
    addCellClickHandlers();
}

function render() {
    const contentDiv = document.getElementById('content');

    let tableHtml = '<table>';
    for (let i = 0; i < 3; i++) {
        tableHtml += '<tr>';
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            let symbol = '';
            if (fields[index] === 'circle') {
                symbol = '<svg width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg"><circle cx="35" cy="35" r="30" fill="#81bf1d" stroke="none" /></svg>'; // SVG code for circle
            } else if (fields[index] === 'cross') {
                symbol = '<svg width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg"><line x1="10" y1="10" x2="60" y2="60" stroke="#b4bf1d" stroke-width="8"/><line x1="10" y1="60" x2="60" y2="10" stroke="#FFD700" stroke-width="8"/></svg>'; // SVG code for cross
            }
            tableHtml += `<td id="cell-${index}" onclick="cellClickHandler(${index})">${symbol}</td>`;
        }
        tableHtml += '</tr>';
    }
    tableHtml += '</table>';

    contentDiv.innerHTML = tableHtml;
}

function cellClickHandler(index) {
    if (fields[index] === null) { 
        fields[index] = currentPlayer;
        currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle'; 

        render(); 
        checkWinner(); 
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6] 
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            
            displayWinningLine(combination);
            setTimeout(() => {
                resetGame();
            }, 1000);
            return;
        }
    }

    
    if (!fields.includes(null)) {
        setTimeout(() => {
            resetGame(); 
        }, 1000);
    }
}

function displayWinningLine(combination) {
    for (const index of combination) {
        const cell = document.getElementById(`cell-${index}`);
        cell.style.backgroundColor = 'white';
    }
}

function resetGame() {
    fields = [
        null, null, null,
        null, null, null,
        null, null, null,
    ];
    currentPlayer = 'circle';
    render();
}

function addCellClickHandlers() {
    for (let i = 0; i < 9; i++) {
        const cell = document.getElementById(`cell-${i}`);
        cell.addEventListener('click', () => cellClickHandler(i));
    }
}

init();

function generateCircleSVG() {
    const svgCode = `
        <svg width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
            <circle cx="35" cy="35" r="30" fill="transparent" stroke="#00B0EF" stroke-width="5">
                <animate attributeName="r" from="0" to="30" dur="2s" fill="freeze" />
            </circle>
        </svg>
    `;
    return svgCode;
}

const circleSVG = generateCircleSVG();
console.log(circleSVG);