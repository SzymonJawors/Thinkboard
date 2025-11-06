import moongoose from 'mongoose';

const noteSchema = new moongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
}, { timestamps: true });

const Note = moongoose.model('Note', noteSchema);

export default Note;