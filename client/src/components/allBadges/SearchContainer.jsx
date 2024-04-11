import { FormRow, FormRowSelect, SubmitBtn } from "..";
import Wrapper from "../../assets/wrappers/SearchContainerForm";
import { Form, Link, useSubmit } from "react-router-dom";
import { SORT_BY } from "../../utils/constants";
 import { useAllBadgesContext } from "./AllBadges";

const SearchContainer = () => {
  const { searchValues } = useAllBadgesContext();
  const { search = "", sort = "" } = searchValues || {};

  console.log(searchValues);
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
            labelText="search"
            withLabel={true}
            onChange={debounce((form) => {
              submit(form);
            })}
          />

          <FormRowSelect
            name="sort"
            labelText="sort type"
            list={["", ...Object.values(SORT_BY)]}
            defaultValue={sort}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />

          <Link to="../all-badges" className="btn form-btn delete-btn">
            Reset search values
          </Link>
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default SearchContainer;
