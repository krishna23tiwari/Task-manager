const express = require('express');
const router = express.Router();
const auth = require('../Middlewear/Auth');
const taskcontroller = require('../Controller/Taskcontroller');

router.get('/admin/dashboard',auth, taskcontroller.showAdminDashboard);

router.get('/user/dashboard',auth, taskcontroller.showUserDashboard);

router.put('/mark-complete/:id', auth, taskcontroller.mark)

router.post("/create",auth, taskcontroller.createrecord);
router.get('/show',auth, taskcontroller.show);
router.delete('/:id',auth, taskcontroller.remove);
router.post('/add',auth, taskcontroller.add);
router.put('/:id', auth, taskcontroller.update);

router.put('/:id/complete', auth, taskcontroller.updatetask)


module.exports = router;
