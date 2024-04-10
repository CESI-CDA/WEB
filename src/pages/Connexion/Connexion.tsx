import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Header from "../../Layout/Header";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert } from "@mui/material";

type TUser = {
  email: string;
  password: string;
  nom: string;
  prenom: string;
  pseudonyme: string;
};

export default function SignInSide() {
  const [inscription, setInscription] = React.useState(false);
  const yupSchema = yup.object({
    email: yup
      .string()
      .email("adresse email invalide")
      .required("l'email est obligatoire"),
    password: yup
      .string()
      .required("le mot de passe est requis")
      .min(8, "le mode de passe doit contenir au moins 8 caractères"),
    nom: yup.string().required("le nom est obligatoire"),
    prenom: yup.string().required("le prénom est obligatoire"),
    pseudonyme: yup.string().required("le pseudonyme est obligatoire"),
  });

  function submit(value: TUser) {
    console.log(value);
    fetch("https://projet-resources.fr/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    }).then((response) => {
      if (response.ok) {
        console.log("user created");
        alert("votre compte a était crée");
      } else {
        console.log("error");
      }
    });
  }
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      nom: "",
      prenom: "",
      pseudonyme: "",
    },
    resolver: yupResolver(yupSchema),
    mode: "onSubmit",
  });

  return (
    <Grid
      container
      component="main"
      sx={{ height: "100vh" }}
      justifyContent="center"
      alignContent="flex-start"
    >
      <Header />
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(submit)}
            sx={{ mt: 1, width: "90%" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label="Prénom"
              id="prenom"
              autoComplete="prénom"
              {...register("prenom")}
            />
            {errors?.prenom && (
              <Alert severity="warning" sx={{ width: "100%" }}>
                {errors.prenom.message}
              </Alert>
            )}
            {getValues("prenom")}
            <TextField
              margin="normal"
              required
              fullWidth
              label="Nom"
              id="nom"
              autoComplete="nom"
              {...register("nom")}
            />
            {errors?.nom && (
              <Alert severity="warning">{errors.nom.message}</Alert>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              label="Nom d'utilisateur"
              id="nom d'utilisateur"
              autoComplete="nom d'utilisateur"
              {...register("pseudonyme")}
            />
            {errors?.pseudonyme && (
              <Alert severity="warning">{errors.pseudonyme.message}</Alert>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              autoComplete="email"
              autoFocus
              {...register("email")}
            />
            {errors?.email && (
              <Alert severity="warning">{errors.email.message}</Alert>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              label="Mot de passe"
              id="mot de passe"
              autoComplete="mot de passe"
              {...register("password")}
            />
            {errors?.password && (
              <Alert severity="warning">{errors.password.message}</Alert>
            )}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              inscription
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Mot de passe oublié ?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"créer un compte"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
