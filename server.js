const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Home Page
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// Save Patient Details
app.post("/add-patient", (req, res) => {

    const name = req.body.name;
    const dob = req.body.dob;
    const disease = req.body.disease;

    const patientData =
        `Patient Name: ${name}, DOB: ${dob}, Disease: ${disease}\n`;

    fs.appendFile(
        "patient_registry.txt",
        patientData,
        (err) => {

            if (err) {
                res.send("Error Saving Patient Data");
                return;
            }

            res.send(`
                <h2>Patient Registered Successfully</h2>
                <a href="/">Add Another Patient</a>
                <br><br>
                <a href="/patients">View Patients</a>
            `);
        }
    );
});

// View Patients
app.get("/patients", (req, res) => {

    fs.readFile(
        "patient_registry.txt",
        "utf8",
        (err, data) => {

            if (err) {
                res.send("Error Reading File");
                return;
            }

            res.send(`
                <h1>Patient Records</h1>
                <pre>${data}</pre>
                <br>
                <a href="/">Back to Form</a>
            `);
        }
    );
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
