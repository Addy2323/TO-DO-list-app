import React, { useState } from 'react';
import { Container, Typography, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Paper, makeStyles } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  paper: {
    padding: theme.spacing(3),
    width: '100%',
    maxWidth: 600,
  },
  form: {
    display: 'flex',
    gap: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
  list: {
    width: '100%',
  },
  listItem: {
    borderRadius: theme.spacing(1),
    marginBottom: theme.spacing(1),
    backgroundColor: theme.palette.background.default,
  },
}));

function App() {
  const classes = useStyles();
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [editIndex, setEditIndex] = useState(-1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (editIndex >= 0) {
      const newTodos = [...todos];
      newTodos[editIndex] = input;
      setTodos(newTodos);
      setEditIndex(-1);
    } else {
      setTodos([...todos, input]);
    }
    setInput('');
  };

  const handleDelete = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const handleEdit = (index) => {
    setInput(todos[index]);
    setEditIndex(index);
  };

  return (
    <Container className={classes.root}>
      <Paper elevation={3} className={classes.paper}>
        <Typography variant="h4" gutterBottom align="center">
          To-Do List
        </Typography>

        <form onSubmit={handleSubmit} className={classes.form}>
          <TextField
            value={input}
            onChange={(e) => setInput(e.target.value)}
            label="Add a task"
            variant="outlined"
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            {editIndex >= 0 ? 'Update' : 'Add'}
          </Button>
        </form>

        <List className={classes.list}>
          {todos.map((todo, index) => (
            <ListItem key={index} className={classes.listItem}>
              <ListItemText primary={todo} />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => handleEdit(index)}>
                  <Edit />
                </IconButton>
                <IconButton edge="end" onClick={() => handleDelete(index)}>
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}

export default App;