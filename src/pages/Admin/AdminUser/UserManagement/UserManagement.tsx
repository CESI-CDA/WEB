import { deleteUser, getUsers, suspendUser } from "../../../../apis/users";
import { IUser } from "interfaces";
import { useContext, useEffect, useState } from "react";
import styles from "./UserManagement.module.scss";
import { AuthContext } from "../../../../context";

export enum TIME {
  DAY = 1,
  WEEK = 7,
  MONTH = 30,
}

export function UserManagement() {
  const [users, setUsers] = useState<IUser[]>([]);
  const context = useContext(AuthContext);

  const [selectValues, setSelectValues] = useState<{ [key: string]: string }>(
    {}
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getUsers(context?.token as string);
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  function handleSuspend(id: number, date: TIME) {
    suspendUser(context.token, id, date);
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
          users.map((user) => {
            if (user.restricted) {
              return (
                <li key={user.id} className="d-flex align-items-center">
                  <span className="flex-fill">{user.prenom}</span>
                  <span className="mr-15">Restreint</span>

                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(user.id)}
                  >
                    Supprimer
                  </button>
                </li>
              );
            } else {
              return (
                <li key={user.id} className="d-flex align-items-center">
                  <span className="flex-fill">{user.prenom}</span>

                  <select
                    className="mr-15"
                    value={selectValues[user.id] || ""}
                    onChange={(e) =>
                      setSelectValues({
                        ...selectValues,
                        [user.id]: e.target.value,
                      })
                    }
                  >
                    <option value={TIME.DAY}>1 jour</option>
                    <option value={TIME.WEEK}>1 semaine</option>
                    <option value={TIME.MONTH}>1 mois</option>
                  </select>

                  <button
                    className="btn btn-primary mr-15"
                    onClick={() =>
                      handleSuspend(user.id, parseInt(selectValues[user.id]))
                    }
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
              );
            }
          })}
      </ul>
    </div>
  );
}

export default UserManagement;
