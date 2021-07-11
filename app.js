const express = require("express")
const request = require("request")
const https = require("https")

const app = express()

app.use(express.static(__dirname))
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(3000, () => {
})

app.get("/", (req, res) => {
        res.sendFile(__dirname + "/signup.html")
    }
)

app.post("/", (req, res) => {
    let name = req.body.name
    let email = req.body.email

    console.log(name, email)

    let data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: name,
                    PHONE: "87772002020"
                }
            }
        ]
    }

    let jsonData = JSON.stringify(data)
    const url = "https://us6.api.mailchimp.com/3.0/lists/951530fc68"
    const options = {
        method: "POST",
        auth: "u:a661ff30ac2d888b16f0c2054a94cc5d-us6"
    }

    let requestMail = https.request(url, options, (response) => {
        response.on("data", (data)=>{
            console.log(JSON.parse(data))
        })
    })
    requestMail.write(jsonData)
    requestMail.end()
})

//a661ff30ac2d888b16f0c2054a94cc5d-us6

//951530fc68