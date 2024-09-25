const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/users')

mongoose.connection.once('open', (error)=>{
    if (!error){
        console.log('Database conneted!!');
        

        server.listen(5000, (error)=>{
            if (!error){
                
                console.log('\r\nServer started at port: \x1b[4;32m' + server.address().port + '\x1b[0m',
                    '\r\n\x1b[30mGood to go!\x1b[0m');
            }
            else {
                console.log('\r\n\x1b[31mError: \x1b[37m', error);
            }
        })
    }
    else (
        console.log(error)
    )
});
