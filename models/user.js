var mongoose    =   require('mongoose');

var userSchema  =   new mongoose.Schema({
    name:{
        type:String
    },
    phno:{
        type:Number
    },
    rollno:{
        type:Number
    }
});

module.exports = mongoose.model('user',userSchema);