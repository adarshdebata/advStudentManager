const feeService = require('../services/fee_service')

// insert new record for student opts course
const studentOptedCourse = async (req , res)=>{
    const {rollno , courseId, isPaid} = req.body;
    try {
        await feeService.studentOptedCourses(rollno , courseId, isPaid);
        return res.status(200).json({msg:'Student Enrolled to the course sucessfully'});
    }catch(error) {
        console.error("error during student trying to opt course",error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


//all courses that opted
const getAllFeeStructure = async (req,res)=>{
    await feeService.getAllFeeStructures()
        .then(result =>{
            res.status(200).json(result.rows);
        }).catch(error =>{
            console.log("error",error)
            res.status(500).json({error:'Internal server error'});
        })
        res.status(200).json(res.rows)
}


const studentsCourse = async(req,res)=>{
    const {rollno} = req.body
    await feeService.studentsCourses(rollno)
    .then(result =>{
        res.status(200).json(result.rows);
    }).catch(error=>{
        console.error("error = ",error);
        res.status(500).json({error:'Internal server error'});
    })
}


//update the status of course payment 
const changeStatus = async (req,res)=>{
    const {rollno,course_id}=req.body;
    const ok = true
    try{
        await feeService.changeStatuses(ok,rollno,course_id);
        res.status(200).json({msg:'Student has paid for this course'});
    }catch(error){
        console.error("error while paying for course");
        res.status(500).json({error:'Internal server error'});
    }
}


//course taken by students 

const courseOptedBy = async(req,res)=>{
    const courseId =req.params.id;
    console.log(courseId);
    await feeService.coursesOptedBy(courseId)
    .then(result =>{
        res.status(200).json(result.rows);
    }).catch(error=>{
        console.error("error = ",error);
        res.status(500).json({error:'Internal server error'});
    })

}





module.exports={
    getAllFeeStructure,studentOptedCourse,changeStatus,studentsCourse,courseOptedBy
}