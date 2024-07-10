import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRandomQuote, IsQuoteFailed, IsQuoteLoading, selectQuotes } from "./quotesSlice";

export default function Quotes() {
    const dispatch = useDispatch();
    const quotes = useSelector(selectQuotes);
    const isLoading = useSelector(IsQuoteLoading);
    const isFailed = useSelector(IsQuoteFailed);

    useEffect(() => {
        dispatch(fetchRandomQuote());
    },[]);

    let quoteWidget = <div>No Quotes</div>;
    if (isLoading) {
        quoteWidget = <div>Loading...</div>;
    } else if (isFailed) {
        quoteWidget = <div>Error fetching quotes. Please try again later.</div>;
    } else {
        quoteWidget = <div>
            <h2>{quotes.content}</h2>
            <h3>- {quotes.author}</h3>
        </div>
    }

    return(quoteWidget);
}