import mongoose from 'mongoose'

const ArticleSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true },
    image:{type:String},
    article:{type:String},
    heading:{type:String}
},{timestamps:true})

export default mongoose.models.Article || mongoose.model('Article',ArticleSchema)