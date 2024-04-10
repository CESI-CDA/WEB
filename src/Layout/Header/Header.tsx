import { AppBar, Badge, Container } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import ROUTE_URl from "../../App/Routes/constants";

const Header = () => {
  //todo gerer le click sur l'icone qui renvoie soit vers la page de connexion soit vers la page de profil
  return (
    <AppBar
      sx={{
        height: "12vh",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "2rem",
      }}
      position="static"
    >
      <Container sx={{ padding: "0px" }}>
        <img
          src="logo.png"
          alt="logo ressources relationnelles"
          height="150px"
          width="150px"
        />
      </Container>
      <Container sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Badge sx={{ padding: "1rem" }}>
          <Link to={ROUTE_URl.INSCRIPTION}>
            <PersonIcon />
          </Link>
        </Badge>
      </Container>
    </AppBar>
  );
};

export default Header;
