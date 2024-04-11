import { FormRow, FormRowSelect, SubmitBtn } from "..";
import Wrapper from "../../assets/wrappers/SearchContainerForm";
import { Form, Link, useParams, useSubmit } from "react-router-dom";
import { useAllBadgesWithoutLoginContext } from "./AllBadgesWithoutLogin";
import { SORT_BY } from "../../utils/constants";
 
const SearchBadgesWithoutLogin = () => {
  const { searchValues } = useAllBadgesWithoutLoginContext();
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

  const params = useParams();

   return (
    <Wrapper>
      <Form className="form">
        <h4 className="form-title">search form</h4>
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
            defaultValue={sort}
            labelText="sort type"
            list={[...Object.values(SORT_BY)]}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <Link
            to={`/personal-certificate/${params.candidateId}`}
            className="btn form-btn delete-btn"
          >
            Reset search values
          </Link>
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default SearchBadgesWithoutLogin;
