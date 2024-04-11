import Wrapper from "../../assets/wrappers/SearchContainerForm";
import { Form, Link , useSubmit } from "react-router-dom";
import { BADGE_STATUS, SORT_BY } from "../../utils/constants";
import { FormRow, FormRowSelect } from "../../components";
import { useAdminCandidateBadgesContext } from "./AdminCandidateBadges";
import SearchBtn from "../../components/SearchBtn";
 
const SearchAdminCandidateBadges = () => {
  const { searchValues } = useAdminCandidateBadgesContext();
  const { search = '', status = '', sort = '' } = searchValues || {}
  const submit = useSubmit();
 

   const debounce = (onChange) => {
    let timeOut;
    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeOut);
      timeOut = setTimeout(() => {
        onChange(form);
      }, 2000);
    };
  };
   
  return (
    <Wrapper>
      <Form className="form">
        <h4 className="form-title"></h4>
        <div className="form-center">
          <FormRow
            type="search"
            name="search"
            labelText="Searchy by name"
            withLabel={true}
            onChange={debounce((form) => {
              submit(form);
            })}
          />

          <FormRowSelect
            labelText="Filter by badge status"
            name="status"
            value={status}
            list={["",...Object.values(BADGE_STATUS)]}
            defaultValue={status}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />

          <FormRowSelect
            name="sort"
            defaultValue={sort}
            value={sort}
             labelText="Date Sorting"
            list={["",...Object.values(SORT_BY)]}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <Link to="../candidate-badges" className="btn form-btn delete-btn">
            Reset search values
          </Link>
          <SearchBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default SearchAdminCandidateBadges;
