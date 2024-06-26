const User=require("../models/User");
const bcrypt = require("bcrypt");//asynchronous function 
const jwt=require("jsonwebtoken");

// Getting all users: only Admin
exports.allUsers =(req,res)=>{
		User.find(function (err, users) {
			if (!err) {
				res.status(200).json({users:users});
			}
			else {
				res.send(err);
			}
		})
}

// Updating users password :only admin
exports.updateUser = async (req,res)=>{
    
    const username=req.body.username;
    const password=req.body.password;
    const userInfo=await User.findOne({username});
    !userInfo && res.status(404).json({err:"user does not exits"})
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(req.body.password,salt);
    User.updateOne({username:username},{$set: {password:hashedPassword}},function(err){
                if(!err){
                    res.status(200).json("Successfully updated password.")
                }else{
                    res.status(500).json(err);
                }
            }
    )

}

//Deleting User :only admin
exports.deleteUser= (req,res)=>{
    
    User.deleteOne({username:req.params.username},function(err){
        if(!err){
            const payload={
                from:'gaurav.coder1@gmail.com',
                to:'hr14756@gmail.com',
                subject:"Order Rejection Mail",
                text:"hi your are being deleted from the inventory management system"
            }
            // sendMail(payload,function(err,data){
            //     if(err){
            //         console.log('error sending mail');
            //         res.status(400).json("mail not sent");
            //     }else{
            //         res.status(200).json("order rejected successfully")
            //     }
            // });
            res.status(200).json("user deleted successfully");
        }else{
            res.status(500).json(err);
        }
    });
  
}




