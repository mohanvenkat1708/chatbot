import "./FileUpload.css"
import { useState } from "react";
import axios from 'axios';

function FileUpload(props){

    const [title, setTitle] = useState("");
    const [file, setFile] = useState("");

    async function handleSubmit(e){
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("file", file);

        console.log(formData);
        console.log(title, file);
        console.log(props.organization);
        
        try{
            const result = await axios.post(`http://localhost:5000/api/files/${props.organization}`, formData,{
                headers: {"Content-Type": "multipart/form-data"}
            })
            console.log(result);
        }
        catch(err){
            console.log(err.message);
        }
    }
    return (<>
    <form className="form-container" onSubmit={handleSubmit}>
        <h4>Upload Data Sources for Users</h4>
        <br/>

        <input
        type="text"
        placeholder="Title"
        id="file-name"
        className="fileName"
        required 
        onChange={(e)=>{setTitle(e.target.value)}}
        />

        <input
        type="file"
        accept="application/pdf"
        id="fileUpload"
        className="fileUpload"
        required 
        onChange={(e)=>{setFile(e.target.files[0])}}
        />

        <button type="submit" className="upload-button">Upload</button>

        </form>

        
    </>);
}

export default FileUpload;