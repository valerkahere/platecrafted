import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import "express-async-errors";
import items from "./routes/items.mjs";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

// app.use("/meals", items): You are telling Express, "Everything inside the items router lives in the /meals folder."router.post("/meals", ...): Inside that file, you are saying, "Create a sub-path called /meals."Express sticks them together like a string, resulting in:Base Folder + Sub Path = /meals + /meals = /meals/meals
// Load the /posts routes
app.use("/meals", items);



// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

// Global error handling
// Must be in the end
app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.")
})
