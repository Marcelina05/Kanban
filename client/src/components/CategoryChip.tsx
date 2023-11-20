import { Chip } from "@mui/material";
import Category from "models/Category"
import ColorUtils from "utils/ColorUtils";

interface Props {
  category: Category;
}

const CategoryChip = ({ category }: Props) => {
  return (
    <Chip
      label={category.name}
      sx={{
        backgroundColor: ColorUtils.getColorBackground(category.color),
        color: ColorUtils.getColorTitle(category.color),
      }}
    />
  )
}

export default CategoryChip;