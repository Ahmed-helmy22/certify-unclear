import { toast } from 'react-toastify';
import customFetch from '../../utils/customFetch';
import { redirect } from 'react-router-dom';

export  const action = async({params}) => {
   try {
      await customFetch.post(`/examiner/declineCandidateBadge/${params.candidateBadgeId}`);
      toast.success('This badge is declined successfully')
  } catch (error) {
      toast.error(error?.response?.data?.message)
      return error
  }
  return redirect('/dashboard/examiner/badge-holder')
}
