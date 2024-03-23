// export recruiterModel to be available outside
export default class recruiterModel {
    constructor(id, name, email, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    // function to register new recruiter
    static create(name, email, password){
        const newRecruiter = new recruiterModel(recruiters.length+1, name, email, password)
        recruiters.push(newRecruiter)
        console.log(recruiters)
    }

    // function to verify recruiter before login
    static verify(email, password){
        const recruiter = recruiters.find(user => user.email === email && user.password === password)
        return recruiter
    }

    // function to validate a recruiter using middleware
    static validate(email){
        return recruiters.find(user => user.email === email)
    }
}

let recruiters = []