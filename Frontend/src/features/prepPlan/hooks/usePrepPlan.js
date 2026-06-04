import { generateReport, getAllReports, getReportById, generateResumePdf } from "../services/prepPlan.api"
import { useContext, useEffect } from "react"
import { PrepPlanContext } from "../prepPlan.context"
import { useParams } from "react-router"

export const usePrepPlan = () => {
    const context = useContext(PrepPlanContext)
    const { reportId } = useParams();

    if(!context) {
        throw new Error("usePrepPlan must be used within an PrepPlanProvider")
    }

    const { loading, setLoading, report, setReport, reports, setReports } = context

    const generatePrepPlan = async({ jobDescription, selfDescription, resumeFile }) => {
        setLoading(true)
        let response = null
        try {
            response = await generateReport({ jobDescription, selfDescription, resumeFile})
            setReport(response.report)
        } catch(err) {
           console.error(`Error: generatePrepPlan(): ${err}`);
        } finally {
            setLoading(false)
        }

        return response.report
    }

    const getPrepPlanById = async(reportId) => {
        setLoading(true)
        let response = null
        try {
            response = await getReportById({ reportId })
            setReport(response.report)
        } catch(err) {
           console.error(`Error: getPrepPlanById(): ${err}`);
        } finally {
            setLoading(false)
        }
        return response.report
    }

    const getAllPrepPlans = async() => {
        setLoading(true)
        let response = null
        try {
            response = await getAllReports()
            console.log('getAllPrepPlans response: ', response)
            setReports(response.reports)
        } catch(err) {
           console.error(`Error: getAllPrepPlans(): ${err}`);
        } finally {
            setLoading(false)
        }
        return response.reports
    }

    const getResumePdf = async (reportId) => {
        setLoading(true)
        let response = null
        try {
            response = await generateResumePdf({ reportId })
            console.log('getResumePdf response: ', response)
            const url = window.URL.createObjectURL(new Blob([ response ], { type: "application/pdf" }))
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", `resume_${reportId}.pdf`)
            document.body.appendChild(link)
            link.click()
        }
        catch (error) {
            console.error(`Error: getResumePdf(): ${error}`);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (reportId) {
            getReportById({ reportId });
        } else {
            getAllPrepPlans()
        }
    }, [ reportId ])

    return { loading, report, reports, generatePrepPlan, getPrepPlanById, getAllPrepPlans, getResumePdf }
}