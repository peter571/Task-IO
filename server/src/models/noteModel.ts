import mongoose, { Schema, Types, model } from "mongoose";

interface INote {
    title: string
    text: string
    user: Types.ObjectId
    workspace_id: Types.ObjectId
}

const noteModel = new Schema<INote>({
    title: { type: String, required: true },
    text: { type: String, required: true },
    user: {type: Schema.Types.ObjectId, required: true, ref: 'User', index: true },
    workspace_id: { type: Schema.Types.ObjectId, required: true, ref: 'Space', index: true}
}, {
    timestamps: true
})

export const Note = model("Note", noteModel)
