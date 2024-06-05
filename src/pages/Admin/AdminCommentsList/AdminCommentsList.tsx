import { acceptComment, getComments } from "../../../apis/comment";
import { useContext, useEffect, useState } from "react";
import Loader from "../../../components/Loader/Loader";
import styles from "./AdminCommentsList.module.scss";
import { AuthContext } from "../../../context/AuthContext";
import { ICommentaire } from "../../../interfaces/commentaire.interface";
import { set } from "react-hook-form";

export function AdminCommentsList() {
  const [comments, setComments] = useState<ICommentaire[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    setLoading(true);
    const fetchComments = async () => {
      try {
        const data = await getComments(token);
        setComments(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetch comments", error);
        setLoading(false);
      }
    };
    fetchComments();
    console.log(comments);
  }, []);

  const handleComment = (id: number, etat: number) => {
    acceptComment(id, token, etat);
    setComments(comments.filter((comment) => comment.id !== id));
  };

  return (
    <>
      {loading && <Loader />}

      <ul className={styles.list}>
        {comments.length === 0 && (
          <p>Aucun commentaire en attente de validation</p>
        )}
        {comments.length > 0
          ? comments.map((comment) => (
              <li key={comment.id} className="d-flex align-items-center">
                <span className="flex-fill">{comment.text}</span>
                <button
                  className="btn btn-primary mr-15"
                  onClick={() => handleComment(comment.id, 2)}
                >
                  Accepter
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleComment(comment.id, 3)}
                >
                  Rejeter
                </button>
              </li>
            ))
          : null}
      </ul>
    </>
  );
}
export default AdminCommentsList;
