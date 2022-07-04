// Get all id/classes from DOM
const domStrings = {
    headerNumbersRow: 'headerNumbers',
    selectedClass: 'selected',
    alertBox: 'smallScreenAlertBox',
}

// Declare variables
const tds = document.getElementsByTagName('td');
const ths = document.getElementsByTagName('th');

// Delete small-screen-alert-box on click
document.getElementById(domStrings.alertBox).addEventListener('click', function () {
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

// Add/remove 'selected' class for relevant 'th' elements
function toggleSelectedOnHeaderCells(tdCell, toggleState) {
    // An empty array for all sibling 'td' elements in a row
    const rowmates = [];

    // All sibling 'td' elements in a row
    const siblingTds = tdCell.parentElement.getElementsByTagName('td');

    // Populate 'rowmates' array
    for (const tdCell of siblingTds) {
        rowmates.push(tdCell.textContent);
    }

    // Index of the current 'td' element
    const currentTdIndex = rowmates.indexOf(tdCell.textContent);

    // Select relevant 'th' element based on the index of the current 'td' element
    if (toggleState === 'add') {
        document.getElementById(domStrings.headerNumbersRow).getElementsByTagName('th')[(currentTdIndex + 1)].classList.add(domStrings.selectedClass);
    } else if (toggleState === 'remove') {
        document.getElementById(domStrings.headerNumbersRow).getElementsByTagName('th')[(currentTdIndex + 1)].classList.remove(domStrings.selectedClass);
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