import { useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import React from "react";
import { useRef } from "react";
import html2canvas from "html2canvas";
import "../ResumeLayout.css";
import ProfileSection from "./ProfileSection";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight,faArrowLeft,faDownload,faPlus } from '@fortawesome/free-solid-svg-icons';



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
    const res = await fetch("http://localhost:5000/generate-summary", {
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
    console.log();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <div className="form-section">
      {step === 1 && (
      <>
      <h1 className="text-[20px] font-bold mb-4">Personal Information</h1>
      <label>Full Name</label>
      <div>
      <input
          className="input"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          required
        />
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
     </div>  
      </>
    )}

    {step === 2 && (
      <>
      <h1 className="text-[20px] font-bold mb-4">Professional Background</h1>
      <textarea
  className="input"
  value={formData.summary}
  name="summary"
  maxLength={500} // Set your desired max character limit
  placeholder="Professional Summary"
  onChange={handleChange}
/>
<div className="text-right text-sm text-gray-500 mt-1">
  {formData.summary.length} / 500 characters
</div>

          <button
        onClick={handleGenerateAI}
        disabled={loading}
        className="px-4 py-2 rounded bg-blue-600 text-white  hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
      >
        {loading ? "Generating..." : "Generate with AI ✨"}
      </button>
        <h1 className="text-[18px] mt-4 mb-4">Experience</h1>
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

    {step === 5 && (
      <>
      <h1 className="text-[20px] font-bold mb-4">Projects</h1>
      <input className="input" name="project" placeholder="Your project name" onChange={(e) =>setProjectName(e.target.value) } /><br></br>
      <textarea className="input" maxLength={1000} placeholder="Describe your project, write about tech stack etc." onChange={(e) => setProjectDesc(e.target.value) }></textarea>
      <input className="input" name="project-link" placeholder="Project Link" onChange={(e) => setProjectLink(e.target.value)} /><br></br>
      <button className="p-2 rounded bg-blue-600 text-white" onClick={() => handleAddProject()} >Add Project <FontAwesomeIcon icon={faPlus} ></FontAwesomeIcon> </button>   
      </>
    )}
        
        <div className="button-group">
  {step > 1 && (
    <button onClick={() => setStep(step - 1)} className="nav-button"> <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon> Back</button>
  )}
  {step < 5 ? (
    <button onClick={() => setStep(step + 1)} className="nav-button">Next <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon></button>
  ) : 
       <button onClick={()=> handleDownloadPDF()}  className="download-button">Download PDF <FontAwesomeIcon icon={faDownload}></FontAwesomeIcon></button>
  }
</div>
      </div>

      <div
        id="printable-section"
        ref={componentRef}
        className="printable-section" 
      >
        <div className="left-sidebar">
          <div className="profile-header">
            <h1 className="full-name">{formData.name}</h1>
            <p className="role-title">{formData.title}</p>
          </div>

          <div className="section">
            <h2>CONTACT</h2>
            <p>{formData.phone}</p>
            <p>{formData.email}</p>
            <p>{formData.address}</p>
          </div>
          <div className="section">
        <h2>EDUCATION</h2>
        {
          formData.education.map((edu, index) => (
            <p key={index}>
              <strong>{edu.degree}</strong><br/>
              {edu.institute}<br/>
              <small>{edu.startDate} - {edu.endDate}</small>
            </p>
          ))
        }

        {/* <p><strong>2029 - 2030</strong><br/>Wardiere University<br/><small>Master of Business Management</small></p>
        <p><strong>2025 - 2029</strong><br/>Wardiere University<br/><small>Bachelor of Business, GPA: 3.8 / 4.0</small></p> */}
      </div>

          <div className="section">
            <h2>SKILLS</h2>
            {
              formData.skills.map((skill, index) => (
                <p key={index}>{skill.skill}</p>
              ))
            }
            
          </div>

          <div className="section">
            <h2>LANGUAGES</h2>
            {
              formData.languages.map((lang,key)=>(
                  <p>{lang.language}</p>    
              ))
            }
          </div>
        </div>

        <div className="right-content">
          <div className="section">
            <h2>PROFILE</h2>
            <p>{formData.summary}</p>
          </div>

          <div className="section">
            <h2>WORK EXPERIENCE</h2>
            <div className="job">
              {
                formData.experience.map((job,key)=>
                  {
                    return <><span className="font-bold">{job.role}</span><br></br>
                    <span>{job.company}</span><br></br>
                    <span>{job.startDate} - {job.endDate}</span><br></br><br></br></>
                })
              }
            </div>
            {/* <div className="job">
              <p>
                <strong>Fauget Studio</strong>
                <br />
                <em>Marketing Manager & Specialist (2025 - 2029)</em>
              </p>
              <ul>
                <li>Manage the marketing budget efficiently.</li>
                <li>Analyze market trends and customer needs.</li>
                <li>Ensure brand consistency across channels.</li>
              </ul>
            </div>
            <div className="job">
              <p>
                <strong>Studio Shodwe</strong>
                <br />
                <em>Marketing Manager & Specialist (2024 - 2025)</em>
              </p>
              <ul>
                <li>Develop relationships with partners and agencies.</li>
                <li>Maintain brand consistency across channels.</li>
              </ul>
            </div> */}
          </div>

          <div className="section">
            <h2>PROJECTS</h2>
            <div className="references">
              {
                formData.projects.map((project,key)=>(
                 <>
                  <strong>{project.projectName}</strong><br></br>
                  <p>{project.projectDesc}</p>
                  <a href={project.projectLink}>{project.projectLink}</a>
                 </>
                )
                  )
              }
              {/* <div>
                <p>
                  <strong>Youtube Clone</strong>
                  <br />
                  <span>Wardiere Inc. / CTO</span>
                </p>
              </div> */}
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
