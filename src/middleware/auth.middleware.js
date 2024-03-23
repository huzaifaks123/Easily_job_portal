// export authentication middleware
export const auth = (req, res, next) => {
    if(req.session.recruiter){
        next()
    }else{
        res.redirect('/login')
    }
}