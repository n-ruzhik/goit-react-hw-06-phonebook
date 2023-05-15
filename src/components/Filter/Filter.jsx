import { useDispatch, useSelector } from 'react-redux';
import { updatedFilter } from '../../redux/filterSlice';
import { getFilterByQuery } from '../../redux/selectors';
import css from './Filter.module.css';

const Filter = () => {
  const dispatch = useDispatch();

  const onFilter = event => {
    dispatch(updatedFilter(event.currentTarget.value));
  };
  const value = useSelector(getFilterByQuery);

  return (
    <div className={css.filterField}>
      <label className={css.label}>Name filter</label>
      <input
        type="text"
        placeholder="start typing a name"
        className={css.input}
        value={value}
        onChange={onFilter}
      />
    </div>
  );
};

export default Filter;
