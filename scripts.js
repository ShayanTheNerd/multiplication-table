// Get all id/classes from DOM
const domStrings = {
    headerNumbersRow: 'headerNumbers',
    selectedClass: 'selected',
    alertBox: 'smallScreenAlertBox',
    lightBlueBg: 'bg-light-blue',
}

// Declare variables
const tds = document.getElementsByTagName('td');
const ths = document.getElementsByTagName('th');
const trs = document.getElementsByTagName('tr');

// Delete small-screen-alert-box on click
document.getElementById(domStrings.alertBox).addEventListener('click', () => {
    this.style.display = 'none';
});

// Add/remove 'selected' class for 'td' elements
function toggleSelectedOnTds(tableCell, toggleState) {
    if (toggleState === 'add') {
        tableCell.parentElement.getElementsByTagName('th')[0].classList.add(domStrings.selectedClass);
    } else if (toggleState === 'remove') {
        tableCell.parentElement.getElementsByTagName('th')[0].classList.remove(domStrings.selectedClass);
    }
}

// Add/remove 'selected' class for relevant 'th' elements and add/remove light background highlighter
function toggleSelectedOnHeaderCells(tdCell, toggleState) {
    // An empty array for all sibling 'td' elements in a row
    const rowmates = [];

    // All sibling 'td' elements in a row
    const siblingTds = tdCell.parentElement.getElementsByTagName('td');

    for (const cellItem of siblingTds) {
        // Populate 'rowmates' array
        rowmates.push(cellItem.textContent);

        // Add light-background highlighter to the relevant row
        if (Number(cellItem.textContent) < Number(tdCell.textContent)) {
            cellItem.classList.add(domStrings.lightBlueBg);
        }
    }

    // Index of the current 'td' element
    const currentTdIndex = rowmates.indexOf(tdCell.textContent);

    // Add light-background highlighter to the relevant cols
    for (let i = 1; i < 9; i++) {
        if (Number(trs[i].getElementsByTagName('td')[currentTdIndex].textContent) < Number(tdCell.textContent)) {
            trs[i].getElementsByTagName('td')[currentTdIndex].classList.add(domStrings.lightBlueBg);
        }
    }

    // Select relevant 'th' element based on the index of the current 'td' element
    if (toggleState === 'add') {
        document.getElementById(domStrings.headerNumbersRow).getElementsByTagName('th')[(currentTdIndex + 1)].classList.add(domStrings.selectedClass);
    } else if (toggleState === 'remove') {
        document.getElementById(domStrings.headerNumbersRow).getElementsByTagName('th')[(currentTdIndex + 1)].classList.remove(domStrings.selectedClass);

        // Remove light-background highlighter from all cols and rows
        for (const cellItem of siblingTds) {
            cellItem.classList.remove(domStrings.lightBlueBg);
        }
        for (let i = 1; i < 9; i++) {
            trs[i].getElementsByTagName('td')[currentTdIndex].classList.remove(domStrings.lightBlueBg);
        }
    }
}

// Loop through all 'td' elements for 'mouseenter' and 'mouseleave' events
for (const td of tds) {
    td.addEventListener('mouseenter', () => {
        // Add 'selected' class to the current 'td' element
        toggleSelectedOnTds(td, 'add');

        // Add 'selected' class to the relevant 'th' element
        toggleSelectedOnHeaderCells(td, 'add');
    });

    td.addEventListener('mouseleave', () => {
        // Remove 'selected' class from the current 'td' element
        toggleSelectedOnTds(td, 'remove');

        // Remove 'selected' class from the relevant 'th' element
        toggleSelectedOnHeaderCells(td, 'remove');
    });
}

// Loop through all 'th' elements for 'mouseenter' and 'mouseleave' events
for (const th of ths) {
    th.addEventListener('mouseenter', function () {
        document.getElementById(domStrings.headerNumbersRow).getElementsByTagName('th')[(0)].classList.add(domStrings.selectedClass);
    });
    th.addEventListener('mouseleave', function () {
        document.getElementById(domStrings.headerNumbersRow).getElementsByTagName('th')[(0)].classList.remove(domStrings.selectedClass);
    });
}
