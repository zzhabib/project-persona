import { Card, CardActionArea, CardContent, Typography } from "@mui/material"


const CreateCard = () => {
  return <Card
    sx={{
      // width: 250,
      margin: '2px',
      color: '#ffffff',
      backgroundColor: '#3287a8'
    }}>
    <CardActionArea onClick={() => { }}>
      <CardContent>
        <Typography>
          Create Account
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
}

export default CreateCard