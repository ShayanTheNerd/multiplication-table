const TABLE_COLUMN_ROWS = 10;

export default function generateTableCells(tableBody, tableTopHeaderRow) {
	insertTopHeaderRowCells(tableTopHeaderRow);
	insertEmptyTableRows(tableBody);

	const tableTopHeaderRowCells = tableTopHeaderRow.children;
	const tableBodyRows = document.querySelectorAll('#table_body tr');

	// Keep track of the current table row and column count
	let rowCounter = 1; // The first table body row
	let columnCounter = 0;

	while (rowCounter < TABLE_COLUMN_ROWS) {
		const cellElement = document.createElement(columnCounter === 0 ? 'th' : 'td'); // Use “th” instead of “td” at the beginning of each row
		const currentRowCellNumber = +tableTopHeaderRowCells[rowCounter].textContent;
		const maxRowValue = +[...tableTopHeaderRowCells].at(-1).textContent * currentRowCellNumber;
		const value = currentRowCellNumber * +tableTopHeaderRowCells[columnCounter].textContent;

		cellElement.textContent = value;
		tableBodyRows[rowCounter - 1].append(cellElement);

		if (value === maxRowValue) {
			columnCounter = 0; // Reset the column counter
			rowCounter++; // Move to the next row
		} else {
			columnCounter++; // Move to the next column
		}
	}
}

function insertTopHeaderRowCells(tableTopHeaderRow) {
	for (let index = 1; index <= TABLE_COLUMN_ROWS; index++) {
		const thElement = document.createElement('th');

		thElement.textContent = index;
		tableTopHeaderRow.append(thElement);
	}
}

function insertEmptyTableRows(tableBody) {
	for (let index = 1; index < TABLE_COLUMN_ROWS; index++) {
		const trElement = document.createElement('tr');

		tableBody.append(trElement);
	}
}
