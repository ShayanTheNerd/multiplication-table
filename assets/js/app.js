import generateTableCells from './modules/generateTableCells.mjs';
import clearAllMarkedCells from './modules/clearAllMarkedCells.mjs';
import highlightTableCells, { selectCell } from './modules/highlightTableCells.mjs';
import warnNonDesktopDevices, { deviceIsDesktop } from './modules/warnNonDesktopDevices.mjs';

const interaction = deviceIsDesktop ? 'mouseover' : 'click';
const table = document.querySelector('#table');
const tableBody = document.querySelector('#table_body');
const tableTopHeaderRow = document.querySelector('#table_top_header_row');

warnNonDesktopDevices();
generateTableCells(tableBody, tableTopHeaderRow);

table.addEventListener(interaction, ({ target, currentTarget }) => {
	if (target === currentTarget) return;

	clearAllMarkedCells();
	selectCell(target);
	highlightTableCells(target, tableTopHeaderRow.children);
});

['click', 'mouseout'].forEach(event => {
	document.documentElement.addEventListener(event, e => !e.target.closest('#table') && clearAllMarkedCells());
});
