const Mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new Mongoose.Schema({
    id: { type: Object },
    name: { type: String, required: true },
    apellido: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    pais: { type: String, required: true },
    email: { type: String, required: true },
    cedula: { type: String, required: true },
    password: { type: String, required: true },
    fechaNacimiento: { type: Date, required: true },
});

userSchema.pre('save', function (next) {
    if (this.isModified('password') || this.isNew) {
        const document = this;
        bcrypt.hash(document.password, 10, (err, hash) => {
            if (err) {
                next(err);
            } else {
                document.password = hash;
                next();
            }
        })
    }
});

module.exports = Mongoose.model("user", userSchema);