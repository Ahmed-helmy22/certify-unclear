import Wrapper from "../../assets/wrappers/SearchContainerForm";
import { Form, Link, useSubmit } from "react-router-dom";
import { BADGE_STATUS, SORT_BY } from "../../utils/constants";
import { FormRow, FormRowSelect, SubmitBtn } from "../../components";
import { useExaminerBadgeHolderContext } from "./ExaminerBadgeHolder";
import SearchBtn from './../../components/SearchBtn';

const SearchExaminerBadgeHolder = () => {
  const { searchValues } = useExaminerBadgeHolderContext();
  const { search = "", sort = "" } = searchValues || {};
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
            labelText="Search by Training Entities/Candidate"
            withLabel={true}
            onChange={debounce((form) => {
              submit(form);
            })}
          />

        

          <FormRowSelect
            name="sort"
            defaultValue={sort}
            labelText="sort type"
            list={["" ,...Object.values(SORT_BY)]}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <Link to="../badge-holder" className="btn form-btn delete-btn">
            Reset search values
          </Link>
          
          <SearchBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default SearchExaminerBadgeHolder;
