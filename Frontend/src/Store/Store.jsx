import { configureStore } from '@reduxjs/toolkit';
import TaskManage from '../Slice/TaskManage'

const store = configureStore({
  reducer: {
    tasks: TaskManage,
  },
});

export default store;
