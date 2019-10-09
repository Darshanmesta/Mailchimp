const express= require("express")
const bodyParser= require("body-parser")
const request= require("request")
const app =express()

app.use(express.static("Public"))
app.use(bodyParser.urlencoded({extended:true}))

app.get("/",function(req,res){
  res.sendFile(__dirname + "/NewGitPro.html")
})


app.post("/",function(req,res){
 var fName= req.body.firstname
 console.log(fName)
 var lName= req.body.secondname
 console.log(lName)
 var email= req.body.email

 var data = {
   members:[{
     email_address: email ,
     status: "subscribed",
     merge_fields: {
       FNAME: fName,
       LNAME: lName
     }
   }]


 }

 var jsonData= JSON.stringify(data)

 var options= {
   url:"https://us20.api.mailchimp.com/3.0/lists/266a54189e" ,
   method: "POST" ,
   headers:  {
     "Authorization" : "Darshan ff447f22e3ca212bf1ef8d0525449e8f-us20"
   },

   body: jsonData

 }

request(options,function(error,response,body){
   console.log(response.statusCode)

  if(error){
    console.log(error)
    res.sendFile(__dirname + "/Failure.html")
  }
  else{
    if(response.statusCode === 200){
      res.sendFile(__dirname + "/Success.html")
    }
    else{
      res.sendFile(__dirname + "/Failure.html")
    }
  }
})

})

app.post("/failure",function(req,res){
  res.redirect("/")
})

app.listen(3000,function(){
  console.log("Hello Server is Up and Running on 3000")
})

//Api key
// ff447f22e3ca212bf1ef8d0525449e8f-us20

//LIST unique ID
//266a54189e
