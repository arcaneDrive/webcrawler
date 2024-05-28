// importing support libraries
const express = require('express');
// 
// 
// 
// 
// 
// 
// 
// defining end points

app.get('/', (req, res) => {
    res.send('Hello, world!');
});


// 
// 
// 
//  starting the server


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
