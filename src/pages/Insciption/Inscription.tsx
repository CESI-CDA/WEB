import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Header from "../../Layout/Header";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert } from "@mui/material";
import { redirect } from "react-router-dom";
import ROUTE_URl from "../../App/Routes/constants";
import { useForm } from "react-hook-form";

type TUser = {
  email: string;
  password: string;
  nom: string;
  prenom: string;
  pseudonyme: string;
};

export default function Inscription() {
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
        redirect(ROUTE_URl.HOME);
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
              control={<Checkbox value="Se souvenir de moi" color="primary" />}
              label="Se souvenir de moi"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              inscription
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
