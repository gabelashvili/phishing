import { LoadingButton } from "@mui/lab";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { useSendNewEmailMutation } from "../lib/features/apis/emailsApi";

interface IProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const SendNewEmail = ({ open, setOpen }: IProps) => {
  const [sendEmail, { isLoading }] = useSendNewEmailMutation();
  const [email, setEmail] = useState("");
  const handleClose = () => {
    setOpen(false);
  };

  const handleSend = async () => {
    try {
      await sendEmail(email).unwrap();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ sx: { minWidth: 400 } }}
    >
      <DialogTitle>Send new email</DialogTitle>
      <DialogContent>
        <TextField
          label="Email"
          sx={{ mt: 1 }}
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <LoadingButton size="large" variant="outlined" onClick={handleClose}>
          Cancel
        </LoadingButton>
        <LoadingButton
          size="large"
          variant="contained"
          onClick={handleSend}
          loading={isLoading}
        >
          Send
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default SendNewEmail;
