import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchRandomQuote = createAsyncThunk("quotes/fetchQuote", async () => {
    const url = "https://api.quotable.io/random";
    const response = await fetch(url);
    const json = await response.json();
    return json;
});

const quotesSlice = createSlice({
    name: "quotes",
    initialState: {
        quote: { content: "", author: "" },
        isLoading: false,
        isFailed: false,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRandomQuote.fulfilled, (state, action) => {
            state.isFailed = false;
            state.isLoading = false;
            state.quote = { content: action.payload.content, author: action.payload.author };
        })
            .addCase(fetchRandomQuote.pending, (state) => {
                state.isLoading = true;
                state.isFailed = false;
            })
            .addCase(fetchRandomQuote.rejected, (state) => {
                state.isFailed = true;
                state.isLoading = false;
            })
    }
});

export const selectQuotes = (state) => state.quotes.quote;
export const IsQuoteLoading = (state) => state.quotes.isLoading;
export const IsQuoteFailed = (state) => state.quotes.isFailed;

export default quotesSlice.reducer;