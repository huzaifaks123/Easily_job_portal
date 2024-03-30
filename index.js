// import dotenv from 'dotenv';
// dotenv.config();
// import express from express-module
import express from 'express';

// declare port variable
const port = process.env.PORT || 4400;

// import path from path-module
import path from "path";

// import expressEjsLayouts from express-module
import expressEjsLayouts from 'express-ejs-layouts';

// import session from express-module
import session from 'express-session'

// import defined middlewares
import { auth } from './src/middleware/auth.middleware.js';
import { setLastVisit } from './src/middleware/lastVisit.middleware.js';
import { validateNewRequest, validateUpdateRequest, validateRegisterRequest, validateLoginRequest, validateApplyRequest } from './src/middleware/expressValidation.middleware.js';
import { uploadFile } from './src/middleware/files.middleware.js';
import sendMail from './src/middleware/mailer.js';

import cookieParser from 'cookie-parser';
// import cookieParser from module

// import controllers to use
import recruitersController from './src/controller/recruiter.controller.js';
import jobsController from './src/controller/jobs.controller.js';

// create instance of controller to use
const recruiterController = new recruitersController()
const jobController = new jobsController()

// create express instance
const app = express()

// set ejs View Engine
app.set('view engine', 'ejs')
app.set('views', path.join(path.resolve(), 'src', 'views'))

// use middleware for their purpose
app.use(cookieParser())
app.use(express.static('public'))
app.use(session({
    secret: 'Bn0GljG8pWZrs4nPE2tpS7p4f1eNBxu3',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
app.use(expressEjsLayouts)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Define routes with "get","post","put" and "delete" method alongwith with validation and authentication middlewares 

// HomePage routes
app.get('/', setLastVisit, (req, res) => {
    res.render('homePage', {
        recruiter: req.session.recruiter
    })
})

// Recruiter routes
app.post('/register', validateRegisterRequest, recruiterController.create)
app.get('/register', recruiterController.getRegisterPage)
app.get('/login', recruiterController.getloginPage)
app.post('/login', validateLoginRequest, recruiterController.login)
app.get('/logout', recruiterController.logout)

// Jobs routes
app.get('/jobs', jobController.getJobList)
app.get('/search_jobs', jobController.search)
app.get('/job_form', auth, jobController.getJobForm)
app.post('/jobs', auth, validateNewRequest, jobController.create)
app.get('/jobs/:id', jobController.getSingleJob)
app.get('/jobs/:id/update', auth, jobController.getUpdateForm)
app.post('/jobs/update', auth, validateUpdateRequest, jobController.updateSingleJob)
app.delete('/jobs/:id', auth, jobController.deleteSingleJob)

// Applicants routes
app.get('/jobs/:id/applicants', auth, jobController.getApplicants)
app.get('/jobs/:id/apply', jobController.getApplicationForm)
app.post('/jobs/:id/apply', uploadFile.single('resumeSrc'), validateApplyRequest, sendMail, jobController.applyJob)

// render 404 page
app.use((req, res, next) => {
    res.render('404error');
});

// define listen to run server on port
app.listen(port, (err) => {
    if (err) {
        console.log("Error while running server :", err)
    } else {
        console.log("Server is running on successfully on port :", port)
    }
})