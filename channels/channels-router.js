const router = require('express').Router();


const Posts = require ('../data/db.js')

// router.get('/', (req, res) => {
//   const queryParameters = req.query
//   console.log(queryParameters)
//   res.send('SUCCESS!')
// })

router.get('/', (req, res) => {
  Posts.find()
  .then (posts => {
    res.status(200).json(posts)
    return posts
  })
  .catch (err => {
    res.status(500).json({ error: "The posts information could not be retrieved." })
  })
  // console.log(posts)
})
// console.log("posts", posts)
  

module.exports = router;
