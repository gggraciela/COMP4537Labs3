const http = require("http");
const url = require("url");
const getDate = require("./modules/utils.js"); // Import the getDate function
const messages = require("./lang/en/en.js"); // Import user-facing messages

const PORT = process.env.PORT || 3000; // Use Render's assigned port

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;

    if (pathname === "/getDate") {
        const name = query.name || "Guest";
        const message = `<p style="color:blue">${messages.greeting.replace("%1", name)} ${getDate()}</p>`;
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(message);
    } else if (pathname === "/writeFile") {
        const fs = require("fs");
        const text = query.text;

        if (!text) {
            res.writeHead(400, { "Content-Type": "text/plain" });
            res.end("Error: No text provided to write.");
            return;
        }

        fs.appendFile("file.txt", text + "\n", (err) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("Error writing to file.");
            } else {
                res.writeHead(200, { "Content-Type": "text/plain" });
                res.end("Successfully wrote to file.");
            }
        });
    } else if (pathname.startsWith("/readFile")) {
        const fs = require("fs");
        const filename = pathname.replace("/readFile/", "");

        fs.readFile(filename, "utf8", (err, data) => {
            if (err) {
                res.writeHead(404, { "Content-Type": "text/plain" });
                res.end(`Error 404: File '${filename}' not found.`);
            } else {
                res.writeHead(200, { "Content-Type": "text/plain" });
                res.end(data);
            }
        });
    } else {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("<h1>404 Not Found</h1>");
    }
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server running at http://0.0.0.0:${PORT}/`);
});
