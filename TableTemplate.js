
class TableTemplate {
    static fillIn(tableId, dictionary, columnName) {
        const table = document.getElementById(tableId);

        if (!table) {
            return;
        }

        const headerRow = table.rows[0];
        this._processRow(headerRow, dictionary);

        if (columnName) {
            const columnIndex = this._getColumnIndex(headerRow, columnName);
            if (columnIndex !== -1) {
                for (let i = 1; i < table.rows.length; i++) {
                    const row = table.row[i].cells[columnIndex];
                    this._processRow(row, dictionary);
                }
            }
        } else {
            for (let i = 1; i < table.rows.length; i++) {
                const row = table.rows[i];
                this._processRow(row, dictionary);
            }
        }

        table.style.visibility = 'visible';
    }
    static _processRow(row, dictionary) {
        for (let i = 0; i < row.cells.length; i++) {
            const cell = row.cells[i];
            this._processCell(cell, dictionary);
        }
    }

    static _processCell(cell, dictionary) {
        const text = cell.textContent.trim();
        const regex = /{{\s*(\w+)\s*}}/g;
        const replacedText = text.replace(regex, (match, key) => {
            return dictionary[key] || '';
        });
        cell.textContent = replacedText;
    }

    static _getColumnIndex(headerRow, columnName) {
        for (let i = 0; i < headerRow.cells.length; i++) {
            if (headerRow.cells[i].textContent.trim() === columnName) {
                return i;
            }
            return -1;
        }
    }
}
