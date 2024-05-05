import { getUsers } from "../../../../apis/users";
import { IUser } from "interfaces";
import { useEffect, useState } from "react";

export function UserManagement() {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      {users &&
        users.map((user) => <div key={user.pseudonyme}>{user.nom}</div>)}
    </div>
  );
}

export default UserManagement;
