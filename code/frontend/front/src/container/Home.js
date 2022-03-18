import React from "react";
import Tab from "./Tab";
import Slideshow from "../components/Slideshow";
import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs';
import "../style/Home.css";
import { ConsoleSqlOutlined } from "@ant-design/icons";

const tempimage = [
    { imgUrl: './img/01.png', name: '01', topic: 'Star' },
    { imgUrl: './img/02.png', name: '02', topic: 'House' },
    { imgUrl: './img/03.png', name: '03', topic: 'New Year' },
    { imgUrl: './img/04.png', name: '04', topic: 'Amazing' },
    { imgUrl: './img/05.png', name: '05', topic: 'Fashion' },
    { imgUrl: './img/06.png', name: '06', topic: 'Face' },
    { imgUrl: './img/07.png', name: '07', topic: 'Good' },
]
// https://server-demo.ai-for-fun-backend.com/getentities

export class Home extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     selected: '❤️  For you ❤️'
        // }
        this.state = {
            totalReactPackages: null,
            errorMessage: null
        };
    }


    setSelected = (tab) => {
        this.setState({ selected: tab });
    }

    componentDidMount() {
        // GET request using fetch with error handling
        fetch('https://server-demo.ai-for-fun-backend.com/getentities')
            .then(async response => {
                const data = await response.json();
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response statusText
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }
                this.setState({ totalReactPackages: data.total })
            })
            .catch(error => {
                this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
            });
    }

    render() {
        const { errorMessage, totalReactPackages } = this.state;
        return (
            <>
                <div
                    className='p-5 bg-image'
                    style={{ backgroundImage: "url('https://media.istockphoto.com/photos/abstract-background-white-light-blue-purple-color-gradient-defocused-picture-id1303182525?b=1&k=20&m=1303182525&s=170667a&w=0&h=CcoMiovEh6X8KCTj6HZMVYLSxoBr_oUozr4jrZy4-_s=')" }}
                >
                    <div className='mask'>
                        <div className='d-flex justify-content-center align-items-center h-100 text-center'>
                            <div className='text-white'>
                                <h1 className='mb-3'>AI For Fun</h1>
                                <h4 className='mb-3'>This is an application</h4>
                                {/* <h4>{totalReactPackages}</h4> */}
                                <a className='btn btn-outline-dark btn-lg' href='/AI_face' role='button'>
                                    Get Start
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <Container fluid>
                    <Tabs defaultActiveKey="foryou" id="uncontrolled-tab-example">
                        <Tab eventKey="foryou" title="For you">
                            <div className="mt-3">
                                <Slideshow imgData={tempimage} />
                            </div>
                        </Tab>
                        <Tab eventKey="trend" title="Trend">
                            <div className="mt-3">
                                <Slideshow imgData={tempimage} />
                            </div>
                        </Tab>
                        <Tab eventKey="face" title="Face">
                            <div className="mt-3">
                                <Slideshow imgData={tempimage} />
                            </div>
                        </Tab>
                    </Tabs>
                </Container>
            </>
        );
    }

};
export default Home;