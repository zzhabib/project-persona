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
      width: 200,
      height: 200,
      margin: '10px'
    }}>
    <CardActionArea
      onClick={props.onClick}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
      }}
    >
      <CardContent>
        <Typography variant="h6">
          {props.story.title}
        </Typography>
        <Typography>
          {props.story.description}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
}

StoryCard.defaultProps = {
  onClick: () => { }
}

export default StoryCard