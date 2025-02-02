const http = require("http");
const url = require("url");
const getDate = require("./modules/utils").getDate;
const messages = require("./lang/en/en");

const PORT = process.env.PORT || 10000; // Use Render's assigned port or default to 3000

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;

    if (pathname.toLowerCase().includes("getdate") && query.name) {
        const responseMessage = `<p style="color:blue;">${messages.greeting.replace("%1", query.name).replace("%2", getDate())}</p>`;
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(responseMessage);
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://0.0.0.0:${PORT}/`);
});
