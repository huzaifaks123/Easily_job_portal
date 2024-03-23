// import models to use data
import recruiterModel from "../model/recruiter.model.js";

// export recruitersController class
export default class recruitersController {

    // function to get RegisterPage
    getRegisterPage(req, res) {
        res.render('registerForm', { errorMessage: null })
    }
    // function to get LoginPage
    getloginPage(req, res) {
        res.render('loginForm', { errorMessage: null })
    }
    // function to create a new recruiter id
    create(req, res) {
        const { name, email, password } = req.body
        recruiterModel.create(name, email, password)
        res.redirect("/login")
    }
    // function to login using credential
    login(req, res) {
        const { email, password } = req.body
        let recruiter = recruiterModel.verify(email, password)
        req.session.recruiter = recruiter;
        res.redirect('/jobs')
    }
    // function to register using details
    logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                console.log("Error while logging out :", err);
            } else {
                res.redirect('/')
            }
        })
        res.clearCookie('lastVisit')
    }
}