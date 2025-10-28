"use client";
import AdminPanel from "./components/userinfo";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AdminPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();



  return <AdminPanel />;
};

export default AdminPage;
