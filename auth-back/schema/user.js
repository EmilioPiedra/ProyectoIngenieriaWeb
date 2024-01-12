const Mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const { generateAccessToken, generateRefreshToken } = require("../auth/generateTokens");
const getUserInfo = require("../lib/getUserInfo");
const Token = require("../schema/token");

const userSchema = new Mongoose.Schema({
    id: { type: Object },  // Considera si realmente necesitas esta propiedad adicional
    name: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    apellido: { type: String, required: true },
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
        });
    }
});
userSchema.methods.usernameExists = async function (userName) {
    const result = await Mongoose.model("user").find({ userName: userName });
    return result.length > 0;
};

userSchema.methods.comparePassword = async function (password, hash) {
    console.log(password, hash);
    const same = await bcrypt.compare(password, hash);

    return same;
};

userSchema.methods.createAccessToken = function () {
    return generateAccessToken(getUserInfo(this));
};

userSchema.methods.createRefreshToken = async function () {
    const refreshToken = generateRefreshToken(getUserInfo(this));

    console.error("refreshToken", refreshToken);

    try {
        const token = new Token({ token: refreshToken });
        await token.save();
        console.log("Token saved", refreshToken);
        return refreshToken;
    } catch (error) {
        console.error(error);
        throw new Error("Error creating token");
    }
};

module.exports = Mongoose.model("user", userSchema);