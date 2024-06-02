import { getComments } from "../../../apis/comment";
import { useEffect, useState } from "react";
import Loader from "../../../components/Loader/Loader";
import styles from "./AdminCommentsList.module.scss";

export function AdminCommentsList() {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const fetchComments = async (type: string) => {
      try {
        setComments(await getComments(type));
      } catch (error) {
        console.error("Error fetch comments", error);
      }
    };
    fetchComments("1");
    setLoading(false);
  }, []);

  const handleComment = (id: string) => {
    setComments((prevComments) => prevComments.filter((r) => r.id !== id));
  };

  return (
    <>
      {loading && <Loader />}

      <ul className={styles.list}>
        {comments.length > 0
          ? comments.map((comment) => (
              <li key={comment.id} className="d-flex align-items-center">
                <span className="flex-fill">{comment.message}</span>
                <button
                  className="btn btn-primary mr-15"
                  onClick={() => handleComment(comment.id)}
                >
                  Accepter
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleComment(comment.id)}
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
