import { Tooltip, Typography } from "@mui/material";
import "./style.scss";
import { FiPlus } from "react-icons/fi";

const AddBannerButton = ({ onClick }) => {
  return (
    <div onClick={onClick} className="AddBannerButton-container">
      <Tooltip
        title={<Typography style={{ fontSize: "16px" }}>Add Banner</Typography>}
        placement="top"
        arrow
      >
        <FiPlus />
      </Tooltip>
    </div>
  );
};

export default AddBannerButton;
