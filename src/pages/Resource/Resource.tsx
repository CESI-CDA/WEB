import React, { useState, useEffect, useContext, useRef } from "react";
import styles from "./Resource.module.scss";
import HeaderResource from "./components/HeaderResource/HeaderResource";
import { getRessource } from "../../apis/ressource";
import { useParams } from "react-router-dom";
import { set } from "react-hook-form";
import { createComment } from "../../apis/comment";
import { AuthContext } from "../../context";
import Modal from "../../components/Modal/Modal";
import Loader from "../../components/Loader/Loader";

const Resource: React.FC = () => {
  const [ressource, setRessources] = useState<any>(null);
  const { id = "" } = useParams<{ id?: string }>();
  const [comment, setComment] = useState<boolean>(false);
  const [listComment, setListComment] = useState<any>([]);
  const { user, token } = useContext(AuthContext);
  const inputRef = useRef<HTMLInputElement>();
  const [commentText, setCommentText] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(null);

  useEffect(() => {
    const fetchressource = async () => {
      try {
        setLoading(true);
        const data = await getRessource(id);
        setRessources(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching resource data:", error);
        setLoading(false);
      }
    };
    fetchressource();
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
      setIsModalOpen(true);
    } catch (e) {
      console.error("Error creating comment:", e);
    }
  }

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={`flex-fill container d-flex flex-column p-20`}>
      {loading === true ? (
        <Loader />
      ) : (
        <>
          <div
            className={`card flex-fill d-flex flex-column p-20 mb-20 ${styles.contentCard}`}
          >
            <div className={styles.header}>
              {ressource && <HeaderResource resourceId={ressource.item.id} />}
            </div>
            {ressource && (
              <>
                <img
                  src={ressource.item.url_res}
                  alt="Resource"
                  className={styles.imageContainer}
                />
                <div className={styles.characteristicProp}>
                  <p className={styles.category}>
                    Catégorie :{" "}
                    {ressource.item.get_lien_ressource_categorie
                      .map(
                        (lien: { get_categorie: { intitule_cat: string } }) =>
                          lien.get_categorie.intitule_cat
                      )
                      .join(" / ")}
                  </p>
                  <p className={styles.typeOfRelation}>
                    Types de relation :{" "}
                    {ressource?.item.get_lien_ressource_relation
                      .map(
                        (lien: {
                          get_relation_ressource: { intitule_rel: string };
                        }) => lien.get_relation_ressource.intitule_rel
                      )
                      .join(" / ")}
                  </p>
                  <p className={styles.typeOfResource}>
                    Type de ressource :{" "}
                    {ressource.item.get_type_ressource.intitule_type_res}
                  </p>
                </div>
                <div className={styles.content}>
                  <h1 className={styles.title}>{ressource.item.titre_res}</h1>
                  <p className={styles.resourceContent}>
                    {ressource.item.contenu_res}
                  </p>
                </div>
              </>
            )}
            <div className={styles.headerComment}>
              <h3 className={styles.comment}>Commentaires</h3>
              {user && (
                <button
                  className={styles.icon}
                  onClick={() => user && setComment(true)}
                >
                  +
                </button>
              )}
            </div>
            {comment && (
              <>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Vous pouvez écrire votre commentaire"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      postComment(
                        ressource.item.id,
                        user.id,
                        token,
                        inputRef.current.value
                      );
                    }
                  }}
                ></input>
                <div className={styles.publish}>
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      postComment(
                        ressource.item.id,
                        user.id,
                        token,
                        commentText
                      )
                    }
                  >
                    Soumettre le commentaire
                  </button>
                </div>
              </>
            )}
            {ressource?.item?.get_lien_ressource_commentaire &&
              ressource.item.get_lien_ressource_commentaire.map((comment) => {
                return (
                  <div className={styles.commentContainer} key={comment.id}>
                    <p className={styles.commentAuthor}>
                      {comment.get_utilisateur.pseudonyme}
                    </p>
                    <p className={styles.commentAuthor}>
                      {comment.commentaire}
                    </p>
                  </div>
                );
              })}
          </div>
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <h2>Commentaire créé avec succès</h2>
            <p>En attente de validation...</p>
          </Modal>
        </>
      )}
    </div>
  );
};

export default Resource;
