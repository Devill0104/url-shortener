import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password   : {
        type: String,
        required: true,
        select: false, 
    },
  });

  userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    console.log("step 4 in models clling next ageter")
    next();
  });
  userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
  }
  //removing password to be sent in req.user
  userSchema.set('toJSON',{
    transform: function(doc, ret) {
      delete ret.password;
      delete ret.__v;
      return ret;
    }
  })
  const User = mongoose.model('User', userSchema);
  export default User;