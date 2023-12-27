const express = require('express')
const app = express()
const ejs = require('ejs')
const bodyParser = require('body-parser')
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/',  (req, res)=>{
    res.render('home', {api:false})
});

app.post('/search', async (req,res)=>{
    const keyWord = req.body.seacrh
    const api =
    "https://api.giphy.com/v1/stickers/search?api_key=Q7qiUrK68v1HdkX0wr8NDjC2hb0mRcbo&q=" +
    keyWord +
    "&limit=50&offset=0&rating=g&lang=en&bundle=messaging_non_clips"
    try{
        await fetch(api)
        .then((response)=>{
            if(!response.ok){
                throw new Error("Can't access")
            }
            return response.json()
        })
        .then((data)=>{
            
            const datapi = data.data
            res.render('home', {api:datapi})
        })
    }catch(error){
        console.error("error fetching api")
    }
    

})


app.listen(3000, ()=>{
    console.log("working")
})