import { FormRow, FormRowSelect  } from '.';
import Wrapper from '../assets/wrappers/SearchContainerForm';
import { Form, Link } from 'react-router-dom';
import { BADGE_STATUS, JOB_SORT_BY } from '../utils/constants';
 

const SearchBadgesProvider = () => {

  return (
    <Wrapper>
      <Form className='form'>
        {/* <h4 className='form-title'>search form</h4> */}
        <div className='form-center'>
          {/* <FormRow type='search' name='search'  defaultValue={search} onChange={ debounce( (form) => {
            submit(form)
          } ) }/> */}
            <FormRow type='search' name='search' labelText='search' withLabel={true}/>
          {/* <FormRowSelect labelText='job status' name='jobStatus' list={['all' , ...Object.values(BADGE_STATUS)]} defaultValue={BadgeStatus} onChange={ (e) => {
            submit(e.currentTarget.form)
          }} /> */}
           <FormRowSelect labelText='badge department' name='jobStatus' list={['all' , ...Object.values(BADGE_STATUS)]}/>
          {/* <FormRowSelect labelText='job type' name='jobType' list={['all' , ...Object.values(JOB_TYPE)]} defaultValue={institueName} onChange={ (e) => {
            submit(e.currentTarget.form)
          }}/> */}
           {/* <FormRowSelect labelText='job type' name='jobType' list={['all' , ...Object.values(JOB_TYPE)]} /> */}
          {/* <FormRowSelect name='sort' defaultValue={sort} list={[...Object.values(JOB_SORT_BY)]} onChange={ (e) => {
            submit(e.currentTarget.form)
          }}/> */}
          <FormRowSelect name='sort'  labelText='sort type'  list={[...Object.values(JOB_SORT_BY)]}/>
          <Link to='/dashboard/all-jobs' className='btn form-btn delete-btn'>
            Reset search values
          </Link>
         </div>
      </Form>
    </Wrapper>
  )
}

export default SearchBadgesProvider