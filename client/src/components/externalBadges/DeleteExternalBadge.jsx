import { toast } from 'react-toastify';
import customFetch from '../../utils/customFetch';
import { redirect } from 'react-router-dom';

export  const action = async({params }) => {
     try {
        await customFetch.delete(`/externalBadge/deleteWebsite/${params.websitId}`);
        toast.success('External Badge delete successfully')
        return redirect('/dashboard/admin/manage-external')
    } catch (error) {
        toast.error(error?.response?.data?.message)
        return error
    }
}
