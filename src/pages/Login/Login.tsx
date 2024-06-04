import styles from "./Login.module.scss";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from "../../context";
import { useContext, useState } from "react";
import { NavLink, Navigate, redirect, useNavigate } from "react-router-dom";

function Login() {
  const { user, loginUser } = useContext(AuthContext);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const validationSchema = yup.object({
    email: yup
      .string()
      .required("Il faut préciser votre email")
      .email("l'email n'est pas valide"),
    password: yup
      .string()
      .required("Il faut préciser votre mot de passe")
      .min(8, "Mot de passe trop court"),
  });

  const initialValues = {
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

  const submit = handleSubmit(async (credentials) => {
    try {
      clearErrors();
      await loginUser(credentials);
      navigate("/");
    } catch (e: string | any) {
      setError("Erreur lors de la connexion");
    }
  });

  return (
    <>
      {user ? (
        <Navigate to="/" />
      ) : (
        <div className="flex-fill d-flex align-items-center justify-content-center">
          <form
            onSubmit={submit}
            className={`${styles.form} d-flex flex-column card p-20`}
          >
            <h2 className="mb-10">Connexion</h2>
            <div className="mb-10 d-flex flex-column">
              <label htmlFor="email">Email</label>
              <input type="text" {...register("email")} />
              {errors.email && (
                <p className="form-error">{errors.email?.message}</p>
              )}
            </div>
            <div className="mb-10 d-flex flex-column">
              <label htmlFor="password">Password</label>
              <input type="password" {...register("password")} />
              {errors.password && (
                <p className="form-error">{errors.password?.message}</p>
              )}
            </div>
            {error && (
              <div className="mb-10">
                <p className="form-error">{error}</p>
              </div>
            )}
            <div>
              <button disabled={isSubmitting} className="btn btn-primary">
                Connexion
              </button>
            </div>
            <NavLink to="/forgotpassword">
              <div className={`mt-10" ${styles.forgot}`}>
                Mot de passe oublié ?
              </div>
            </NavLink>
          </form>
        </div>
      )}
    </>
  );
}

export default Login;
