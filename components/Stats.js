import { useState, useEffect } from "react"

export default function Stats() {
    const [stats, setStats] = useState();

    useEffect(() => {
        fetch(`https://covid19.mathdro.id/api/`)
        .then(data => data.json())
        .then(res => {    
            console.log(res)
            setStats(res)            
        })        
    }, [])
    // empty array as second argument ensures useEffect function only runs once on initial render: https://css-tricks.com/run-useeffect-only-once/ 

    if(!stats) {
        return <p>loading ........</p>
    }

    return (
        <div style={{display: "flex", justifyContent: "space-evenly"}}>
            <div style={styles.statContainer}>
                <span style={styles.statHeader}>Confirmed</span>
                <span>{stats.confirmed.value.toLocaleString()}</span>
            </div>
            <div style={styles.statContainer}>
                <span style={styles.statHeader}>Recovered</span>
                <span>{stats.recovered.value.toLocaleString()}</span>
            </div>
            <div style={styles.statContainer}>
                <span style={styles.statHeader}>Deaths</span>
                <span>{stats.deaths.value.toLocaleString()}</span>
            </div>
        </div>
    )
}

const styles = {
    statContainer: {
        border: '.5px solid',
        borderRadius: '15px',
        padding: '20px 0px',
        flex: .2,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        margin: "15px 0px"
    },
    statHeader: {
        fontSize: '1.2em',  
        fontWeight: 'bold',
        paddingBottom: "10px"      
    }
}