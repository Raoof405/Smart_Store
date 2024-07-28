// import React from "react";

// interface VideoPlayerProps {
//   videoUrl: string;
//   width?: string;
//   height?: string;
//   controls?: boolean;
//   autoplay: boolean;
//   loop?: boolean;
//   muted?: boolean;
// }

// const VideoPlayer: React.FC<VideoPlayerProps> = ({
//   videoUrl,
//   width = "340px",
//   height = "160px",
//   controls = false,
//   autoplay = true,
//   loop = false,
//   muted = false,
// }) => {
//   return (
//     <div>
//   <video
//     src={videoUrl}
//     width={width}
//     height={height}
//     controls={controls}
//     autoPlay={autoplay}
//     loop={loop}
//     muted={muted}
//   >
//     Your browser does not support the video tag.
//   </video>
//     </div>
//   );
// };

// export default VideoPlayer;

import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function VideoCard() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <video
        src="https://www.w3schools.com/html/mov_bbb.mp4"
        autoPlay
        loop
        muted
      ></video>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
    </Card>
  );
}
