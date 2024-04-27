const Request = require ("../models/Request");


const fetchRequests = async(req,res) => {
    //find the requests
    const requests = await Request.find().sort({creationDate : -1});
    // repond with them
    res.json({requests});
}

const fetchRequest = async (req,res)=>{
    //get id from the url
    const reqId = req.params.id;
    //find the request using that ID 
    const request = await Request.findById(reqId);
    //respond with the request
    res.json({request:request});
}

const createRequest = async (req,res)=> {
    //get the sent in date off the request body
    const {userId,creationDate,status,type}= req.body;

    // create a note with it 
    const request = await Request.create({
        userId,
        creationDate,
        status,
        type
    })
    // respond with it 
    res.json({request: request });


}
const updateRequest = async (req,res)=>{
    //get the id from the link 
    const reqId = req.params.id;
    // get data from the req body
    const {userId,creationDate,status}= req.body;
    //find and update
   await Request.findByIdAndUpdate(reqId,{
        userId,
        creationDate,
        status,
    });
    // find updated note 
    const request = await Request.findById(reqId);
    //respond with it
    res.json({request:request});
}

const deleteRequest = async (req,res)=>{
    //get the id from the link 
    const reqId = req.params.id;
    // delete
    await Request.deleteOne({_id:reqId});
    //respond 
    res.json({success: "Request deleted"});
}

module.exports ={
    fetchRequest,
    fetchRequests,
    createRequest,
    updateRequest,
    deleteRequest,
}