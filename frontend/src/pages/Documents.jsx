import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import {
  deleteDocument,
  fetchDocuments,
  uploadDocument,
} from "../utils/api";

import {
  FileText,
  Upload,
  Trash2,
  CheckCircle,
} from "lucide-react";

export default function Documents({ organization }) {
  const [documents, setDocuments] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadDocuments = () => {
    fetchDocuments()
      .then(setDocuments)
      .catch(() => setError("Could not load documents."));
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a PDF file.");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      await uploadDocument(file);
      setMessage("Document uploaded and indexed successfully.");
      setFile(null);
      loadDocuments();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this document?")) return;

    try {
      await deleteDocument(id);
      loadDocuments();
    } catch {
      setError("Failed to delete document.");
    }
  };

  return (
    <DashboardLayout organization={organization} title="Knowledge Base">

      {/* HEADER */}

      <div className="mb-10 max-w-3xl">

        <h2 className="text-3xl font-bold text-black">
          Knowledge Base
        </h2>

        <p className="mt-3 text-neutral-600 leading-7">
          Upload PDFs, policies, FAQs, and manuals. Your AI will
          automatically extract content, generate embeddings, and
          enable semantic search through RAG.
        </p>

      </div>

      {/* UPLOAD AREA */}

      <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-8">

        <div className="flex items-center gap-2 mb-6">
          <Upload className="w-5 h-5 text-neutral-700" />
          <h3 className="text-xl font-semibold">
            Upload Document
          </h3>
        </div>

        {/* DROP AREA */}

        <label
          htmlFor="upload"
          className="block border-2 border-dashed border-neutral-300 rounded-2xl p-12 cursor-pointer hover:bg-neutral-50 transition text-center"
        >

          <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-neutral-100 flex items-center justify-center">
            <FileText className="w-5 h-5 text-neutral-600" />
          </div>

          <p className="font-medium text-black">
            {file ? file.name : "Drag & drop or click to upload PDF"}
          </p>

          <p className="text-sm text-neutral-500 mt-2">
            Only PDF files supported • Recommended under 20MB
          </p>

        </label>

        <input
          id="upload"
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        {/* BUTTON */}

        <button
          onClick={handleUpload}
          disabled={loading || !file}
          className="mt-6 bg-black text-white px-6 py-3 rounded-xl disabled:opacity-50 hover:bg-neutral-800 transition"
        >
          {loading ? "Uploading..." : "Upload Document"}
        </button>

        {/* MESSAGES */}

        {error && (
          <div className="mt-5 border border-red-200 bg-red-50 rounded-xl p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {message && (
          <div className="mt-5 border border-green-200 bg-green-50 rounded-xl p-4 text-sm text-green-700">
            {message}
          </div>
        )}

      </div>

      {/* DOCUMENT LIST */}

      <div className="bg-white border border-neutral-200 rounded-2xl">

        {/* HEADER */}

        <div className="p-6 border-b border-neutral-100 flex justify-between items-center">

          <h3 className="text-xl font-semibold text-black">
            Uploaded Documents
          </h3>

          <span className="text-sm text-neutral-500">
            {documents.length} files
          </span>

        </div>

        {/* EMPTY STATE */}

        {documents.length === 0 ? (
          <div className="p-14 text-center">

            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-neutral-100 flex items-center justify-center">
              <FileText className="w-5 h-5 text-neutral-500" />
            </div>

            <p className="text-lg font-medium text-black">
              No documents yet
            </p>

            <p className="text-sm text-neutral-500 mt-2 max-w-md mx-auto">
              Upload your first PDF to start building your AI knowledge base.
            </p>

          </div>
        ) : (
          <div className="divide-y divide-neutral-100">

            {documents.map((doc) => (

              <div
                key={doc.id}
                className="p-5 flex items-center justify-between hover:bg-neutral-50 transition"
              >

                {/* LEFT */}

                <div className="flex items-center gap-4">

                  <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-neutral-600" />
                  </div>

                  <div>

                    <p className="font-medium text-black">
                      {doc.filename}
                    </p>

                    <p className="text-sm text-neutral-500">
                      {doc.chunk_count} chunks indexed
                    </p>

                  </div>

                </div>

                {/* RIGHT */}

                <div className="flex items-center gap-3">

                  <span className="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-neutral-100 text-neutral-700">
                    <CheckCircle className="w-3 h-3" />
                    Indexed
                  </span>

                  <button
                    onClick={() => handleDelete(doc.id)}
                    className="flex items-center gap-1 text-sm border border-neutral-200 px-3 py-2 rounded-lg hover:bg-neutral-100 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>

    </DashboardLayout>
  );
}