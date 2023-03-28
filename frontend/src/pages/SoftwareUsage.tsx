import { Title } from "@mantine/core"
import { useEffect, useState } from "react";
import AppTable from "../components/AppTable"

function SoftwareUsage({ date }) {
    const [software, setSoftware] = useState([]);


    useEffect(() => {
        if (date[0] && date[1]) {
            let dateStart = Math.floor(date[0].getTime() / 1000)
            let dateEnd = Math.floor(date[1].getTime() / 1000)
        fetch(
            'usage?' + new URLSearchParams([
                ['type', 'apps'],
                ['start', dateStart],
                ['end', dateEnd]
            ])
        )
        .then((response) => response.json())
        .then((response) => setSoftware(response))
        .catch((err) => {
                console.log(err.message);
        });
        }
    }, [date])

    return (
        <>
        <Title order={2}>Software Usage</Title>
        <AppTable software={software}/>
        </>
    )
}

export default SoftwareUsage