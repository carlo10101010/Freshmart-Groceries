const axios = require("axios");

const EMPLOYEE_SERVICE_URL = "http://127.0.0.1:8000/api/employees/";

// Get all employees (already working)
exports.getEmployees = async (req, res) => {
    try {
        const response = await axios.get(EMPLOYEE_SERVICE_URL);
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching employees:", error.message);
        res.status(500).json({ error: "Failed to fetch employees from Django service" });
    }
};

// Create a new employee (Debugging version)
exports.createEmployee = async (req, res) => {
    try {
        console.log("🔵 Incoming request to ESB:", req.body);  // Log request body

        const response = await axios.post(EMPLOYEE_SERVICE_URL, req.body, {
            headers: { 
                "Content-Type": "application/json"  // ✅ Ensure JSON content type
            }
        });

        console.log("🟢 Django Response:", response.data);  // Log response from Django
        res.status(201).json(response.data);
    } catch (error) {
        console.error("🔴 Error creating employee:", error.message);
        
        if (error.response) {
            console.error("🔴 Django Response Data:", error.response.data);  // Log Django error
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({ error: "Failed to create employee" });
        }
    }
};
