import { Card, CardActionArea, CardContent, Typography } from "@mui/material"


type StoryCardProps = {
  story: {
    title: string
    description: string
  },
  onClick: React.MouseEventHandler
}

function StoryCard(props: StoryCardProps): JSX.Element {
  return <Card
    sx={{
      width: 250,
      margin: '2px'
    }}>
    <CardActionArea onClick={props.onClick}>
      <CardContent>
        <Typography>
          {props.story.title}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
}

StoryCard.defaultProps = {
  onClick: () => { }
}

export default StoryCard