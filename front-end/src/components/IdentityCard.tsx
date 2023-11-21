import { ButtonBase, Card, CardActionArea, CardContent, SxProps, Theme, Typography } from "@mui/material";

type IdentityCardProps = {
  name: string,
  sx?: SxProps<Theme>,
  onClick?: React.MouseEventHandler
}

const IdentityCard: React.FC<IdentityCardProps> = ({
  name,
  sx,
  onClick = () => {}
}) => {
  return <Card
    sx={{
      margin: '2px',
      ...sx
    }}>
    <CardActionArea onClick={onClick}>
      <CardContent>
        <Typography>
          {name}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
}

IdentityCard.defaultProps = {
  onClick: () => { }
}

export default IdentityCard