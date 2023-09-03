const fs = require("fs");
const http = require("http");
const url = require("url");

const slugify = require("slugify");

const replaceTemplate = require("./module/replaceTemplate");

////////////////////////////////////////FILE////////////
// //blocking, synchronous code
// const textIn = fs.readFileSync('./txt/test.txt', 'utf-8');
// const textOut = `This is true about: ${textIn}.\n Create on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File written');

// //non-blocking, asynchronous code
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2);
//         fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//             console.log(data3);const http = require('http');

//             fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err =>{
//                 console.log('File written');
//             });
//         });
//     });
// });

////////////////////////////////////////SERVER////////////
const templateOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const templateCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const templateProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);
const slug = dataObj.map(el => slugify(el.productName, {lower : true}));

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  //Overview
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" }); //tell the browser that we're sending Overview
    const cardHtml = dataObj.map((el) => replaceTemplate(templateCard, el)).join("");
    const output = templateOverview.replace("{%PRODUCT_CARDS%}", cardHtml);
    res.end(output);
    //Product
  } else if (pathname === "/product") {
    res.writeHead(200, {
      'Content-type': 'text/html'
    });
    const product = dataObj[query.id];
    const output = replaceTemplate(templateProduct, product);
    res.end(output);
    //API
  } else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" }); //tell the browser that we're sending JSON
    res.end(data);
    //Not Found
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>Page not found!</h1>");
  }
});

server.listen(3000, () => {
  console.log("Listening from port 3000");
});
