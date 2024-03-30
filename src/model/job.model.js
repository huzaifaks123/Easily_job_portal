// export jobsModel to be available outside
export default class jobsModel {
    constructor(id, recruiterId, job_category, designation, job_location, salary, company_name, openings, applicants_count, skills, date) {
        this.id = id;
        this.recruiterId = recruiterId;
        this.job_category = job_category;
        this.designation = designation;
        this.job_location = job_location;
        this.salary = salary;
        this.company_name = company_name;
        this.openings = openings;
        this.applicants_count = applicants_count;
        this.skills = skills;
        this.date = date
    }

    // function to get all jobs
    static getAllJobs() {
        return jobs
    }

    // function to get single job
    static getJob(id) {
        const index = jobs.findIndex(job => job.id == id)
        return jobs[index]
    }

    // function to add a job
    static add(recruiterId, job_category, designation, job_location, salary, company_name, openings, skills, date) {
        const newJob = new jobsModel(jobs.length + 1, recruiterId, job_category, designation, job_location, salary, company_name, openings, 0, skills, date)
        jobs.push(newJob)
    }

    // function to update a job
    static update(updatedJob) {
        const index = jobs.findIndex(job => job.id == updatedJob.id)
        jobs[index] = updatedJob
    }

    // function to delete a job
    static delete(id) {
        const index = jobs.findIndex(job => job.id == id)
        jobs.splice(index, 1)
    }

    // function to add applicant for a job
    static addApplicant(id) {
        const index = jobs.findIndex(job => job.id == id)
        jobs[index].applicants_count = parseInt(jobs[index].applicants_count) + 1
    }

    // function to delete applicant when job gets deleted
    static deleteApplicant(id) {
        const index = jobs.findIndex(job => job.id == id)
        jobs[index] = jobs[index].applicants_count - 1
    }

    // function to show search Results
    static searchResult = (name) => {
        let filteredJobs = jobs.filter((job) => {
            return job.job_category == name ||
                job.designation == name ||
                job.job_location == name ||
                job.company_name == name;
        });
        return filteredJobs;
    };


}
let jobs = [
    {
        id: 2,
        recruiterId: '1',
        job_category: 'Tech',
        designation: 'JAVA Developer',
        job_location: 'Noida',
        salary: '6-10',
        company_name: 'Flipkart',
        openings: '2',
        applicants_count: 0,
        skills: [ 'HTML', 'CSS', 'SQL', 'MongoDB' ],
        date: '2024-04-19'
      },
      {
        id: 1,
        recruiterId: '1',
        job_category: 'Tech',
        designation: 'DevOps',
        job_location: 'Mumbai',
        salary: '9-10',
        company_name: 'Google',
        openings: '3',
        applicants_count: 0,
        skills: [
          'React',  'HTML',
          'CSS',    'JS',
          'NodeJs', 'Express',
          'SQL'
        ],
        date: '2024-03-31'
      }
]
