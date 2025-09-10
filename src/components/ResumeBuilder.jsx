import React from 'react';
import { useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { useRef } from "react";
import html2canvas from "html2canvas";
import "../ResumeLayout.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft, faDownload, faPlus } from '@fortawesome/free-solid-svg-icons';
import Switch from "./Switch";

export default function ResumeBuilder({ handlePrint }) {
  const componentRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [fresher, setFresher] = useState("Experience");
  const [errors, setErrors] = useState('');

  // Optimized state variables:
  const [formInput, setFormInput] = useState({
    exprole: "",
    company: "",
    startDateExp: "",
    endDateExp: "",
    startDate: "",
    endDate: "",
    eduDegree: "",
    eduField: "",
    eduInstitute: "",
    eduStartDate: "",
    eduEndDate: "",
    skill: "",
    lang: "",
    projectName: "",
    projectDesc: "",
    projectLink: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    portfolio: "",
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
        body: JSON.stringify({
          jobTitle: formData.title,
          company: fresher === "Experience" ? formData.experience[0]?.company : formData.projects[0]?.projectName,
          experience: fresher === "Experience" ? formData.experience.duration : null
        }),
      });

      const data = await res.json();
      setFormData(prev => ({ ...prev, summary: data.summary }));
    } catch (err) {
      console.error("Error generating summary:", err);
    } finally {
      setLoading(false);
    }
  };

  const dateFormat = (date) => {
    if (!date) return "";
    const options = { year: "numeric", month: "long" };
    let x = new Date(date).toLocaleDateString(undefined, options);
    return x;
  };

  const showExperienceTime = (startDateExp, endDateExp) => {
    if(endDateExp === new Date().toISOString().split('T')[0]) return 'Currently Working';
    const startDate = new Date(startDateExp);
    const endDate = new Date(endDateExp);

    let years = endDate.getFullYear() - startDate.getFullYear();
    let months = endDate.getMonth() - startDate.getMonth();

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const yearStr = years > 0 ? `${years} year${years > 1 ? 's' : ''}` : '';
    const monthStr = months > 0 ? `${months} month${months > 1 ? 's' : ''}` : '';

    const result = [yearStr, monthStr].filter(Boolean).join(' ');

    return result || 'Currently Working';
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
    const { exprole, company, startDateExp, endDateExp } = formInput;
    if (!exprole || !company || !startDateExp) {
      alert("Please fill all fields to add experience.");
      return;
    }
    const temp_exp = showExperienceTime(startDateExp, endDateExp);
    setFormData({
      ...formData,
      experience: [...formData.experience, {
        role: exprole,
        company: company,
        startDate: dateFormat(startDateExp),
        endDate: dateFormat(endDateExp),
        duration: temp_exp
      }],
    });
    setFormInput(prev => ({ ...prev, exprole: "", company: "", startDateExp: "", endDateExp: "" }));
  };

  const handleAddEducation = () => {
    const { eduDegree, eduField, eduInstitute, eduStartDate, eduEndDate } = formInput;
    if (!eduDegree || !eduInstitute) {
      alert("Please fill all fields to add education.");
      return;
    }
    setFormData({
      ...formData,
      education: [...formData.education, {
        degree: eduDegree,
        field: eduField,
        institute: eduInstitute,
        startDate: dateFormat(eduStartDate),
        endDate: dateFormat(eduEndDate)
      }],
    });
    setFormInput(prev => ({ ...prev, eduDegree: "", eduField: "", eduInstitute: "", eduStartDate: "", eduEndDate: "" }));
  };

  const handleAddSkill = () => {
    if (!formInput.skill) return;
    setFormData({
      ...formData,
      skills: [...formData.skills, { skill: formInput.skill }],
    });
    setFormInput(prev => ({ ...prev, skill: "" }));
  };

  const handleAddLanguage = () => {
    if (!formInput.lang) return;
    setFormData({
      ...formData,
      languages: [...formData.languages, { language: formInput.lang }],
    });
    setFormInput(prev => ({ ...prev, lang: "" }));
  };

  const handleAddProject = () => {
    const { projectName, projectDesc, projectLink } = formInput;
    if (!projectName) {
      alert("Project name is required.");
      return;
    }
    setFormData({
      ...formData,
      projects: [...formData.projects, {
        projectName: projectName,
        projectDesc: projectDesc,
        projectLink: projectLink
      }],
    });
    setFormInput(prev => ({ ...prev, projectName: "", projectDesc: "", projectLink: "" }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
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

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setFormInput(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container">
      <div className="form-section w-[650px] h-[90vh] overflow-y-scroll">
        {step === 1 && (
          <>
            <h1 className="text-[20px] font-bold mb-4">Personal Information</h1>
            {['name', 'title', 'email', 'phone', 'address', 'linkedin','portfolio'].map((field) => (
              <div key={field}>
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

        {step === 2 && (
          <>
            <h1 className="text-[20px] font-bold mb-4">Professional Background</h1>
            <div className="flex justify-between items-center">
              <h1 className="text-[18px] mt-4 mb-4">{fresher}</h1>
              <Switch fresher={fresher} setFresher={setFresher}></Switch>
            </div>
            <div className={fresher === "Experience" ? "block" : "hidden"}>
              <label>Role</label>
              <div>
                <input className="input" name="exprole" placeholder="Role" value={formInput.exprole} onChange={handleFormInputChange} />
              </div>
              <label>Company Name</label>
              <div>
                <input className="input" name="company" placeholder="Company Name" value={formInput.company} onChange={handleFormInputChange} />
              </div>
              <label>Start Date</label>
              <div>
                <input type="date" className="input" name="startDateExp" placeholder="Start Date" value={formInput.startDateExp} onChange={handleFormInputChange} />
              </div>
              <label>End Date</label>
              <div>
                <input type="date" className="input" name="endDateExp" placeholder="End Date" value={formInput.endDateExp} onChange={handleFormInputChange} />
                <br></br><input type="checkbox" onChange={(e) => e.target.checked ? setFormInput(prev => ({ ...prev, endDateExp: new Date().toISOString().split('T')[0] })) : setFormInput(prev => ({ ...prev, endDateExp: "" }))} /> Currently working here
              </div>
              <button className="p-2 rounded bg-blue-600 text-white" onClick={handleAddExperience} >Add Experience <FontAwesomeIcon icon={faPlus} ></FontAwesomeIcon> </button>
            </div>
            <div className={fresher === "Projects" ? "block" : "hidden"}>
              <input className="input" name="projectName" placeholder="Your project name" value={formInput.projectName} onChange={handleFormInputChange} /><br></br>
              <textarea className="input" maxLength={1000} placeholder="Describe your project, write about tech stack etc." value={formInput.projectDesc} onChange={handleFormInputChange}></textarea>
              <input className="input" name="projectLink" placeholder="Project Link" value={formInput.projectLink} onChange={handleFormInputChange} /><br></br>
              <button className="p-2 rounded bg-blue-600 text-white" onClick={handleAddProject} >Add Project <FontAwesomeIcon icon={faPlus} ></FontAwesomeIcon> </button>
            </div>
            <textarea
              className="input h-[200px]"
              value={formData.summary}
              name="summary"
              maxLength={600}
              placeholder="Professional Summary"
              onChange={handleChange}
            />
            <div className="text-right text-sm text-gray-500 mt-[-20px]">
              {formData.summary.length} / 1000
            </div>

            <button
              onClick={handleGenerateAI}
              disabled={loading}
              className="px-4 py-2 rounded bg-blue-600 text-white  hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Generating..." : "Generate with AI ✨"}
            </button>
          </>
        )}
        {step === 3 && (
          <>
            <h1 className="text-[20px] font-bold mb-4">Education</h1>
            <h1>Degree/Certification</h1>
            <input className="input" name="eduDegree" placeholder="higher qualification" value={formInput.eduDegree} onChange={handleFormInputChange} />
            <h1>Field Of Study</h1>
            <input className="input" name="eduField" placeholder="field of study" value={formInput.eduField} onChange={handleFormInputChange} />
            <h1>Institution</h1>
            <input className="input" name="eduInstitute" placeholder="institution" value={formInput.eduInstitute} onChange={handleFormInputChange} />
            <h1>Start Date</h1>
            <input className="input" type="date" name="eduStartDate" placeholder="start date" value={formInput.eduStartDate} onChange={handleFormInputChange} />
            <h1>End Date</h1>
            <input className="input" type="date" name="eduEndDate" placeholder="end date" value={formInput.eduEndDate} onChange={handleFormInputChange} />
            <br></br><input type="checkbox" onChange={(e) => e.target.checked ? setFormInput(prev => ({ ...prev, eduEndDate: "Currently Pursuing" })) : setFormInput(prev => ({ ...prev, eduEndDate: "" }))} /> Currently pursuing<br></br>
            <button className="p-2 rounded bg-blue-600 text-white" onClick={handleAddEducation} >Add Education <FontAwesomeIcon icon={faPlus} ></FontAwesomeIcon> </button>
          </>
        )}
        {step === 4 && (
          <>
            <h1 className="text-[20px] font-bold mb-4">Skills</h1>
            <input className="input" name="skill" value={formInput.skill} placeholder="Skills" onChange={handleFormInputChange} /><br></br>
            <button className="p-2 rounded bg-blue-600 text-white" onClick={handleAddSkill} >Add Skill <FontAwesomeIcon icon={faPlus} ></FontAwesomeIcon> </button>
            <br></br>
            <br></br>
            <h1 className="text-[20px] font-bold mb-4">Languages</h1>
            <input className="input" name="lang" placeholder="Languages" value={formInput.lang} onChange={handleFormInputChange} /><br></br>
            <button className="p-2 rounded bg-blue-600 text-white" onClick={handleAddLanguage} >Add Language</button>
          </>
        )}

        <div className="button-group">
          {step > 1 && (
            <button onClick={() => setStep(step - 1)} className="nav-button"> <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon> Back</button>
          )}
          {step < 4 ? (
            <button onClick={() => handleNextStep()} className="nav-button">Next <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon></button>
          ) :
            <button onClick={() => handleDownloadPDF()} className="download-button">Download PDF <FontAwesomeIcon icon={faDownload}></FontAwesomeIcon></button>
          }
        </div>
      </div>
      <div className="container-printable" ref={componentRef}>
        <header>
          <h1>{formData.name}</h1>
          <h2>{"(" + formData.title + ")"}</h2>
          <p className={formData.email? "block" : "hidden"}> Email:- {formData.email} <p className={formData.phone? "inline" : "hidden"}> | Phone:-{" " + formData.phone} </p> | {formData.address}</p>
          { 
            formData.linkedin && 
            <p>Linkedin: <a href={formData.linkedin} target="_blank" rel="noopener noreferrer">{formData.linkedin}</a></p>
            
            
          }
          { 
            formData.portfolio && 
            <p>Portfolio: <a href={formData.portfolio} target="_blank" rel="noopener noreferrer">{formData.portfolio}</a></p>
            
            
          }
        </header>

        <div className="section">
          <div className="section-title">Professional Summary</div>
          <hr></hr>
          <p>{formData.summary}</p>
        </div>
        <div className="section">
          <div className="section-title">{fresher === "Projects" ? "Projects" : "Work Experience"}</div>
          <hr></hr>
          {
            <ul className='list-disc list-inside'>
              {
                formData.experience.map((exp, index) => {
              return <div className={"item " + (fresher === "Projects" ? "hidden" : "block")} key={index}>
                <div className={"item-title clearfix "}>
                  {`${index+1+")"} ${exp.role} at ${exp.company}`}
                </div>
                <span className="date">{exp.startDate} – {exp.endDate}{'(' + exp.duration + ')'}</span>
              </div>
            }
            )
              } 
            </ul>
            
          }
          {
            formData.projects.map((project, index) => {
              return <div className={"item " + (fresher === "Projects" ? "block" : "hidden")} key={index}>
                <div className="">
                  <span className="font-black">{project.projectName}</span>
                  <p>{project.projectDesc}</p>
                  <a href="#" className="underline">{project.projectLink}</a>
                </div>
              </div>
            }
            )
          }
        </div>

        <div className="section">
          <div className="section-title">Education</div>
          <hr></hr>
          {
            formData.education.map((edu, index) => {
              return <div className="item" key={index}>
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
          <hr></hr>
          <p>{formData.skills.map((skill, index) => {
            return <span key={index}>{skill.skill} | </span>
          })}</p>
        </div>

        <div className="section">
          <div className="section-title">Languages</div>
          <hr></hr>
          <p>{formData.languages.map((lang, index) => {
            return <span key={index}>{lang.language} | </span>
          })}</p>
        </div>
      </div>
    </div>
  );
}