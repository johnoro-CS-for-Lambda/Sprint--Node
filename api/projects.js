const router = require('express').Router();
const db = require('../data/helpers/projectModel');

const getProjects = (req, res) => {
  db.get()
    .then(projects => res.status(200).json(projects))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Server error getting projects.' });
    });
};

router.get('/', getProjects);

router.get('/:id', (req, res) => {
  db.get(req.params.id)
    .then(project => res.status(200).json(project))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Server error getting project.' });
    });
});

module.exports = router;
