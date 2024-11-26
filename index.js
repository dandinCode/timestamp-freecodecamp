
var express = require("express");
var app = express();
var cors = require("cors");

app.use(cors({ optionsSuccessStatus: 200 })); // Enable CORS
app.use(express.static("public")); // Serve static files

// Root route
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// API endpoint for timestamp
app.get("/api/:date?", (req, res) => {
  const { date } = req.params;

  // Caso o parâmetro esteja vazio, retornar a data atual
  if (!date) {
    const now = new Date();
    return res.json({ unix: now.getTime(), utc: now.toUTCString() });
  }

  // Tentar interpretar a data
  const parsedDate = !isNaN(date) ? new Date(parseInt(date)) : new Date(date);

  // Retornar erro se a data for inválida
  if (parsedDate.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Retornar data válida
  res.json({ unix: parsedDate.getTime(), utc: parsedDate.toUTCString() });
});

// Listen on the environment port or 3000 by default
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});