console.log('server.js is working');
let express = require('express');//brings in express
let app = express();//makes server app
const PORT = 5000;

//respond with assets
app.use(express.static('server/public'));


//allow for incoming request
app.listen(PORT, function(){
    console.log('app is running on ', PORT);
});

