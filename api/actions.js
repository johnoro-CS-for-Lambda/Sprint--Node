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
    .then(action => {
      if (!action) res.status(404).json({ error: 'That action doesn\'t exist.' });
      else res.status(200).json(action);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Server error getting action.' });
    });
});

router.post('/', (req, res) => {
  const { project_id, description, notes } = req.body;
  if (!project_id || !description || !notes) {
    res.status(404).json({ error: 'New actions need a project ID, description, and notes.' });
  } else if (description.length > 128) {
    res.status(404).json({ error: 'The provided name is too long (128 chars max).' })
  } else {
    db.insert(req.body)
      .then(() => getActions(req, res))
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Server error adding the action.' });
      });
  }
});

router.put('/:id', (req, res) => {
  const { description } = req.body;
  if (description && description.length > 128) {
    res.status(404).json({ error: 'The provided description is too long (128 chars max).' })
  } else {
    db.update(req.params.id, req.body)
      .then((newAction) => {
        if (!newAction) res.status(404).json({ error: 'No action was found with the specified id.' });
        else getActions(req, res);
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Server error updating that action.' });
      });
  }
});

router.delete('/:id', (req, res) => {
  db.remove(req.params.id)
    .then((success) => {
      if (!success) res.status(404).json({ error: 'No action was found with the specified id.' });
      else getActions(req, res);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Server error deleting that action.' });
    });
});

module.exports = router;
