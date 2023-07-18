import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Error from "../../components/ui/Error";
import Title from "../../components/ui/Title";
import { useAdminLoginMutation } from "../../features/adminAuth/adminAuthApi";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [adminLogin, { data, isLoading, error: responseError }] =
    useAdminLoginMutation();
  const navigate = useNavigate();
  useEffect(() => {
    if (responseError?.data) {
      setError(responseError.data);
    } else if (data?.user.role === "student") {
      setError("You might not be an admin. Go to student login page!");
    } else if (data?.accessToken && data?.user && data?.user.role === "admin") {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [responseError, data, navigate]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    adminLogin({
      email,
      password,
    });
  };

  return (
    <section className="py-6 bg-primary h-screen grid place-items-center">
      <Title titleName={"Sign in"} isAdmin />
      <div className="mx-auto max-w-md px-5 lg:px-0">
        <div>
          <h2 className="text-center text-2xl">Learning Portal</h2>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
            Sign in to Admin Account
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="admin-email-address" className="sr-only">
                Email address
              </label>
              <input
                id="admin-email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="login-input rounded-t-md"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="admin-password" className="sr-only">
                Password
              </label>
              <input
                id="admin-password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="login-input rounded-b-md"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-end">
            <div className="text-sm">
              <Link
                to={"/"}
                className="font-medium text-violet-600 hover:text-violet-500"
              >
                Login as a Student
              </Link>
            </div>
          </div>

          <div>
            <button
              disabled={isLoading}
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
            >
              Sign in
            </button>
          </div>
          {error !== "" && <Error message={error} />}
        </form>
      </div>
    </section>
  );
};

export default AdminLogin;
