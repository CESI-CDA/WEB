import styles from "./Register.module.scss";
import { FieldValues, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../apis/users";
import { useState } from "react";

function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>("");

  const validationSchema = yup.object({
    nom: yup
      .string()
      .required("Il faut préciser votre nom")
      .min(2, "Votre nom me parait court"),
    prenom: yup.string().required("Il faut préciser votre prenom"),
    pseudonyme: yup
      .string()
      .required("Il faut préciser votre pseudonyme")
      .min(6, "votre pseudonyme doit contenir au moins 6 caractères"),
    email: yup
      .string()
      .required("Il faut préciser votre email")
      .email("Email invalide"),
    password: yup
      .string()
      .required("Il faut préciser votre mot de passe")
      .min(8)
      .max(20),
  });

  const initialValues = {
    nom: "",
    prenom: "",
    pseudonyme: "",
    email: "",
    password: "",
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },

    clearErrors,
  } = useForm<typeof initialValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
  });

  const submit = handleSubmit(async (user) => {
    try {
      clearErrors();
      await createUser(user);
      navigate("/login");
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
        <h2 className="mb-10">Inscription</h2>
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
          <label htmlFor="email">Pseudo</label>
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
          <label htmlFor="password">Password</label>
          <input type="password" {...register("password")} />
          {errors.password && (
            <p className="form-error">{errors.password.message}</p>
          )}
        </div>
        {errors.root && (
          <div className="mb-10">
            <p className="form-error">{errors.root.message}</p>
          </div>
        )}
        <div>
          <button disabled={isSubmitting} className="btn btn-primary">
            Inscription
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
