import React, { useEffect } from 'react'
import axiosInstance from "../axios";

function Dashboard() {

    useEffect(() => {
        axiosInstance.get(`summaries`)
        .then((res) => {
            console.log(res)
        })
    }, [])

    return (
        <div>
            
        </div>
    )
}

export default Dashboard
