
const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt  = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

const jobsData = require('../jobs.json'); 
const jobItemsData = require('../jobsItemDetails.json')

//register
router .post('/register', async (req,res) => {
    const {username, password, description} = req.body;
    console.log("descrition", description)

    try{
        const existingUser = await User.findOne({ username });
        if (existingUser){
            return res.status(400).json({message:"User alreasy exists"});
        }
    
        const newUser = new User({username, password, description});
        await newUser.save();
        const token = jwt.sign({ id: newUser._id, username: newUser.username }, process.env.JWT_SECRET, { expiresIn: '24h' });
        return res.status(200).json(token);
    }
    catch(error){
        return res.status(500).json({message:"server error"});
    }
})

// login 
router .post('/login', async (req, res) => {
    const {username, password} = req.body;
    try{
        const user = await User.findOne({username});
        if(!user) {
            console.log("above user not found")
            return res.status(400).json({message:"user not found"});
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message:"incorrect passowrd"})
        }

        const token = jwt.sign({id: user._id},process.env.JWT_SECRET, {expiresIn: '24h'} )
        return res.status(200).json(token);
    }
    catch(error){
        return res.status(500).json({message:"Server Error"});
    }
})


router .get('/profile', async (req, res) => {
    const jwttokenreceived = req.headers.authorization;
    const token = jwttokenreceived && jwttokenreceived.split(' ')[1]; 

    if(!jwttokenreceived){
        return res.status(401).json({message: "jwttoken is missing or invalid", t: token})
    }

    try{
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decode.id) // Exclude password field .select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log(user)
    const profile_details = { name: user.username, description: user.description , profile_image_url: 'https://my-jobby-website.onrender.com/images/profile-pic.png' }
    // Send user details as response
    console.log("profile details", profile_details)
    return res.status(200).json(profile_details);
  } catch (error) {
    console.error('JWT verification failed:', error.message);
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
})

router .get('/jobs/:id', (req, res) => { 
    const { id } = req.params
    console.log("In the job details", id)
    let filteredJobs = jobItemsData.jobs;

    try{
        const job = filteredJobs.filter(eachjob => eachjob.job_details.id===id.toString())

        if(job.length){
            return res.status(200).json(job[0])
        }
        else{
            return res.status(401).json({message: "Job not found"})
        }

    }catch(err){
        console.log(err)
        return res.status(403).json({ message: 'Invalid or expired token' })
    }

});


router .get('/jobs', (req, res) => {
    const jwttokenreceived = req.headers.authorization;
    const token = jwttokenreceived && jwttokenreceived.split(' ')[1]; 
    const { employment_type, minimum_package, search } = req.query;

    console.log(jwttokenreceived)
    let filteredJobs = jobsData.jobs;

    if(!jwttokenreceived){
        return res.status(401).json({message: "jwttoken is missing or invalid", t: token})
    }

    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        console.log("in the jobs func", decode)

        if (employment_type) {
            const employmentTypes = employment_type.split(',');  // Split the employment_type string by comma
            const lowerCaseemploymentTypes = employmentTypes.map(word => word.toLowerCase());
            console.log(lowerCaseemploymentTypes)
            filteredJobs = filteredJobs.filter(job => 
                lowerCaseemploymentTypes.includes(job.employment_type.toLowerCase())  // Check if job's employment_type is in the list
            );
        }

        if (minimum_package) {
            filteredJobs = filteredJobs.filter(job => job.package_per_annum >= minimum_package);
        }
    
        if (search) {
            filteredJobs = filteredJobs.filter(job => {
                const searchTerm = search.toLowerCase();
                return (
                    job.title.toLowerCase().includes(searchTerm) || 
                    job.job_description.toLowerCase().includes(searchTerm) ||
                    job.location.toLowerCase().includes(searchTerm)
                );
            });
        }
        
        return res.status(200).json(filteredJobs);
    }catch(err){
        console.log(err)
        return res.status(403).json({ message: 'Invalid or expired token' })
    }
});



module.exports = router;