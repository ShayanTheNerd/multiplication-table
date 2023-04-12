'use strict';

// global variable
const tableTopHeaderRow = document.querySelector('#tableTopHeaderRow');

// dynamically generate table cells
{
	const TABLE_COL_ROW_COUNT = 10;
	const tableBody = document.querySelector('#tableBody');

	// create and insert top heading cells
	for (let i = 1; i <= TABLE_COL_ROW_COUNT; i++) tableTopHeaderRow.insertAdjacentHTML('beforeend', `<th>${i}</th>`);

	// create and insert rows in the table body
	for (let i = 1; i < TABLE_COL_ROW_COUNT; i++) tableBody.insertAdjacentHTML('beforeend', '<tr></tr>');

	// create variables to keep track of row and column count
	let colCounter = 0; // the first column
	let rowCounter = 1; // the first body row (the table row is the header row)

	// create variables to store header row cells and table body rows
	const tableTopHeaderRowCells = [...tableTopHeaderRow.children];
	const tableBodyRows = [...document.querySelectorAll('#tableBody tr')];

	// generate table body cells
	while (rowCounter < TABLE_COL_ROW_COUNT) {
		const value = +tableTopHeaderRowCells[rowCounter].textContent * +tableTopHeaderRowCells[colCounter].textContent;
		const maxRowValue = +tableTopHeaderRowCells.at(-1).textContent * +tableTopHeaderRowCells[rowCounter].textContent;

		const insertNewCell = markup => tableBodyRows[rowCounter - 1].insertAdjacentHTML('beforeend', markup);

		// insert 'th' instead of 'td' at the beginning of each row
		const cellMarkup = colCounter === 0 ? `<th>${value}</th>` : `<td>${value}</td>`;
		insertNewCell(cellMarkup);

		if (value === maxRowValue) {
			colCounter = 0; // reset the column count to 0 for the next row
			rowCounter++; // move to the next row
			continue;
		}

		colCounter++; // move to the next column
	}
}

// init the app based on user's device
{
	// detect user's device
	const { userAgent: deviceInfo } = navigator;
	const deviceIsDesktop = !(/Mobi|Android/i.test(deviceInfo) || /iPhone|iPad|iPod/i.test(deviceInfo));

	if (!deviceIsDesktop) {
		const warningModal = document.querySelector('#warningModal');
		const closeModalBtn = document.querySelector('#closeModalBtn');

		warningModal.showModal();

		closeModalBtn.addEventListener('click', () => warningModal.close());
	}

	const table = document.querySelector('#table');
	const interaction = deviceIsDesktop ? 'mouseover' : 'click';

	// mark corresponding table cells
	table.addEventListener(interaction, event => {
		const { target, currentTarget } = event;

		if (target === currentTarget) return;

		clearMarkedCells();
		selectCell(target);
		highlightRelatedCells(target);
	});

	// clear table when clicking or navigating mouse outside of it
	['click', 'mouseout'].forEach(event => {
		document.documentElement.addEventListener(event, e => !e.target.closest('#table') && clearMarkedCells());
	});
}

// helper functions
function highlightRelatedCells(cell) {
	const tabletableTopHeaderRowCells = [...tableTopHeaderRow.children];

	if (cell.tagName === 'TH') return selectCell(tabletableTopHeaderRowCells[0]);

	// get coordinates of current cell and its neighbors
	const cellValue = +cell.textContent;
	const cellRowmates = [...cell.closest('tr').children].filter(item => item.tagName === 'TD'); // all 'td' elements in the same row
	const cellIndexInRow = cellRowmates.map(item => +item.textContent).indexOf(cellValue); // index of 'cell' in the same row
	const rowsInTableBody = [...cell.closest('#tableBody').querySelectorAll('tr')]; // all rows in the body of the table
	const cellColmates = rowsInTableBody.map(row => row.querySelector(`td:nth-of-type(${cellIndexInRow + 1})`)); // all cells in the same col
	const cellIndexInCol = cellColmates.map(item => +item.textContent).indexOf(cellValue); // index of 'cell' in the same col

	// highlight corresponding cells in the same row and column
	/* prettier-ignore */
	[...cellRowmates, ...cellColmates].forEach(item => (+item.textContent < cellValue) && highlightCell(item));

	// add 'selected-cell' class to corresponding cells in side and top headings
	const tableSideHeadingCells = [...document.querySelectorAll('#tableBody tr th')];
	selectCell(tabletableTopHeaderRowCells[cellIndexInRow + 1]);
	selectCell(tableSideHeadingCells[cellIndexInCol]);
}

function selectCell(cell) {
	cell.classList.add('selected-cell');
}

function highlightCell(cell) {
	cell.classList.add('highlighted-cell');
}

function clearMarkedCells() {
	document.querySelectorAll('.selected-cell, .highlighted-cell')?.forEach(cell => {
		cell.classList.remove('selected-cell', 'highlighted-cell');
	});
}
