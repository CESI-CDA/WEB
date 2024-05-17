import { getUsers } from "../../../../apis/users";
import { IUser } from "interfaces";
import { useContext, useEffect, useState } from "react";
import styles from "./UserManagement.module.scss";
import { AuthContext } from "../../../../context";

export function UserManagement() {
  const [users, setUsers] = useState<IUser[]>([]);
  const context = useContext(AuthContext);
  console.log(context);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getUsers(context?.token as string);
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <ul className={styles.list}>
        {users &&
          users.map((user) => (
            <li key={user.pseudonyme} className="d-flex align-items-center">
              <span className="flex-fill">{user.prenom}</span>
              <button className="btn btn-primary mr-15">suspendre</button>
              <button className="btn btn-danger">supprimer</button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default UserManagement;
