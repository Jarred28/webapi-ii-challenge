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

//GET API/POSTS/:id

router.get('/:id', (req, res) => {
    const id = req.params.id
  
    Posts.findById(id)
    .then((posts) => {
  
      if(posts.length === 0) {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
      } else {
        res.status(200).json(posts)
      }
    })
    .catch(err => {
      res.status(500).json({ 
        error: "The post information could not be retrieved.",
        err
      })
    })
  })

  //POST api/posts/:id/comments

  

  //GET/api/posts/:id/comments






module.exports = router; 
