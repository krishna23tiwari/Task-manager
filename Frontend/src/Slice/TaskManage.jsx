// // src/redux/taskSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Async thunk for fetching tasks
// export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
//   const response = await axios.get('http://localhost:2020/work/tasks');
//   return response.data;
// });

// // Slice
// const taskSlice = createSlice({
//   name: 'tasks',
//   initialState: {
//     tasks: [],
//     status: 'idle',
//     error: null,
//   },
//   reducers: {
//     markComplete: (state, action) => {
//       const task = state.tasks.find((task) => task._id === action.payload);
//       if (task) task.status = 'complete';
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchTasks.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchTasks.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.tasks = action.payload;
//       })
//       .addCase(fetchTasks.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });
//   },
// });

// export const { markComplete } = taskSlice.actions;

// export default taskSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
  },
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    markTaskAsComplete: (state, action) => {
    //   const task = state.tasks.find(t => t._id === action.payload);
    //   if (task) {
    //     task.completed = true;

    const taskId = action.payload;
    const task = state.tasks.find(task => task._id === taskId);
    if (task) {
      task.completed = true;
      task.status = 'Completed';

      }
    },
  },
});

export const { setTasks, markTaskAsComplete } = taskSlice.actions;
export default taskSlice.reducer;
