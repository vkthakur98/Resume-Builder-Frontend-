import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ResumePDF from "./ResumePDF";

const ResumeDownloadButton = ({ resumeData,dateFormat, fresher }) => {
  return (
    <PDFDownloadLink
      document={<ResumePDF data={resumeData} dateFormat={dateFormat} fresher={fresher} />}
      fileName="resume.pdf"
      style={{ textDecoration: "none" }}
    >
      {({ loading }) => (
        <button
          type="button"
          style={{
            padding: "10px 16px",
            backgroundColor: "#000",
            color: "#fff",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          {loading ? "Preparing PDF..." : "Download Resume"}
        </button>
      )}
    </PDFDownloadLink>
  );
};

export default ResumeDownloadButton;
