import React from 'react'
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

const DressItem = ({ id, size, onItemRemove }) =>
  <ListItem>
    <ListItemText>Номер: {id}{ size && <>, Размер: {size} </> }</ListItemText>
    <ListItemSecondaryAction>
      <IconButton onClick={ onItemRemove } aria-label="Delete">
        <RemoveIcon />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>

const DateTimeSelector = ({
  sizes = [],
  className,
  onIdChange,
  onSizeChange,
  idField,
  onAddSize,
  sizeField,
  meta: { error, touched },
  onItemRemove
}) =>
  <Wrapper>
    <FieldsWrapper className={ className }>
      <StyledField
        id="dressId"
        label="Номер"
        type="text"
        name="id"
        value={ idField }
        onChange={ onIdChange }
        onBlur={ onIdChange }
        error={ Boolean(error) && touched && error }
        InputLabelProps={{
          shrink: true,
        }}
      />
      <StyledField
        id="dressSize"
        label="Размер"
        type="text"
        name="size"
        value={ sizeField }
        onChange={ onSizeChange }
        onBlur={ onSizeChange }
        InputLabelProps={{
          shrink: true,
        }}
      />
      <IconButton onClick={ onAddSize } type="button">
        <AddIcon />
      </IconButton>
    </FieldsWrapper>
    <List>
      { sizes.map((item, index) => <DressItem key={ index } onItemRemove={ () => onItemRemove(index) } { ...item } />) }
    </List>
  </Wrapper>

export default DateTimeSelector

const Wrapper = styled.div`
  display: flex;
  margin-top: 20px;
  flex-direction: column;
`
const FieldsWrapper = styled.div`
  display: flex;
`

const StyledField = styled(TextField)`
  width: calc(50% - 24px);
`
