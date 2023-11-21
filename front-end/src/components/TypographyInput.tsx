import { styled } from "@mui/material";
import { Variant } from "@mui/material/styles/createTypography";

interface TypographyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant: Variant;
}

const TypographyInput = styled('input')<TypographyInputProps>(({ theme, variant }) => ({
  ...theme.typography[variant],
  width: '100%',
  border: 'none',
  outline: 'none',
  backgroundColor: 'transparent',
  padding: 0,
  margin: 0,
}));

export default TypographyInput