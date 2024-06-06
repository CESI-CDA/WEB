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

  const refreshUsers = async () => {
    try {
      const data = await getUsers(context?.token as string);
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };
  async function handleSuspend(id: number, date: TIME) {
    await suspendUser(context.token, id, date);
    let dateValue = new Date();
    switch (date) {
      case TIME.DAY:
        dateValue.setDate(dateValue.getDate() + 1);
        break;
      case TIME.WEEK:
        dateValue.setDate(dateValue.getDate() + 7);
        break;
      case TIME.MONTH:
        dateValue.setMonth(dateValue.getMonth() + 1);
        break;
    }
    setUsers((prev) => {
      return prev.map((user) => {
        if (user.id === id) {
          return {
            ...user,
            restricted: true,
            date: dateValue.toISOString().replace(/T/, " ").replace(/\..+/, ""),
          };
        }
        return user;
      });
    });
  }
  async function handleDelete(id: number) {
    await deleteUser(id, context.token);
    setUsers((prev) => {
      return prev.filter((user) => user.id !== id);
    });
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
                  <span className="mr-15">
                    Restreint jusqu'au <strong>{user.date}</strong>
                  </span>

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
