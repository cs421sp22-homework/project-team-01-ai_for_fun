import React, { useContext } from 'react';
import '../style/AIFaceGallery.css';
import { LoginContext } from '../context/AuthProvider';

function AIFaceGallery(props) {
    const galley = []
    const { sourceimg, setSourceimg, setFaceimg } = useContext(LoginContext);
    const handleClick = (imgUrl) => {
        if (sourceimg) {
            setFaceimg(imgUrl)
        } else {
            setSourceimg(imgUrl)
        }
    }

    galley.push(
        <h6 key={"title"} style={{ color: "gray", fontSize: "15px", marginTop: "5px" }}>{props.title}</h6>
    )
    for (var i = 0; i < props.images.length - 2; i += 3) {
        let image1 = props.images[i]
        let image2 = props.images[i + 1]
        let image3 = props.images[i + 2]
        galley.push(
            <div className="facerow" key={"row" + i}>
                <div className="facecolumn" key={"col" + i}>
                    <img src={image1} alt="" style={{ width: "100%", height: "7vw" }} onClick={() => handleClick(image1)} />
                </div>
                <div className="facecolumn" key={"col" + (i + 1)}>
                    <img src={image2} alt="" style={{ width: "100%", height: "7vw" }} onClick={() => handleClick(image2)} />
                </div>
                <div className="facecolumn" key={"col" + (i + 2)}>
                    <img src={image3} alt="" style={{ width: "100%", height: "7vw" }} onClick={() => handleClick(image3)} />
                </div>
            </div>
        )
    }
    if (props.images.length % 3 === 1) {
        let imageLast = props.images[props.images.length - 1]
        galley.push(
            <div className="facerow" key={"rowEnd"}>
                <div className="facecolumn" key={"colEnd"}>
                    <img src={imageLast} alt="" style={{ width: "100%", height: "7vw" }} onClick={() => handleClick(imageLast)} />
                </div>
            </div>
        )
    }
    if (props.images.length % 3 === 2) {
        let imageSecondLast = props.images[props.images.length - 2]
        let imageLast = props.images[props.images.length - 1]
        galley.push(
            <div className="facerow" key={"rowEnd"}>
                <div className="facecolumn" key={"colSecondEnd"}>
                    <img src={imageSecondLast} alt="" style={{ width: "100%", height: "7vw" }} onClick={() => handleClick(imageSecondLast)} />
                </div>
                <div className="facecolumn" key={"colEnd"}>
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

export default AIFaceGallery;