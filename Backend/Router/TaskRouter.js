// const express = require('express')
// const router = express.Router()
// const auth = require('../Middlewear/Auth')

// const taskcontroller = require('../Controller/Taskcontroller')

// router.post("/create", taskcontroller.createrecord);

// router.get('/show', taskcontroller.show)

// router.delete('/:id', taskcontroller.remove)

// router.post('/add', taskcontroller.add)

// router.put('/:id', taskcontroller.update)


// module.exports = router


const express = require('express');
const router = express.Router();
const auth = require('../Middlewear/Auth');
const taskcontroller = require('../Controller/Taskcontroller');

// ------------------------
// Dashboard Routes
// ------------------------

// Admin Dashboard: Show all users and tasks
router.get('/admin/dashboard', taskcontroller.showAdminDashboard);

// User Dashboard: Show tasks assigned to the logged-in user
router.get('/user/dashboard', taskcontroller.showUserDashboard);

// ------------------------
// Task Routes
// ------------------------

router.post("/create", taskcontroller.createrecord);
router.get('/show', taskcontroller.show);
router.delete('/:id', taskcontroller.remove);
router.post('/add', taskcontroller.add);
router.put('/:id', auth, taskcontroller.update);

module.exports = router;
