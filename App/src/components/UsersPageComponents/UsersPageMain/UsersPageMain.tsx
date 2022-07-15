import UsersPageMainHeader from "../UsersPageMainHeader/UsersPageMainHeader";
import UsersPageMainItem from "../UsersPageMainItem/UsersPageMainItem";
import UsersPageMainLogic from "./UsersPageMainLogic";

const UsersPageMain = () => {
  const { allPortalUsers, setAllPortalUsers } = UsersPageMainLogic();
  return (
    <div>
      <UsersPageMainHeader />
      {allPortalUsers.map((item) => {
        return (
          <UsersPageMainItem
            key={item.id}
            user={item}
            setAllPortalUsers={setAllPortalUsers}
          />
        );
      })}
    </div>
  );
};

export default UsersPageMain;
