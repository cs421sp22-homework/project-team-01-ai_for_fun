import React, { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import AIFaceGallery from "./AIFaceGallery";

function AIFaceHistory() {
    const [cookie, setCookie] = useCookies(['access_token', 'user_id', 'refresh_token', 'name', 'email', 'avatar']);
    const [history, setHistory] = useState([]);
    let history_Image = []
    let history_display = []

    useEffect(async () => {
        let url = 'https://server-demo.ai-for-fun-backend.com/gethistory/' + cookie.user_id + "/face"
        const response = await fetch(url)

        if (response.status === 200) {
            const content = await response.json();
            setHistory(content)
        }
        else {
            console.log('request failed', response.body);
            setHistory([])
        }
    }, [])

    for (var i = 0; i < history.length; i++) {
        if (history[i].src_url) {
            history_Image.push(history[i].src_url)
        }
        if (history[i].dst_url) {
            history_Image.push(history[i].dst_url)
        }
    }

    if (history_Image.length != 0) {
        history_display.push(
            <AIFaceGallery title="Upload History" images={history_Image} />
        )
    }


    if (cookie.access_token) {
        return (
            (history_Image.length === 0) ?
                (<center>
                    <p style={{ marginTop: "40vh", fontWeight: 200 }}>No Upload History</p>
                </center>) :
                (<div>{history_display}</div>)
        )
    } else {
        return (
            <div>
                <center>
                    <p style={{ marginTop: "40vh", fontWeight: 200 }}>Login to See Upload History</p>
                </center>
            </div>)
    }


}

export default AIFaceHistory