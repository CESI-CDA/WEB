import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export type TRessource = {
  titre_res: string;
  contenu_res: string;
  url_res: string;
};

export default function CardRessource({
  titre_res,
  contenu_res,
  url_res,
}: TRessource) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 140 }} image={url_res} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {titre_res}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {contenu_res}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => console.log("click")}>
          Voir
        </Button>
      </CardActions>
    </Card>
  );
}
