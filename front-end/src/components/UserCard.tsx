import { ButtonBase, Card, CardActionArea, CardContent, Typography } from "@mui/material";

type UserCardProps = {
  user: {
    id: number
    email: string
  },
  onClick: React.MouseEventHandler
}

function UserCard(props: UserCardProps): JSX.Element {
  return <Card
    key={props.user.id}
    sx={{
      width: 250,
      margin: '2px'
    }}>
    <CardActionArea onClick={props.onClick}>
      <CardContent>
        <Typography>
          {props.user.id}, {props.user.email}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
}

UserCard.defaultProps = {
  onClick: () => {}
}

export default UserCard