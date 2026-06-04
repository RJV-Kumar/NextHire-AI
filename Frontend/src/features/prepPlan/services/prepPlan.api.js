import axios from 'axios'
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

const api = axios.create({
    baseURL: apiBaseUrl,
    withCredentials:true
})


export const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
    const formData = new FormData()
    
    formData.append('jobDescription', jobDescription)
    formData.append('selfDescription', selfDescription)
    formData.append('resumeFile', resumeFile)

    const response = await api.post('api/prep-plan', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })

    return response.data;
}

export const getReportById = async ({ reportId }) => {
    const response = await api.get(`/api/prep-plan/reports/${reportId}`);
    return response.data;
}

export const getAllReports = async () => {
    const response = await api.get(`api/prep-plan/`)
    return response.data;
}

/**
 * @description Service to generate resume pdf based on user self description, resume content and job description.
 */
export const generateResumePdf = async ({ reportId }) => {
    const response = await api.post(`/api/prep-plan/resume/pdf/${reportId}`, null, {
        responseType: "blob"
    })

    return response.data
}