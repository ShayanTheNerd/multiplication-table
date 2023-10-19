export default function clearAllMarkedCells() {
	document.querySelectorAll('.table__cell--selected, .table__cell--highlighted')?.forEach(cell => {
		cell.classList.remove('table__cell--selected', 'table__cell--highlighted');
	});
}
