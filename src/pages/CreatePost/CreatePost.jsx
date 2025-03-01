import { useEffect, useRef, useState } from "react";
import { getAllCategories, createPost } from "../../services/postServices";

export default function CreatePost(props) {
  const formElement = useRef();
  const [validForm, setValidForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    isAnonymous: false,
    media: "",
    category: "",
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategories().then((categories) => {
      console.log("just pulled the cats", categories);
      setCategories(categories);
    });
  }, []);

  useEffect(() => {
    formElement.current.checkValidity()
      ? setValidForm(true)
      : setValidForm(false);
  }, [formData]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    let categoryId = categories.filter(category => category.category === formData.category)
    const postFormData = {
      category: formData.category,
      title: formData.title,
      content: formData.content,
      media: formData.media,
      isAnonymous: formData.isAnonymous,
    };
    createPost(`/${categoryId[0]._id}`, postFormData);
  };

  const handleChangePhoto = (evt) => {
    setFormData({ ...formData, photo: evt.target.files[0] });
  };

  const categoryOptions = categories.map((category) => {
    return <option value={category.category}>{category.category}</option>;
  });

  return (
    <>
      <h1 className="post-title">Create a Post</h1>
      <form
        autoComplete="off"
        ref={formElement}
        onSubmit={handleSubmit}
        className="create-post-form"
      >
        <div className="category-choice">
          <select
            onChange={(event) => handleChange(event)}
            name="category"
            id="selectCategory"
          >
            {categoryOptions}
          </select>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="title-input" className="form-label">
            Title<span>* </span>
          </label>
          <input
            type="text"
            className="form-control"
            id="title-input"
            name="title"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mb-4">
          <label htmlFor="content-input" className="form-label">
            Post Content<span>* </span>
          </label>
          <input
            type="text"
            className="form-control"
            id="content-input"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="photo-upload" className="form-label">
            Upload Photo
          </label>
          <input
            type="file"
            className="form-control"
            id="media-upload"
            name="media"
            onChange={handleChangePhoto}
          />
        </div>
        <div className="d-grid">
          <button
            type="submit"
            className="btn btn-primary btn-fluid"
            disabled={!validForm}
          >
            Add Post
          </button>
          <br />
          <span>* </span> indicates a requried field
        </div>
      </form>
    </>
  );
}
