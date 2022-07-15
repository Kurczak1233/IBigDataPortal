import { getAllPortalUsers } from "api/UsersClient";
import { ApplicationUser } from "interfaces/Models/Users/IApplicationUser";
import { useEffect, useState } from "react";

const UsersPageMainLogic = () => {
  const [allPortalUsers, setAllPortalUsers] = useState<ApplicationUser[]>([]);
  const handleGetAllPortalUsers = async () => {
    setAllPortalUsers(await getAllPortalUsers());
  };

  useEffect(() => {
    handleGetAllPortalUsers();
  }, []);

  return { allPortalUsers, setAllPortalUsers };
};

export default UsersPageMainLogic;
