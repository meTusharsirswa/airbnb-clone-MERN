import React, { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Navigation from "./SideNavigation";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "../../css/Admin-panel.css";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteSharpIcon from "@mui/icons-material/EditNoteSharp";
import { formatIndianCurrency } from "../../utils";

const drawerWidth = 240;
const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "location", label: "Location", minWidth: 100 },
  { id: "rent", label: "Rent", minWidth: 100 },
  { id: "description", label: "Description", minWidth: 100 },
  {
    id: "actions",
    label: "Actions",
    minWidth: 100,
    align: "center",
  },
];

const Hotels = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [hotels, setHotels] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(true);
  const [editingHotel, setEditingHotel] = useState(null);
  const [deletingHotel, setDeletingHotel] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    rent: "",
    description: "",
    images: "",
    location : "",
    adult : "",
    child : "",
    infents : ""
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleFormSubmit = () => {
    const data = {
      name: formData.name,
      rent: formData.rent,
      description: formData.description,
      images: formData.images,
      location : formData.location,
      adult : formData.adult,
      child : formData.child,
      infents : formData.infents
    };

    axios
      .post("http://localhost:4000/add-hotel", data)
      .then((res) => {
        setOpen(false);
        fetchHotels();
      })
      .catch((error) => {
        console.error("Error creating a new hotel:", error);
      });
  };


  const fetchHotels = async () => {
    try {
      const response = await axios.get("http://localhost:4000/get-hotels");
      if (response.status === 200) {
        setHotels(response.data.data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching hotels:", error);
      setLoading(false); // Set loading to false even in case of an error
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleEdit = (hotel) => {
    setEditingHotel(hotel);
    setFormData({
      name: hotel.name,
      rent: hotel.rent,
      description: hotel.description,
      images: hotel.images,
      location : hotel.location,
      adult : hotel.adult,
      child : hotel.child,
      infents : hotel.infents,

    });
    setOpen(true);
  };

  const handleDelete = (hotel) => {
    setDeletingHotel(hotel);
  };

  const handleEditSubmit = () => {
    const updatedHotel = {
      _id: editingHotel._id,
      name: formData.name,
      rent: formData.rent,
      description: formData.description,
      images: formData.images,
      location : formData.location,
      adult : formData.adult,
      child : formData.child,
      infents : formData.infents
    };

    axios
    .post(`http://localhost:4000/update-hotel/${editingHotel._id}`, updatedHotel)
    .then((res) => {
      setOpen(false);
      fetchHotels();
    })
    .catch((error) => {
      console.error("Error updating the hotel:", error);
    });
  };

  const handleClose = () => {
    setDeletingHotel(null);
    setOpen(false);
  };

  const handleDeleteSubmit = () => {
    axios
      .delete(`http://localhost:4000/delete-hotel/${deletingHotel._id}`)
      .then((res) => {
        if (res.status === 200) {
          setDeletingHotel(null);
          fetchHotels();
        }
      })
      .catch((error) => {
        console.error("Error deleting the hotel:", error);
      });
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  if (loading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
          }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Hotels
            </Typography>
          </Toolbar>
        </AppBar>
        <Navigation />

        <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <div className="add-hotel-btn">
          <Button variant="outlined" onClick={handleClickOpen}>
            Add Hotel
          </Button>
        </div>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align="left"
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {hotels
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row._id}
                      >
                        {columns.map((column) => {
                          if (column.id === "actions") {
                            return (
                              <TableCell key={column.id} align="center">
                                <EditNoteSharpIcon
                                  style={{ cursor: "pointer" }}
                                  onClick={() => handleEdit(row)}
                                />
                                <DeleteIcon
                                  style={{ cursor: "pointer" }}
                                  onClick={() => handleDelete(row)}
                                />
                              </TableCell>
                            );
                          } else if (column.id === "rent") {
                            return (
                              <TableCell key={column.id} align="left">
                                {formatIndianCurrency(row[column.id])}
                              </TableCell>
                            );
                          } else {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align="left">
                                {column.id === "location" ? (
                                  // Render a link or a plain text based on your preference
                                  <p>
                                    {value}
                                  </p>
                                ) : (
                                  value
                                )}
                              </TableCell>
                            );
                          }
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={hotels.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingHotel ? "Edit Hotel" : "Add Hotel"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.name}
            onChange={handleInputChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="location"
            label="Location"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.location}
            onChange={handleInputChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="rent"
            label="Rent"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.rent}
            onChange={handleInputChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.description}
            onChange={handleInputChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="images"
            label="Image"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.images}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={editingHotel ? handleEditSubmit : handleFormSubmit}>
            {editingHotel ? "Save" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={deletingHotel !== null} onClose={handleClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this hotel?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDeleteSubmit}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Hotels;
