import React, { useState } from 'react'
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"
import { useNavigate } from "react-router-dom"
import axios from 'axios';
function Createpost() {
  const [title, setTitle] = useState("")
  const [summary, setSummary] = useState("")
  const [content, setContent] = useState("")
  const [files, setFiles] = useState(null)
  const [redirect, setRedirect] = useState(false)
  const navigate = useNavigate()
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

  async function createNewPost(e) {
    e.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content)
    data.set('file', files[0])

    const response = await axios.post("http://localhost:4000/post", data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: true
    });
    if (response.status == 200) setRedirect(true);
  }

  if(redirect) navigate('/')
  return (
    <div>
      <form onSubmit={(e) => createNewPost(e)}>
        <input type="title" placeholder={"Title"} value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="summary" placeholder={"Summary"} value={summary} onChange={(e) => setSummary(e.target.value)} />
        <input type="file" onChange={(e) => setFiles(e.target.files)} />
        <ReactQuill value={content} onChange={newValue => setContent(newValue)} formats={formats} modules={modules}></ReactQuill>
        <button type='submit'>Publish</button>
      </form>
    </div>
  )
}

export default Createpost