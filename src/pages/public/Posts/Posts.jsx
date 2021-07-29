import React, {useState} from 'react'
import { Button, Form } from 'react-bootstrap'
import './Posts.css'
const Posts = () => {

    // const [currentValue, setCurrentValue] = useState(intialValue)
    const [posts, setPosts] = useState([
    ])

    const [newPostTitle, setNewPostTitle] = useState("I'm feeling pretty good")
    const [newPostColor, setNewPostColor] = useState('#0000ff')

    const onAddPost = () => {
        if(newPostTitle.length > 2){
            setPosts([{title: newPostTitle, color: newPostColor}, ...posts])
            setNewPostTitle('')
            console.log('Add Post Click', posts)
        }
    }

    const onTitleChanged = (event) => {
        console.log(event.target.value)
        setNewPostTitle(event.target.value)
    }

    const onColorChange = (event) => {
        console.log('onColorChange', event.target.value)
        setNewPostColor(event.target.value)
    }

    return (
        <>
            <h1 className="posts-title">Posts</h1>
            <Form className="post-form">
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>How do you feel today</Form.Label>
                <Form.Control as="textarea" rows={3} value={newPostTitle} onChange={onTitleChanged} />
            </Form.Group>
            <div className="button-and-color">
                <Button variant="primary" onClick={onAddPost}>Add Post</Button>
                <div className="color-picker"> 
                    <Form.Control
                        type="color"
                        id="exampleColorInput"
                        defaultValue="#563d7c"
                        title="Choose your color"
                        onChange={onColorChange}
                    />
                </div>
            </div>
            
            </Form>
            <div className="posts-list">
                
                {posts.map((currentPost, index)=><div key={index}><PostItem post={currentPost} /></div>)}
            </div>
        </>
    )
}

const PostItem = ({post}) => {
    return (
        <div className="post-item" style={{backgroundColor:post.color}}>{post.title}</div>
    )
}

export default Posts