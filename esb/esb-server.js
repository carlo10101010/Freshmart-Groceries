require("dotenv").config();
const express = require("express");
const cors = require("cors"); 


const productServices = require("./routes/inventory-route");
const posServices = require("./routes/pos-routes");
const authService = require("./routes/auth-routes");
const employeeRoutes = require("./routes/employeeRoutes");

const mapper = "/api/v1";


const app = express();


app.use(express.json());
app.use(cors()); 

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});


app.use(`${mapper}/inventory`, productServices);
app.use(`${mapper}/pos`, posServices);
app.use(`${mapper}/auth`, authService);
app.use("/api", employeeRoutes);


app.use((req, res) => {
    res.status(404).json({ error: "No such endpoint exists" });
});


const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
    console.log(`✅ Listening on port ${PORT}`);
});
