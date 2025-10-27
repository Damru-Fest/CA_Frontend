"use client";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { useAuth } from "@/app/context/AuthContext";

const AdminPanel = () => {
  const { user, logout } = useAuth();
  const [view, setView] = useState("emails"); // 'applications' or 'emails'
  const [applications, setApplications] = useState([]);
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const exportToCSV = (data, filename) => {
    if (!data || data.length === 0) {
      alert("No data to export");
      return;
    }

    let csv = "";
    if (view === "applications") {
      csv =
        "Name,Email,College,Year,Stream,Status,LinkedIn,Instagram,Experience,Why Ambassador,Submitted At\n";
      data.forEach((app) => {
        const row = [
          app.user?.name || "-",
          app.user?.email || "-",
          app.user?.college || "-",
          app.user?.yearOfStudy || "-",
          app.user?.stream || "-",
          app.status || "PENDING",
          app.linkedinUrl || "-",
          app.instagramUrl || "-",
          (app.previousExperience || "-").replace(/"/g, '""'),
          (app.whyAmbassador || "-").replace(/"/g, '""'),
          app.createdAt ? new Date(app.createdAt).toLocaleDateString() : "-",
        ]
          .map((field) => `"${field}"`)
          .join(",");
        csv += row + "\n";
      });
    } else {
      csv = "Name,Email,Status\n";
      data.forEach((item) => {
        const row = [
          item.name || "-",
          item.email || "-",
          item.status || "PENDING",
        ]
          .map((field) => `"${field}"`)
          .join(",");
        csv += row + "\n";
      });
    }

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    // Default: load emails
    fetchEmails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("/ca");
      console.log("Applications response:", res.data);
      const data = res?.data?.data ?? [];
      setApplications(Array.isArray(data) ? data : []);
      setView("applications");
    } catch (err) {
      console.error("Failed to fetch applications", err);
      if (err.response?.status === 401) {
        setError("Unauthorized. Please check your admin access.");
      } else {
        setError(err.response?.data?.message || "Failed to load applications");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchEmails = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("/ca/allMails");
      console.log("Emails response:", res.data);
      const data = res?.data?.data ?? {};
      // Backend returns { totalCount, applications } where applications contains email data
      setEmails(
        Array.isArray(data.applications)
          ? data.applications
          : Array.isArray(data)
          ? data
          : []
      );
      setView("emails");
    } catch (err) {
      console.error("Failed to fetch emails", err);
      if (err.response?.status === 401) {
        setError("Unauthorized. Please check your admin access.");
      } else {
        setError(err.response?.data?.message || "Failed to load emails");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = (application) => {
    setSelectedApplication(application);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedApplication(null);
  };

  return (
    <div className="min-h-screen flex items-start justify-center p-6 bg-gray-900 text-white">
      <div className="w-full max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-300">
              Signed in as:{" "}
              <span className="font-medium text-white">
                {user?.name ?? user?.email}
              </span>
            </div>
            <button
              onClick={async () => {
                await logout();
                window.location.href = "/";
              }}
              className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm transition"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-4 shadow">
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-3">
              {/* <button
                onClick={fetchApplications}
                className={`px-4 py-2 rounded-md font-medium transition ${
                  view === "applications" ? "bg-purple-600" : "bg-gray-700"
                }`}
              >
                Applications
              </button> */}

              <button
                onClick={fetchEmails}
                className={`px-4 py-2 rounded-md font-medium transition ${
                  view === "emails" ? "bg-purple-600" : "bg-gray-700"
                }`}
              >
                Get Emails
              </button>
            </div>

            {/* Export button */}
            <button
              onClick={() => {
                const data = view === "applications" ? applications : emails;
                const filename = `${view}_${
                  new Date().toISOString().split("T")[0]
                }.csv`;
                exportToCSV(data, filename);
              }}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md font-medium transition flex items-center gap-2"
              disabled={
                loading ||
                (view === "applications"
                  ? applications.length === 0
                  : emails.length === 0)
              }
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                />
              </svg>
              Export CSV
            </button>
          </div>

          {loading && <div className="text-gray-300">Loading...</div>}
          {error && <div className="text-red-400">{error}</div>}

          {/* Applications section commented out - showing only emails */}
          {/* {view === "applications" && !loading && (
            <div className="overflow-x-auto">
              <div className="mb-4 flex justify-between items-center">
                <div className="text-sm text-gray-400">
                  Click on any row to view full application details
                </div>
                <div className="text-sm text-gray-400">
                  Total applications:{" "}
                  <span className="font-medium text-white">
                    {applications.length}
                  </span>
                </div>
              </div>
              <table className="min-w-full table-auto border-collapse">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">College</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Submitted At</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-4 text-center text-gray-400">
                        No applications found
                      </td>
                    </tr>
                  )}
                  {applications.map((app, idx) => (
                    <tr
                      key={app.id ?? idx}
                      className={`cursor-pointer transition-colors ${
                        idx % 2 === 0
                          ? "bg-gray-800 hover:bg-gray-600"
                          : "bg-gray-700 hover:bg-gray-600"
                      }`}
                      onClick={() => handleRowClick(app)}
                    >
                      <td className="p-3">
                        {app.user?.name ?? app.name ?? app.fullName ?? "-"}
                      </td>
                      <td className="p-3">
                        {app.user?.email ?? app.email ?? "-"}
                      </td>
                      <td className="p-3">
                        {app.user?.college ??
                          app.college ??
                          app.institute ??
                          "-"}
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            app.status === "APPROVED"
                              ? "bg-green-500 text-white"
                              : app.status === "REJECTED"
                              ? "bg-red-500 text-white"
                              : "bg-yellow-500 text-black"
                          }`}
                        >
                          {app.status ?? app.applicationStatus ?? "PENDING"}
                        </span>
                      </td>
                      <td className="p-3">
                        {app.createdAt
                          ? new Date(app.createdAt).toLocaleString()
                          : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )} */}

          {view === "emails" && !loading && (
            <div>
              {emails.length === 0 ? (
                <div className="text-gray-400">No emails found</div>
              ) : (
                <div>
                  <div className="mb-4 text-sm text-gray-400">
                    Total emails:{" "}
                    <span className="font-medium text-white">
                      {emails.length}
                    </span>
                  </div>
                  <div className="grid gap-2">
                    {emails.map((e, i) => (
                      <div
                        key={e.email ?? i}
                        className="p-3 bg-gray-900 rounded flex items-center justify-between hover:bg-gray-800 transition"
                      >
                        <div>
                          <div className="font-semibold">
                            {e.name ?? e.fullName ?? "-"}
                          </div>
                          <div className="text-sm text-gray-300">{e.email}</div>
                        </div>
                        <div className="text-xs">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              e.status === "APPROVED"
                                ? "bg-green-500 text-white"
                                : e.status === "REJECTED"
                                ? "bg-red-500 text-white"
                                : "bg-yellow-500 text-black"
                            }`}
                          >
                            {e.status || "PENDING"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Application Details Modal */}
      {showModal && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-700">
              <h2 className="text-xl font-bold text-white">
                Application Details
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white transition"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Personal Information */}
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-400">Full Name</label>
                    <p className="text-white">
                      {selectedApplication.user?.name || "-"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Email</label>
                    <p className="text-white">
                      {selectedApplication.user?.email || "-"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">
                      College/Institute
                    </label>
                    <p className="text-white">
                      {selectedApplication.user?.college || "-"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">
                      Year of Study
                    </label>
                    <p className="text-white">
                      {selectedApplication.user?.yearOfStudy || "-"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Stream</label>
                    <p className="text-white">
                      {selectedApplication.user?.stream || "-"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">
                      Application Status
                    </label>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        selectedApplication.status === "APPROVED"
                          ? "bg-green-500 text-white"
                          : selectedApplication.status === "REJECTED"
                          ? "bg-red-500 text-white"
                          : "bg-yellow-500 text-black"
                      }`}
                    >
                      {selectedApplication.status || "PENDING"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                  Social Media Profiles
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-400">
                      LinkedIn URL
                    </label>
                    {selectedApplication.linkedinUrl ? (
                      <a
                        href={selectedApplication.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 break-all"
                      >
                        {selectedApplication.linkedinUrl}
                      </a>
                    ) : (
                      <p className="text-gray-500">Not provided</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">
                      Instagram URL
                    </label>
                    {selectedApplication.instagramUrl ? (
                      <a
                        href={selectedApplication.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-400 hover:text-pink-300 break-all"
                      >
                        {selectedApplication.instagramUrl}
                      </a>
                    ) : (
                      <p className="text-gray-500">Not provided</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Application Responses */}
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Application Responses
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400 font-medium">
                      Previous Experience
                    </label>
                    <div className="mt-1 p-3 bg-gray-800 rounded border">
                      <p className="text-white whitespace-pre-wrap">
                        {selectedApplication.previousExperience ||
                          "Not provided"}
                      </p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 font-medium">
                      Why do you want to be an Ambassador?
                    </label>
                    <div className="mt-1 p-3 bg-gray-800 rounded border">
                      <p className="text-white whitespace-pre-wrap">
                        {selectedApplication.whyAmbassador || "Not provided"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Application Meta */}
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Application Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-400">
                      Application ID
                    </label>
                    <p className="text-white font-mono text-sm">
                      {selectedApplication.id || "-"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">User ID</label>
                    <p className="text-white font-mono text-sm">
                      {selectedApplication.user?.id ||
                        selectedApplication.userId ||
                        "-"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">
                      Submitted At
                    </label>
                    <p className="text-white">
                      {selectedApplication.createdAt
                        ? new Date(
                            selectedApplication.createdAt
                          ).toLocaleString()
                        : "-"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">
                      Last Updated
                    </label>
                    <p className="text-white">
                      {selectedApplication.updatedAt
                        ? new Date(
                            selectedApplication.updatedAt
                          ).toLocaleString()
                        : "-"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 p-6 border-t border-gray-700">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
