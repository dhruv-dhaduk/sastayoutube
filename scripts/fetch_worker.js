async function fetchSheetYT()
{   
    const sheetId = "1xTdT1nE-vP_P3iG7sE1WCkGzr9U-vILrwah0D_iiEZ4";
    const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
    const sheetName = "youtube";
    const query = encodeURIComponent("Select *");
    const url = `${base}&sheet=${sheetName}&tq=${query}`;

    const response = await fetch(url);
    const text = await response.text();

    return JSON.parse(text.substring(text.indexOf('(') + 1, text.lastIndexOf(')')));
}

function readSheetYT(sheet)
{
    const links = [];
    const apiKeys = [];

    for (const row of sheet.table.rows) {
        if (row.c[1] != null)
            links.push(row.c[1].v);

        if (row.c[2] != null)
            apiKeys.push(row.c[2].v);
    }

    return {links, apiKeys};
} 