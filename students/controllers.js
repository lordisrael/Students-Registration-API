const pool = require('../db')
const {StatusCodes} = require('http-status-codes')
const queries = require('./queries')
const getStudents = (req, res) => {
    pool.query(queries.getStudents, (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows)
    })
}

const getStudentByID = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query(queries.getStudentByID, [id], (error, results) => {
        if(error) throw error
        res.status(200).json(results.rows)
    })
}

const addStudent = (req, res) => {
    const {name, email, age, dob} = req.body
    //check if email exists
    pool.query(queries.checkEmailExists, [email], (error, results) => {
        if(results.rows.length){
            res.send('Email already Exists')
        }
        pool.query(queries.addStudent, [name, email, age, dob], (error, results) => {
            if(error) throw error 
            res.status(StatusCodes.CREATED).json("Student Created Successfully")
        })
    })
}

const removeStudent = (req, res) => {
    const id = parseInt(req.params.id)

    pool.query(queries.getStudentByID, [id], (error, results) => {
        const noStudentFound = !results.rows.length
        if(noStudentFound){
            res.send("Students does not exist in the database")
        }
        pool.query(queries.removeStudent, [id], (error, results) => {
            if(error) throw error
            res.status(StatusCodes.OK).json("Student Deleted successfully")

        })
    })
}

const updateStudent = (req, res) => {
    const id = parseInt(req.params.id)
    const {name} = req.body
    pool.query(queries.getStudentByID, [id], (error, results) => {
        const noStudentFound = !results.rows.length
        if(noStudentFound){
            res.send("Students does not exist in the database")
        }
        pool.query(queries.updateStudent, [name, id], (error, results) => {
            if(error) throw error
            res.status(StatusCodes.OK).json("Student Updated successfully")
        })
    })
}

module.exports = { 
     getStudents,
     getStudentByID,
     addStudent, 
     removeStudent,
     updateStudent,
}