import express from 'express'

const app = express()
app.use(express.json())
const PORT = 3000
let users = [
    { id: 1, name: 'Somebody',email:"somebody@gmail.com" },
    { id: 2, name: 'nobody',email:"nobody@gmail.com" }
]
app.get('/users', (req, res) => {
  res.json({message:"Fetched al users", data:users})
})
app.post('/users', (req, res) => {
    const newUser = {id:users.length + 1,name:"anybody",email:"anybody@gmail.com"}
    newUser.id = users.length + 1; // Simple id generation
    users.push(newUser)
    res.status(201).json(newUser)
})
app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const userIndex = users.findIndex(u => u.id === id)
    if (userIndex !== -1) {
        const updatedUser = { ...users[userIndex], ...req.body }
        users[userIndex] = updatedUser
        res.json(updatedUser)
    } else {
        res.status(404).json({ message: 'User not found' })
    }
})
app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const userIndex = users.findIndex(u => u.id === id)
    if (userIndex !== -1) {
        const deletedUser = users.splice(userIndex, 1)
        res.json(deletedUser)
    } else {
        res.status(404).json({ message: 'User not found' })
    }
})

app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`)
});
