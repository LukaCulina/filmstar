import { useEffect, useState, useRef } from "react";
import DisplayItem from "../../components/DisplayItem/DisplayItem";
import CustomPagination from "../../components/Pagination/CustomPagination";
import SearchBar from "../../components/SearchBar/SearchBar";

const Trending = () => {
    const key = import.meta.env.VITE_API_KEY;
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [numOfPages, setnumOfPages] = useState();

    const fetchTrending = async () => {
        const response = await fetch(
            `https://api.themoviedb.org/3/trending/all/week?api_key=${key}&page=${page}`
        )
        const data = await response.json();
        setContent(data.results);
    };

    useEffect(() => {
        if (searchText.trim()) {
            fetchSearch();
        } else {
            fetchTrending();
        }
    }, [page, searchText]);

    const fetchSearch = async () => {
        if (!searchText.trim()) {
            fetchTrending();
            return;
        }
        const response = await fetch(
            `https://api.themoviedb.org/3/search/multi?api_key=${key}&language=en-US&query=${searchText}&page=${page}&include_adult=false`
        );
        const data = await response.json();
        data.length !== 0 ? setContent(data.results) : setContent(0)
        setnumOfPages(data.total_pages);
    };

    const handleSearch = () => {
        setPage(1); // reset to first page on new search
        fetchTrending();
    };

    return (
        <div>
            <SearchBar
                searchText={searchText}
                setSearchText={setSearchText}
                onSearch={handleSearch}
            />
            <div className="trending">
                {content && content.map((c) => (
                    <DisplayItem key={c.id} c={c} media_type={c.media_type} />
                ))
                }
            </div>
            <CustomPagination setPage={setPage} />
        </div>
    )
}

export default Trending;