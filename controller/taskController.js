const express = require('express');
const mongoose = require('mongoose');
const Task = mongoose.model('Task');
const router = express.Router();
router.get('/', (req, res) => {
    res.render("addOrEdit", {
        viewTitle: "Task"
    })
})
router.post('/', (req, res) => {
    if (req.body._id == "") {
        insertRecord(req, res);
    } else {
        updateRecord(req, res);
    }
})
function insertRecord(req, res) {
    var task = new Task();
    task.task = req.body.task;
    task.description = req.body.description;
    task.save((err, doc) => {
        if (!err) {
            res.redirect('list');
        } else {
            if (err.name == "ValidationError") {
                handleValidationError(err, req.body);
                res.render("addOrEdit", {
                    viewTitle: 'Insert Task',
                    task: req.body
                })
            } else {
                console.log("loi" + err);
            }
        }
    })
}

function updateRecord(req, res) {
    Task.findOneAndUpdate({ _id: req.body._id, }, req.body, { new: true }, (err, doc) => {
        if (!err) {
            res.redirect('list');
        } else {
            if (err.name == "ValidationError") {
                handleValidationError(err, req.body);
                res.render("addOrEdit", {
                    viewTitle: 'Update Task',
                    task: req.body
                })
            } else {
                console.log("loi" + err);
            }
        }
    })
};

router.get('/list', (req, res) => {
    Task.find((err, doc) => {
        if (!err) {
            res.render("list", {
                list: doc
            })
        }
    })
})

router.get('/:id', (req, res) => {
    Task.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.render("addOrEdit", {
                viewTitle: "Update Task",
                task: doc
            })
        }
    })
})


router.get('/delete/:id', (req, res) => {
    Task.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('list');
        } else {
            console.log("Khong the xoa" + err);
        }
    })
})
module.exports = router;