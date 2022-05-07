import React, { useContext } from 'react';
import '../style/AIStyleGallery.css';
import { LoginContext } from '../context/AuthProvider';

function AIStyleGallery(props) {
    const galley = []
    const { setSourceimg, setFaceimg } = useContext(LoginContext);
    const handleClick = (imgUrl) => {
        if (props.control === "content") {
            console.log(imgUrl)
            setSourceimg(imgUrl)
        } else {
            console.log(imgUrl)
            setFaceimg(imgUrl)
        }
    }

    galley.push(
        <h6 key={"title"} style={{ color: "gray", fontSize: "15px", marginTop: "5px" }}>{props.title}</h6>
    )
    for (var i = 0; i < props.images.length - 1; i += 2) {
        let image1 = props.images[i]
        let image2 = props.images[i + 1]
        galley.push(
            <div className="stylerow" key={"row" + i}>
                <div className="stylecolumn" key={"col" + i}>
                    <img src={image1} alt="" style={{ width: "100%", height: "7vw" }} onClick={() => handleClick(image1)} />
                </div>
                <div className="stylecolumn" key={"col" + (i + 1)}>
                    <img src={image2} alt="" style={{ width: "100%", height: "7vw" }} onClick={() => handleClick(image2)} />
                </div>
            </div>
        )
    }
    if (props.images.length % 2 === 1) {
        let imageLast = props.images[props.images.length - 1]
        galley.push(
            <div className="stylerow" key={"rowEnd"}>
                <div className="stylecolumn" key={"colEnd"}>
                    <img src={imageLast} alt="" style={{ width: "100%", height: "7vw" }} onClick={() => handleClick(imageLast)} />
                </div>
            </div>
        )
    }

    return (
        <div>
            {galley}
        </div>

    )

}

export default AIStyleGallery;