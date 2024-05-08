import { getUsers } from "../../../../apis/users";
import { IUser } from "interfaces";
import { useEffect, useState } from "react";
import styles from "./UserManagement.module.scss";

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
