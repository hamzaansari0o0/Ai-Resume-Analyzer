
<div align="center">

# 📄 AI-Powered Resume Analyzer & ATS Matcher

**An intelligent Applicant Tracking System (ATS) that leverages Google Gemini to analyze resumes, identify skill gaps, and provide real-time actionable feedback.**

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white)](https://deepmind.google/technologies/gemini/)

*Elevating the job search experience with AI-driven insights.*

</div>

---

## ⚡ Project Overview

This full-stack AI application acts as a smart Applicant Tracking System (ATS). It allows users to upload PDF resumes and compares them dynamically against specific Job Descriptions (JDs), Job Types, and Experience Levels. Powered by Google's **Gemini 2.5 Flash API**, the system extracts data, analyzes skill gaps, and delivers a comprehensive JSON-structured report to help candidates optimize their resumes.

---

## 🎥 App Demo

👇 **Watch the Demo:** 


https://github.com/user-attachments/assets/1df8d57b-06e6-4151-815e-1c7867dc0e65


---

## 📱 App Screenshots

| Dashboard / Upload | ATS Score Report |
| :---: | :---: |
| ![analyzer form](https://github.com/user-attachments/assets/e310e391-0124-4cc4-a57e-7ba8bdad99d8) | ![JD match analysis](https://github.com/user-attachments/assets/efd855b5-9b56-4c18-afc2-847fd057c69c) |

| Skill Gap Analysis | Action Verbs Review |
| :---: | :---: |
| ![skills](https://github.com/user-attachments/assets/a3f12280-7645-4092-8c3e-70f9160fc6dc) | ![action verbs](https://github.com/user-attachments/assets/c504d375-c33b-4c22-891f-aa4e65d34fc1) |

| AI Suggestions | |
| :---: | :---: |
| ![AI suggestions](https://github.com/user-attachments/assets/de5b4bcf-c5e3-43d0-84d1-8313ca9601d7) | *(More coming soon)* |

---

## ✨ Key Features & Technical Implementations

| Feature | Technical Details |
| :--- | :--- |
| 📄 **Advanced PDF Parsing** | Custom `pdfHelper.js` extracts raw text. Robust backend pipeline sanitizes data using Regex (removing special characters/extra spaces) and truncates to 15k characters to optimize AI context windows. |
| 🧠 **Strict Prompt Engineering** | Highly optimized, zero-shot system prompts guiding Gemini LLM. Enforces strict JSON-only formats (`responseMimeType: "application/json"`) to eliminate parsing errors. |
| 🎯 **Deep ATS Logic** | Strict JD matching, dynamic extraction of `skills_detected` and `missing_skills`, and dynamic overall ATS compatibility scoring (out of 100). |
| ✍️ **Action Verb Analysis** | NLP-style evaluation of resume language. Identifies `strong_used` verbs (e.g., *Engineered*) and flags `weak_used` verbs (e.g., *Helped*) for better impact. |
| 💰 **API Cost Optimization** | Engineered a backend logging system tracking precise `usageMetadata` from Google API. Logs Input, Output, and Total Tokens for exact cost calculations. |
| 🔒 **Secure Architecture** | Implemented professional Git workflows, resolving monorepo tracking issues. Strict `.env` handling to hide API keys/URIs, providing `.env.example` for developers. |

---

## 🛠️ Tech Stack & Architecture

* **Frontend:** Next.js (React) for a fast, dynamic, and responsive UI.
* **Backend:** Node.js & Express.js for handling API requests, file uploads, and AI communication.
* **Database:** MongoDB for highly scalable storage of parsed texts, unstructured JSON reports, and user history.
* **AI Engine:** Google Gemini 2.5 Flash API.
* **Version Control:** Git/GitHub with strict environment management.

---

## 🚀 Getting Started

To run this project locally, follow these steps:

### Prerequisites
* [Node.js](https://nodejs.org/) installed on your machine.
* A [MongoDB](https://www.mongodb.com/) URI.
* A [Google Gemini API Key](https://aistudio.google.com/).

### Installation

**1. Clone the repository**
```bash
git clone [https://github.com/hamzaansari0o0/Ai-Resume-Analyzer.git](https://github.com/hamzaansari0o0/Ai-Resume-Analyzer.git)
cd Ai-Resume-Analyzer
