import styled from 'styled-components'
import Chip from '@material-ui/core/Chip';

const StyledChip = styled(Chip)`
  && {
    background: ${props => props.color};
    margin-bottom: 5px;
  }

  & + & {
    margin-left: 10px;
  }
`

export default StyledChip