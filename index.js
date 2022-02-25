import fs from "fs";
import http from "http";
import url, { fileURLToPath } from "url";
import slugify from "slugify";
import path from "path";
import replaceTemplate from "./module/replaceTemplate.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// -------------File Start-------------------- //
/*
// Blocking, Sync way
const textInput = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textInput);
const textOut = `This is the only information you'll require about avacado: ${textInput}\nCreated at: ${new Date().toLocaleString()} `;
fs.writeFileSync("./txt/output.txt", textOut);
console.log("File Written");

// Non Blocking Async Way
console.log("Before Reading");
fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
    if (err) return console.log(err.message); 
    else
        fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
            if (err) return console.log(err.message);
            else {
                console.log(data2);
                fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
                    if (err) return console.log(err.message);
                    console.log(data3);
                    fs.writeFile(
                        "./txt/final.txt",
                        `${data1}: ${data2}\n${data3}\nAt ${new Date().toLocaleString()}`,
                        (err) => {
                            if (err) return console.log(err.message);
                            else console.log("Success");
                        }
                    );
                });
            }
        });
});
console.log("After Reading");

*/
// -------------Files Ends-------------------- //

// -------------Server-------------------- //
const productData = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8")
);

const tempOverview = fs.readFileSync(
    `${__dirname}/templates/overview.html`,
    "utf-8"
);
const tempCard = fs.readFileSync(`${__dirname}/templates/card.html`, "utf-8");
const tempProduct = fs.readFileSync(
    `${__dirname}/templates/product.html`,
    "utf-8"
);

const server = http.createServer((req, res) => {
    const { pathname: pathName, query } = url.parse(req.url, true);
    // Overview Section
    if (pathName === "/overview" || pathName === "/") {
        res.writeHead(200, {
            "Content-Type": "text/html",
        });
        const cardsHTML = productData
            .map((product) => replaceTemplate(tempCard, product))
            .join("");
        const finalTemplate = tempOverview.replace(
            "{{ PRODUCT_CARD }}",
            cardsHTML
        );
        res.end(finalTemplate);

        // Product Detail Section
    } else if (pathName === "/product") {
        const product = productData[query.id];
        if (!product) {
            res.writeHead(404, {
                "Content-Type": "text/html",
            });
            res.end("<h1>Product Not Found</h1>");
        } else {
            res.writeHead(200, {
                "Content-Type": "text/html",
            });
            const finalProductTemplate = replaceTemplate(tempProduct, product);
            res.end(finalProductTemplate);
        }
        // API
    } else if (pathName === "/api") {
        res.writeHead(200, {
            "Content-Type": "application/json",
        });
        res.end(JSON.stringify(productData));

        // 404 Not Found
    } else {
        res.writeHead(404);
        res.end("Page Not Found");
    }
});
// Server Listening
server.listen(4000, "127.0.0.1", () => {
    console.log("Listening to any request on post 4000");
});
// -------------Server Ends-------------------- //
