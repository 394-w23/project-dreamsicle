import './FilterItem.css'


const FilterItem = ({tag, setFilter}) => {

    return(
        <div onClick={() => setFilter(tag)}>{tag}</div>
    );
}

export default FilterItem