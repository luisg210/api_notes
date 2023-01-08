import Mongoose from 'mongoose';   
    
const UserSchema = Mongoose.Schema({   
    name: {
        type: String,      
        require: true   
    }, 
    user: { 
        type: String, 
        requiere: true,
        unique: true
    },
    password: { 
        type: String, 
        requiere: true 
    },
    date: {
        type: Date,
        default: Date.now
    }   
});  
 
UserSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});
    
export default Mongoose.model('Users', UserSchema);