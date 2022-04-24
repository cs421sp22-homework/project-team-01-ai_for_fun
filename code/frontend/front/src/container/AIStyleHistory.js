import React,{useEffect,useState} from "react";
import { useCookies } from 'react-cookie';
import AIStyleGallery from "./AIStyleGallery";

function AIStyleHistory(){
    const [cookie, setCookie] = useCookies(['access_token', 'user_id', 'refresh_token', 'name', 'email', 'avatar']);
    const [history, setHistory] = useState([]);
    let content_history = []
    let style_history = []
    let history_display = []

    useEffect(async () => {
        let url = 'https://server-demo.ai-for-fun-backend.com/gethistory/' + cookie.user_id + "/style"
        //console.log(url)
        const response = await fetch(url)

        if (response.status == 200) {
            const content = await response.json();
            setHistory(content)
            //console.log(content)
        }
        else {
            console.log('request failed', response.body);
            setHistory([])
        }
    }, [])

    for (var i=0; i<history.length; i++){
        if (history[i].src_url){
            content_history.push(history[i].src_url)
        } 
        if (history[i].dst_url){
            style_history.push(history[i].dst_url)
        } 
    }

    if (content_history.length !=0){
        history_display.push(
            <AIStyleGallery title="Content History" images={content_history} control="content"/>
        )
    }
    if (style_history.length !=0){
        history_display.push(
            <AIStyleGallery title="Style History" images={style_history} control="style"/>
        )
    }  


    if(cookie.access_token){
        return(
            (content_history.length==0 && style_history.length==0)?
            (<center>
                <p style={{marginTop:"40vh", fontWeight:200}}>No Upload History</p>
            </center>):
            (<div>{history_display}</div>)

        )

    } else {
        return(
        <div>
            <center>
                <p style={{marginTop:"40vh", fontWeight:200}}>Login to See Upload History</p>
            </center>
        </div>)
    }

    
}

export default AIStyleHistory