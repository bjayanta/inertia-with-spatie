import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';

export default function Roles({ auth, roles }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Roles / Index</h2>}
        >
            <Head title="Roles" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className='flex justify-between p-6'>
                            <div className="text-gray-900">This is role's index page.</div>

                            <Link
                                href={route('roles.create')}
                                className='px-3 py-2 text-white font-semibold bg-indigo-500 hover:bg-indigo-700 rounded'
                            >
                                New Role
                            </Link>
                        </div>


                        <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">ID</th>
                                    <th scope="col" className="px-6 py-3">Name</th>
                                    <th scope="col" className="px-6 py-3">Guard</th>
                                    <th scope="col" className="px-6 py-3 text-right">Action</th>
                                </tr>
                                </thead>

                                <tbody>
                                {roles.map((role, index) => (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                                        <td className="px-6 py-4">{ index + 1 }</td>
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            { role.name }
                                        </td>
                                        <td className="px-6 py-4">{ role.guard_name }</td>
                                        <td className="px-6 py-4 text-right space-x-4">
                                            <Link href={route('roles.edit', role.id)} className='text-blue-400 hover:text-blue-600'>Edit</Link>
                                            <Link href={route('roles.destroy', role.id)} method='DELETE' as='button' className='text-red-400 hover:text-red-600'>Delete</Link>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
