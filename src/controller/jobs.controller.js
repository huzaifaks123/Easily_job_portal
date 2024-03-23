// import models to use data
import applicantModel from "../model/applicant.model.js"
import jobsModel from "../model/job.model.js"

// export jobsController class
export default class jobsController {

    // function to get lists of all jobs
    getJobList(req, res) {
        var jobs = jobsModel.getAllJobs()
        res.render('job_lists', {
            recruiter: req.session.recruiter,
            results: null,
            jobs,
        })
    }

    // function to get form to create job
    getJobForm(req, res) {
        res.render('job_create_form', {
            job: null,
            recruiter: req.session.recruiter,
            errorMessage: null
        })
    }

    // function to post new job
    create(req, res) {
        const { recruiterId, job_category, designation, job_location, salary, company_name, openings, skills, date } = req.body
        jobsModel.add(recruiterId, job_category, designation, job_location, salary, company_name, openings, skills, date)
        res.redirect('/jobs')
    }

    // function to get a particular job details
    getSingleJob(req, res) {
        var job = jobsModel.getJob(req.params.id)
        res.render('job_details', {
            job,
            recruiter: req.session.recruiter,
        })
    }

    // function to update a particular job
    updateSingleJob(req, res) {
        jobsModel.update(req.body)
        console.log(req.body)
        res.redirect('/jobs')
    }

    // function to delete a job
    deleteSingleJob(req, res) {
        applicantModel.deleteJob(req.params.id)
        jobsModel.delete(req.params.id)
        res.redirect('/jobs')
    }
    
    // function to get applicants list for a job
    getApplicants(req, res) {
        var applicants = applicantModel.getAllApplicants(req.params.id)
        res.render('applicants_list', {
            applicants,
            recruiter: req.session.recruiter,
        })
    }
    
    // function to get job application form
    getApplicationForm(req, res) {
        res.render('job_application_form', {
            id: (req.params.id),
            recruiter: req.session.recruiter,
            errorMessage: null
        })
    }

    // function to apply job
    applyJob(req, res, next) {
        console.log(req.body)
        const { name, email, contact } = req.body
        const resumeSrc = '/files/' + req.file.filename
        
        applicantModel.add(req.params.id, name, email, contact, resumeSrc)
        jobsModel.addApplicant(req.params.id)
        res.redirect('/jobs')
    }
    
    // function to get update form to update job
    getUpdateForm(req, res) {
        var job = jobsModel.getJob(req.params.id)
        res.render('job_update_form', {
            job,
            recruiter: req.session.recruiter,
            errorMessage: null
        })
    }

    // function to get search job
    search = (req, res) => {
        console.log("inside Search", req.query.name)
        res.render('job_lists', {
            results: req.query.name,
            recruiter: req.session.recruiter,
            jobs: jobsModel.searchResult(req.query.name)
        })
    };

    // function to get return a 404 page if url not found
    get404Page(req, res) {
        res.render('404error')
    }
}