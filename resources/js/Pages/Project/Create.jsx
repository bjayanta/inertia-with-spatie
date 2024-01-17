import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, useForm} from '@inertiajs/react';
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import Textarea from "@/Components/Textarea.jsx";

export default function UserCreate({ auth }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        budget: 0.00,
        start_at: new Date('YYYY-mm-dd'),
        end_at: new Date('YYYY-mm-dd'),
        properties: [],
        description: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('projects.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Projects / Create</h2>}
        >
            <Head title="Create new project" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className='flex justify-between p-6'>
                            <div className="text-gray-900">Create a new project.</div>

                            <Link
                                href={route('projects.index')}
                                className='px-3 py-2 text-white font-semibold bg-indigo-500 hover:bg-indigo-700 rounded'
                            >
                                Back
                            </Link>
                        </div>

                        <div className='px-6 pb-5'>
                            <form onSubmit={submit}>
                                <div>
                                    <InputLabel htmlFor="name" value="Name" required={true} />

                                    <TextInput
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        autoComplete="name"
                                        isFocused={true}
                                        onChange={(e) => setData('name', e.target.value)}
                                    />

                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div className='flex gap-x-6 mt-4'>
                                    <div>
                                        <InputLabel htmlFor="budget" value="Budget" />

                                        <TextInput
                                            id="budget"
                                            type="number"
                                            name="budget"
                                            value={data.budget}
                                            className="mt-1 block w-full"
                                            autoComplete="username"
                                            onChange={(e) => setData('budget', e.target.value)}
                                            required
                                        />

                                        <InputError message={errors.budget} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="start_at" value="Start at" />

                                        <TextInput
                                            id="start_at"
                                            type="date"
                                            name="start_at"
                                            value={data.start_at}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('start_at', e.target.value)}
                                        />

                                        <InputError message={errors.start_at} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="end_at" value="End at" />

                                        <TextInput
                                            id="end_at"
                                            type="date"
                                            name="end_at"
                                            value={data.end_at}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('end_at', e.target.value)}
                                        />

                                        <InputError message={errors.end_at} className="mt-2" />
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="description" value="Description" />

                                    <Textarea
                                        name='description'
                                        id="description"
                                        value={data.description}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('description', e.target.description)}
                                        rows="4"
                                    />

                                    <InputError message={errors.description} className="mt-2" />
                                </div>

                                <div className="flex items-center justify-end mt-4">
                                    <PrimaryButton className="ms-4" disabled={processing}>
                                        Create
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
