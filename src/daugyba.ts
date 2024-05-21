import http from "http";
import url from "url";

function generateTable(difficulty: number): string[][] {
    const table: string[][] = [];
    const hiddenFieldsCount = Math.floor((100 * difficulty) / 100);
    let hiddenFields = new Set<number>();
    while (hiddenFields.size < hiddenFieldsCount) {
        let randIndex = Math.floor(Math.random() * 100);
        hiddenFields.add(randIndex);
    }

    // Add header row with numbers 1 to 10
    const headerRow: string[] = ['', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    table.push(headerRow);

    for (let i = 0; i < 10; i++) {
        const row: string[] = [];
        // Always include the number from 1 to 10 in the first column
        row.push((i + 1).toString());
        for (let j = 0; j < 10; j++) {
            const index = i * 10 + j;
            if (hiddenFields.has(index)) {
                row.push('');
            } else {
                row.push(((i + 1) * (j + 1)).toString());
            }
        }
        table.push(row);
    }

    return table;
}

function createTableHTML(table: string[][]): string {
    let html = '<table style="border-collapse: collapse; border: 1px solid black;">'; // Add border-collapse style for consistent borders

    table.forEach((row, rowIndex) => {
        html += '<tr>';
        row.forEach((cell, colIndex) => {
            let cellStyle = 'padding: 5px;';

            // Apply different style to numbers 1 to 10 in the first column and header row
            if (rowIndex === 0 && colIndex > 0) { // Header row
                cellStyle += 'font-weight: bold; text-align: center;';
            } else if (colIndex === 0 && rowIndex > 0) { // First column
                cellStyle += 'font-weight: bold; text-align: center;';
            }

            html += `<td style="${cellStyle}">${cell}</td>`;
        });
        html += '</tr>';
    });

    html += '</table>';
    return html;
}

const server = http.createServer((req, res) => {
    const query = url.parse(req.url ?? '', true).query;
    let difficulty = parseInt(query.difficulty as string) || 10;

    if (![10, 30, 50].includes(difficulty)) {
        difficulty = 10; // Default difficulty if invalid
    }

    const table = generateTable(difficulty);
    const tableHTML = createTableHTML(table);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.write('<!DOCTYPE html>');
    res.write('<html>');
    res.write('<head><title>Interaktyvus Užduočių Generatorius</title></head>');
    res.write('<body>');
    res.write('<h1>Interaktyvus Užduočių Generatorius</h1>');
    res.write('<form method="GET">');
    res.write('<label for="difficulty">Sudėtingumas:</label>');
    res.write('<select id="difficulty" name="difficulty">');
    res.write('<option value="10">10%</option>');
    res.write('<option value="30">30%</option>');
    res.write('<option value="50">50%</option>');
    res.write('</select>');
    res.write('<button type="submit">Generuoti Lentelę</button>');
    res.write('</form>');
    res.write(tableHTML);
    res.write('</body>');
    res.write('</html>');
    res.end();
});

const port = 3000;
server.listen(port, 'localhost', () => {
    console.log(`Server is running at http://localhost:${port}`);
}).on('error', (err) => {
    if ((err as NodeJS.ErrnoException).code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use. Please stop the other server or use a different port.`);
    } else {
        console.error(`Error starting the server: ${err.message}`);
    }
});
