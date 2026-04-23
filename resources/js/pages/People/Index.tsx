import { store } from '@/actions/App/Http/Controllers/PersonController';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Field,
    FieldDescription,
    FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { toast } from 'sonner';
import { type FormEvent, useEffect } from 'react';

type Person = {
    id: number;
    first_name: string;
    last_name: string;
    created_at: string;
};

type PageProps = {
    flash: {
        message?: string;
    };
    people: Person[];
};

export default function Index() {
    const { people, flash } = usePage<PageProps>().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        last_name: '',
    });

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        post(store.url(), {
            onSuccess: () => reset(),
        });
    };

    useEffect(() => {
        if (flash.message) {
            toast.success(flash.message);
        }
    }, [flash.message]);

    useEffect(() => {
        const validationMessages = Object.values(errors);

        if (validationMessages.length > 0) {
            validationMessages.forEach((message) => {
                toast.error(String(message));
            });
        }
    }, [errors]);

    return (
        <AppLayout>
            <Head title="People" />

            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Add a Person</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid gap-1.5">
                                <Field>
                                    <FieldLabel htmlFor="first_name">First Name</FieldLabel>
                                    <Input
                                        id="first_name"
                                        value={data.first_name}
                                        onChange={(event) =>
                                            setData('first_name', event.target.value)
                                        }
                                        placeholder="First name"
                                        aria-invalid={Boolean(errors.first_name)}
                                        className={
                                            errors.first_name
                                                ? 'border-destructive ring-3 ring-destructive/20'
                                                : ''
                                        }
                                    />
                                    {errors.first_name ? (
                                        <FieldDescription className="text-destructive/80">
                                            {String(errors.first_name)}
                                        </FieldDescription>
                                    ) : null}
                                </Field>
                            </div>

                            <div className="grid gap-1.5">
                                <Field>
                                    <FieldLabel htmlFor="last_name">Last Name</FieldLabel>
                                    <Input
                                        id="last_name"
                                        value={data.last_name}
                                        onChange={(event) =>
                                            setData('last_name', event.target.value)
                                        }
                                        placeholder="Last name"
                                        aria-invalid={Boolean(errors.last_name)}
                                        className={
                                            errors.last_name
                                                ? 'border-destructive ring-3 ring-destructive/20'
                                                : ''
                                        }
                                    />
                                    {errors.last_name ? (
                                        <FieldDescription className="text-destructive/80">
                                            {String(errors.last_name)}
                                        </FieldDescription>
                                    ) : null}
                                </Field>
                            </div>

                            <Button type="submit" disabled={processing}>
                                {processing ? 'Saving...' : 'Save'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>First Name</TableHead>
                                <TableHead>Last Name</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {people.length > 0 ? (
                                people.map((person: Person) => (
                                    <TableRow key={person.id}>
                                        <TableCell>{person.first_name}</TableCell>
                                        <TableCell>{person.last_name}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={2} className="text-center text-slate-500">
                                        No entries yet.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
