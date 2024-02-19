import React, { useEffect, useRef, useState } from "react";
import Header from "../Partials/Header";
import Navigator from "./CreateNavigator";
import Basic from "./CreateComponents/Basic";
import axios from "axios";
import config from "../config";
import useUser from "../Hooks/useUser";
import Finish from "./CreateComponents/Finish";
import Gallery from "./CreateComponents/Gallery";
import Advanced from "./CreateComponents/Advanced";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const Create = () => {
    const [user, setUser] = useUser(true);
    const navigate = useNavigate();

    const [fields, setFields] = useState({
        slug: '',
        title: '',
        date: new Date(),
        slugValid: true,
        groom_name: 'Riyan',
        groom_photo: null,
        groom_father: 'Cecep',
        groom_mother: 'Euis',
        bride_name: 'Scarjo',
        bride_photo: null,
        bride_father: 'Joko Susilo',
        bride_mother: 'Yuni Dwi',
        galleries: [null],
        timezone: 'Asia/Jakarta',
    });
    const [step, setStep] = useState(0);
    const [ableToNext, setAbleToNext] = useState(false);

    const typing = (toChanges) => {
        let theFields = {...fields};
        let keys = Object.keys(toChanges);
        keys.map((key, k) => {
            theFields[key] = toChanges[key];
        })
        setFields(theFields);
    }

    const submit = () => {
        let formData = new FormData();
        formData.append('token', user.token);
        let keys = Object.keys(fields);
        let toSubmit = {};
        keys.map((key, k) => {
            if (key !== "galleries") {
                // console.log('The ', key, ' value is : ', fields[key]);
                formData.append(key, fields[key]);
                toSubmit[key] = fields[key];
            } else {
                for (let i = 0; i < fields.galleries.length; i++) {
                    let theFile = fields.galleries[i];
                    if (theFile !== null) {
                        formData.append('galleries[]', theFile)
                    }
                }
            }
        })


        axios.post(`${config.baseUrl}/api/user/wedding/create`, formData)
        .then(response => {
            let res = response.data;
            navigate('/home');
        })
    }

    return (
        <>
            <Header active={'listing'} />
            <div className="content">
                {
                    step === 0 &&
                    <Basic typing={typing} fields={fields} ableToNext={ableToNext} setAbleToNext={setAbleToNext} />
                }
                {
                    step === 1 &&
                    <Gallery typing={typing} fields={fields} ableToNext={ableToNext} setAbleToNext={setAbleToNext} />
                }
                {
                    step === 2 &&
                    <Advanced typing={typing} fields={fields} ableToNext={ableToNext} setAbleToNext={setAbleToNext} />
                }
                {
                    step === 7 &&
                    <Finish />
                }

                <div style={{height: 100}}></div>
                {
                    step <= 6 &&
                    <Navigator 
                        ableToNext={ableToNext}
                        step={step}
                        onNext={() => {
                            if (step === 2) {
                                submit()
                                // alert('finish');
                            } else {
                                setStep(step + 1);
                            }
                            setAbleToNext(false);
                        }}
                        onBack={() => {
                            if (step > 0) {
                                setStep(step - 1);
                            }
                        }}
                    />
                }
            </div>
        </>
    )
}

export default Create;