import { toast } from 'react-toastify';
import customFetch from '../../utils/customFetch';
import { redirect } from 'react-router-dom';

export  const action = async({params }) => {
      try {
        await customFetch.delete(`/provider/deleteDeclinedBadges/${params.candidateBadgeId}`);
        toast.success('Badge delete successfully')
        return redirect('/dashboard/academy/declined-badges')
    } catch (error) {
        toast.error(error?.response?.data?.message)
        return error
    }
}
