import React, { useEffect, useState } from "react";
import FileDownload from "js-file-download";
import { HiDownload } from 'react-icons/hi'
import { allfiles } from "../config/MyService";
import { getfiles } from "../config/MyService"
import axios from "axios";


export default function FileUploder() {

    const [selectfile, setselectfile] = useState("");
    const [files, setfiles] = useState([]);
    useEffect(() => {
        fetchfile();
    }, [])
    const handler = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'selectfile':
                setselectfile(e.target.files[0])
                console.log(e.target.files[0])
                break
        }
    }
    const fetchfile = () => {
        getfiles()
            .then(res => {
                setfiles(res.data)
                console.log(res.data)

            })


    }

    const download = (filename) => {
        //  e.preventDefault();
        axios({
            url: "http://localhost:5555/downloadfiles/" + filename,
            method: "GET",
            responseType: "blob",
        }).then(res => {

            FileDownload(res.data, filename)

            console.log(res.data)

        })

    }

    const submit = () => {
        const formData = new FormData()
        formData.append('selectfile', selectfile)
        console.log(selectfile);
        allfiles(formData)
            .then(res => {

                if (res.data.err == 0) {

                    alert(res.data.msg)
                    fetchfile();

                }
                else {
                    alert(res.data.msg)
                }

            })
    }

    return (

        <div className="container-fluid bg " >
            <br />
            <h1 className="display-3 text-center text-uppercase text-light ">File  Uploder</h1>
            <br /><br />
            <div className="container col-6 text-center card2 "><br />
                <div className="card3 col-9 container">
                    <input type="file" className="form-control" name="selectfile" onChange={handler} /><br />
                    <button type="submit" className="btn btn-dark " onClick={submit} >Submit</button>
                </div>
                <br /><br /><br />
                <div className=" container   ">
                    {files.map((input, index) =>
                        <table key={index} className="col-10 text-center">
                            <tbody>
                                <tr>
                                    <td style={{ width: "500px" }}>{input.filename}</td>
                                    <td style={{ width: "100px" }} ><HiDownload size="35px" className="text-center" color="danger" onClick={(e) => download(input.filename)} /></td></tr>
                            </tbody>
                        </table>
                    )
                    }
                </div>
            </div>
            <br /><br />
        </div >


    );
}

