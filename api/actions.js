const router = require('express').Router();
const db = require('../data/helpers/actionModel');

const getActions = (req, res) => {
  db.get()
    .then(actions => res.status(200).json(actions))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Server error getting actions.' });
    });
};

router.get('/', getActions);

router.get('/:id', (req, res) => {
  db.get(req.params.id)
    .then(action => res.status(200).json(action))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Server error getting action.' });
    });
});

router.get('/:id/actions', (req, res) => {
  db.getProjectActions(req.params.id)
    .then(actions => res.status(200).json(actions))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Server error getting the actions for that action.' });
    });
});

router.post('/', (req, res) => {
  db.insert(req.body)
    .then(() => getActions(req, res))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Server error adding the action.' });
    });
});

router.put('/:id', (req, res) => {
  db.update(req.params.id, req.body)
    .then(() => getActions(req, res))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Server error updating that action.' });
    });
});

router.delete('/:id', (req, res) => {
  db.remove(req.params.id)
    .then(() => getActions(req, res))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Server error deleting that action.' });
    });
});

module.exports = router;
