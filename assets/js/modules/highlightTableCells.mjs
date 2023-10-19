export default function highlightTableCells(cell, tableTopHeaderRowCells) {
	if (cell.tagName === 'TH') return selectCell(tableTopHeaderRowCells[0]);

	// Get the coordinates of the current cell and its neighbors
	const cellValue = +cell.textContent;
	const cellRowmates = [...cell.closest('tr').children].filter(item => item.tagName === 'TD'); // All “td” elements in the same row
	const cellIndexInRow = cellRowmates.map(item => +item.textContent).indexOf(cellValue) + 1; // The index of the “cell” in the same row
	const rowsInTableBody = [...cell.closest('#table_body').querySelectorAll('tr')]; // All rows in table body
	const cellColmates = rowsInTableBody.map(row => row.querySelector(`td:nth-of-type(${cellIndexInRow})`)); // All cells in the same column
	const cellIndexInCol = cellColmates.map(item => +item.textContent).indexOf(cellValue); // The index of the “cell” in the same column

	const tableSideHeadingCells = document.querySelectorAll('#table_body tr th');

	selectCell(tableSideHeadingCells[cellIndexInCol]);
	selectCell(tableTopHeaderRowCells[cellIndexInRow]);
	[...cellRowmates, ...cellColmates].forEach(item => +item.textContent < cellValue && highlightCell(item)); // Highlight corresponding cells in the same row and column
}

export function selectCell(cell) {
	cell.classList.add('table__cell--selected');
}

function highlightCell(cell) {
	cell.classList.add('table__cell--highlighted');
}
