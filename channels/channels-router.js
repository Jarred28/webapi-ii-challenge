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
  
})

// Get/api/post/:id
  
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

//

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

//

router.get('/:id/comments', (req, res) => {
  const id = req.params.id

  Posts.findPostComments(id)
  .then((comments) => {

    if(comments.length === 0) {
      res.status(404).json({ message: "The post with the specified ID does not exist." })
    } else {
      res.status(200).json(comments)
    }
  })
  .catch(err => {
    res.status(500).json({ error: "The comments information could not be retrieved." })
  })
})

//

router.post('/:id/comments', (req, res) => {
  const comment = req.body
  console.log(comment)
  if (!comment.text) {
    res.status(400).json({ errorMessage: "Please provide text for the comment." })
    return
    //forces us to be done "cancelling" the request
  }

  Posts.insertComment(comment)
  .then((obj) => {
    console.log("obj inside THEN", obj)
    if(!obj) {
      res.status(404).json({ message: "The post with the specified ID does not exist." })
    } else {
      res.status(201).json(obj)
    }
  })
  .catch(err => {
    res.status(500).json({ 
      error: "There was an error while saving the comment to the database" 
    })
  })
})

module.exports = router;
