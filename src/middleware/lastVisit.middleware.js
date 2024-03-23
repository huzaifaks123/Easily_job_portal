// middleware to show last visit on homepage
export const setLastVisit = (req, res, next) => {
    if (req.cookies.lastVisit) {
        res.locals.lastVisit = new Date(req.cookies.lastVisit).toISOString().slice(0,10);
    }
    res.cookie('lastVisit', new Date().toISOString().slice(0,10), {
        maxAge: 2 * 24 * 60 * 60 * 1000
    });
    next()
}