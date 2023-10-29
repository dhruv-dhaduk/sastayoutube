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

async function fetchDataYT(link, API_KEY)
{
    const ytVideo = get_videoID_from_link(link);
    if (ytVideo === null)
        return null;

    const videoFetchURL = `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet,contentDetails&id=${ytVideo.id}&key=${API_KEY}`;

    const videoResponse = await fetch(videoFetchURL);
    if (!videoResponse.ok)
        return null;
    const videoJSON = await videoResponse.json();

    if (!videoJSON.items.length)
        return null;

    const channelId = videoJSON.items[0].snippet.channelId;
    const channelFetchURL = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${API_KEY}`;

    const channelResponse = await fetch(channelFetchURL);
    if (!channelResponse.ok)
        return null;
    const channelJSON = await channelResponse.json();

    return {videoJSON, channelJSON};

}