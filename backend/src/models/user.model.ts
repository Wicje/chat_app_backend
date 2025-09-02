import mongoose, { Document, Schema } from 'mongoose';

import interface IUser extends Document {
    email: string;
    password: string;
}

const userSchema: Schema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },

        password: {
            type: String,
            required: true,
            unique: true,
            minlength: 6,
        },
    },
    { timestamps: true }
);

//Hash my password before saving
userSchema.pre("save", async function(next) {
    if (this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//Compare password
userSchema.methods.comparePassword = async function(
    candidatePassword: string
): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
}

export default mongoose.model<IUser>("User", userSchema);
