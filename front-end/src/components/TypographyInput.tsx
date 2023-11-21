import { Box, SxProps, Theme, Typography, styled } from "@mui/material";
import { Variant } from "@mui/material/styles/createTypography";

interface StyledInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant: Variant;
}

const StyledInput = styled('input')<StyledInputProps>(({ theme, variant }) => ({
  ...theme.typography[variant],
  width: '100%',
  border: 'none',
  outline: 'none',
  backgroundColor: 'transparent',
  padding: 0,
  margin: 0,
}));

type TypographyInputProps = {
  name: string
  variant?: Variant
  value?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

const TypographyInput: React.FC<TypographyInputProps> = ({
  name,
  variant = 'h4',
  value = '',
  onChange = () => { }
}) => {

  return <StyledInput
    name={name}
    variant={variant}
    type="text"
    value={value}
    onChange={onChange}
  />
}

export default TypographyInput