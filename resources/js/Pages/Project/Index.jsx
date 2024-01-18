import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, useForm} from '@inertiajs/react';
import Modal from "@/Components/Modal.jsx";
import DangerButton from "@/Components/DangerButton.jsx";
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import {useState} from "react";
import { usePermission } from "@/Composables/permissions.js";

export default function Dashboard({ auth, projects }) {
    const form = useForm({})
    const { hasPermission } = usePermission()

    const [showModal, setShowModal] = useState(false)
    const confirmDelete = () => setShowModal(true)
    const closeModal = () => setShowModal(false)

    const deleteProject = (id) => {
        form.delete(route('projects.destroy', id), {
            onSuccess: () => closeModal()
        })
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Project / Index</h2>}
        >
            <Head title="Project" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className='flex justify-between p-6'>
                            <div className="text-gray-900">All projects in the list bellow.</div>

                            <div className='space-x-2'>
                                <Link
                                    href={route('projects.index')}
                                    className='px-3 py-2 text-white font-semibold bg-slate-500 hover:bg-slate-700 rounded'
                                >
                                    All
                                </Link>

                                <Link
                                    href={route('projects.index') + '?status=Completed'}
                                    className='px-3 py-2 text-white font-semibold bg-green-500 hover:bg-green-700 rounded'
                                >
                                    All Completed
                                </Link>

                                { hasPermission('create-project') ? (
                                    <Link
                                        href={route('projects.create')}
                                        className='px-3 py-2 text-white font-semibold bg-indigo-500 hover:bg-indigo-700 rounded'
                                    >
                                        New Project
                                    </Link>
                                ) : ''}
                            </div>
                        </div>

                        <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">#</th>
                                    <th scope="col" className="px-6 py-3">Name</th>
                                    <th scope="col" className="px-6 py-3">Budget (BDT)</th>
                                    <th scope="col" className="px-6 py-3">Start at</th>
                                    <th scope="col" className="px-6 py-3">End at</th>
                                    <th scope="col" className="px-6 py-3">Status</th>
                                    <th scope="col" className="px-6 py-3 text-right">Action</th>
                                </tr>
                                </thead>

                                <tbody>
                                {projects.map((project, index) => (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                                        <td className="px-6 py-4">{ index + 1 }</td>
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            { project.name }
                                        </td>

                                        <td scope="row" className="px-6 py-4">
                                            { new Intl.NumberFormat('en-IN').format(project.budget) }
                                        </td>

                                        <td scope="row" className="px-6 py-4">
                                            { project.start_at ? (new Date(project.start_at)).toDateString() : '' }
                                        </td>

                                        <td scope="row" className="px-6 py-4">
                                            { project.end_at ? (new Date(project.end_at)).toDateString() : '' }
                                        </td>

                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            { project.status }
                                        </td>

                                        <td className="px-6 py-4 text-right space-x-4">
                                            {/* Update permission */}
                                            { hasPermission('update-project') ? (
                                                <Link href={route('projects.edit', project.id)} className='text-blue-400 hover:text-blue-600'>Edit</Link>
                                            ) : '' }

                                            {/* Delete permission */}
                                            { hasPermission('delete-project') ? (
                                                <>
                                                    <button onClick={confirmDelete} className='text-red-400 hover:text-red-600'>Delete</button>

                                                    <Modal show={showModal} onClose={closeModal}>
                                                        <div className='p-6'>
                                                            <h2 className='text-lg font-semibold text-slate-800'>Are you sure to delete this records?</h2>
                                                            <div className='mt-6 flex space-x-4'>
                                                                <DangerButton onClick={(e) => deleteProject(project.id)}>Delete</DangerButton>
                                                                <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
                                                            </div>
                                                        </div>
                                                    </Modal>
                                                </>
                                            ) : '' }
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
