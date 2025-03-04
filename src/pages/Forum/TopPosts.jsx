export default function TopPosts(props) {

    const numPosts = props.posts.length;
    let lastTenPosts = [];
    const lowerBound = numPosts >= 10 ? numPosts - 11 : 0;
    for(let i = numPosts - 1; i > lowerBound; i--) {
        lastTenPosts.push(props.posts[i])
    }
    const topPosts = lastTenPosts.map((post) => (
        <div key={post._id} id={post._id} onClick={props.selectTopPost}>{post.title}</div>
    ))
    return(
        <>
        <h1>Latest Posts</h1>
        <div>{topPosts}</div>
        </>
    )
}
