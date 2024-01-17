import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, useForm} from '@inertiajs/react';
import {useState} from "react";
import Modal from "@/Components/Modal.jsx";
import DangerButton from "@/Components/DangerButton";
import SecondaryButton from "@/Components/SecondaryButton";

export default function Permissions({ auth, permissions }) {
    const form = useForm({})

    const [showModal, setShowModal] = useState(false)
    const confirmDelete = () => setShowModal(true)
    const closeModal = () => setShowModal(false)

    const deletePermission = (id) => {
        form.delete(route('permissions.destroy', id), {
            onSuccess: () => closeModal()
        })
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Permissions / Index</h2>}
        >
            <Head title="Permissions" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className='flex justify-between p-6'>
                            <div className="text-gray-900">This is permission's index page.</div>

                            <Link
                                href={route('permissions.create')}
                                className='px-3 py-2 text-white font-semibold bg-indigo-500 hover:bg-indigo-700 rounded'
                            >
                                New Permission
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
                                {permissions.map((permission, index) => (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                                        <td className="px-6 py-4">{ index + 1 }</td>
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            { permission.name }
                                        </td>
                                        <td className="px-6 py-4">{ permission.guard_name }</td>
                                        <td className="px-6 py-4 text-right space-x-4">
                                            <Link href={route('permissions.edit', permission.id)} className='text-blue-400 hover:text-blue-600'>Edit</Link>

                                            {/*
                                            <Link
                                                href={route('permissions.destroy', permission.id)}
                                                method='DELETE'
                                                as='button'
                                                className='text-red-400 hover:text-red-600'
                                            >
                                                Delete
                                            </Link>
                                            */}

                                            <button onClick={confirmDelete} className='text-red-400 hover:text-red-600'>Delete</button>
                                            <Modal show={showModal} onClose={closeModal}>
                                                <div className='p-6'>
                                                    <h2 className='text-lg font-semibold text-slate-800'>Are you sure to delete this records?</h2>
                                                    <div className='mt-6 flex space-x-4'>
                                                        <DangerButton onClick={(e) => deletePermission(permission.id)}>Delete</DangerButton>
                                                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
                                                    </div>
                                                </div>
                                            </Modal>
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
