import { generateReport, getAllReports, getReportById } from "../services/prepPlan.api"
import { useContext, useEffect } from "react"
import { PrepPlanContext } from "../prepPlan.context"
import { useParams } from "react-router"

export const usePrepPlan = () => {
    const context = useContext(PrepPlanContext)
    const { reportId } = useParams()

    if(!context) {
        throw new Error("usePrepPlan must be used within an PrepPlanProvider")
    }

    const { loading, setLoading, report, setReport, reports, setReports } = context

    const generatePrepPlan = async({ jobDescription, selfDescription, resumeFile }) => {
        setLoading(true)
        let response = null
        try {
            response = await generateReport({ jobDescription, selfDescription, resumeFile})
            setReport(response.interviewReport)
        } catch(err) {
           console.error(err);
        } finally {
            setLoading(false)
        }

        return response.interviewReport
    }

    const getPrepPlanById = async(reportId) => {
        setLoading(true)
        let response = null
        try {
            response = await getReportById({ reportId })
            setReport(response.interviewReport)
        } catch(err) {
           console.error(err);
        } finally {
            setLoading(false)
        }
        return response.interviewReport
    }

    const getAllPrepPlans = async() => {
        setLoading(true)
        let response = null
        try {
            response = await getAllReports()
            setReports(response.interviewReports)
        } catch(err) {
           console.error(err);
        } finally {
            setLoading(false)
        }
        return response.interviewReports
    }

    const getResumePdf = async (interviewReportId) => {
        setLoading(true)
        let response = null
        try {
            response = await generateResumePdf({ interviewReportId })
            const url = window.URL.createObjectURL(new Blob([ response ], { type: "application/pdf" }))
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", `resume_${interviewReportId}.pdf`)
            document.body.appendChild(link)
            link.click()
        }
        catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (reportId) {
            getReportById(reportId)
        } else {
            getAllPrepPlans()
        }
    }, [ reportId ])

    return { loading, report, reports, generatePrepPlan, getPrepPlanById, getAllPrepPlans, getResumePdf }
}