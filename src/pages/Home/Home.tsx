import { Grid, Typography } from "@mui/material";
import Header from "../../Layout/Header/Header";
import { useEffect, useState } from "react";
import type { TRessource } from "../../shared/components/Card/Card";
import CardRessource from "../../shared/components/Card/Card";
import { numberPerPage } from "./constants";

const Home = () => {
  const [ressources, setRessources] = useState<Array<TRessource>>([]);
  useEffect(() => {
    fetch(`https://projet-resources.fr/api/ressources?` + numberPerPage)
      .then((response) => response.json())
      .then((data) => setRessources(data.items.data));
    console.log(ressources);
  }, []);
  console.log(ressources);

  return (
    <div>
      <Header />
      <Grid container spacing={2}>
        {ressources.length > 0 ? (
          ressources.map((ressource) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={ressource.titre_res}>
                <CardRessource
                  titre_res={ressource.titre_res}
                  contenu_res={ressource.contenu_res}
                  url_res={ressource.url_res}
                />
              </Grid>
            );
          })
        ) : (
          //mettre le loader material ui
          <Typography variant="h3">Loading...</Typography>
        )}
      </Grid>
    </div>
  );
};

export default Home;
