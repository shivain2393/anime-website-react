import mongoose from "mongoose";

const userSchema = mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },

    avatar:{
        type: String,
        default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
    },

    backgroundImage: {
        type: String,
        default: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ff1e3a0b-d453-4f25-9d40-b639ea34eac6/d8b0e2q-c3445053-675a-4952-9be8-11884fd5c7d7.jpg/v1/fill/w_1192,h_670,q_70,strp/default_background_by_linuxdeepin_d8b0e2q-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTA4MCIsInBhdGgiOiJcL2ZcL2ZmMWUzYTBiLWQ0NTMtNGYyNS05ZDQwLWI2MzllYTM0ZWFjNlwvZDhiMGUycS1jMzQ0NTA1My02NzVhLTQ5NTItOWJlOC0xMTg4NGZkNWM3ZDcuanBnIiwid2lkdGgiOiI8PTE5MjAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.J85yEV8oIlv0hFfUg-1IzSAijOrTpunEY0PMdWYDtBE'
    },

    watchList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'anime'
    }]


}, { timestamps: true})


export const User = mongoose.model('user', userSchema);