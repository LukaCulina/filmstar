import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { useEffect, useState } from "react";
import CarouselItem from './CarouselItem';
import './Carousel.css'

const TopRatedCarousel = ({ media_type }) => {
    const key = import.meta.env.VITE_API_KEY;
    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        const response = await fetch(
            `https://api.themoviedb.org/3/discover/${media_type}?api_key=${key}&include_adult=false&language=en-US&page=1&sort_by=vote_average.desc&vote_count.gte=200`
        )
        const data = await response.json();
        setContent(data.results);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [])

    const skeletonItems = Array(content.length || 7).fill(null).map((_, i) => (
        <div key={i} className="skeleton_card" />
    ));

    const items = content?.map((c) => (
        <CarouselItem
            key={c.id}
            media_type={media_type}
            c={c}
        />
    ))

    const responsive = {
        0: {
            items: 3,
        },
        512: {
            items: 5,
        },
        1024: {
            items: 7,
        },
    }

    return (
        <div className='tray'>
            <div className='genre'>
                <span>Top rated {media_type === "movie" ? `movies` : `series`}</span>
            </div>
            <AliceCarousel
                /* autoPlay */
                animationDuration={2000}
                responsive={responsive}
                infinite
                disableDotsControls
                disableButtonsControls
                mouseTracking
                items={loading ? skeletonItems : items}>
            </AliceCarousel>
        </div>
    );
}
export default TopRatedCarousel;

