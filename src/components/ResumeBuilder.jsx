import { useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import React from "react";

export default function ResumeBuilder() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    summary: "",
    experience: "",
    education: "",
    skills: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFillColor(34, 139, 34);
    doc.rect(0, 0, 60, 297, "F"); // Sidebar Background
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.text(formData.name, 10, 30, { maxWidth: 50 });
    doc.setFontSize(12);
    doc.text(formData.phone, 10, 50, { maxWidth: 50 });
    doc.text(formData.email, 10, 60, { maxWidth: 50 });
    doc.text(formData.address, 10, 70, { maxWidth: 50 });
    doc.setFontSize(14);
    doc.text("Key Skills", 10, 90);
    doc.setFontSize(12);
    doc.text(formData.skills, 10, 100, { maxWidth: 50 });

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.text("Professional Summary", 70, 30);
    doc.setFontSize(12);
    doc.text(formData.summary, 70, 40, { maxWidth: 120 });
    
    doc.setFontSize(16);
    doc.text("Professional Experience", 70, 70);
    doc.setFontSize(12);
    doc.text(formData.experience, 70, 80, { maxWidth: 120 });
    
    doc.setFontSize(16);
    doc.text("Education", 70, 120);
    doc.setFontSize(12);
    doc.text(formData.education, 70, 130, { maxWidth: 120 });
    
    doc.save("resume.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-40 flex ">
      <div className="p-6 shadow-lg bg-white ">
        <h2 className="text-2xl font-bold mb-4">Resume Builder</h2>
        <input className="w-full p-2 border mb-2" name="name" placeholder="Full Name" onChange={handleChange} />
        <input className="w-full p-2 border mb-2" name="email" placeholder="Email" onChange={handleChange} />
        <input className="w-full p-2 border mb-2" name="phone" placeholder="Phone" onChange={handleChange} />
        <input className="w-full p-2 border mb-2" name="address" placeholder="Address" onChange={handleChange} />
        <textarea className="w-full p-2 border mb-2" name="summary" placeholder="Professional Summary" onChange={handleChange} />
        <textarea className="w-full p-2 border mb-2" name="experience" placeholder="Experience" onChange={handleChange} />
        <textarea className="w-full p-2 border mb-2" name="education" placeholder="Education" onChange={handleChange} />
        <textarea className="w-full p-2 border mb-2" name="skills" placeholder="Skills" onChange={handleChange} />
        <button className="w-full p-2 bg-green-600 text-white rounded mb-4" onClick={handleDownloadPDF}>Download PDF</button>
      </div>


      
      <div className="flex flex-col w-[55vw] md:flex-row bg-gray-100 p-3 justify-center">
      {/* Left Sidebar */}
      <div className="bg-blue-900 text-white  md:w-1/3 p-8 rounded-lg md:rounded-r-none">
        <div className="flex flex-col items-center">
          {/* <img
            src="https://via.placeholder.com/120" // Replace with actual profile image URL
            alt="Profile"
            className="rounded-full w-32 h-32 border-4 border-white mb-4"
          /> */}
          <h1 className="text-2xl font-bold">{formData.name}</h1>
          <p className="text-sm text-gray-300">MARKETING MANAGER</p>
        </div>

        {/* Contact Info */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold border-b border-gray-300 pb-1">CONTACT</h2>
          <p className="mt-2"><span className="font-semibold">📞</span> +123-456-7890</p>
          <p className="mt-1"><span className="font-semibold">✉️</span> hello@reallygreatsite.com</p>
          <p className="mt-1"><span className="font-semibold">📍</span> 123 Anywhere St., Any City</p>
          <p className="mt-1"><span className="font-semibold">🌍</span> www.reallygreatsite.com</p>
        </div>

        {/* Education */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold border-b border-gray-300 pb-1">EDUCATION</h2>
          <p className="mt-2 font-bold">2029 - 2030</p>
          <p>Wardiere University</p>
          <p className="text-sm">Master of Business Management</p>
          
          <p className="mt-3 font-bold">2025 - 2029</p>
          <p>Wardiere University</p>
          <p className="text-sm">Bachelor of Business, GPA: 3.8 / 4.0</p>
        </div>

        {/* Skills */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold border-b border-gray-300 pb-1">SKILLS</h2>
          <ul className="mt-2 list-disc list-inside text-gray-300">
            <li>Project Management</li>
            <li>Public Relations</li>
            <li>Teamwork</li>
            <li>Time Management</li>
            <li>Leadership</li>
            <li>Effective Communication</li>
            <li>Critical Thinking</li>
          </ul>
        </div>

        {/* Languages */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold border-b border-gray-300 pb-1">LANGUAGES</h2>
          <ul className="mt-2 list-disc list-inside text-gray-300">
            <li>English (Fluent)</li>
            <li>French (Fluent)</li>
            <li>German (Basics)</li>
            <li>Spanish (Intermediate)</li>
          </ul>
        </div>
      </div>

      {/* Right Section */}
      <div className="bg-white w-full md:w-2/3 p-8 rounded-lg md:rounded-l-none shadow-md">
        {/* Profile */}
        <div>
          <h2 className="text-xl font-bold border-b-2 border-gray-300 pb-1">PROFILE</h2>
          <p className="mt-2 text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        {/* Work Experience */}
        <div className="mt-6">
          <h2 className="text-xl font-bold border-b-2 border-gray-300 pb-1">WORK EXPERIENCE</h2>

          <div className="mt-4">
            <p className="font-bold">Borcelle Studio</p>
            <p className="italic text-gray-600">Marketing Manager & Specialist (2030 - PRESENT)</p>
            <ul className="list-disc list-inside mt-2 text-gray-700">
              <li>Develop and execute comprehensive marketing strategies.</li>
              <li>Lead and mentor a high-performing team.</li>
              <li>Monitor brand consistency across marketing channels.</li>
            </ul>
          </div>

          <div className="mt-4">
            <p className="font-bold">Fauget Studio</p>
            <p className="italic text-gray-600">Marketing Manager & Specialist (2025 - 2029)</p>
            <ul className="list-disc list-inside mt-2 text-gray-700">
              <li>Manage the marketing budget efficiently.</li>
              <li>Analyze market trends and customer needs.</li>
              <li>Ensure brand consistency across channels.</li>
            </ul>
          </div>

          <div className="mt-4">
            <p className="font-bold">Studio Shodwe</p>
            <p className="italic text-gray-600">Marketing Manager & Specialist (2024 - 2025)</p>
            <ul className="list-disc list-inside mt-2 text-gray-700">
              <li>Develop relationships with partners and agencies.</li>
              <li>Maintain brand consistency across channels.</li>
            </ul>
          </div>
        </div>

        {/* References */}
        <div className="mt-6">
          <h2 className="text-xl font-bold border-b-2 border-gray-300 pb-1">REFERENCE</h2>
          <div className="flex justify-between mt-4">
            <div>
              <p className="font-bold">Estelle Darcy</p>
              <p className="text-sm text-gray-600">Wardiere Inc. / CTO</p>
              <p className="text-sm">📞 123-456-7890</p>
              <p className="text-sm">✉️ hello@reallygreatsite.com</p>
            </div>
            <div>
              <p className="font-bold">Harper Richard</p>
              <p className="text-sm text-gray-600">Wardiere Inc. / CEO</p>
              <p className="text-sm">📞 123-456-7890</p>
              <p className="text-sm">✉️ hello@reallygreatsite.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
