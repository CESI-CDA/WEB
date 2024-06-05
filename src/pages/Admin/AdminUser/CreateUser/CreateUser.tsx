import { yupResolver } from "@hookform/resolvers/yup";
import { IUser } from "interfaces";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import styles from "./CreateUser.module.scss";
import { createUser, createUserAdmin } from "../../../../apis/users";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../../../context";

export function CreateUser() {
  const [error, setError] = useState<string | null>("");
  const { token } = useContext(AuthContext);
  const schema = yup.object({
    nom: yup.string().required("Ce champ est requis"),
    prenom: yup.string().required("Ce champ est requis"),
    pseudonyme: yup.string().required("Ce champ est requis"),
    email: yup.string().email().required("Ce champ est requis"),
    id_rol: yup.number().required("Ce champ est requis"),
  });
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    clearErrors,
  } = useForm<IUser>({
    resolver: yupResolver(schema) as any,
  });

  const submit = handleSubmit(async (user: IUser) => {
    try {
      clearErrors();
      await createUserAdmin(user, token);
      reset();
    } catch (e: any) {
      setError("Erreur lors de l'inscription");
    }
  });
  return (
    <div className="flex-fill d-flex align-items-center justify-content-center">
      <form
        onSubmit={submit}
        className={`${styles.form} d-flex flex-column card p-20`}
      >
        <h2 className="mb-10">Créer un nouvel utilisateur</h2>
        <div className="mb-10 d-flex flex-column">
          <label htmlFor="name">Nom</label>
          <input type="text" {...register("nom")} />
          {errors.nom && <p className="form-error">{errors.nom.message}</p>}
        </div>
        <div className="mb-10 d-flex flex-column">
          <label htmlFor="prrenom">Prénom</label>
          <input type="text" {...register("prenom")} />
          {errors.prenom && (
            <p className="form-error">{errors.prenom.message}</p>
          )}
        </div>
        <div className="mb-10 d-flex flex-column">
          <label htmlFor="email">Pseudonyme</label>
          <input type="text" {...register("pseudonyme")} />
          {errors.pseudonyme && (
            <p className="form-error">{errors.pseudonyme.message}</p>
          )}
        </div>
        <div className="mb-10 d-flex flex-column">
          <label htmlFor="email">Email</label>
          <input type="text" {...register("email")} />
          {errors.email && <p className="form-error">{errors.email.message}</p>}
        </div>
        <div className="mb-10 d-flex flex-column">
          <label htmlFor="role">Rôle</label>
          <select {...register("id_rol")}>
            <option value="1">Citoyen</option>
            <option value="2">Modérateur</option>
            <option value="3">Administrateur</option>
            <option value="4">Super-Administrateur</option>
          </select>
        </div>
        {errors.root && (
          <div className="mb-10">
            <p className="form-error">{errors.root.message}</p>
          </div>
        )}
        <div>
          <button disabled={isSubmitting} className="btn btn-primary">
            Créer
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateUser;
