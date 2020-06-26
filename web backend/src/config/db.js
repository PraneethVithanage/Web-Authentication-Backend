import  {connect} from "mongoose"
const mongoUrl =
  "mongodb+srv://praneeth:Ka0912225633@cluster0-0fphb.azure.mongodb.net/authSystem?retryWrites=true&w=majority";

  const connectDB = async()=>{
       try{
           await connect(mongoUrl,{
                useUnifiedTopology:true,
                useNewUrlParser:true
           });
           console.log("Connected to the Database");
        }catch(err){
            console.log(err.message);
        }
       };

       export default connectDB;
  