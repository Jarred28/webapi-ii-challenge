const router = require('express').Router();


const Posts = require ('../data/db.js')

//GET API/POSTS

router.get('/', (req, res) => {
  Posts.find()
  .then (posts => {
    res.status(200).json(posts)
    return posts
  })
  .catch (err => {
    res.status(500).json({ error: "The posts information could not be retrieved." })
  })

})

//POST API/POSTS

router.post('/', (req, res) => {
  const newPost = req.body
  console.log(newPost)
  Posts.insert(newPost)
  .then(() => {
    if(!newPost.title || !newPost.contents) {
      res.status(400).json({message: "wrong"})
    } else {
      res.status(201).json(newPost)
    }
  })
  .catch(err => {
    res.status(500).json({message: "all wrong"})
  })
})



module.exports = router; 
