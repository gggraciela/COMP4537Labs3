const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");
const getDate = require("./modules/utils").getDate; // Import the getDate function
const messages = require("./lang/en/en"); // Import user-facing messages

const PORT = process.env.PORT || 10000; // Use Render's assigned port or default to 10000

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;

    // Handle GET request for /getDate
    if (pathname.toLowerCase().includes("getdate") && query.name) {
        const name = query.name || "Guest";
        const message = <p style="color:blue">${messages.greeting.replace("%1", name)} ${getDate()}</p>;
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(message);
    } 
    // Handle GET request for /writeFile
    else if (pathname.toLowerCase().includes("writefile") && query.text) {
        const filePath = path.join(__dirname, "file.txt");

        if (!query.text) {
            res.writeHead(400, { "Content-Type": "text/plain" });
            res.end("Error: No text provided to write.");
            return;
        }

        fs.appendFile(filePath, query.text + "\n", (err) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("Error writing to file.");
            } else {
                res.writeHead(200, { "Content-Type": "text/plain" });
                res.end("Successfully wrote to file.");
            }
        });
    } 
    // Handle GET request for /readFile
    else if (pathname.toLowerCase().includes("readfile")) {
        const filePath = path.join(__dirname, "file.txt");

        fs.readFile(filePath, "utf8", (err, data) => {
            if (err) {
                res.writeHead(404, { "Content-Type": "text/plain" });
                res.end("Error reading file");
            } else {
                res.writeHead(200, { "Content-Type": "text/plain" });
                res.end(data || "File is empty");
            }
        });
    } 
    // Handle invalid paths
    else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
    }
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server running at http://0.0.0.0:${PORT}/`);
});
