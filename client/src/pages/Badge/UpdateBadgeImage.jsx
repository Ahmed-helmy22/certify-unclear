import { toast } from 'react-toastify';
import customFetch from '../../utils/customFetch';
import { redirect } from 'react-router-dom';

export  const action = async({ request ,params}) => {
    try {
        await customFetch.patch(`/badge/updateBadgePhoto/${params.badgeId}`);
        toast.success('Badge Image update successfully')
    } catch (error) {
        toast.error(error?.response?.data?.message)
        return error
    }
    return redirect('/dashboard/academy/all-badges')
}
