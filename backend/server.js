const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const http = require("http")
const cors = require("cors")
require('dotenv').config();
const {neon} = require("@neondatabase/serverless")
const port = 3000

const sql = neon(process.env.DATABASE_URL)

app.use(cors())
app.use(bodyParser.json())

app.post("/addExpense", async (req,res) => {
        
        const {expense, price, category} = req.body

        try {
            const query = await sql`INSERT INTO expenses (expense, price, category) VALUES (${expense}, ${price}, ${category}) RETURNING*`
            
            //Erfolgreich hinzugefügt
            res.status(200).json({message: "Erfolgreich hinzugefügt"})
        }

        catch(error) {
            console.log("ERROR AUFGETRETEN: ", error)
            res.status(500).json({message: "Fehler aufgetreten"})
        }


        return res.status(200)
})

app.get("/", async (req,res) => {

    try {
        const query = await sql`SELECT * FROM expenses`
        res.status(200).json({data: query})
    }

    catch(error) {
        console.log("FEHLER AUFGERTETEN: ", error)
        res.status(500).json({message: "Fehler aufgretreten: ", error})
    }
})


  
app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});