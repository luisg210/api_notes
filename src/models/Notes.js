import Mongoose from "mongoose";

const NotesSchema = Mongoose.Schema({
    title: {
        type: String,

    },
    txt: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: String
    }
});

export default Mongoose.model('Notes', NotesSchema);