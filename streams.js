const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  // fs.readFile("txt/test-file.txt", (err, data) => {
  //   if (err) console.log(err);
  //   res.end(data);
  // });

  const readable = fs.createReadStream("txt/test-file.txt");
  // readable.on("data", (chuck) => {
  //   res.write(chuck);
  // });
  // readable.on("end", () => {
  //   res.end();
  // });
  // readable.on("error", (err) => {
  //   console.log(err);
  //   res.statusCode = 500;
  //   res.end("File not found");
  // });
  readable.pipe(res);
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
