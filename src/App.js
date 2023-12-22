import { useEffect, useState } from "react";
import "./App.css";
import { Auth } from "./components/auth";
import { auth, db, storage } from "./config/firebase";
import { ref, uploadBytes } from "firebase/storage";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
function App() {
  const [movieList, setMovieList] = useState([]);
  //ADD NEW MOVIES STATES
  const [newMovieTitle, setNewMovieTitle] = useState([]);
  const [newReleaseDate, setNewReleaseDate] = useState([]);
  const [isNewMovieOscar, setisNewMovieOscar] = useState(false);
  //UPDATE MOVIE STATES
  const [newTitle, setNewTitile] = useState([]);

  //FILE UPLOAD state
  const [fileUpload, setFileUpload] = useState(null);

  const moviesCollectionRef = collection(db, "movies");

  const getMovieList = async () => {
    //READ THE DATA
    //SET THE DATA
    try {
      const data = await getDocs(moviesCollectionRef);
      const fileredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(fileredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);
  //ADD MOVIES
  const movieSubmit = async () => {
    // const addNewMovies = [];
    try {
      const userId = auth?.currentUser?.uid;
      if (userId) {
        await addDoc(moviesCollectionRef, {
          title: newMovieTitle,
          releaseDate: newReleaseDate,
          receivedAnOscar: isNewMovieOscar,
          userID: userId,
          // Id: auth?.currentUser?.uid,
        });
        setNewMovieTitle("");
        getMovieList();
      } else {
        console.error("User ID is Undefined");
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  //DELETE THE DATA
  const delelteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    try {
      await deleteDoc(movieDoc);
      getMovieList();
    } catch (e) {
      console.error(e);
    }
  };
  //UPDATE MOVIE TITLE
  const updateMovie = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await updateDoc(movieDoc, { title: newTitle });
      getMovieList();
    } catch {}
  };

  const uploadFile = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `projectFile/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
      alert("File uploaded");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      Fire Base Project
      <div className="auth">
        <h2>Authentication</h2>
        <Auth />
      </div>
      <div>
        <h2>Add movies</h2>
        <input
          type="text"
          placeholder="AddMovie... "
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="ReleaseYear..."
          onChange={(e) => setNewReleaseDate(Number(e.target.value))}
        />
        <input
          type="checkbox"
          checked={isNewMovieOscar}
          onChange={(e) => setisNewMovieOscar(e.target.checked)}
        />
        <label>Recevied an Oscar</label>
        <button onClick={movieSubmit}>Submit Movie</button>
      </div>
      <div>
        <h3>Movies Lsit</h3>
        {movieList.map((movie) => (
          <div>
            <h1 style={{ color: movie.receivedAnOscar ? "green" : "red" }}>
              {movie.title}
            </h1>
            <p>Date: {movie.releaseDate}</p>
            <button onClick={() => delelteMovie(movie.id)}>Delete Movie</button>
            <input
              placeholder="NewTitile..."
              onChange={(e) => setNewTitile(e.target.value)}
            />
            <button onClick={() => updateMovie(movie.id)}>Update</button>
          </div>
        ))}
      </div>
      <div>
        <input type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
        <button onClick={uploadFile}>Upload</button>
      </div>
    </div>
  );
}

export default App;
