import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Button, Stack, TextField, Typography } from "@mui/material";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import SaveIcon from "@mui/icons-material/Save";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));

export default function BasicGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0} sx={{ marginBottom: "0.5rem" }}>
        <Grid item xs={12}>
          <Item
            sx={{
              paddingTop: "0.9rem",
              textAlign: "center",

              fontSize: "1rem",
              fontWeight: "700",

              display: "flex",
              justifyContent: "center",
            }}
          >
            <Stack direction="row" spacing={1}>
              <Button variant="outlined" sx={{ color: "black" }}>
                <SaveAltIcon
                  sx={{
                    marginRight: { xs: "0rem", md: "1rem" },
                    marginBottom: "0.6rem",
                  }}
                />
                <Typography sx={{ display: { xs: "none", md: "block" } }}>
                  Enregistrer
                </Typography>
              </Button>
              <Button variant="outlined" sx={{ color: "black" }}>
                <SaveIcon
                  sx={{
                    marginRight: { xs: "0rem", md: "1rem" },
                    marginBottom: "0.4rem",
                  }}
                />
                <Typography sx={{ display: { xs: "none", md: "block" } }}>
                  Enregistrer et fermer
                </Typography>
              </Button>
            </Stack>
          </Item>
        </Grid>
      </Grid>
      <Grid container spacing={1} className="left side">
        <Grid item xs={12} md={8}>
          <div style={{ marginBottom: "3rem" }}>
            <Item
              sx={{
                boxShadow: "none",
                padding: { xs: "0 0", md: "1rem 16rem" },
              }}
            >
              {" "}
              <Typography variant="h5" gutterBottom>
                Detail de l'incident:
              </Typography>
              <div
                style={{
                  borderRadius: "3px",
                  border: "3px solid orange",
                  padding: "13px ",
                }}
              >
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="standard-basic"
                      label="Titre de l'incident"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="Sujet"
                      label="Sujet"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="standard-basic"
                      label="N° Contrat maintenance"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="standard-basic"
                      label="N° de serie"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="standard-basic"
                      label="Type de prestation"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="standard-basic"
                      label="Nom du contrat"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="standard-basic"
                      label="Email du contact"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="standard-basic"
                      label="Tel du contact"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="standard-basic"
                      label="Type"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="standard-basic"
                      label="Origine"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="standard-basic"
                      label="Date incident"
                      variant="standard"
                    />
                  </Grid>
                </Grid>
              </div>
            </Item>
            <Item
              sx={{
                boxShadow: "none",
                padding: { xs: "0 0", md: "1rem 16rem" },
              }}
            >
              {" "}
              <Typography variant="h5" gutterBottom>
                Description
              </Typography>
              <div
                style={{
                  borderRadius: "3px",
                  border: "3px solid orange",
                  padding: "13px ",
                }}
              >
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="standard-basic"
                      label="Titre incident"
                      variant="standard"
                    />
                  </Grid>
                </Grid>
              </div>
            </Item>
            <Item
              sx={{
                boxShadow: "none",
                padding: { xs: "0 0", md: "1rem 16rem" },
                Bottom: "2rem",
              }}
            >
              {" "}
              <Typography variant="h5" gutterBottom>
                Note
              </Typography>
              <div
                style={{
                  borderRadius: "3px",
                  border: "3px solid orange",
                  padding: "13px ",
                }}
              >
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="standard-basic"
                      label="Titre incident"
                      variant="standard"
                    />
                  </Grid>
                </Grid>
              </div>
            </Item>
          </div>
        </Grid>
        <Grid item xs={12} md={4} className="right side block">
          <Item
            sx={{
              boxShadow: "none",
              padding: { xs: "0 0", md: "3.5rem 4rem" },
            }}
          >
            <div
              style={{
                borderRadius: "3px",
                border: "3px solid orange",
                padding: "1rem",
              }}
            >
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    id="standard-multiline-static"
                    label="Propriete"
                    multiline
                    fullWidth
                    rows={4}
                    defaultValue=""
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="standard-multiline-static"
                    label="Status"
                    multiline
                    fullWidth
                    rows={4}
                    defaultValue=""
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="standard-multiline-static"
                    label="# incident"
                    multiline
                    fullWidth
                    rows={4}
                    defaultValue=""
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="standard-multiline-static"
                    label="Proprietaire"
                    multiline
                    fullWidth
                    rows={4}
                    defaultValue=""
                    variant="standard"
                  />
                </Grid>
              </Grid>
            </div>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
