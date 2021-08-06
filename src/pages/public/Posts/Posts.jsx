import React, {useState} from 'react'
import { Button, Form } from 'react-bootstrap'
import { gql } from 'graphql.macro'
import { useMutation, useQuery } from '@apollo/client'
import { useSelector } from 'react-redux';
import { selectUser } from '../../../app/reducers/userSlice';
import './Posts.css'

const CREATE_MUTATION = gql`
    mutation CreatePost($title: String, $color:String) {
    createPost(title: $title, color: $color) {
        id
        title,
        color
    }
}`

const ALL_POST_QUERY = gql`query AllPost($orderBy: PostOrderBy, $filter: PostFilter){
    allPost(orderBy: $orderBy, filter:$filter){
        id,
        title,
        color
    }
  }`

const Posts = () => {
    const user = useSelector(selectUser)
    // const [currentValue, setCurrentValue] = useState(intialValue)
    const [posts, setPosts] = useState([
    ])

    const [newPostTitle, setNewPostTitle] = useState("I'm feeling pretty good")
    const [newPostColor, setNewPostColor] = useState('#0000ff')
    const [createPost, { error: createError }] = useMutation(CREATE_MUTATION)

    const { loading } = useQuery(ALL_POST_QUERY, {
        onCompleted: (data) => {
            setPosts([...data.allPost])
        }, variables : {
            orderBy: 'createdAt_desc',
            filter: {
                user_every: {
                    id: user?.id
                }
            }
        }
    })

    const onAddPost = () => {
        if(newPostTitle.length > 2){
            const newPost = {title: newPostTitle, color: newPostColor}
            setPosts([newPost, ...posts])
            setNewPostTitle('')
            createPost({variables: newPost})
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