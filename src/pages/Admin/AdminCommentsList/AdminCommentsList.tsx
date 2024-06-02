import { getComments } from "../../../apis/comment";
import { AuthContext } from "../../../context";
import { useContext, useEffect, useState } from "react";

export function AdminCommentsList() {
  const [comments, setComments] = useState([]);
  const { token } = useContext(AuthContext);
  useEffect(() => {
    getComments(token, "1");
  }, []);

  return (
    <div>
      <h1>Commentaires en attente de validation</h1>
    </div>
  );
}
export default AdminCommentsList;
