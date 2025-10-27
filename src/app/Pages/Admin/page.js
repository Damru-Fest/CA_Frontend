"use client";
import AdminPanel from "./components/userinfo";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AdminPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If auth is still loading, wait. When loading finishes, if no user or not ADMIN, redirect.
    if (!loading) {
      if (!user || user?.role !== "ADMIN") {
        router.push("/Pages/AdminAuth");
      }
    }
  }, [loading, user, router]);

  if (loading || !user) {
    // show a simple loading state while auth resolves or redirect happens
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-300">Checking access...</div>
      </div>
    );
  }

  return <AdminPanel />;
};

export default AdminPage;
