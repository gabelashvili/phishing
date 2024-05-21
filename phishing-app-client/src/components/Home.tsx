import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useGetAllEmailsQuery } from "../lib/features/apis/emailsApi";
import SendNewEmail from "./SendNewEmail";
import { useEffect, useRef, useState } from "react";
import { IEmailsFilter } from "../@types/emails";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";

const Home = () => {
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const [openAdd, setOpenAdd] = useState(false);
  const [filters, setFilters] = useState<IEmailsFilter>({
    page: 0,
    pageSize: 5,
    email: "",
  });
  const { data, isFetching, isLoading } = useGetAllEmailsQuery(filters);

  const handleSearch = (email: string) => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setFilters({ ...filters, email: email, page: 0 });
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <>
      <SendNewEmail open={openAdd} setOpen={setOpenAdd} />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <TableContainer
          component={Paper}
          sx={{ width: "90%", m: "auto", mt: 5, p: 2, minHeight: 700 }}
        >
          <>
            <Box sx={{ display: "flex" }}>
              <TextField label="Search..." onChange={(e) => handleSearch(e.target.value)} />
              <Button
                variant="contained"
                sx={{ ml: "auto", display: "flex" }}
                onClick={() => setOpenAdd(true)}
              >
                Send New
              </Button>
            </Box>
            <Divider sx={{ py: 2 }} />
            {isFetching || isLoading ? (
              <CircularProgress sx={{ m: "auto", display: "flex", py: 10 }} />
            ) : (
              <Table
                sx={{ minWidth: 650, position: "relative" }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>
                      Employee email
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }} align="center">
                      Email content
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }} align="center">
                      Status
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.emails.map((email) => (
                    <TableRow
                      hover
                      key={email._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {email.to}
                      </TableCell>
                      <TableCell align="center">{email.message}</TableCell>
                      <TableCell align="center">
                        <Chip
                          label={email.status === 0 ? "Pending" : "Fulfilled"}
                          color={email.status === 0 ? "info" : "success"}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                  {data?.count === 0 && (
                    <Typography
                      sx={{
                        position: "absolute",
                        top: 250,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: 24,
                      }}
                    >
                      There is no data...
                    </Typography>
                  )}
                </TableBody>
                {data && data?.count > 0 && (
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        colSpan={3}
                        count={data?.count ?? 0}
                        rowsPerPage={filters.pageSize}
                        slotProps={{
                          select: {
                            inputProps: {
                              "aria-label": "rows per page",
                            },
                            native: true,
                          },
                        }}
                        page={filters.page}
                        onPageChange={(_, value) =>
                          setFilters({ ...filters, page: Number(value) })
                        }
                        onRowsPerPageChange={(e) =>
                          setFilters({
                            ...filters,
                            page: 0,
                            pageSize: Number(e.target.value),
                          })
                        }
                        ActionsComponent={TablePaginationActions}
                      />
                    </TableRow>
                  </TableFooter>
                )}
              </Table>
            )}
          </>
        </TableContainer>
      </Box>
    </>
  );
};

export default Home;
