import api from "../../utils/axios";

const getAllUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

const getSingleUser = async (id) => {
  const response = await api.get(`/user/${id}`);
  return response.data;
};

const deleteUser = async (userId) => {
  const response = await api.delete(`/users/${userId}`);
  return response.data;
};

const updateStatus = async (id, status) => {
  const response = await api.put(`/users/${id}/status`, { status });
  return response.data;
};
const adminUsersApi = {
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateStatus,
};
export default adminUsersApi;
