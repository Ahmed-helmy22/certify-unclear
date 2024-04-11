import Wrapper from "../../assets/wrappers/SearchContainerForm";
import { Form, Link, useSubmit } from "react-router-dom";
import { USER_STATUS, SORT_BY } from "../../utils/constants";
import { FormRow, FormRowSelect } from "../../components";
import { useAdminProviderInfoContext } from "./AdminProvidersInfo";
import SearchBtn from "../../components/SearchBtn";

const SearchAdminProviderInfo = () => {
  const { searchValues } = useAdminProviderInfoContext();
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
        {/* <h4 className="form-title">search form</h4> */}
        <div className="form-center">
          <FormRow
            type="search"
            name="search"
            labelText="Search by Institute / Country"
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

          <Link to="../provider" className="btn form-btn delete-btn">
            Reset search values
          </Link>
          <SearchBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default SearchAdminProviderInfo;
