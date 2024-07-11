import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";

export const fetchImages = createAsyncThunk('images/fetchImages', async () => {
    const orientation_type = window.screen.orientation.type;
    let orientation = 'landscape';
    if (orientation_type === 'landscape-primary' || orientation_type === 'landscape-secondary') {
        orientation = "landscape";
    } else {
        orientation = "portrait";
    }
    const url = `/.netlify/functions/fetchImage?orientation=${orientation}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
});

const imagesSlice = createSlice({
    name: 'images',
    initialState: {
        images: [],
        currentImageIndex: -1,
        isLoading: false,
        isFailed: false,
    },
    reducers: {
        prevImage: (state) => {
            state.currentImageIndex = state.currentImageIndex === 0 
                ? state.images.length - 1 
                : state.currentImageIndex - 1;
        },
        nextImage: (state) => {
            state.currentImageIndex = state.currentImageIndex === state.images.length - 1
                ? 0
                : state.currentImageIndex + 1;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchImages.pending, (state) => {
                state.isLoading = true;
                state.isFailed = false;
            })
            .addCase(fetchImages.fulfilled, (state, action) => {
                state.images = action.payload;
                state.isLoading = false;
                state.isFailed = false;
                state.currentImageIndex  = 0;
            })
            .addCase(fetchImages.rejected, (state) => {
                state.isLoading = false;
                state.isFailed = true;
            })
    },
});

export const selectImages = (state) => state.images.images;
export const isImagesLoading = (state) => state.images.isLoading;
export const isImagesFailed = (state) => state.images.isFailed;
const selectCurrentImageIndex  = (state) => state.images.currentImageIndex;
export const selectCurrentImage = createSelector([selectImages, selectCurrentImageIndex], (images, currentImageIndex) => {
    return images.length > 0 ? images[currentImageIndex] : {id:0, url:""};
});
export const { prevImage, nextImage } = imagesSlice.actions;

export default imagesSlice.reducer;