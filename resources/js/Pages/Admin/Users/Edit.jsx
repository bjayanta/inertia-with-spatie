import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, useForm} from '@inertiajs/react';
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import Checkbox from "@/Components/Checkbox.jsx";
import {useEffect, useState} from "react";

export default function RoleEdit({ auth, user, roles }) {
    const [hasRoles, setHasRoles] = useState(user.roles)
    const { data, setData, put, processing, errors, reset } = useForm({
        name: user.name,
        email: user.email,
        password: '',
        password_confirmation: '',
        roles: []
    });

    const handleRoles = (e) => {
        console.log(hasRoles)

        const isChecked = e.target.checked
        const value = e.target.value

        if(isChecked) {
            setHasRoles([...hasRoles, value])
        } else {
            setHasRoles(preData => {
                return preData.filter(role => {
                    return role != value
                })
            })
        }
    }

    useEffect(() => {
        setData('roles', hasRoles)
    }, [hasRoles])

    const submit = (e) => {
        e.preventDefault();
        put(route('users.update', user.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Users / Update</h2>}
        >
            <Head title="Update user" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className='flex justify-between p-6'>
                            <div className="text-gray-900">Update user.</div>

                            <Link
                                href={route('users.index')}
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

                                <div className="mt-4">
                                    <InputLabel htmlFor="email" value="Email" />

                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        autoComplete="username"
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                    />

                                    <InputError message={errors.email} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="password" value="Password" />

                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full"
                                        autoComplete="new-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                        required
                                    />

                                    <InputError message={errors.password} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

                                    <TextInput
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        className="mt-1 block w-full"
                                        autoComplete="new-password"
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        required
                                    />

                                    <InputError message={errors.password_confirmation} className="mt-2" />
                                </div>

                                <div className='mt-4'>
                                    <InputLabel value="Add/Remove Roles" />

                                    <div className='space-x-8 items-end'>
                                        {roles.map((role, index) => (
                                            <label key={index} className='space-x-2'>
                                                <Checkbox
                                                    name='roles[]'
                                                    value={role.name}
                                                    checked={hasRoles.includes(role.name)}
                                                    onChange={(e) => handleRoles(e)}
                                                />
                                                <span>{ role.name } - { role.id }</span>
                                            </label>
                                        ))}
                                    </div>
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
