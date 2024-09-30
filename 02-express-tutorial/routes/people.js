const express = require('express')
const router = express.Router()
let { people } = require('../data')
const { 
  getPeople,
  createPeople,
  createPeoplePostman,
  updatePerson,
  deletePerson
} = require('../controllers/people')

router.get('/',getPeople)
router.post('/', createPeople)
router.post('/postman', createPeoplePostman)
router.put('/:id', updatePerson)
router.delete('/:id', deletePerson)

module.exports = router