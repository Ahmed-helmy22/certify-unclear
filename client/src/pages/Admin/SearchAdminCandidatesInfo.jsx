import Wrapper from "../../assets/wrappers/SearchContainerForm";
import { Form, Link, useSubmit } from "react-router-dom";
import { USER_STATUS, SORT_BY, BADGE_STATUS } from "../../utils/constants";
import { FormRow, FormRowSelect } from "../../components";
import { useAdminCandidatesInfoContext } from "./AdminCandidatesInfo";
import SearchBtn from "../../components/SearchBtn";

const SearchAdminCandidatesInfo = () => {
  const { searchValues } = useAdminCandidatesInfoContext();
  const { search = "", status = "", sort = "" } = searchValues || {};
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
        <div className="form-center">
          <FormRow
            type="search"
            name="search"
            labelText="Search by name"
            placeholder="Searh by Name "
            withLabel={true}
            onChange={debounce((form) => {
              submit(form);
            })}
          />

          <FormRowSelect
            labelText="Filter by user status"
            name="status"
            list={["", ...Object.values(USER_STATUS)]}
            defaultValue={status}
            value={status}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />

          {/* <FormRowSelect
            name="sort"
            defaultValue={sort}
            value={sort}
            labelText="sort type"
            list={["",...Object.values(SORT_BY)]}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          /> */}
          <Link to="../candidates" className="btn form-btn delete-btn">
            Reset search values
          </Link>
          <SearchBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default SearchAdminCandidatesInfo;
