import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import {
  Button,
  Container,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { TndevCtx } from "../../contexts/TndevContext";
import { Box } from "@mui/system";
import { format, differenceInHours } from "date-fns";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";

import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { red, orange, blue } from "@mui/material/colors";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: blue[900],
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function Interventions() {
  const queryClient = useQueryClient();
  const [methods, states] = TndevCtx();
  const { incidentsMethods } = methods;

  const { bigData, setBigData } = states;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // tree
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [subject, setSubject] = React.useState("");
  // tree

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const {
    apiIncidentsAll,
    apiIncidentDelete,
    apiIncidentUpdate,
    apiIncidentCreate,
  } = incidentsMethods;

  const { setLoguedIn, user, setUser } = states;
  const { isSuccess, isLoading, refetch, error, data, isFetching } = useQuery(
    ["incidents-all"],
    () => apiIncidentsAll(),
    {
      onSuccess: (data) => {
        setBigData(data);
      },
      onError: (error) => console.log(error),
    }
  );

  const { mutate: deleteRecord, data: deleteMsg } = useMutation(
    (values) => apiIncidentDelete(values),
    {
      onSuccess: (data) => {
        console.log(data);
        queryClient.invalidateQueries("incidents-all");
      },
      onError: (error) => console.log(error),
    }
  );

  const { mutate: createRecord, data: createMsg } = useMutation(
    (values) => apiIncidentCreate(values),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("incidents-all");
      },
      onError: (error) => console.log(error),
    }
  );

  const { mutate: updateRecord, data: updateMsg } = useMutation(
    (values) => apiIncidentUpdate(values),
    {
      onSuccess: (data) => {
        console.log(data);
        queryClient.invalidateQueries("incidents-all");
      },
      onError: (error) => console.log(error),
    }
  );
  const [statut, setStatut] = React.useState("");
  const [priorite, setPriorite] = React.useState("");

  const [openCreate, setOpenCreate] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [recordDelete, setRecordDelete] = React.useState({});
  const [recordUpdate, setRecordUpdate] = React.useState({
    name: "",
    sujet: "",
    description: "",
    num_contrat: "",
    num_serie_machine: "",
    type_prestation: "",
    assignation: "",
    raison_assignation: "",
    statut: "",
    priorite: "",
    nature: "",
    origine: "",
    client: "",
    contact_tel: "",
    contact_email: "",
  });

  const handleOnChange = (e) => {
    setRecordUpdate({
      ...recordUpdate,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickOpenCreateDialog = () => {
    setOpenCreate(true);
  };
  const handleCreate = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.append("user_id", user.id);
    data.append("nature", "incident");
    data.append("priorite", priorite);
    data.append("statut", statut);
    console.log(data);
    let dataCreate = {
      name: data.get("name"),
      type: data.get("type"),
    };
    createRecord(data);
    setOpenCreate(false);
  };

  const handleClickOpenDeleteDialog = (id) => {
    let record = data?.find((i) => i.id === id);
    console.log(record);
    setRecordDelete(record);

    setOpenDelete(true);
  };

  const handleDelete = (id) => {
    console.log(id);
    deleteRecord(id);
    setOpenDelete(false);
  };

  const handleClickOpenUpdateDialog = (id) => {
    let record = data?.find((i) => i.id === id);
    console.log(record);
    setRecordUpdate(record);
    setOpenUpdate(true);
  };
  const handleUpdate = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let dataUpdate = {
      id: data.get("id"),
      data: recordUpdate,
    };

    // console.log(recordUpdate);
    updateRecord(dataUpdate);
    setOpenUpdate(false);
  };

  const handleClose = () => {
    setOpenCreate(false);
    setOpenDelete(false);
    setOpenUpdate(false);

    setAnchorEl(null);
    setOpen(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };
  const handleTree = (dt) => {
    //console.log(dt);
    setSubject(dt);

    setAnchorEl(null);
    setOpen(false);
  };

  const handleChangeStatut = (e) => {
    setStatut(e.target.value);
  };

  const handleChangePriorite = (e) => {
    setPriorite(e.target.value);
  };

  return (
    <>
      <Container sx={{ marginTop: 15 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h4"> Gestion des incidents</Typography>
          <Button onClick={handleClickOpenCreateDialog}>
            {" "}
            Creer un incident
          </Button>
        </Box>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 700 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <StyledTableCell> Incident</StyledTableCell>
                  <StyledTableCell align="right">Description</StyledTableCell>
                  <StyledTableCell align="right">Serie Machine</StyledTableCell>
                  <StyledTableCell align="right">Type</StyledTableCell>
                  <StyledTableCell align="right">Statut</StyledTableCell>
                  <StyledTableCell align="right">priorite</StyledTableCell>
                  <StyledTableCell align="right">Duree(h)</StyledTableCell>
                  <StyledTableCell align="right">Date</StyledTableCell>
                  <StyledTableCell align="right">Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bigData
                  ?.filter((i) => i.nature === "incident")
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((i) => {
                    return (
                      <TableRow
                        key={i.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {i.name}
                        </TableCell>
                        <TableCell align="right">{i.description}</TableCell>
                        <TableCell align="right">
                          {i.num_serie_machine}
                        </TableCell>
                        <TableCell align="right">{i.type}</TableCell>
                        <TableCell align="right">{i.statut}</TableCell>
                        <TableCell align="right">
                          <Chip
                            label={i.priorite}
                            sx={{
                              background:
                                i.priorite === "haute"
                                  ? "red"
                                  : i.priorite === "basse"
                                  ? "green"
                                  : "orange",
                              color: "white",
                            }}
                            size="small"
                            variant="outlined"
                          />
                        </TableCell>

                        <TableCell align="right">
                          {differenceInHours(
                            Date.now(),
                            new Date(i.created_at)
                          )}
                        </TableCell>
                        <TableCell align="right">
                          {format(new Date(i.created_at), "dd-MM-yyyy")}
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            onClick={() => handleClickOpenUpdateDialog(i.id)}
                            aria-label="update"
                            title="mise a jour"
                          >
                            <BorderColorIcon sx={{ color: "orange" }} />
                          </IconButton>
                          <IconButton
                            onClick={() => handleClickOpenDeleteDialog(i.id)}
                            aria-label="delete"
                            title="suppression"
                          >
                            <DeleteIcon sx={{ color: "red" }} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={bigData?.filter((i) => i.nature === "incident").length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Container>

      <Dialog
        component="form"
        onSubmit={handleCreate}
        maxWidth="xl"
        open={openCreate}
        onClose={handleClose}
      >
        <DialogTitle sx={{ color: "white", backgroundColor: blue[500] }}>
          Creation nouvel incident
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div style={{ marginTop: "1rem" }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                name="name"
                autoComplete="name"
                autoFocus
                label="Intitule"
                helperText=""
                variant="standard"
              />
              <TextField
                type="datetime-local"
                margin="normal"
                required
                fullWidth
                id="created_at"
                name="created_at"
                autoComplete="created_at"
                label=""
                helperText=""
                variant="standard"
                sx={{ pt: 2.1 }}
              />

              <Menu
                sx={{ width: "40rem" }}
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem>Typologies Incidents:</MenuItem>
                <MenuItem sx={{ minWidth: "14rem" }}>
                  <TreeView
                    aria-label="file system navigator"
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    sx={{
                      // height: 240,
                      flexGrow: 1,
                      maxWidth: 800,
                      overflowY: "auto",
                      padding: "0px",
                    }}
                  >
                    <TreeItem nodeId="1" label="Serveur">
                      <TreeItem
                        nodeId="11"
                        label="Adressage-ip"
                        onClick={() => handleTree("Serveur/Adressage-ip")}
                      />
                    </TreeItem>
                    <TreeItem nodeId="2" label="Stockage">
                      <TreeItem
                        nodeId="21"
                        label="Natif"
                        onClick={() => handleTree("Stockage/Natif")}
                      />
                      <TreeItem nodeId="22" label="V8">
                        <TreeItem
                          nodeId="221"
                          label="V8"
                          onClick={() => handleTree("Stockage/Natif/V8")}
                        />
                      </TreeItem>
                    </TreeItem>
                    <TreeItem nodeId="3" label="Application">
                      <TreeItem
                        nodeId="31"
                        label="Software"
                        onClick={() => handleTree("Application/Software")}
                      />
                      <TreeItem nodeId="32" label="Configuration">
                        <TreeItem
                          nodeId="321"
                          label="Bios"
                          onClick={() =>
                            handleTree("Application/Software/Bios")
                          }
                        />
                      </TreeItem>
                    </TreeItem>
                  </TreeView>
                </MenuItem>
              </Menu>

              <TextField
                onClick={handleClick}
                value={subject}
                margin="normal"
                required
                fullWidth
                id="sujet"
                name="sujet"
                autoComplete="sujet"
                label="Sujet"
                helperText=""
                variant="standard"
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="description"
                name="description"
                autoComplete="description"
                label="Description"
                helperText=""
                variant="standard"
              />
            </div>
            <div>
              <TextField
                margin="normal"
                required
                fullWidth
                id="num_contrat"
                name="num_contrat"
                autoComplete="num_contrat"
                label="N contrat"
                helperText=""
                variant="standard"
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="num_serie_machine"
                name="num_serie_machine"
                autoComplete="num_serie_machine"
                label="N serie"
                helperText=""
                variant="standard"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="type_prestation"
                name="type_prestation"
                autoComplete="type_prestation"
                label="Type prestation"
                helperText=""
                variant="standard"
              />
              <TextField
                margin="normal"
                fullWidth
                id="assignation"
                name="assignation"
                autoComplete="assignation"
                label="Assignation"
                helperText=""
                variant="standard"
              />
            </div>
            <div>
              <TextField
                margin="normal"
                fullWidth
                id="raison_assignation"
                name="raison_assignation"
                autoComplete="raison_assignation"
                label="Raison assignation"
                helperText=""
                variant="standard"
              />

              <FormControl variant="standard" sx={{ m: 1, width: 220 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Statut
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={statut}
                  name="statut"
                  onChange={handleChangeStatut}
                  label="Statut"
                >
                  <MenuItem value="">
                    <em>Aucun</em>
                  </MenuItem>
                  <MenuItem value={`initial`}>Initial</MenuItem>
                  <MenuItem value={`resolu`}>Resolu</MenuItem>
                  <MenuItem value={"en-attente"}>En attente</MenuItem>
                </Select>
              </FormControl>

              <FormControl variant="standard" sx={{ m: 1, width: 220 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Priorite
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={priorite}
                  name="priorite"
                  onChange={handleChangePriorite}
                  label="Priorite"
                >
                  <MenuItem value="">
                    <em>Aucun</em>
                  </MenuItem>
                  <MenuItem value={`haute`}>haute</MenuItem>
                  <MenuItem value={`basse`}>basse</MenuItem>
                  <MenuItem value={"moyenne"}>moyenne</MenuItem>
                </Select>
              </FormControl>

              <TextField
                required
                margin="normal"
                fullWidth
                id="contact_name"
                name="contact_name"
                autoComplete="contact_name"
                label="Nom du contact"
                helperText=""
                variant="standard"
              />
            </div>
            <div>
              <TextField
                required
                margin="normal"
                fullWidth
                id="origine"
                name="origine"
                autoComplete="origine"
                label="Origine"
                helperText=""
                variant="standard"
              />
              <TextField
                required
                margin="normal"
                fullWidth
                id="client"
                name="client"
                autoComplete="client"
                label="Client"
                helperText=""
                variant="standard"
              />

              <TextField
                required
                margin="normal"
                fullWidth
                id="contact_tel"
                name="contact_tel"
                autoComplete="contact_tel"
                label="Telephone contact"
                helperText=""
                variant="standard"
              />
              <TextField
                required
                margin="normal"
                fullWidth
                id="contact_email"
                name="contact_email"
                autoComplete="contact_email"
                label="Email contact"
                helperText=""
                variant="standard"
              />
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: "gray" }}>
            Annuler
          </Button>
          <Button
            type="submit"
            // onClick={() => handleCreate()}
            sx={{ color: blue[500] }}
          >
            Creer
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog maxWidth="xl" open={openDelete} onClose={handleClose}>
        <DialogTitle sx={{ color: "white", backgroundColor: red[500] }}>
          Suppression definitive
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
              {" "}
              <PriorityHighIcon sx={{ verticalAlign: "middle" }} />{" "}
              Confirmez-vous la suppression de cet incident ?
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: "gray" }}>
            Annuler
          </Button>
          <Button
            onClick={() => handleDelete(recordDelete.id)}
            sx={{ color: red[500] }}
          >
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        component="form"
        onSubmit={handleUpdate}
        maxWidth="xl"
        open={openUpdate}
        onClose={handleClose}
      >
        <DialogTitle sx={{ color: "white", backgroundColor: orange[500] }}>
          Mise a jour incident N:{recordUpdate.id}
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div style={{ marginTop: "1rem" }}>
              <input type="hidden" name="id" value={recordUpdate.id} />
              <TextField
                value={recordUpdate.name}
                onChange={handleOnChange}
                margin="normal"
                required
                fullWidth
                id="name"
                name="name"
                autoComplete="name"
                autoFocus
                label="Intitule"
                helperText=""
                variant="standard"
              />
              <TextField
                value={recordUpdate.sujet}
                onChange={handleOnChange}
                margin="normal"
                required
                fullWidth
                id="sujet"
                name="sujet"
                autoComplete="sujet"
                label="Sujet"
                helperText=""
                variant="standard"
              />
              <TextField
                value={recordUpdate.description}
                onChange={handleOnChange}
                margin="normal"
                required
                fullWidth
                id="description"
                name="description"
                autoComplete="description"
                label="Description"
                helperText=""
                variant="standard"
              />

              <TextField
                value={recordUpdate.num_contrat}
                onChange={handleOnChange}
                margin="normal"
                required
                fullWidth
                id="num_contrat"
                name="num_contrat"
                autoComplete="num_contrat"
                label="N contrat"
                helperText=""
                variant="standard"
              />

              <TextField
                value={recordUpdate.num_serie_machine}
                onChange={handleOnChange}
                margin="normal"
                required
                fullWidth
                id="num_serie_machine"
                name="num_serie_machine"
                autoComplete="num_serie_machine"
                label="N serie"
                helperText=""
                variant="standard"
              />
            </div>
            <div>
              <TextField
                value={recordUpdate.type_prestation}
                onChange={handleOnChange}
                margin="normal"
                required
                fullWidth
                id="type_prestation"
                name="type_prestation"
                autoComplete="type_prestation"
                label="Type prestation"
                helperText=""
                variant="standard"
              />
              <TextField
                value={recordUpdate.assignation}
                onChange={handleOnChange}
                margin="normal"
                fullWidth
                id="assignation"
                name="assignation"
                autoComplete="assignation"
                label="Assignation"
                helperText=""
                variant="standard"
              />
              <TextField
                value={recordUpdate.raison_assignation}
                onChange={handleOnChange}
                margin="normal"
                fullWidth
                id="raison_assignation"
                name="raison_assignation"
                autoComplete="raison_assignation"
                label="Raison assignation"
                helperText=""
                variant="standard"
              />

              <TextField
                value={recordUpdate.statut}
                onChange={handleOnChange}
                required
                margin="normal"
                fullWidth
                id="statut"
                name="statut"
                autoComplete="statut"
                label="Statut"
                helperText=""
                variant="standard"
              />

              <TextField
                value={recordUpdate.priorite}
                onChange={handleOnChange}
                required
                margin="normal"
                fullWidth
                id="priorite"
                name="priorite"
                autoComplete="priorite"
                label="Priorite"
                helperText=""
                variant="standard"
              />
            </div>
            <div>
              <TextField
                value={recordUpdate.nature}
                onChange={handleOnChange}
                required
                margin="normal"
                fullWidth
                id="nature"
                name="nature"
                autoComplete="nature"
                label="Nature"
                helperText=""
                variant="standard"
              />
              <TextField
                value={recordUpdate.origine}
                onChange={handleOnChange}
                required
                margin="normal"
                fullWidth
                id="origine"
                name="origine"
                autoComplete="origine"
                label="Origine"
                helperText=""
                variant="standard"
              />
              <TextField
                value={recordUpdate.client}
                onChange={handleOnChange}
                required
                margin="normal"
                fullWidth
                id="client"
                name="client"
                autoComplete="client"
                label="Client"
                helperText=""
                variant="standard"
              />

              <TextField
                value={recordUpdate.contact_tel}
                onChange={handleOnChange}
                required
                margin="normal"
                fullWidth
                id="contact_tel"
                name="contact_tel"
                autoComplete="contact_tel"
                label="Telephone contact"
                helperText=""
                variant="standard"
              />

              <TextField
                value={recordUpdate.contact_email}
                onChange={handleOnChange}
                required
                margin="normal"
                fullWidth
                id="contact_email"
                name="contact_email"
                autoComplete="contact_email"
                label="Email contact"
                helperText=""
                variant="standard"
              />
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: "gray" }}>
            Annuler
          </Button>
          <Button type="submit" sx={{ color: orange[500] }}>
            Modifier
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
