const mongoose = require('mongoose')


const connectedDB = async () => {
    try{

        if(mongoose.connections[0].readyState){
            return true
        }else {
            await mongoose.connect(process.env.MONGODB_URL)            
        }

    }catch(err){

        console.log('connected to database error ==>',err);
        
    }
}

export default connectedDB