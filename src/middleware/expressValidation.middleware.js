// import required element to us express-validator for validation
import { body, validationResult } from 'express-validator'

// import model for verfication 
import recruiterModel from '../model/recruiter.model.js'

// export validateNewRequest middleware to validate new job
export const validateNewRequest = async (req, res, next) => {
    console.log(req.body)
    const rules = [
        body('job_category')
            .notEmpty()
            .withMessage('Category is required!'),
        body('designation')
        .notEmpty()
            .withMessage('designation is required!'),
        body('job_location')
        .notEmpty()
        .withMessage('job_location is required!'),
        body('company_name')
        .notEmpty()
            .withMessage('company_name is required!'),
            body('salary')
            .notEmpty()
            .withMessage('Salary Should be a Positive value!'),
            body('openings')
            .isFloat({ gt: 0 })
            .withMessage('openings Should be a Positive value!'),
            body('date')
            .notEmpty()
            .withMessage('date is required!'),
        ]
        
        await Promise.all(
            rules.map((rule) => rule.run(req))
    )
    
    var validationErrors = validationResult(req)
    console.log(validationErrors)

    if (!validationErrors.isEmpty()) {
        return res.render('job_create_form', {
            job: req.body,
            recruiter: req.session.recruiter,
            errorMessage: validationErrors.array()[0].msg,
        })
    }
    next()
}

// export validateUpdateRequest middleware to validate update job request
export const validateUpdateRequest = async (req, res, next) => {
    console.log(req.body)
    const rules = [
        body('job_location')
        .notEmpty()
        .withMessage('job_location is required!'),
        body('company_name')
            .notEmpty()
            .withMessage('company_name is required!'),
            body('salary')
            .notEmpty()
            .withMessage('Salary Should be a Positive value!'),
        body('openings')
            .isFloat({ gt: 0 })
            .withMessage('openings Should be a Positive value!'),
    ]

    await Promise.all(
        rules.map((rule) => rule.run(req))
    )

    var validationErrors = validationResult(req)
    console.log(validationErrors)

    if (!validationErrors.isEmpty()) {
        return res.render('job_update_form', {
            job: req.body,
            recruiter: req.session.recruiter,
            errorMessage: validationErrors.array()[0].msg,
        })
    }
    next()
}

// export validateRegisterRequest middleware to validate new user
export const validateRegisterRequest = async (req, res, next) => {
    console.log(req.body)
    const rules = [
        body('name')
            .notEmpty()
            .withMessage('Name is required!'),
            body('email')
            .notEmpty()
            .withMessage('Email is required!'),
            body('password')
            .isLength({ min: 8 })
            .withMessage('Password should have Minimum 8 character'),
        body('email')
        .custom(async (email) => {
            const existingRecruiter = await recruiterModel.validate(email);
            if (existingRecruiter) {
                throw new Error('Email is already in use!');
                }
            }),
        ]

        await Promise.all(
        rules.map((rule) => rule.run(req))
        )

        var validationErrors = validationResult(req)
    console.log(validationErrors)
    
    if (!validationErrors.isEmpty()) {
        return res.render('registerForm', {
            errorMessage: validationErrors.array()[0].msg,
        })
    }
    next()
}

// export validateLoginRequest middleware to validate user login
export const validateLoginRequest = async (req, res, next) => {
    console.log(req.body)
    const rules = [
        body('email')
            .custom(async (email, { req }) => {
                const password = req.body.password
                const isVerified = await recruiterModel.verify(email, password);
                if (!isVerified) {
                    throw new Error('Invaid Credentials');
                }
            }),
    ]

    await Promise.all(
        rules.map((rule) => rule.run(req))
    )

    var validationErrors = validationResult(req)
    console.log(validationErrors)
    
    if (!validationErrors.isEmpty()) {
        return res.render('loginForm', {
            errorMessage: validationErrors.array()[0].msg,
        })
    }
    next()
}

// export validateApplyRequest middleware to validate applications
export const validateApplyRequest = async (req, res, next) => {
    console.log("req.body", "=====>", req.body)
    const rules = [
        body('name')
            .notEmpty()
            .withMessage('Name is required!'),
            body('email')
            .isEmail()
            .withMessage('Enter Valid Email!'),
        body('contact')
            .isLength({ min: 10 })
            .withMessage('Contact number should contain minimum 10 digit!'),
        body('resumeSrc')
            .custom((value , {req}) => {
                if(!req.file){
                    throw new Error('Attachment is required')
                }
                return true
            }),
    ]

    await Promise.all(
        rules.map((rule) => rule.run(req))
    )

    var validationErrors = validationResult(req)
    console.log(validationErrors)

    if (!validationErrors.isEmpty()) {
        return res.render('job_application_form', {
            id : req.params.id,
            recruiter : req.session.recruiter,
            errorMessage: validationErrors.array()[0].msg,
        })
    }
    next()
}