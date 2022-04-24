import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Container, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";

import { red, orange, blue, green } from "@mui/material/colors";

export default function Validations() {
  const [openValidation, setOpenValidation] = React.useState(false);
  const [recordValidate, setRecordValidate] = React.useState({
    sujet: "",
    typologie: "",
    message: "",
  });
  const handleClickOpenValidationDialog = () => {
    setOpenValidation(true);
  };

  const handleClose = () => {
    setRecordValidate({ sujet: "", typologie: "", message: "" });
    setOpenValidation(false);
  };

  const handleOnChange = (e) => {
    setRecordValidate({
      ...recordValidate,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Container
        sx={{ marginTop: 15, display: "flex", justifyContent: "center" }}
      >
        <Paper
          sx={{
            width: "40%",
            overflow: "hidden",
            padding: "1rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "45ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div
              style={{
                marginTop: "1rem",
              }}
            >
              <Typography variant="h6"> Demande de validation</Typography>
            </div>
            <div>
              <TextField
                id="sujet"
                name="sujet"
                autoComplete="sujet"
                value={recordValidate.sujet}
                onChange={handleOnChange}
                label="Sujet"
                helperText=""
                variant="standard"
              />
            </div>
            <div>
              <TextField
                id="typologie"
                name="typologie"
                autoComplete="typologie"
                value={recordValidate.typologie}
                onChange={handleOnChange}
                label="Typologie"
                helperText=""
                variant="standard"
              />
            </div>
            <div>
              <TextField
                id="message"
                name="message"
                autoComplete="message"
                value={recordValidate.message}
                onChange={handleOnChange}
                multiline
                aria-label="Message"
                minRows={6}
                placeholder="Message"
              />
            </div>
            <div>
              <Button
                onClick={handleClickOpenValidationDialog}
                variant="contained"
                sx={{ mb: 1 }}
              >
                Valider
              </Button>
            </div>
          </Box>
        </Paper>
      </Container>

      <Dialog maxWidth="xl" open={openValidation} onClose={handleClose}>
        <DialogTitle sx={{ color: "white", backgroundColor: green[500] }}>
          Confirmation de prise en charge
        </DialogTitle>
        <DialogContent>
          <Box
            noValidate
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              m: "auto",
              width: "fit-content",
            }}
          >
            <Typography sx={{ mt: 4 }} variant="h6">
              Votre demande sera traitee dans les plus brefs delais
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: "gray" }}>
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
