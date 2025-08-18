import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import adminUsersApi from "../api/admin/adminUsersApi";
import toast from "react-hot-toast";

export const useAdminUsers = () => {
  const queryClient = useQueryClient();

  const getAllUsers = useQuery({
    queryKey: ["AllUsers"],
    queryFn: () => adminUsersApi.getAllUsers(),
  });

  const deleteUserMutation = useMutation({
    mutationFn: adminUsersApi.deleteUser,
    onSuccess: () => {
      toast.success("User deleted successfully");
      queryClient.invalidateQueries(["AllUsers"]);
    },
  });

  const updateUserStatus = useMutation({
    mutationFn: ({ id, status }) => adminUsersApi.updateStatus(id, status),
    onSuccess: () => {
      console.log("calledd");
      queryClient.invalidateQueries(["AllUsers"]);
      toast.success("User Status Updated Successfully!");
    },
    onError: () => {
      toast.error("Failed to update user status");
    },
  });
  return {
    adminAllUsers: getAllUsers.data,
    deleteUserFn: deleteUserMutation.mutate,
    deleteUserLoading:deleteUserMutation.isPending,
    adminAllUsersLoading: getAllUsers.isLoading,
    updateStatusFn: updateUserStatus.mutate,
    updateStatusLoading :updateUserStatus.isPending
  };
};

export const useSingleUser = (id) => {
  const getSingleUser = useQuery({
    queryKey: ["user", id],
    queryFn: () => adminUsersApi.getSingleUser(id),
    enabled: !!id,
  });

  return {
    singleUser: getSingleUser.data,

    singleUserLoading: getSingleUser.isLoading,
  };
};
