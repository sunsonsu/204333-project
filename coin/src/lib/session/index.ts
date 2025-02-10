import Session from "express-session";

const session = Session({
    secret: process.env.SECRET_KEY || "",
    resave: true,
    saveUninitialized: true,
})

export default session;