import axios from "axios";

export type UserRole = "teacher" | "student" | "admin";

// ==========================================
// AXIOS CLIENT & INTERCEPTORS
// ==========================================

export const apiClient = axios.create({
    baseURL: "http://localhost:8083/api",
    headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {

  const token = localStorage.getItem("access_token");

    if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});



apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user_role");
    }
    return Promise.reject(error);
  }
);


// ==========================================
// API SERVICE METHODS
// ==========================================


export const api = {
      // Role & Auth Helper Methods
  getUserRole: (): string | null => {
    return localStorage.getItem("user_role")?.toLowerCase() || null;
  },

  isAuthenticated: (): boolean => {
    return Boolean(localStorage.getItem("access_token"));
  },

  isStudent: (): boolean => {
    return api.isAuthenticated() && api.getUserRole() === "student";
  },

  isAdmin: (): boolean => {
    return api.isAuthenticated() && api.getUserRole() === "admin";
  },

  isTeacher: (): boolean => {
    return api.isAuthenticated() && api.getUserRole() === "teacher";
  },

  logout: (): void => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_role");

    window.location.href = "/login";
  },


  login: async (credentials: any) => {
    const res = await apiClient.post("/auth/login", credentials);
    const data = res.data;

    // Save token and role for authentication
    if (data?.data?.token) {
      localStorage.setItem("access_token", data.data.token);
    }
    if (data?.data?.role) {
      localStorage.setItem("user_role", data.data.role);
    }

    return data;
  },



  register: async (data: any) => {
    const res = await apiClient.post("/auth/register", data);
    return res.data;
  },

  getProfile: async () => {
    const res = await apiClient.get("/users/me");
    return res.data;
  },

  updateProfile: async (data: any) => {
    const res = await apiClient.put("/users/me", data);
    return res.data;
  },

  changePassword: async (data: {
    currentPassword: any;
    newPassword: any;
  }) => {
    const res = await apiClient.put("/users/change-password", data);
    return res.data;
  },

  getMyResults: async () => {
    const res = await apiClient.get("/results/me");
    return res.data;
  },

  getMyClassmates: async () => {
    const res = await apiClient.get("/classrooms/my-classmates");
    return res.data;
  },



  // TEACHERS METHODS
  getMyStudents: async () => {
    const res = await apiClient.get("/classrooms/my-students");
    return res.data;
  },

  createAcademicResult: async (data: {
    studentId: number;
    term: string;
    academicYear: string;
    grades: Record<string, string>;
  }) => {
    const res = await apiClient.post("/results/create", data);
    return res.data;
  },

  getAllUsersByRole: async (role?: any) => {
    const res = await apiClient.get("/users", { params: { role } });
    return res.data;
  },

  getAllClassrooms: async () => {
    const res = await apiClient.get("/classrooms");
    return res.data;
  },

    // ADMIN ONLY METHODS
  assignTeacherToClassroom: async (data: {
    classroomId: number;
    teacherId: number;
  }) => {
    const res = await apiClient.post("/classrooms/assign-teacher", data);
    return res.data;
  },

  assignStudentToClassroom: async (data: {
    classroomId: number;
    userId: number;
  }) => {
    const res = await apiClient.post("/classrooms/assign-student", data);
    return res.data;
  },

  createClassroom: async (data: { name: string }) => {
    const res = await apiClient.post("/classrooms", data);
    return res.data;
  },

  updateClassroom: async (data: { id: number; name: string }) => {
    const res = await apiClient.put("/classrooms", data);
    return res.data;
  },
}