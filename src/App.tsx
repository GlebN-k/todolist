import React, {useState} from "react";
import "./App.css";
import {TaskType, Todolist} from "./Todolist";
import {v1} from 'uuid';
import AddItemForm from "./AddItemForm";
import {
    AppBar, Button, Container,
    createMuiTheme,
    createTheme,
    CssBaseline,
    Grid,
    IconButton,
    makeStyles, Paper,
    ThemeProvider,
    Toolbar,
    Typography
} from "@mui/material";
import {blue, red, teal, yellow} from "@mui/material/colors";
import {Menu} from "@mui/icons-material";

export type FilterValuesType = "all" | "active" | "completed";
type TodolistType = {
    id: string;
    title: string;
    filter: FilterValuesType;
};

type TasksStateType = {
    [key: string]: Array<TaskType>;
};

function App() {
    const [isLightMode, setIsLightMode] = useState<boolean>(true)
    const mode= isLightMode ? "light" : 'dark'

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"},
    ]);

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true},
        ],
    });

    function removeTask(id: string, todolistId: string) {
        //достанем нужный массив по todolistId:
        let todolistTasks = tasks[todolistId];
        // перезапишем в этом объекте массив для нужного тудулиста отфилтрованным массивом:
        tasks[todolistId] = todolistTasks.filter((t) => t.id != id);
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        setTasks({...tasks});
    }

    function addTask(title: string, todolistId: string) {
        let task = {id: v1(), title: title, isDone: false};
        //достанем нужный массив по todolistId:
        let todolistTasks = tasks[todolistId];
        // перезапишем в этом объекте массив для нужного тудулиста копией, добавив в начало новую таску:
        tasks[todolistId] = [task, ...todolistTasks];
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        setTasks({...tasks});
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        //достанем нужный массив по todolistId:
        let todolistTasks = tasks[todolistId];
        // найдём нужную таску:
        let task = todolistTasks.find((t) => t.id === id);
        //изменим таску, если она нашлась
        if (task) {
            task.isDone = isDone;
            // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
            setTasks({...tasks});
        }
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find((tl) => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists]);
        }
    }

    function removeTodolist(id: string) {
        // засунем в стейт список тудулистов, id которых не равны тому, который нужно выкинуть
        setTodolists(todolists.filter((tl) => tl.id != id));
        // удалим таски для этого тудулиста из второго стейта, где мы храним отдельно таски
        delete tasks[id]; // удаляем св-во из объекта... значением которого являлся массив тасок
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        setTasks({...tasks});
    }

    const addTodoList = (newTitle: string) => {
        const todolistId = v1();
        const newTodo: TodolistType = {id: todolistId, title: newTitle, filter: "all"};
        setTodolists([newTodo, ...todolists]);
        setTasks({...tasks, [todolistId]: []})
    };

    const updateTask = (todolistId: string, taskId: string, title: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, title} : task)})
    }

    const updateTodolistTitle = (todolistId: string, newTitle: string) => {
        setTodolists(todolists.map(item => item.id === todolistId ? {...item, title: newTitle} : item))
    }

    const theme = createTheme({
        palette: {
            primary: teal,
            secondary: yellow,
            mode: mode,
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div className="App" >
                <AppBar position={'static'} >
                    <Toolbar>
                        <IconButton>
                            <Menu/>
                        </IconButton>
                        <Typography variant={'h4'}>TODO LIST</Typography>
                        <Button variant={'outlined'} color={'inherit'}>Log Out</Button>
                        <Button variant={'outlined'} color={'inherit'} onClick={() => setIsLightMode(!isLightMode)}>{mode ? "Set dark" : "Set light"}</Button>

                    </Toolbar>
                </AppBar>
                <Container>
                    <Grid container>
                        {/*<Grid container spacing={}>*/}
                        <AddItemForm callback={addTodoList}/>

                    </Grid>
                    <Grid container>
                        {todolists.map((tl) => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            if (tl.filter === "active") {
                                tasksForTodolist = allTodolistTasks.filter((t) => t.isDone === false);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = allTodolistTasks.filter((t) => t.isDone === true);
                            }

                            return (
                                <Grid item>
                                <Paper sx={{p:'30px'}} elevation={8}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        updateTask={updateTask}
                                        updateTodolistTitle={updateTodolistTitle}
                                    />
                                </Paper>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Container>
            </div>
        </ThemeProvider>
    );
}

export default App;
