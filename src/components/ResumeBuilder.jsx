import React from 'react';
import { useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { useRef } from "react";
import html2canvas from "html2canvas";
import "../ResumeLayout.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight,faArrowLeft,faDownload,faPlus } from '@fortawesome/free-solid-svg-icons';
import Switch from "./Switch";



export default function ResumeBuilder({ handlePrint }) {
  const componentRef = useRef(null);
  const [profileText, setProfileText] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [exprole,setExprole] = useState("");
  const [company,setCompany] = useState("");
  const [startDate,setstartDate] = useState("");
  const [endDate,setendDate] = useState("");
  const [eduDegree,setEduDegree] = useState("");
  const [eduField,setEduField] = useState("");
  const [eduInstitute,setEduInstitute] = useState("");
  const [eduStartDate,setEduStartDate] = useState("");
  const [eduEndDate,setEduEndDate] = useState("");
  const [skill,setSkill] = useState("");
  const [lang,setLang] = useState("");
  const [projectName,setProjectName]  = useState("");
  const [projectDesc,setProjectDesc] = useState("");
  const [projectLink,setProjectLink] = useState("");
  const [fresher, setFresher] = useState("Experience");
  const [errors, setErrors] = useState('');

  
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
    address: "",
    summary: "",
    experience: [],
    education: [],
    skills: [],
    languages: [],
    projects: [],
  });

  const handleGenerateAI = async () => {
  setLoading(true);
  try {
    const res = await fetch("https://resume-builder-backend-2-wn34.onrender.com/generate-summary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobTitle: formData.title }),
    });

    const data = await res.json();
    console.log(data)
    setFormData(prev => ({ ...prev, summary: data.summary }));
  } catch (err) {
    console.error("Error generating summary:", err);
  } finally {
    setLoading(false);
  }
};

  const dateFormat = (date) => {
    const options = { year: "numeric", month: "long" };
    let x =  new Date(date).toLocaleDateString(undefined, options);
    console.log(x);
    return x;
  };



  const handleDownloadPDF = async () => {
    const element = componentRef.current;
    if (!element) return;

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("resume.pdf");
  };

  const handleAddExperience = () => {
    setFormData({
      ...formData,
      experience: [...formData.experience, { role:exprole, company: company, startDate: startDate, endDate: endDate }],
    });
  };

  const handleAddEducation = () => {
    setFormData({
      ...formData,
      education: [...formData.education, { degree: eduDegree, field: eduField, institute: eduInstitute, startDate: eduStartDate, endDate: eduEndDate }],
    });
    console.log(formData.education);
  };

  const handleAddSkill = () => {
    setFormData({
      ...formData,
      skills: [...formData.skills, {skill: skill}],
    });
    console.log(formData.skills);

  };

  const handleAddLanguage = () => {
    setFormData({
      ...formData,
      languages: [...formData.languages, {language: lang}],
    });
  };

  const handleAddProject = () => {
    setFormData({
      ...formData,
      projects: [...formData.projects, {projectName: projectName, projectDesc: projectDesc, projectLink:  projectLink}],
    });
    console.log(formData.projects);
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.phone.trim()) newErrors.title = 'Phone is required';
    if (!formData.address.trim()) newErrors.title = 'Address is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextStep = () => {
    if (validate()) {
      console.log('Proceeding to next step:', formData);
      setStep(step + 1);
    }
  };

  return (
    <div className="container">
      <div className="form-section w-[650px] h-[90vh] overflow-y-scroll">
      {step === 1 && (
      <>
      <h1 className="text-[20px] font-bold mb-4">Personal Information</h1>
      {['name','title','email','phone','address'].map((field) => (
        <div>
          <label className="mb-2">{field}</label>
          <div>
            <input
              className="input"
              name={field}
              placeholder={field}
              onChange={handleChange}
              required
            />
            {errors[field] && <p className="text-red-500 mt-[-10px]">{errors[field]}</p>}
          </div>
        </div>
      ))}
      </>)}
      {/* {step === 2 && (
      <>
      <h1 className="text-[20px] font-bold mb-4">Professional Information</h1>
      <label>Full Name</label>
      <div>
      <input
          className="input"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          required
        />
        {errors && <p className="text-red-500 mt-[-10px]">{errors}</p>}
      </div>
    <label className="mb-2"> Job Title</label>
    <div>
    <input
          className="input"
          name="title"
          placeholder="Job Title"
          onChange={handleChange}
          required
        />
        {errors && <p className="text-red-500 mt-[-10px]">{errors}</p>}
    </div>

    <label className="mb-2"> Email</label>
    <div>
        <input
          className="input"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        {errors && <p className="text-red-500 mt-[-10px]">{errors}</p>}
    </div>
     <label className="mb-2"> Phone</label>
     <div>
        <input
          className="input"
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
          required
        />
        {errors && <p className="text-red-500 mt-[-10px]">{errors}</p>}
     </div>
     <label className="mb-[30px]"> Address</label>
     <div>
        <input
          className="input"
          name="address"
          placeholder="Address"
          onChange={handleChange}
          required
        />
        {errors && <p className="text-red-500 mt-[-10px]">{errors}</p>}
     </div>  
      </>
    )} */}

    {step === 2 && (
      <>
      <h1 className="text-[20px] font-bold mb-4">Professional Background</h1>
      <textarea
  className="input h-[200px]"
  value={formData.summary}
  name="summary"
  maxLength={600} // Set your desired max character limit
  placeholder="Professional Summary"
  onChange={handleChange}
/>
<div className="text-right text-sm text-gray-500 mt-[-20px]">
  {formData.summary.length} / 1000
</div>

          <button
        onClick={handleGenerateAI}
        disabled={loading}
        className="px-4 py-2 rounded bg-blue-600 text-white  hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
      >
        {loading ? "Generating..." : "Generate with AI ✨"}
      </button>
      <div className="flex justify-between items-center">
        <h1 className="text-[18px] mt-4 mb-4">{fresher}</h1> 
      <Switch fresher={fresher} setFresher={setFresher}></Switch>
      </div>
        <div className={fresher === "Experience" ? "block" : "hidden"}>
        <label>Role</label>
        <div>
        <input className="input" name="experience-role" placeholder="Role" onChange={(e)=> setExprole(e.target.value)} />
        </div>
        <label>Company Name</label>
        <div>
        <input className="input" name="company name" placeholder="Company Name" onChange={(e)=> setCompany(e.target.value)} />
        </div>
        <label>Start Date</label>
        <div>
        <input type="date" className="input" name="start date" placeholder="Start Date" onChange={(e)=> setstartDate(dateFormat(e.target.value))} />
        </div>
        <label>End Date</label>
        <div>
        <input type="date" className="input" name="end date" placeholder="End Date" onChange={(e)=> setendDate(dateFormat(e.target.value))} />
        <br></br><input type="checkbox" onChange={(e) => false?"":setendDate("Present") } /> Currently working here
        </div>
        {/* <input className="input" name="skills" placeholder="Skills" onChange={handleChange} /> */}
        <button className="p-2 rounded bg-blue-600 text-white" onClick={() => handleAddExperience()} >Add Experience <FontAwesomeIcon icon={faPlus} ></FontAwesomeIcon> </button>
        </div>
        <div className={fresher === "Projects" ? "block" : "hidden"}>
      {/* <h1 className="text-[20px] font-bold mb-4">Projects</h1> */}
      <input className="input" name="project" placeholder="Your project name" onChange={(e) =>setProjectName(e.target.value) } /><br></br>
      <textarea className="input" maxLength={1000} placeholder="Describe your project, write about tech stack etc." onChange={(e) => setProjectDesc(e.target.value) }></textarea>
      <input className="input" name="project-link" placeholder="Project Link" onChange={(e) => setProjectLink(e.target.value)} /><br></br>
      <button className="p-2 rounded bg-blue-600 text-white" onClick={() => handleAddProject()} >Add Project <FontAwesomeIcon icon={faPlus} ></FontAwesomeIcon> </button>   
        </div>
      </>
    )}
    {step === 3 && (
      <>
      <h1 className="text-[20px] font-bold mb-4">Education</h1>
      <h1>Degree/Certification</h1>
      <input className="input" name="education" placeholder="higher qualification" onChange={(e)=> setEduDegree(e.target.value)} />
      <h1>Field Of Study</h1>
      <input className="input" name="field of study" placeholder="field of study" onChange={(e)=> setEduField(e.target.value)} />
      <h1>Institution</h1>
      <input className="input" name="institution" placeholder="institution" onChange={(e)=> setEduInstitute(e.target.value) } />
      <h1>Start Date</h1>
      <input className="input" type="date" name="startdate" placeholder="start date" onChange={(e)=> setEduStartDate(dateFormat(e.target.value))} />
      <h1>End Date</h1>
      <input className="input" type="date" name="enddate" placeholder="end date" onChange={(e)=> setEduEndDate(dateFormat(e.target.value))} />
      <br></br><input type="checkbox" onChange={(e) => false?"":setEduEndDate("Currently Pursuing") } /> Currently pursuing<br></br>
      <button className="p-2 rounded bg-blue-600 text-white" onClick={() => handleAddEducation()} >Add Education <FontAwesomeIcon icon={faPlus} ></FontAwesomeIcon> </button>
      </>
      
    )}
    {step === 4 && (
      <>
      <h1 className="text-[20px] font-bold mb-4">Skills</h1>
      <input className="input" name="skills" placeholder="Skills" onChange={(e) => setSkill(e.target.value)} /><br></br>
      <button className="p-2 rounded bg-blue-600 text-white" onClick={() => handleAddSkill()} >Add Skill <FontAwesomeIcon icon={faPlus} ></FontAwesomeIcon> </button>
      <br></br>
      <br></br>
      <h1 className="text-[20px] font-bold mb-4">Languages</h1>
      <input className="input" name="languages" placeholder="Languages" onChange={(e) => setLang(e.target.value)} /><br></br>
      <button className="p-2 rounded bg-blue-600 text-white" onClick={() => handleAddLanguage()} >Add Language</button>
      </>
    )}
        
        <div className="button-group">
  {step > 1 && (
    <button onClick={() => setStep(step - 1)} className="nav-button"> <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon> Back</button>
  )}
  {step < 4 ? (
    <button onClick={() => handleNextStep()} className="nav-button">Next <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon></button>
  ) : 
       <button onClick={()=> handleDownloadPDF()}  className="download-button">Download PDF <FontAwesomeIcon icon={faDownload}></FontAwesomeIcon></button>
  }
</div>
      </div>
<div className="container-printable" ref={componentRef}>
    <header>
      <h1>{formData.name}</h1>
      <p>Email: {formData.email} | Phone: {formData.phone} | {formData.address}</p>
      <p>LinkedIn: linkedin.com/in/johndoe | Portfolio: johndoe.dev</p>
    </header>

    <div className="section">
      <div className="section-title">Professional Summary</div>
      <p>{formData.summary}</p>
    </div>
    <div className="section">
      <div className="section-title">{fresher === "Projects" ? "Projects" : "Work Experience"}</div>
      {
        formData.experience.map((exp)=>{
        return <div className={"item "+(fresher === "Projects" ? "hidden" : "block")} key={exp}>
        <div className={"item-title clearfix "}>
          {exp.role} - {exp.company}
          {/* <span className="date">{startDate} – {endDate}</span> */}
        </div>
        <span className="date">{startDate} – {endDate}</span>
      </div>  
        }
        )
      }
      {
        formData.projects.map((project)=>{
          return <div className={"item "+(fresher === "Projects" ? "block" : "hidden")}>
          <div className="">
            <span className="font-black">{project.projectName}</span>
            <p>{project.projectDesc}</p>             
            <a href="#" className="underline">{project.projectLink}</a>             
          </div>
          {/* <div className="item-subtitle">New York, NY</div> */}
        </div>  
          }
          )
      }


      {/* <div className="item">
        <div className="item-title clearfix">
          Frontend Developer - ABC Tech
          <span className="date">Jan 2021 – Present</span>
        </div>
        <div className="item-subtitle">New York, NY</div>
        <ul>
          <li>Developed and maintained responsive user interfaces using React and TypeScript.</li>
          <li>Optimized performance and accessibility, reducing page load time by 30%.</li>
          <li>Collaborated with backend teams to integrate RESTful APIs.</li>
        </ul>
      </div>

      <div className="item">
        <div className="item-title clearfix">
          Web Developer - XYZ Solutions
          <span className="date">Jun 2018 – Dec 2020</span>
        </div>
        <div className="item-subtitle">San Francisco, CA</div>
        <ul>
          <li>Created and maintained company websites using HTML, CSS, and JavaScript.</li>
          <li>Improved UX/UI design, increasing user engagement by 40%.</li>
        </ul>
      </div> */}
    </div>

    <div className="section">
      <div className="section-title">Education</div>
      {
        formData.education.map((edu)=>{
          return <div className="item">
          <div className="item-title clearfix">
            {edu.degree} in {edu.field}
            <span className="date">{edu.startDate} – {edu.endDate}</span>
          </div>
          <div className="item-subtitle">{edu.institute}</div>
        </div>
        }
        )
      }
    </div>

    <div className="section">
      <div className="section-title">Skills</div>
      <p>{formData.skills.map((skill)=>{
        return <span>{skill.skill} | </span>
      })}</p>
    </div>

    <div className="section">
      <div className="section-title">Languages</div>
      <p></p>
    </div>
  </div>
    </div>
  );
}
