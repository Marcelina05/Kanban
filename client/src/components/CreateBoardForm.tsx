import { Box, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import Board from "models/Board";
import { toast } from "react-toastify";
import { createBoard } from "services/boardService";
import { getUserId } from "services/userService";

interface FormFields {
  title: string;
}

interface Props {
  onSubmit: (values: FormFields) => void;
  board: Board | null;
}


const CreateBoardForm = ({ onSubmit, board }: Props) => {

  const formik = useFormik({
    initialValues: {
      title: board?.title ?? ''
    },
    onSubmit
  })

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col py-8"
    >
      <TextField
        name="title"
        onChange={formik.handleChange}
        value={formik.values.title}
        label="Board title"
        className="!m-auto !my-3 w-4/5 bg-neutral-100"
        size="small"
      />
      <Button
        type="submit"
        variant="contained"
        className="!m-auto !mt-6 w-2/6"
        sx={{
          backgroundColor: '#9F8BF9',
          '&:hover': { backgroundColor: '#BEB1FB' }
        }}
        size="medium"
      >
        Create board
      </Button>
    </form>
  )
}

export default CreateBoardForm;