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


//all courses that opted for courses in pagination
const getAllFeeStructure = async (req,res)=>{
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;

    try {
        const { rows, total } = await feeService.getAllFeeStructures(page, limit);
        const totalPages = Math.ceil(total / limit);

        res.status(200).json({
            data: rows,
            pagination: {
                total,
                currentPage: page,
                totalPages,
                nextPage: page < totalPages ? page + 1 : null,
                prevPage: page > 1 ? page - 1 : null,
            }
        });
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

//particular student opted for which courses
const studentsCourse = async (req, res) => {
    const { rollno } = req.body;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;

    try {
        const { rows, total } = await feeService.studentsCourses(rollno, page, limit);
        const totalPages = Math.ceil(total / limit);

        res.status(200).json({
            data: rows,
            pagination: {
                total,
                currentPage: page,
                totalPages,
                nextPage: page < totalPages ? page + 1 : null,
                prevPage: page > 1 ? page - 1 : null,
            },
        });
    } catch (error) {
        console.error("error = ", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



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
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;

    try{
        const {rows , total}=await feeService.coursesOptedBy(courseId,page,limit);
        const totalPages = Math.ceil(total/limit);
        res.status(200).json({
            data:rows,
            pagination:{
                total,
                currentPage:page,
                totalPages,
                nextPage: page < totalPages ? page + 1 : null,
                prevPage: page > 1 ? page - 1 : null,
            }
        }) 
    }catch(error){
        console.log("error = ",error);
        res.status(500).json({error:'Internal server error'})
    }

}





module.exports={
    getAllFeeStructure,studentOptedCourse,changeStatus,studentsCourse,courseOptedBy
}