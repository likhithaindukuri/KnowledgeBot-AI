# Nexus

<p align="center">
  <strong>Multi-Tenant AI Knowledge Platform powered by Retrieval-Augmented Generation (RAG)</strong>
</p>

<p align="center">
Turn your organization's documents into an intelligent AI assistant capable of answering questions with accurate source citations.
</p>

<p align="center">

![React](https://img.shields.io/badge/React-19-000000?style=for-the-badge&logo=react)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-000000?style=for-the-badge&logo=fastapi)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-000000?style=for-the-badge&logo=postgresql)
![ChromaDB](https://img.shields.io/badge/ChromaDB-Vector_DB-000000?style=for-the-badge)
![Gemini](https://img.shields.io/badge/Gemini-Pro-000000?style=for-the-badge&logo=google)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-UI-000000?style=for-the-badge&logo=tailwindcss)
![JWT](https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge)
![Vercel](https://img.shields.io/badge/Vercel-Frontend-000000?style=for-the-badge&logo=vercel)
![Render](https://img.shields.io/badge/Render-Backend-000000?style=for-the-badge)
![Neon](https://img.shields.io/badge/Neon-PostgreSQL-000000?style=for-the-badge)

</p>

---

# Live Demo

### Nexus Dashboard

> **Live Application**

```
https://your-dashboard-url.vercel.app
```

### Demo Organization Website

> **Embedded Chatbot Demo**

```
https://your-demo-website.vercel.app
```

---

# Project Overview

Nexus is a **Multi-Tenant AI Knowledge Platform** that enables organizations to build their own AI-powered knowledge assistants without writing any AI code.

Instead of manually searching through hundreds of pages of PDFs, users can simply ask questions in natural language and receive accurate answers generated using **Retrieval-Augmented Generation (RAG)** with document citations.

Every organization gets:

- Secure Workspace
- Document Management
- AI Knowledge Base
- Embeddable Chatbot Widget
- Analytics Dashboard
- Organization Isolation
- Source-aware AI Responses

Organizations only need to upload their documents. Nexus takes care of processing, indexing, semantic search, and AI-powered response generation.

---

# Why Nexus?

Organizations store thousands of pages of important information inside documents such as:

- Admission Guidelines
- Employee Handbooks
- Policies
- Insurance Documents
- Medical Manuals
- FAQs
- SOPs
- User Guides

Searching these documents manually is slow and frustrating.

Nexus transforms those documents into an AI-powered assistant that can instantly answer questions using only the organization's uploaded knowledge.

Instead of searching documents manually...

```

Find PDF

↓

Open PDF

↓

Search Keyword

↓

Read Pages

↓

Find Answer

```

Users simply ask:

> "What is the hostel fee?"

and receive

```
Hostel fee is ₹95,000 per academic year.

Source:
Hostel_Rules.pdf

Page 4

Confidence Score: 94%
```

within seconds.

---

# Key Features

## Multi-Tenant SaaS Platform

- Organization Registration
- Workspace Isolation
- Secure Authentication
- Independent Knowledge Bases

---

## AI Knowledge Base

- Upload PDF Documents
- Automatic Text Extraction
- Intelligent Text Chunking
- Embedding Generation
- Semantic Search
- AI Answer Generation

---

## Retrieval-Augmented Generation (RAG)

- Question Embeddings
- Vector Search
- Relevant Context Retrieval
- Gemini Response Generation
- Source Citations
- Confidence Scores

---

## Embeddable AI Chatbot

Generate a chatbot for any website using a single JavaScript snippet.

```html
<script
    src="widget.js"
    data-token="YOUR_WIDGET_TOKEN"
    defer>
</script>
```

Simply paste the script before the closing `</body>` tag.

The chatbot automatically connects to the organization's private knowledge base.

---

## Analytics Dashboard

Organizations can monitor:

- Documents Uploaded
- Conversations
- AI Confidence
- Widget Usage
- Knowledge Base Health

---

## Widget Customization

Every organization can customize:

- Logo
- Greeting Message
- Theme
- Position
- Widget Title
- Branding

without changing any code.

---

# Project Screenshots

> **Replace these placeholders with your screenshots after the UI redesign.**

## Landing Page

```
(Add Screenshot Here)
```

---

## Organization Dashboard

```
(Add Screenshot Here)
```

---

## Documents Management

```
(Add Screenshot Here)
```

---

## Widget Customization

```
(Add Screenshot Here)
```

---

## Analytics Dashboard

```
(Add Screenshot Here)
```

---

## Settings

```
(Add Screenshot Here)
```

---

## Embedded Chatbot

```
(Add Screenshot Here)
```

---

## Demo Organization Website

```
(Add Screenshot Here)
```

---

# Product Demo

A short demonstration showing the end-to-end workflow.

```
Register Organization

↓

Upload Documents

↓

Automatic Processing

↓

Generate Widget

↓

Embed on Website

↓

Ask Question

↓

Receive AI Response with Citation
```

> Replace this section with a GIF or short screen recording after completing the UI redesign.

---

# High-Level Architecture

```
                    +----------------------+
                    |     Organization     |
                    +----------+-----------+
                               |
                               |
                               v
                     Upload PDF Documents
                               |
                               |
                               v
                     FastAPI Backend Server
                               |
        +----------------------+----------------------+
        |                                             |
        |                                             |
        v                                             v
 PostgreSQL                                  Document Processing
(File Metadata)                                      |
                                                      |
                                              Extract Text
                                                      |
                                              Split into Chunks
                                                      |
                                              Generate Embeddings
                                                      |
                                                      v
                                                 ChromaDB
                                              (Vector Database)

---------------------------------------------------------------

User Opens Organization Website

                |

                v

Embedded Nexus Chatbot

                |

                v

User Question

                |

                v

Generate Query Embedding

                |

                v

Semantic Search in ChromaDB

                |

                v

Top Relevant Chunks

                |

                v

Groq API Key

                |

                v

Answer + Source Citation + Confidence Score
```

---

# Complete Workflow

```
Organization Registers

        │

        ▼

Uploads PDF Documents

        │

        ▼

Backend Extracts Text

        │

        ▼

Text Chunking

        │

        ▼

Embedding Generation

        │

        ▼

Store Embeddings in ChromaDB

        │

        ▼

Generate Chatbot Widget

        │

        ▼

Embed Widget on Website

        │

        ▼

User Asks Question

        │

        ▼

Semantic Search

        │

        ▼

Relevant Context Retrieved

        │

        ▼

Gemini Generates Response

        │

        ▼

Answer + Citation + Confidence Score
```

---

# Example Use Cases

Nexus can be used across multiple industries.

### Universities

- Admission Guidelines
- Hostel Rules
- Placement Policies
- Academic Regulations

---

### Hospitals

- Medical Procedures
- Insurance Information
- Patient Guidelines
- Treatment Policies

---

### Banks

- Loan Policies
- Interest Rates
- Customer FAQs
- Internal Documentation

---

### Insurance Companies

- Claim Policies
- Coverage Details
- Premium Information
- Customer Support Knowledge Base

---

### Enterprises

- Employee Handbook
- HR Policies
- Standard Operating Procedures
- Internal Documentation

---

# Tech Stack

## Frontend

| Technology | Purpose |
|------------|---------|
| React | User Interface |
| React Router | Client-side Routing |
| Tailwind CSS | Styling |
| Axios | API Communication |
| Lucide React | Icons |

---

## Backend

| Technology | Purpose |
|------------|---------|
| FastAPI | REST API |
| Python | Backend Language |
| SQLAlchemy | ORM |
| JWT | Authentication |
| Uvicorn | ASGI Server |

---

## AI Stack

| Technology | Purpose |
|------------|---------|
| Gemini Pro | Large Language Model |
| Sentence Transformers | Embedding Generation |
| ChromaDB | Vector Database |
| RAG | Retrieval-Augmented Generation |

---

## Database

| Technology | Purpose |
|------------|---------|
| PostgreSQL (Neon) | Store Organizations, Users & Documents |
| ChromaDB | Store Vector Embeddings |

---

## Deployment

| Service | Usage |
|----------|------|
| Vercel | Frontend Hosting |
| Render | Backend Hosting |
| Neon | PostgreSQL Database |
| ChromaDB | Vector Database |
| Gemini Pro | AI Model |

---

# Project Structure

```text
Nexus
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── pages
│   │   ├── hooks
│   │   ├── utils
│   │   ├── services
│   │   └── App.jsx
│   └── package.json
│
├── backend
│   ├── api
│   ├── auth
│   ├── models
│   ├── schemas
│   ├── services
│   ├── rag
│   ├── uploads
│   ├── chroma_db
│   ├── utils
│   ├── main.py
│   └── requirements.txt
│
└── README.md
```

---

# RAG Pipeline

The chatbot uses **Retrieval-Augmented Generation (RAG)** to answer questions based only on the organization's uploaded documents.

```
User Question

        │

        ▼

Generate Question Embedding

        │

        ▼

Search ChromaDB

        │

        ▼

Retrieve Top Relevant Chunks

        │

        ▼

Pass Context + Question to Gemini

        │

        ▼

Generate Final Response

        │

        ▼

Return Answer with Citation
```

Unlike traditional chatbots, Nexus does **not rely solely on the language model's memory**. Instead, it retrieves the most relevant document chunks from the organization's knowledge base before generating an answer. This improves accuracy and helps reduce hallucinations while providing source-aware responses.

---

# Database Design

## PostgreSQL

Stores structured application data such as:

- Organizations
- Users
- Uploaded Documents
- Widget Configuration
- Analytics
- Authentication Information

---

## ChromaDB

Stores semantic vector embeddings for:

- Document Chunks
- Metadata
- Similarity Search

Each uploaded document is converted into embeddings that allow semantic retrieval during chat.

---

# Widget Workflow

```
Organization

      │

      ▼

Upload Documents

      │

      ▼

Generate Widget Token

      │

      ▼

Copy JavaScript Snippet

      │

      ▼

Paste Into Website

      │

      ▼

Embedded AI Chatbot

      │

      ▼

Real-Time Question Answering
```

Example:

```html
<script
src="widget.js"
data-token="YOUR_WIDGET_TOKEN"
defer>
</script>
```

---

# API Overview

## Authentication

```
POST /register

POST /login
```

---

## Organization

```
GET /organization

PUT /organization
```

---

## Documents

```
POST /documents

GET /documents

DELETE /documents/{id}
```

---

## Chat

```
POST /chat
```

---

## Widget

```
GET /widget

PUT /widget

GET /widget/token/{token}
```

---

## Analytics

```
GET /analytics
```

---

# Local Setup

## Clone Repository

```bash
git clone https://github.com/your-username/nexus.git

cd nexus
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend will start on:

```
http://localhost:5173
```

---

## Backend Setup

```bash
cd backend

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend will start on:

```
http://localhost:8000
```

---

# Environment Variables

Create a `.env` file inside the backend directory.

```env
DATABASE_URL=

JWT_SECRET=

JWT_ALGORITHM=

GEMINI_API_KEY=

CHROMA_DB_PATH=

UPLOAD_DIRECTORY=

ALLOWED_ORIGINS=
```

Do **not** commit your `.env` file to GitHub.

---

# Deployment Architecture

```
                React Frontend
                     │
                     │
                     ▼
                  Vercel
                     │
                     │
                     ▼
               FastAPI Backend
                    Render
                     │
        ┌────────────┴─────────────┐
        │                          │
        ▼                          ▼
 PostgreSQL (Neon)          ChromaDB
        │                          │
        └────────────┬─────────────┘
                     ▼
                 Gemini Pro
                     │
                     ▼
             AI Generated Answer
```

---

# Security Features

- JWT Authentication
- Password Hashing
- Organization-Level Data Isolation
- Protected API Endpoints
- Widget Token Authentication
- Environment Variable Configuration
- Secure Database Connections

---

# Performance Optimizations

- Document Chunking
- Semantic Vector Search
- Efficient Embedding Storage
- Lightweight Widget
- FastAPI Async Endpoints
- Optimized React Components
- Production Deployment on Vercel & Render

---

# Supported Document Types

Current Support

- PDF

Planned Support

- DOCX
- TXT
- Markdown
- HTML
- CSV

---

# Deployment Status

| Component | Status |
|-----------|--------|
| Frontend | Deployed |
| Backend | Deployed |
| PostgreSQL | Live |
| ChromaDB | Running |
| Widget | Live |
| Demo Website | Live |

---

---

# Challenges Faced

Building Nexus involved solving several real-world engineering challenges beyond implementing a typical CRUD application.

## Designing a Multi-Tenant Architecture

Every organization should only have access to its own:

- Documents
- Chatbot
- Analytics
- Widget Configuration
- Conversations

Implementing complete organization-level data isolation across the application was one of the most important architectural decisions.

---

## Building an End-to-End RAG Pipeline

Creating an accurate Retrieval-Augmented Generation (RAG) pipeline required multiple processing stages:

- PDF Text Extraction
- Document Chunking
- Embedding Generation
- Semantic Vector Search
- Context Retrieval
- AI Response Generation

Ensuring each stage worked together efficiently while maintaining response quality required careful design and testing.

---

## Developing an Embeddable AI Widget

The chatbot needed to work on any website with only a single JavaScript snippet.

This involved:

- Widget Token Authentication
- Secure Communication
- Cross-Origin Resource Sharing (CORS)
- Responsive UI
- Dynamic Configuration

---

## Working with Vector Databases

Unlike traditional SQL databases, vector databases store semantic representations of text.

Learning how embeddings work and implementing semantic similarity search using ChromaDB was one of the most valuable parts of this project.

---

## Deploying a Full-Stack AI Application

Deploying an AI application introduced additional considerations such as:

- Environment Variable Management
- API Key Security
- Database Connectivity
- CORS Configuration
- Frontend & Backend Integration
- Production Deployment

---

# What I Learned

Building Nexus significantly strengthened my understanding of modern AI application development.

Through this project, I learned:

- Designing scalable multi-tenant SaaS applications
- Building Retrieval-Augmented Generation (RAG) systems
- Working with vector databases and semantic search
- Processing and indexing large PDF documents
- Integrating Large Language Models into production applications
- Implementing secure JWT authentication
- Building embeddable JavaScript widgets
- Designing REST APIs with FastAPI
- Managing PostgreSQL using SQLAlchemy
- Deploying full-stack applications to cloud platforms
- Building responsive user interfaces using React and Tailwind CSS

---

# Future Roadmap

Nexus is designed with extensibility in mind.

Planned improvements include:

- Role-Based Access Control (RBAC)
- Team Collaboration
- Conversation History
- OCR Support for Scanned PDFs
- DOCX & TXT Support
- Image Document Understanding
- Streaming AI Responses
- Multi-Language Support
- AI Conversation Analytics
- Dashboard Improvements
- Dark Mode
- Workspace Invitations
- Document Versioning
- Chat Feedback System
- Slack Integration
- Microsoft Teams Integration
- Public API
- Webhook Support
- Rate Limiting
- Usage Billing
- Admin Dashboard

---

# Why This Project?

Traditional document search requires users to manually browse through lengthy documents to locate information.

Nexus simplifies this process by transforming organizational knowledge into an AI-powered assistant capable of answering questions instantly with transparent citations.

Instead of searching through documents...

```

User

↓

Search PDF

↓

Read Pages

↓

Find Answer

```

Users simply ask:

> "What is the hostel fee?"

and Nexus retrieves the most relevant document sections before generating a reliable answer.

---

# Example Workflow

```
ABC University

        │

        ▼

Registers on Nexus

        │

        ▼

Uploads Documents

        │

        ▼

Backend Processes PDFs

        │

        ▼

Text Chunking

        │

        ▼

Embedding Generation

        │

        ▼

Store in ChromaDB

        │

        ▼

Generate Chatbot

        │

        ▼

Embed Widget on Website

        │

        ▼

Student Opens Website

        │

        ▼

Student Asks Question

        │

        ▼

Semantic Search

        │

        ▼

Gemini Generates Answer

        │

        ▼

Citation Returned
```

---

# Project Statistics

| Metric | Value |
|---------|-------|
| Frontend | React |
| Backend | FastAPI |
| Database | PostgreSQL |
| Vector Database | ChromaDB |
| AI Model | Gemini Pro |
| Deployment | Vercel + Render + Neon |
| Authentication | JWT |
| Architecture | Multi-Tenant SaaS |
| AI Technique | Retrieval-Augmented Generation (RAG) |

---

# Contributing

Contributions, feature requests, and suggestions are always welcome.

If you would like to improve Nexus:

1. Fork the repository.
2. Create a new feature branch.
3. Commit your changes.
4. Push the branch.
5. Open a Pull Request.

---

# License

This project is licensed under the MIT License.

Feel free to use, modify, and learn from the project.

---

# Author

**Likhitha Indukuri**

Full Stack Developer | AI Enthusiast

GitHub:
https://github.com/your-github

LinkedIn:
https://linkedin.com/in/your-linkedin

Portfolio:
https://your-portfolio.com

---

# Acknowledgements

Special thanks to the open-source community and the amazing technologies that made this project possible.

- React
- FastAPI
- PostgreSQL
- ChromaDB
- Google Gemini
- Tailwind CSS
- SQLAlchemy
- Lucide React
- Vercel
- Render
- Neon

---

<p align="center">

Built with ❤️ using React, FastAPI, PostgreSQL, ChromaDB and Retrieval-Augmented Generation (RAG).

</p>