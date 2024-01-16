import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, useForm} from '@inertiajs/react';
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import Checkbox from "@/Components/Checkbox.jsx";
import {useEffect, useState} from "react";

export default function RoleEdit({ auth, role, permissions, givenPermissions }) {
    const [hasPermissions, setHasPermissions] = useState(givenPermissions)
    const { data, setData, put, processing, errors, reset } = useForm({
        name: role.name,
        permissions: []
    });

    const handleRolePermission = (e) => {
        const isChecked = e.target.checked
        const value = parseInt(e.target.value)

        if(isChecked) {
            setHasPermissions([...hasPermissions, value])
        } else {
            setHasPermissions(preData => {
                return preData.filter(id => {
                    return id != value
                })
            })
        }
    }

    useEffect(() => {
        setData('permissions', hasPermissions)
    }, [hasPermissions])

    const submit = (e) => {
        e.preventDefault();
        put(route('roles.update', role.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Roles / Update</h2>}
        >
            <Head title="Update role" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className='flex justify-between p-6'>
                            <div className="text-gray-900">Update role.</div>

                            <Link
                                href={route('roles.index')}
                                className='px-3 py-2 text-white font-semibold bg-indigo-500 hover:bg-indigo-700 rounded'
                            >
                                Back
                            </Link>
                        </div>

                        <div className='px-6 pb-5'>
                            <form onSubmit={submit}>
                                <div>
                                    <InputLabel htmlFor="name" value="Name" />

                                    <TextInput
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        autoComplete="name"
                                        isFocused={true}
                                        required
                                        onChange={(e) => setData('name', e.target.value)}
                                    />

                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                {/* Add permissions */}
                                <div className='mt-5'>
                                    <table className='w-full text-left'>
                                        <tbody>
                                        {Object.keys(permissions).map((menu) => (
                                            <tr key={menu} className='border-b'>
                                                <th className='py-2'>{ permissions[menu][0]['menu'] }</th>
                                                <td className='space-x-8 items-end'>
                                                {permissions[menu].map((permission, index) => (
                                                    <label key={index} className='space-x-2'>
                                                        <Checkbox
                                                            name='permissions[]'
                                                            value={permission.id}
                                                            checked={hasPermissions.includes(permission.id)}
                                                            onChange={(e) => handleRolePermission(e)}
                                                        />
                                                        <span>{ permission.name } - { permission.id }</span>
                                                    </label>
                                                ))}
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="flex items-center justify-end mt-4">
                                    <PrimaryButton className="ms-4" disabled={processing}>
                                        Change and save
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
