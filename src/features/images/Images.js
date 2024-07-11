import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchImages,selectImages, selectCurrentImage, prevImage,nextImage  } from  "./imagesSlice";



export default function Images({children}) 
{
    const dispatch = useDispatch();
    const images = useSelector(selectImages);
    const currentImage = useSelector(selectCurrentImage);
    

    const appStyle = {
        backgroundImage: `url(${currentImage.url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        margin: 0
      };

    useEffect(() =>{
        dispatch(fetchImages());
    }, [dispatch]);

    return (
        <div style={appStyle}>
            <button onClick={() => dispatch(prevImage())}>Prev</button>
            <button onClick={() => dispatch(nextImage())}>Next</button>
            {children}
        </div>
    );
}
