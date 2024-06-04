import { deleteUser, getUsers, suspendUser } from "../../../../apis/users";
import { IUser } from "interfaces";
import { useContext, useEffect, useState } from "react";
import styles from "./UserManagement.module.scss";
import { AuthContext } from "../../../../context";
import { set } from "react-hook-form";

export function UserManagement() {
  const [users, setUsers] = useState<IUser[]>([]);
  const context = useContext(AuthContext);

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

  function handleSuspend(id: number) {
    suspendUser(context.token, id);
    setUsers(users.filter((user) => user.id !== id));
  }
  function handleDelete(id: number) {
    deleteUser(id, context.token);
    setUsers(users.filter((user) => user.id !== id));
  }

  return (
    <div>
      <ul className={styles.list}>
        {users &&
          users.map((user) => (
            <li key={user.id} className="d-flex align-items-center">
              <span className="flex-fill">{user.prenom}</span>
              <button
                className="btn btn-primary mr-15"
                onClick={() => handleSuspend(user.id)}
              >
                Suspendre
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(user.id)}
              >
                Supprimer
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default UserManagement;
