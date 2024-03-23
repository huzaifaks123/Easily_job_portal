// export applicantModel to be available outside
export default class applicantModel {
    constructor(id, companyId, name, email, contact, resumeSrc) {
        this.id = id;
        this.companyId = companyId
        this.name = name;
        this.email = email;
        this.contact = contact;
        this.resumeSrc = resumeSrc;
    }

    // function to add applicant
    static add(companyId, name, email, contact,resumeSrc){
        const newApplicant = new applicantModel(applicants.length+1, companyId, name, email, contact, resumeSrc)
        applicants.push(newApplicant)
        console.log(applicants)
    }

    // function to delete applicant alongwith with job
    static deleteJob(id){
        let filteredApplicants = applicants.filter(applicant => applicant.companyId != id)
        applicants = filteredApplicants
    }

    // function to get all the applicant to render
    static getAllApplicants(id){
        let allApplicants = applicants.filter(applicant => applicant.companyId == id)
        return allApplicants
    }
}

let applicants = []