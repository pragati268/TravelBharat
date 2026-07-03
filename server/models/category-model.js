import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
{
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },

    slug:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },

    description:{
        type:String,
        required:true,
        trim:true
    },

    icon:{
        type:String,
        default:""
    },

    coverImage:{
        type:String,
        default:""
    },

    featured:{
        type:Boolean,
        default:false
    }

},
{
    timestamps:true
});

const categoryModel = mongoose.model("Category", categorySchema);

export default categoryModel;