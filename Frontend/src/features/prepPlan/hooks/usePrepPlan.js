import { generateReport, getAllReports, getReportById, downloadGeneratedResume } from "../services/prepPlan.api"
import { useCallback, useContext, useEffect } from "react"
import { PrepPlanContext } from "../prepPlan.context"
import { useParams } from "react-router"

export const usePrepPlan = () => {
    const prepPlanContext = useContext(PrepPlanContext)
    const { reportId: routeReportId } = useParams()

    if (!prepPlanContext) {
        throw new Error("usePrepPlan must be used within an PrepPlanProvider")
    }

    const { loading, setLoading, report, setReport, reports, setReports } = prepPlanContext

    const generatePrepPlan = async({ jobDescription, selfDescription, resumeFile }) => {
        setLoading(true)
        let apiResponse = null
        try {
            apiResponse = await generateReport({ jobDescription, selfDescription, resumeFile })
            setReport(apiResponse.report)
        } catch (error) {
            console.error(`Error: generatePrepPlan(): ${error}`)
        } finally {
            setLoading(false)
        }

        return apiResponse.report
    }

    const getPrepPlanById = useCallback(async (selectedReportId) => {
        setLoading(true)
        let apiResponse = null
        try {
            apiResponse = await getReportById({ reportId: selectedReportId })
            setReport(apiResponse.report)
        } catch (error) {
            console.error(`Error: getPrepPlanById(): ${error}`)
        } finally {
            setLoading(false)
        }
        return apiResponse.report
    }, [ setLoading, setReport ])

    const getAllPrepPlans = async() => {
        setLoading(true)
        let apiResponse = null
        try {
            apiResponse = await getAllReports()
            setReports(apiResponse.reports)
        } catch (error) {
            console.error(`Error: getAllPrepPlans(): ${error}`)
        } finally {
            setLoading(false)
        }
        return apiResponse.reports
    }

    const downloadResume = async (selectedReportId) => {
        setLoading(true)
        try {
            const resumeBlob = await downloadGeneratedResume({ reportId: selectedReportId })
            const url = window.URL.createObjectURL(new Blob([ resumeBlob ], { type: "application/pdf" }))
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", `resume_${selectedReportId}.pdf`)
            document.body.appendChild(link)
            link.click()
        } catch (error) {
            console.error(`Error: downloadResume(): ${error}`)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (routeReportId) {
            setLoading(true)
            getReportById({ reportId: routeReportId })
                .then((response) => {
                    setReport(response.report)
                })
                .catch((error) => {
                    console.error(`Error: getPrepPlanById(): ${error}`)
                })
                .finally(() => {
                    setLoading(false)
                })
        } else {
            setLoading(true)
            getAllReports()
                .then((response) => {
                    setReports(response.reports)
                })
                .catch((error) => {
                    console.error(`Error: getAllPrepPlans(): ${error}`)
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }, [ routeReportId, setLoading, setReport, setReports ])

    return { loading, report, reports, generatePrepPlan, getPrepPlanById, getAllPrepPlans, downloadResume }
}