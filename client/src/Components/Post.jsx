export default function Post ({title,autor,date,likes,dislikes}) {

    return <div className="post-thumbnails">
            <div className="post-information-place">
                <p className="post-date">{date}</p>
                <p className="post-author">{autor}</p>
            </div>
            <div className="post-title-place">
                <h1>{title}</h1>
            </div>
            <div className = "image-thumbnaills-place">
                <img  src="#"></img>
            </div>
            <div className="post-text-place">
                <p>Text of post</p>
            </div>
            <div className="like-dislike-place">
                <p className="likes-place">{likes}</p>
                <p className="dislikes-place">{dislikes}</p>
            </div>
            <div className="button-place">
                <button className="button-like">Like</button>
                <button className="button-dislike">Dislike</button>
            </div>
    </div>
}