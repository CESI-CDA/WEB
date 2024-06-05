import React, { useContext, useEffect, useState } from "react";
import styles from "./HeaderResource.module.scss";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context";
import { IContextAuth } from "interfaces";
import {
  addResourceToArchives,
  addResourceToFavorites,
  checkArchiveStatus,
  checkFavoriteStatus,
  removeResourceFromArchives,
  removeResourceFromFavorites,
} from "../../../../apis/users";
import { IRessource } from "interfaces";

const HeaderResource: React.FC<{ resourceId: IRessource["id"] }> = ({
  resourceId,
}) => {
  const authContext = useContext<IContextAuth | Partial<IContextAuth> | null>(
    AuthContext
  );

  if (!authContext || !authContext.user || authContext.token === null) {
    return null;
  }

  const { token, user, setFavorites, setArchives } = authContext;
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [isArchiveFilled, setIsArchiveFilled] = useState(false);
  const navigate = useNavigate();
  const userIdString = user.id.toString();

  useEffect(() => {
    if (user.archives && user.favories) {
      user.archives.includes(parseInt(resourceId)) && setIsArchiveFilled(true);
      user.favories.includes(parseInt(resourceId)) && setIsHeartFilled(true);
    }
    console.log(user.archives, user.favories);
  }, [resourceId, userIdString, token]);

  const handleHeartClick = async () => {
    try {
      if (isHeartFilled) {
        await removeResourceFromFavorites(
          userIdString,
          resourceId.toString(),
          token!
        );
        setIsHeartFilled(false);
        setFavorites(user.favories.filter((id) => id !== parseInt(resourceId)));
      } else {
        await addResourceToFavorites(
          userIdString,
          parseInt(resourceId),
          token!
        );
        setIsHeartFilled(true);
        setFavorites([...user.favories, parseInt(resourceId)]);
      }
    } catch (error) {
      console.error(`Erreur lors de la gestion des favoris : ${error}`);
    }
  };

  const handleArchiveClick = async () => {
    try {
      if (isArchiveFilled) {
        await removeResourceFromArchives(
          userIdString,
          resourceId.toString(),
          token!
        );
        setIsArchiveFilled(false);
        setArchives(user.archives.filter((id) => id !== parseInt(resourceId)));
      } else {
        await addResourceToArchives(userIdString, parseInt(resourceId), token!);
        setIsArchiveFilled(true);
        setArchives([...user.archives, parseInt(resourceId)]);
      }
    } catch (error) {
      console.error(`Erreur lors de la gestion des archives : ${error}`);
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      <i
        className={`fa-solid fa-chevron-left ${styles.icon}`}
        style={{ color: "white" }}
        onClick={handleBackClick}
      ></i>
      <div className={styles.add}>
        <div>
          <i
            className={`fa-solid fa-heart ${styles.icon}`}
            style={{ color: isHeartFilled ? "#6E5BE2" : "white" }}
            onClick={handleHeartClick}
          ></i>
        </div>
        <div>
          <i
            className={`fa-solid fa-box-archive ${styles.icon}`}
            style={{ color: isArchiveFilled ? "#6E5BE2" : "white" }}
            onClick={handleArchiveClick}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default HeaderResource;
