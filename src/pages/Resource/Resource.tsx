import React, { useState, useEffect, useContext, useRef } from "react";
import styles from "./Resource.module.scss";
import HeaderResource from "./components/HeaderResource/HeaderResource";
import { getRessource } from "../../apis/ressource";
import { useParams } from "react-router-dom";
import { set } from "react-hook-form";
import { createComment } from "../../apis/comment";
import { AuthContext } from "../../context";

const Resource: React.FC = () => {
  const [resourceData, setResourceData] = useState<any>(null);
  const { id = "" } = useParams<{ id?: string }>();
  const [comment, setComment] = useState<boolean>(false);
  const { user, token } = useContext(AuthContext);
  const inputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    const fetchResourceData = async () => {
      try {
        const data = await getRessource(id);
        setResourceData(data);
      } catch (error) {
        console.error("Error fetching resource data:", error);
      }
    };
    fetchResourceData();
  }, [id]);

  function postComment(
    id_res: number,
    id_user: number,
    token: string,
    text: string
  ) {
    try {
      createComment(id_res, id_user, token, text);
      setComment(false);
    } catch (e) {
      console.error("Error creating comment:", e);
    }
  }

  return (
    <div className={`flex-fill container d-flex flex-column p-20`}>
      <div
        className={`card flex-fill d-flex flex-column p-20 mb-20 ${styles.contentCard}`}
      >
        <div className={styles.header}>
          {resourceData && <HeaderResource resourceId={resourceData.item.id} />}
        </div>
        {resourceData && (
          <>
            <img
              src={resourceData.item.url_res}
              alt="Resource"
              className={styles.imageContainer}
            />
            <div className={styles.characteristicProp}>
              <p className={styles.category}>
                Catégorie :{" "}
                {resourceData.item.get_lien_ressource_categorie
                  .map(
                    (lien: { get_categorie: { intitule_cat: string } }) =>
                      lien.get_categorie.intitule_cat
                  )
                  .join(" / ")}
              </p>
              <p className={styles.typeOfRelation}>
                Types de relation :{" "}
                {resourceData?.item.get_lien_ressource_relation
                  .map(
                    (lien: {
                      get_relation_ressource: { intitule_rel: string };
                    }) => lien.get_relation_ressource.intitule_rel
                  )
                  .join(" / ")}
              </p>
              <p className={styles.typeOfResource}>
                Type de ressource :{" "}
                {resourceData.item.get_type_ressource.intitule_type_res}
              </p>
            </div>
            <div className={styles.content}>
              <h1 className={styles.title}>{resourceData.item.titre_res}</h1>
              <p className={styles.resourceContent}>
                {resourceData.item.contenu_res}
              </p>
            </div>
          </>
        )}
        <div className={styles.headerComment}>
          <h3 className={styles.comment}>Commentaires</h3>
          <button
            className={styles.icon}
            onClick={() => user && setComment(true)}
          >
            +
          </button>
        </div>
        {comment && (
          <>
            <input
              ref={inputRef}
              type="text"
              placeholder="Vous pouvez écrire votre commentaire"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  postComment(
                    resourceData.item.id,
                    user.id,
                    token,
                    inputRef.current.value
                  );
                }
              }}
            ></input>
          </>
        )}
      </div>
    </div>
  );
};

export default Resource;
