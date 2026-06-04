import { createContext, useState } from "react";

export const PrepPlanContext = createContext()

export const PrepPlanProvider = ({ children }) => {
    const [ loading, setLoading ] = useState(false)
    const [ report, setReport ] = useState(null)
    const [ reports, setReports ] = useState(null)

    return (
        <PrepPlanContext.Provider value={{ loading, setLoading, report, setReport, reports, setReports }} >
            { children }
        </PrepPlanContext.Provider>
    )

}